import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { Products } from "@/utils/types";

type MeliProducts = Products;

export default async function getMLProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { web, category, inputValue } = req.query;
  try {
    const browser = await puppeteer.launch();
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
      (el) => el.getAttribute("title")
    );

    const products = await page.$$(".ui-search-layout li");

    for (let i = 0; i < 5; i++) {
      const product = products[i];
      const productName = await product.$eval(
        ".ui-search-item__title",
        (el) => el.textContent
      );
      const productPrice = await product.$eval(
        ".price-tag-amount",
        (el) => el.textContent
      );
      const productImage = await product.$eval(
        ".ui-search-result-image__element",
        (el) => el.getAttribute("src")
      );
      const productLink = await product.$eval(".ui-search-link", (el) =>
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
    res.status(200).json({ products: meliProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
