const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    title: String,
    imageUrl: String,
    price: String,
    count: Number
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const CartSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    products: [CartItemSchema],
    amount: { type: Number },
    updated: Date
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart, CartItem };
