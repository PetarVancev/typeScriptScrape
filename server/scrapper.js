import puppeteer from "puppeteer";
import cheerio from "cheerio";
async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://www.sreality.cz/en/search/for-sale/apartments";
    let pageNumber = 1;
    let id = 1;
    let data = [];
    while (pageNumber <= 25) {
        await page.goto(url + "?page=" + pageNumber, {
            timeout: 50000,
            waitUntil: "networkidle2",
        });
        const html = await page.content();
        const $ = cheerio.load(html);
        $(".property").each(function () {
            const title = $(this).find(".name").text().trim();
            const imgUrl = $(this).find("img:first-of-type").attr("src");
            const singleData = {
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
