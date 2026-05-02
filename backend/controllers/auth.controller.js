import {
  forgotPasswordService,
  loginService,
  registerService,
  verifyOtpService,
  resetPasswordService,
  resendOTPService,
} from "../services/auth.service.js";
import { sendTokenCookie } from "../utils/sendTokenCookie.js";
import { generateToken } from "../utils/generateToken.js";
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  const { user } = await registerService({ username, email, password });

  res.status(201).json({
    success: true,
    message: "OTP sent to email",
    data: user,
  });
};
export const verifyOtpController = async (req, res) => {
  const { email, otp, isReset } = req.body;

  const user = await verifyOtpService({ email, otp, isReset });

  const token = generateToken(user._id);

  sendTokenCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Account verified",
    data: user,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginService({ email, password });

  sendTokenCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "Logged out" });
};
export const getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  await forgotPasswordService({ email });
  res.status(200).json({
    success: true,
    message: "Reset OTP sent to email",
  });
};
export const resetPasswordController = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  await resetPasswordService({ email, otp, newPassword });

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};
export const resentOTPController = async (req, res) => {
  const { email } = req.body;
  await resendOTPService({ email });
  res.status(200).json({
    success: true,
    message: "OTP resend successful",
  });
};
