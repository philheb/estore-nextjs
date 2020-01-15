const User = require("../models/user");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");

exports.getCheckoutItems = (req, res) => {
  const productIds = req.body.products;
  Product.find({ _id: productIds }).exec((err, products) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const total = products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.price;
    }, 0);

    res.json({ products: products, total: total });
  });

  // const getProducts = () => {
  //   let products = [];
  //   productIds.map(productId => {
  //     Product.findOne({ _id: productId }).exec((err, product) => {
  //       if (err) {
  //         return res.json({
  //           err: errorHandler(err)
  //         });
  //       }
  //       products.push(product);
  //     });
  //   });

  // };

  // console.log(getProducts());
};
