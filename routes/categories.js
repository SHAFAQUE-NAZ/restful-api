const express = require("express");
const { Category, validate } = require("../models/category");
const router = express.Router();

// get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

// post one category
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  var subCategories = [];
  var errors = false;
  await Promise.all(
    req.body.subCategories.map(async (s) => {
      const subCategory = await Category.findById(s);
      if (!subCategory) {
        errors = true;
      } else {
        subCategories = [
          ...subCategories,
          new Category({
            _id: subCategory._id,
            name: subCategory.name,
            subCategories: subCategory.subCategories,
          }),
        ];
      }
    })
  );
  if (errors) return res.status(400).send("Invalid SubCategory Id");

  let category = new Category({
    name: req.body.name,
    subCategories: subCategories,
  });

  await category.save();
  res.send(category);
});

module.exports = router;
