const { Order, CartItem } = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
require("dotenv").config();

exports.create = (req, res) => {
  req.body.order.user = req.profile;

  //save to User History
  let history = [];
  req.body.order.products.forEach(item => {
    history.push({
      _id: item._id,
      title: items.title,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    });
  });
  // I am HEEERRRREEEE !!!!!!!!!!!!!!!!!!!
  // User.findOneAndUpdate(
  //   { _id: req.profile._id },
  //   { $push: { history: history } },
  //   { new: true },
  //   (error, data) => {
  //     if(error) {
  //       return res.status(400).json({
  //         error: "Could not find the user"
  //       })
  //     }
  //   }
  // );

  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    return res.json(data);
  });
};
