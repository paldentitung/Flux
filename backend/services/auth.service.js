import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { sendTokenCookie } from "../utils/sendTokenCookie.js";
import User from "../models/User.js";

export const RegisterService = async ({ username, email, password }) => {
  const hasedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hasedPassword,
  });
  const token = generateToken(user._id);

  const { password: _, ...safeUser } = user.toObject();

  return { user: safeUser, token };
};
