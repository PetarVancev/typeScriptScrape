import puppeteer from "puppeteer";
import cheerio from "cheerio";
import { AdData } from "./interfaces/dbInterface";

async function scrapeData(): Promise<AdData[]> {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome",
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
    ],
  });
  const page = await browser.newPage();
  const url = "https://www.sreality.cz/en/search/for-sale/apartments";
  let pageNumber = 1;
  let id = 1;
  let data: AdData[] = [];

  while (pageNumber <= 25) {
    await page.goto(url + "?page=" + pageNumber, {
      timeout: 50000,
      waitUntil: "networkidle2",
    });

    const html = await page.content();
    const $ = cheerio.load(html);

    $(".property").each(function () {
      const title = $(this).find(".name").text().trim();
      const imgUrl = $(this).find("img:first-of-type").attr("src") as string;
      const singleData: AdData = {
        id: id,
        title: title,
        imgurl: imgUrl,
      };

      if (title && imgUrl) {
        data.push(singleData);
      }
      id++;
    });

    pageNumber++;
  }

  await browser.close();

  return data;
}

export default scrapeData;
