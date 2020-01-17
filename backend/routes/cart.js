const express = require("express");
const router = express.Router();

const { authMiddleware, requireSignin } = require("../controllers/auth");
const { add, update, remove } = require("../controllers/cart");

router.post("/cart/add", requireSignin, authMiddleware, add);
router.post("/cart/update", requireSignin, authMiddleware, update);
router.delete("/cart/delete", requireSignin, authMiddleware, remove);

module.exports = router;
