import type { NextApiRequest, NextApiResponse } from "next";
import { Products } from "@/utils/types";

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
  const { web, category, inputValue } = req.query;

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
    const getCategory = await page.$$(".Breadcrumbs_BreadCrumbs__5EM9j li");

    const productCategory = await getCategory[2].$eval(
      ".Breadcrumbs_BreadCrumb__15SH4",
      (el: any) => el.getAttribute("title")
    );

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
        productName,
        productPrice,
        productImage,
        productLink: `${url}${productLink}`,
        productCategory,
      });
    }

    await browser.close();
    return res.status(200).json({ products: buscapeProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
