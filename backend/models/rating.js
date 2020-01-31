const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true
    },
    rateValue: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
