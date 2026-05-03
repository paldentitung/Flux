//create route
import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/comment.controller.js";
const router = express.Router();
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

router.get("/:postId", protect, asyncHandler(getCommentsByPost));
router.post("/", protect, asyncHandler(addComment));
router.delete("/:commentId", protect, asyncHandler(deleteComment));
export default router;
