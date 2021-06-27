const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  subCategories: [this],
});

const Category = mongoose.model("Category", categorySchema);
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    subCategories: Joi.array().items(Joi.objectId()),
  });
  return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
