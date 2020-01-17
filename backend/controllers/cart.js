const { Cart } = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
require("dotenv").config();

exports.add = (req, res) => {
  const user = req.profile;
  const { productId } = req.body;

  //////////////////////////////////////////////////////////////////////
  //MAYBE JUST SAVE THE PRODUCT ID IN THE CART IN CASE THERE IS A PRODUCT
  // PRICE CHANGE OR QUANTITY CHANGE
  ////////////////////////////////////////////////////////////////
  Cart.findOne({ user: user._id }).exec((error, cart) => {
    if (cart) {
      // User already have a cart
      res.json({
        message: "Deal with update"
      });
    } else {
      // User does not have a cart yet
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) {
          return res.status(400).json({
            error: "Could not find the user"
          });
        }
        const { _id, title, price, imageUrl } = product;

        const newCart = {
          user: user._id,
          products: { _id, title, price, imageUrl, count: 1 },
          amount: product.price
        };
        const cart = new Cart(newCart);
        cart.save((error, data) => {
          if (error) {
            return res.status(400).json({
              error: error
            });
          }
          return res.json(data);
        });
      });
    }
  });
};

exports.update = (req, res) => {
  const user = req.profile;

  Cart.findOne;
};

exports.remove = (req, res) => {
  console.log(req);
};
