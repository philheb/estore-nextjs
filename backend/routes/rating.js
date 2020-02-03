const express = require("express");
const router = express.Router();
const { rate, getUserRating } = require("../controllers/rating");
const { requireSignin, authMiddleware } = require("../controllers/auth");

router.post("/rating", requireSignin, authMiddleware, rate);
router.get(
  "/rating/user/:productId",
  requireSignin,
  authMiddleware,
  getUserRating
);

module.exports = router;
