import express from "express";
import {
  getMe,
  loginController,
  logout,
  RegisterController,
  verifyOtpcontroller,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/verify-otp", verifyOtpcontroller);
router.post("/login", loginController);
router.post("/logout", logout);
router.get("/get-me", protect, getMe);
export default router;
