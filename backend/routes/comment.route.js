//create route
import express from "express";
import { addComment } from "../controllers/comment.controller.js";
const router = express.Router();
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

router.post("/", protect, asyncHandler(addComment));
export default router;
