const { json } = require("body-parser");
const express = require("express");
const productRouter = express.Router();

const path = require("path");

const fs = require("fs");

const productFilePath = path.join(__dirname, "..", "data", "products.json");

productRouter.get("/products", (req, res) => {
  fs.readFile("data/shopping-list.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to read products data" });
    }
    const productsDats = JSON.parse(data);
    return res.status(200).json(productsDats);
  });
});

productRouter.post("/buy-product", (req, res) => {
  const payload = req.body;
  if (!fs.existsSync("data/order-list.json")) {
    const file = fs.createWriteStream("data/order-list.json", {
      encoding: "utf-8",
    });
    file.write(JSON.stringify(payload), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to write order data" });
      }
      return res.status(201).send("OK");
    });
  } else {
    fs.writeFile("data/order-list.json", JSON.stringify(payload), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to write order data" });
      }
      return res.status(201).send("OK");
    });
  }
});

module.exports = productRouter;
