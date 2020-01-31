const express = require("express");
const router = express.Router();
const { rate } = require("../controllers/rating");
const { requireSignin, authMiddleware } = require("../controllers/auth");

router.post("/rating", requireSignin, authMiddleware, rate);

module.exports = router;
