const express = require("express");
require("express-async-errors");
const error = require("../middleware/error");
const categories = require("../routes/categories");
const products = require("../routes/products");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/products", products);
  app.use(error);
};
