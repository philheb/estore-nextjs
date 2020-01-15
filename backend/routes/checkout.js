const express = require("express");
const router = express.Router();
const { getCheckoutItems } = require("../controllers/checkout");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/checkout", requireSignin, adminMiddleware, getCheckoutItems);

module.exports = router;
