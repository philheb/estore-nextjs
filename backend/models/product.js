const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 10
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    imageUrl: {
      type: String,
      required: true
    },
    shipping: {
      type: Boolean,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    rating: {
      type: Number
    },
    reviews: {
      type: Number
    },
    createdBy: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
