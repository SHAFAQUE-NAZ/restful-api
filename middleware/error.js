module.exports = function (err, req, res, next) {
  console.log("errors", "", err);
  res.status(500).send("Something Went Wrong");
};
