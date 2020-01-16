const User = require("../models/user");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");

exports.getCheckoutItems = (req, res) => {
  const productIds = req.body.productIds;
  const productCounts = req.body.productCounts;
  console.log("ids: ", productIds);
  console.log("counts: ", productCounts);

  Product.find({ _id: productIds }).exec((err, products) => {
    if (err) {
      return res.json({
        error: err
      });
    }

    products.map(product => {
      console.log(product.id);
      const indexP = productIds.indexOf(product.id);
      console.log(indexP);
    });
  });

  //   let price = 0;
  //   products.map((product, index) => {
  //     console.log("count: ", parseInt(productCounts[index]));
  //     product["count"] = parseInt(productCounts[index]);
  //     console.log(price);
  //     price = price + product.count * product.price;
  //   });
  //   console.log(price);

  //   let total = 0;

  // const total = () => {
  //   return products.reduce((currentValue, nextValue) => {
  //     return currentValue + nextValue.count * nextValue.price;
  //   }, 0);
  // };

  // const total = products.reduce((currentValue, nextValue) => {
  //   return currentValue + nextValue.price;
  // }, 0);

  //   res.json({ products: products, total: total });
  // });

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
