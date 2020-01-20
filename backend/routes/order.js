const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  requireSignin,
  adminMiddleware
} = require("../controllers/auth");
const { create, listOrders } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create",
  requireSignin,
  authMiddleware,
  decreaseQuantity,
  create
);

router.get("/order/list", requireSignin, adminMiddleware, listOrders);

module.exports = router;
