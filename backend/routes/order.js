const express = require("express");
const router = express.Router();

const { authMiddleware, requireSignin } = require("../controllers/auth");
const { create } = require("../controllers/order");

router.post("/order/create", requireSignin, authMiddleware, create);

module.exports = router;
