const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require("../controllers/auth");
const { read, update, history } = require("../controllers/user");

router.get("/user", requireSignin, authMiddleware, read);
router.put("/user", requireSignin, authMiddleware, update);

router.get("/user/history", requireSignin, authMiddleware, history);

module.exports = router;
