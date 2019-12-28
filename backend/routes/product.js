const express = require("express");
const router = express.Router();
const {
  create,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listSearch
} = require("../controllers/product");
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
  canUpdateAndDeleteProduct
} = require("../controllers/auth");

const { runValidation } = require("../validators");
const { productValidator } = require("../validators/product");

router.post(
  "/product/create",
  productValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);

router.get("/product/:slug", read);

router.delete(
  "/product/:slug",
  requireSignin,
  authMiddleware,
  canUpdateAndDeleteProduct,
  remove
);

router.put(
  "/product/:slug",
  requireSignin,
  authMiddleware,
  canUpdateAndDeleteProduct,
  update
);

router.get("/products", list);
router.post("/products/related", listRelated);
router.get("/products/categories", listCategories);

router.post("/products/search", listSearch);

module.exports = router;
