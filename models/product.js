const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("../models/category");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: [categorySchema],
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    categories: Joi.array().items(Joi.objectId()),
  });
  return schema.validate(product);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProduct;
