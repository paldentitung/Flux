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

const router = express.Router();

router.post("/register", RegisterController);
router.post("/verify-otp", verifyOtpcontroller);
router.post("/login", loginController);
router.post("/logout", logout);
router.get("/get-me", protect, getMe);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/resent-otp", resentOTPController);
export default router;
