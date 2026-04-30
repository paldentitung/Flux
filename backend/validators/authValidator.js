import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("min 3 characters"),

  body("email").isEmail().withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const verifyOtpValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numbers only"),
];

export const forgotPasswordValidator = [
  body("email").isEmail().withMessage("Invalid email"),
];

export const resetPasswordValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numbers only"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];
export const resendOtpValidator = [
  body("email").isEmail().withMessage("Invalid email"),
];
