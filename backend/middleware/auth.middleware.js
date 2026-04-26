import User from "../models/User";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Not authorized", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new AppError("User no longer exists", 401);

    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};
