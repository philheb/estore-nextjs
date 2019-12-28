const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require("../controllers/auth");
const { read, update } = require("../controllers/user");

//Validation

router.get("/private/:userId", requireSignin, authMiddleware, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.get("/user/profile", requireSignin, authMiddleware, read);
router.put("/user/profile", requireSignin, authMiddleware, update);

// router.param("userId", userById);

module.exports = router;
