const express = require("express");
const router = express.Router();

const { authMiddleware, requireSignin } = require("../controllers/auth");
const { generateToken, processPayment } = require("../controllers/payment");

router.get("/payment/token", requireSignin, authMiddleware, generateToken);
router.post("/payment/process", requireSignin, authMiddleware, processPayment);

module.exports = router;
