import express from "express";
import {
  RegisterController,
  verifyOtpcontroller,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/verify-otp", verifyOtpcontroller);
export default router;
