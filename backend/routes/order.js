const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  requireSignin,
  adminMiddleware
} = require("../controllers/auth");
const {
  create,
  listOrders,
  getOrderStatus,
  updateOrderStatus
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create",
  requireSignin,
  authMiddleware,
  decreaseQuantity,
  create
);

router.get("/order/list", requireSignin, adminMiddleware, listOrders);
router.get("/order/status", requireSignin, adminMiddleware, getOrderStatus);
router.put("/order/status", requireSignin, adminMiddleware, updateOrderStatus);

module.exports = router;
