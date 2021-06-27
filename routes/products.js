const express = require("express");
const mongoose = require("mongoose");
const { Product, validate } = require("../models/product");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const categoryId = req.query.categoryId;
  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      return res
        .status(400)
        .send("Error: category Id is not a valid MongoDb Object Id");
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send("Invalid category Id");
    const products = await Product.find({ "categories._id": categoryId }).sort(
      "name"
    );
    return res.send(products);
  }
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  var categories = [];
  var errors = false;
  await Promise.all(
    req.body.categories.map(async (s) => {
      const category = await Category.findById(s);
      if (!category) {
        errors = true;
      } else {
        categories = [
          ...categories,
          new Category({
            _id: category._id,
            name: category.name,
            subCategories: category.subCategories,
          }),
        ];
      }
    })
  );
  if (errors) return res.status(400).send("Invalid category Id");
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    categories: categories,
  });

  await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  var categories = [];
  var errors = false;
  await Promise.all(
    req.body.categories.map(async (s) => {
      const category = await Category.findById(s);
      if (!category) {
        errors = true;
      } else {
        categories = [
          ...categories,
          new Category({
            _id: category._id,
            name: category.name,
            subCategories: category.subCategories,
          }),
        ];
      }
    })
  );
  if (errors) return res.status(400).send("Invalid category Id");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      categories: categories,
    },
    { new: true }
  );
  if (!product) return res.status(404).send("Error: Product Not Found");
  res.send(product);
});

module.exports = router;
