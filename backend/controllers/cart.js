const { Cart } = require("../models/cart");
const Product = require("../models/product");
require("dotenv").config();

exports.add = (req, res) => {
  const user = req.profile;
  const { productId, count } = req.body;

  Cart.findOne({ user: user._id }).exec((error, cart) => {
    if (cart) {
      //User already have a cart
      //Look if product is already in cart, if true, change count
      const index = cart.products.findIndex(({ _id }) => _id == productId);
      if (index !== -1) {
        cart.products[index].count = count;
        cart.save((error, data) => {
          if (error) {
            return res.status(400).json({
              error: error
            });
          }
          return res.json(data);
        });
      } else {
        cart.products.push({ _id: productId, count: 1 });
        cart.save((error, data) => {
          if (error) {
            return res.status(400).json({
              error: error
            });
          }
          return res.json(data);
        });
      }
    } else {
      // User does not have a cart yet
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) {
          return res.status(400).json({
            error: "Could not find the user"
          });
        }
        const { _id } = product;

        const newCart = {
          user: user._id,
          products: { _id, count: 1 }
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

exports.remove = (req, res) => {
  const user = req.profile;
  const { productId } = req.body;

  Cart.findOne({ user: user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    if (cart) {
      const index = cart.products.findIndex(({ _id }) => _id == productId);
      if (index !== -1) {
        cart.products.splice(index, 1);
        cart.save((error, data) => {
          if (error) {
            return res.status(400).json({
              error: error
            });
          }
          return res.json({
            message: "Item successfully deleted from your cart."
          });
        });
      } else {
        res.status(400).json({
          error: "No product in the cart with that ID"
        });
      }
    }
  });
};

exports.getCart = (req, res) => {
  const user = req.profile;

  Cart.findOne({ user: user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    } else {
      let ids = [];
      cart.products.map(product => ids.push(product._id));
      Product.find({ _id: ids }).exec((error, products) => {
        if (error) {
          return res.status(400).json({
            error: error
          });
        } else {
          console.log(products);
          res.json(products);
        }
      });
    }
  });
};

exports.getCartFromLocalStorage = (req, res) => {
  //Get the product id and count from the frontend (localStorage) and return the complete list with right price
  const products = req.body;

  productIds = [];
  products.map(product => {
    productIds.push(product._id);
  });
  console.log(productIds);
  Product.find({ _id: productIds })
    .select("price")
    .exec((err, products) => {
      res.json(products);
    });
};

exports.mergeLocalStorageCart = (req, res) => {
  const products = req.body;
  console.log(products);
};
