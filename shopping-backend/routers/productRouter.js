const { json } = require("body-parser");
const express = require("express");
const productRouter = express.Router();

const path = require("path");

const fs = require("fs");

const productFilePath = path.join(__dirname, "..", "data", "products.json");
const dataDir = path.dirname(productFilePath);
productRouter.get("/products", (req, res) => {
  fs.readFile("data/shopping-list.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to read products data" });
    }
    const productsDats = JSON.parse(data);
    res.status(200).json(productsDats);
  });
});

module.exports = productRouter;
