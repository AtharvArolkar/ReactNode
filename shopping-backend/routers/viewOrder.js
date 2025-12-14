const express = require("express");
const viewOrderRouter = express.Router();
const fs = require("fs");

viewOrderRouter.get("/view-order", (req, res) => {
  fs.readFile("data/order-list.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(200).json({ products: [] });
    }
    if (data) {
      const orderData = JSON.parse(data);
      res.status(200).json(orderData);
    }
  });
});

module.exports = viewOrderRouter;
