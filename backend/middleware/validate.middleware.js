import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // console.log("BODY:", req.body);
  // console.log("ERRORS:", errors.array());
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return next(new AppError(message, 400));
  }

  next();
};
