import express from "express";
import {
  loginController,
  RegisterController,
  verifyOtpcontroller,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/verify-otp", verifyOtpcontroller);
router.post("/login", loginController);
export default router;
