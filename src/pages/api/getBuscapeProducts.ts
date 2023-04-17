import type { NextApiRequest, NextApiResponse } from "next";
import { Products } from "@/utils/types";
import prisma from "../../../lib/prisma";
import { getThreeFirstWords } from "@/utils/helpers";

type BuscapeProducts = Products;

let chrome = {} as any;
let puppeteer: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

export default async function getBuscapeProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category = "", inputValue = "" } = req.query;

  try {
    const products = await prisma.search.findFirst({
      where: {
        website: `Buscapé`,
        inputValue: `${inputValue}`.toLowerCase(),
        category: `${category}`,
      },
      include: {
        products: true,
      },
    });

    if (products) {
      return res.status(200).json(products);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  let options = {
    args: ["--no-sandbox"],
  } as any;

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const buscapeProducts = [] as BuscapeProducts[];

    const url = "https://www.buscape.com.br";
    await page.goto(`${url}/`);

    await page.setViewport({ width: 1440, height: 900 });

    const searchInput = await page.$(".AutoCompleteStyle_input__HG105");
    await searchInput?.type(`${category} ${inputValue}`);
    await page.keyboard.press("Enter");

    await page.waitForSelector(".Content_Container__heIrp");
    const getCategory = await page.$(
      ".Dropdown_Dropdown__yBuX5 .Dropdown_DropdownHeader__N3Zqc"
    );

    const productCategory =
      (await getCategory?.$eval(
        ".Dropdown_DropdownTitle__DjEsK",
        (el: any) => el.textContent
      )) || "";

    const products = await page.$$(".Paper_Paper__HIHv0");

    for (let i = 0; i < 5; i++) {
      const product = products[i];
      const productName = await product.$eval(
        ".SearchCard_ProductCard_Name__ZaO5o",
        (el: any) => el.textContent
      );
      const productPrice = await product.$eval(
        ".Text_MobileHeadingS__Zxam2",
        (el: any) => el.textContent
      );
      const productImage = await product.$eval(
        ".SearchCard_ProductCard_Image__ffKkn span img",
        (el: any) => el.getAttribute("src")
      );
      const productLink = await product.$eval(
        ".SearchCard_ProductCard_Inner__7JhKb",
        (el: any) => el.getAttribute("href")
      );

      buscapeProducts.push({
        productName: getThreeFirstWords(productName) || "",
        productDescription: productName,
        productPrice,
        productImage,
        productLink: `${url}${productLink}`,
        productCategory,
      });
    }

    await browser.close();

    const search = await prisma.search.create({
      data: {
        website: `Buscapé`,
        category: `${category}`,
        inputValue: `${inputValue}`.toLowerCase(),
      },
    });

    const { id } = search;

    const mappedBuscapeProducts = buscapeProducts.map((product) => ({
      ...product,
      searchId: id,
    }));

    const addBuscapeProductsToDatabase = mappedBuscapeProducts.map((product) =>
      prisma.product.create({
        data: {
          searchId: product.searchId || "",
          productImage: product.productImage || "",
          productName: getThreeFirstWords(product.productName) || "",
          productDescription: product.productName || "",
          productCategory: product.productCategory || "",
          productPrice: product.productPrice || "",
          productWebsite: product.productLink || "",
        },
      })
    );

    await Promise.all(addBuscapeProductsToDatabase);

    return res.status(200).json({ products: buscapeProducts });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
