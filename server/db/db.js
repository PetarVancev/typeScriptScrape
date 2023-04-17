import pg from "pg";
import scrapeData from "../scrapper.js";
const { Pool } = pg;
const pool = new Pool({
    user: "me",
    database: "ads",
    password: "petar",
    port: 5433,
    host: "postgres",
});
async function insertData() {
    const data = await scrapeData();
    const query = "INSERT INTO ads (id, title, imgurl) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET title = $2, imgurl = $3;";
    for (let i = 0; i < data.length; i++) {
        let values = [i, data[i].title, data[i].imgurl];
        try {
            await pool.query(query, values);
        }
        catch (err) {
            console.log(err);
        }
    }
}
async function getData() {
    const query = "SELECT * FROM ads ORDER BY id ASC";
    try {
        const result = await pool.query(query);
        const dbEntries = result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            imgurl: row.imgurl,
        }));
        return dbEntries;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        pool.end();
    }
}
export default { insertData, getData };
