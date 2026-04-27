import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { sendTokenCookie } from "../utils/sendTokenCookie.js";
import User from "../models/User.js";
import { generateOtp } from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";
import AppError from "../utils/AppError.js";

export const RegisterService = async ({ username, email, password }) => {
  const hasedPassword = await bcrypt.hash(password, 10);

  const otp = generateOtp(0);

  const user = await User.create({
    username,
    email,
    password: hasedPassword,
    otp,
    otpExpiry: Date.now() + 10 * 60 * 1000, // 10 min
  });
  const token = generateToken(user._id);

  await sendEmail({
    to: email,
    subject: "Verify Your Account",
    html: `<h1>Your OTP is
    <br> <strong>${otp}</strong></h1>`,
  });

  const { password: _, ...safeUser } = user.toObject();

  return { user: safeUser, token };
};

export const verifyOtpService = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.otp !== String(otp)) throw new AppError("Invalid OTP", 400);

  if (user.otpExpiry < Date.now()) {
    throw new AppError("Otp expired", 400);
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();
  return user;
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Wrong password", 400);
  }

  const token = generateToken(user._id);
  const { password: _, ...safeUser } = user.toObject();

  return { user: safeUser, token };
};
