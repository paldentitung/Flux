import express from "express";
import {
  forgotPasswordController,
  getMe,
  loginController,
  logout,
  RegisterController,
  resetPasswordController,
  verifyOtpcontroller,
  resentOTPController,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resendOtpValidator,
  resetPasswordValidator,
  verifyOtpValidator,
} from "../validators/authValidator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, RegisterController);
router.post("/verify-otp", verifyOtpValidator, validate, verifyOtpcontroller);
router.post("/login", loginValidator, validate, loginController);
router.post("/logout", logout);
router.get("/get-me", protect, getMe);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPasswordController,
);
router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  resetPasswordController,
);
router.post("/resend-otp", resendOtpValidator, validate, resentOTPController);
export default router;
