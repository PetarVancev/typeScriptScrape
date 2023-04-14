"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
function scrapeData() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        const url = "https://www.sreality.cz/en/search/for-sale/apartments";
        let pageNumber = 1;
        let data = [];
        while (pageNumber <= 25) {
            yield page.goto(url + "?page=" + pageNumber, {
                timeout: 50000,
                waitUntil: "networkidle2",
            });
            const html = yield page.content();
            const $ = cheerio_1.default.load(html);
            $(".property").each(function () {
                const title = $(this).find(".name").text().trim();
                const imgUrl = $(this).find("img:first-of-type").attr("src");
                console.log(imgUrl);
                if (title && imgUrl) {
                    data.push({ title, imgUrl });
                }
            });
            pageNumber++;
        }
        yield browser.close();
        fs_1.default.writeFileSync("output.json", JSON.stringify(data));
    });
}
scrapeData();
