const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateMyProfile,
  updatePassword,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const { upload } = require("../config/cloudinary");

// Validators import karo
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

// Routes mein use karo
router.post("/register", registerValidator, register); // <-- Use here
router.post("/login", loginValidator, login); // <-- Use here

router.get("/me", protect, getMe);
router.put(
  "/update-profile",
  protect,
  upload.single("profilePicture"),
  updateMyProfile,
);
router.put("/change-password", protect, updatePassword);

module.exports = router;
