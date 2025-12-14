const express = require("express");
const productRouter = require("./routers/productRouter");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" }));

app.use(productRouter);

app.listen(3000, () => {
  console.log("Shopping backend server is running on port 3000");
});
