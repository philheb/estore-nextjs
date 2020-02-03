const Product = require("../models/product");
const Rating = require("../models/rating");

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.rate = (req, res) => {
  const { productId, rateValue } = req.body;
  const userId = req.profile._id;

  const newRating = new Rating({
    userId,
    productId,
    rateValue
  });

  Rating.findOneAndUpdate(
    { userId: userId, productId: productId },
    { $set: { rateValue: rateValue } }
  ).then(rate => {
    if (rate) {
      let oldRateValue = rate.rateValue;
      console.log(oldRateValue);
      Product.findOne({ _id: productId }).exec((err, product) => {
        product.rateValue =
          product.rateValue - oldRateValue + parseInt(rateValue);
        product.rateAverage = product.rateValue / product.rateCount;
        product.save((err, product) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            });
          }
          res.json({ rate, product });
        });
      });
    } else {
      newRating.save((err, rate) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        Product.findOneAndUpdate(
          { _id: productId },
          { $inc: { rateCount: 1, rateValue: rateValue } },
          { new: true }
        ).exec((err, product) => {
          product.rateAverage = product.rateValue / product.rateCount;
          product.save((err, product) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err)
              });
            }
            res.json({ product });
          });
        });
      });
    }
  });
};

exports.getUserRating = (req, res) => {
  Rating.findOne({
    userId: req.profile._id,
    productId: req.params.productId
  }).exec((err, rate) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    if (rate) {
      res.json(rate.rateValue);
    }
  });
};
