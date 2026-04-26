import { RegisterService } from "../services/auth.service.js";
import { sendTokenCookie } from "../utils/sendTokenCookie.js";

export const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await RegisterService({
      username,
      email,
      password,
    });
    sendTokenCookie(res, token);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
