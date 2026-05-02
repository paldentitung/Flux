import express from "express";
import {
  forgotPasswordController,
  getMe,
  loginController,
  logout,
  registerController,
  resetPasswordController,
  verifyOtpController,
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
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  asyncHandler(registerController),
);

router.post(
  "/verify-otp",
  verifyOtpValidator,
  validate,
  asyncHandler(verifyOtpController),
);

router.post("/login", loginValidator, validate, asyncHandler(loginController));

router.get("/get-me", protect, asyncHandler(getMe));

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  asyncHandler(forgotPasswordController),
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  asyncHandler(resetPasswordController),
);

router.post(
  "/resend-otp",
  resendOtpValidator,
  validate,
  asyncHandler(resentOTPController),
);
router.post("/logout", protect, asyncHandler(logout));
export default router;
