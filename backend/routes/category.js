const express = require("express");
const router = express.Router();
const { create, read, list, remove } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

//Validation
// const { runValidation } = require("../validators");
// const {

// } = require("../validators/auth");

router.post("/category/create", requireSignin, adminMiddleware, create);
router.get("/category/:slug", read);
router.get("/categories", list);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
