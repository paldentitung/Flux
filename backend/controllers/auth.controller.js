import { RegisterService, verifyOtpService } from "../services/auth.service.js";
import { sendTokenCookie } from "../utils/sendTokenCookie.js";

export const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await RegisterService({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "OTP sent to email",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const verifyOtpcontroller = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const { user, token } = await verifyOtpService({ email, otp });

    sendTokenCookie(res, token);
    res.status(200).json({
      success: true,
      message: "Account verified",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
