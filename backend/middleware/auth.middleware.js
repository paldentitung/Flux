import User from "../modules/users/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Origin:", req.headers.origin);
  console.log("Cookie header:", req.headers.cookie);
  console.log("Parsed cookies:", req.cookies);

  if (!token) return next(new AppError("Not authorized", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("followers", "_id username name avatar")
      .populate("following", "_id username name avatar");

    if (!user) return next(new AppError("User no longer exists", 401));

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};
