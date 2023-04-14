import type { NextApiRequest, NextApiResponse } from "next";
import { Products } from "@/utils/types";
import prisma from "../../../lib/prisma";

type MeliProducts = Products;

let chrome = {} as any;
let puppeteer: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

export default async function getMLProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { web = "", category = "", inputValue = "" } = req.query;

  try {
    const products = await prisma.search.findFirst({
      where: {
        website: `MercadoLivre`,
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
    const meliProducts = [] as MeliProducts[];

    await page.goto("https://www.mercadolivre.com.br/");

    await page.setViewport({ width: 1440, height: 900 });

    const searchInput = await page.$("#cb1-edit");
    await searchInput?.type(`${category} ${inputValue}`);
    await page.keyboard.press("Enter");

    await page.waitForSelector(".ui-search");
    const getCategory = await page.$$(".andes-breadcrumb li");

    const productCategory = await getCategory[0].$eval(
      ".andes-breadcrumb__link",
      (el: any) => el.getAttribute("title")
    );

    const products = await page.$$(".ui-search-layout li");

    for (let i = 0; i < 5; i++) {
      const product = products[i];
      const productName = await product.$eval(
        ".ui-search-item__title",
        (el: any) => el.textContent
      );
      const productPrice = await product.$eval(
        ".price-tag-amount",
        (el: any) => el.textContent
      );
      const productImage = await product.$eval(
        ".ui-search-result-image__element",
        (el: any) => el.getAttribute("src")
      );
      const productLink = await product.$eval(".ui-search-link", (el: any) =>
        el.getAttribute("href")
      );

      meliProducts.push({
        productName,
        productPrice,
        productImage,
        productLink,
        productCategory,
      });
    }

    await browser.close();

    const search = await prisma.search.create({
      data: {
        website: `MercadoLivre`,
        category: `${category}`,
        inputValue: `${inputValue}`.toLowerCase(),
      },
    });

    const { id } = search;

    const mappedMeliProducts = meliProducts.map((product) => ({
      ...product,
      searchId: id,
    }));

    console.log("meli", mappedMeliProducts);

    const addMeliProductsToDatabase = mappedMeliProducts.map((product) =>
      prisma.product.create({
        data: {
          searchId: product.searchId || "",
          productImage: product.productImage || "",
          productDescription: product.productName || "",
          productCategory: product.productCategory || "",
          productPrice: product.productPrice || "",
          productWebsite: product.productLink || "",
        },
      })
    );

    await Promise.all(addMeliProductsToDatabase);

    return res.status(200).json({ products: meliProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
