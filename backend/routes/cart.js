const express = require("express");
const router = express.Router();

const { authMiddleware, requireSignin } = require("../controllers/auth");
const {
  add,
  getCart,
  getCartFromLocalStorage,
  remove,
  mergeLocalStorageCart
} = require("../controllers/cart");

router.post("/cart/add", requireSignin, authMiddleware, add);
router.delete("/cart/delete", requireSignin, authMiddleware, remove);
router.get("/cart", requireSignin, authMiddleware, getCart);
router.post("/cart/local", getCartFromLocalStorage);
router.post(
  "/cart/merge",
  requireSignin,
  authMiddleware,
  mergeLocalStorageCart
);

module.exports = router;
