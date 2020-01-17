const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    title: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [OrderItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: {},
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, OrderItem };
