const mongoose = require("mongoose");
module.exports = function () {
  const db = "mongodb://localhost/ecommerce";
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to ${db}...`));
};
