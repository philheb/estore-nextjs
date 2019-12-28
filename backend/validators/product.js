const { check } = require("express-validator");

exports.productValidator = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("The name is required"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("The description is required"),
  check("price")
    .not()
    .isEmpty()
    .withMessage("The price is required"),
  check("quantity")
    .not()
    .isEmpty()
    .withMessage("The quantity is required"),
  check("imageUrl")
    .not()
    .isEmpty()
    .withMessage("The image is required")
];
