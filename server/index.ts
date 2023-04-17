import express from "express";
import cors from "cors";

import db from "./db/db.js";

await db.insertData();

const data = await db.getData();

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
