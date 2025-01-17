const express = require("express");
const router = express.Router();
const {
  register,
  signup,
  signin,
  signout,
  googleLogin,
  forgotPassword,
  resetPassword,
  changePassword,
  authMiddleware,
  requireSignin
} = require("../controllers/auth");

//Validation
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../validators/auth");

router.get("/hello", requireSignin, (req, res) => {
  res.send("hello there!");
});

router.post("/register", userSignupValidator, runValidation, register);
router.post("/signup", signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);
router.put("/change-password", requireSignin, authMiddleware, changePassword);

//Google
router.post("/google-login", googleLogin);

module.exports = router;
