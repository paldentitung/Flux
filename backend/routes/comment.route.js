//create route
import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
  addReplyToComment,
  getRepliesByComment,
} from "../controllers/comment.controller.js";
const router = express.Router();
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

router.get("/:postId", protect, asyncHandler(getCommentsByPost));
router.post("/:postId", protect, asyncHandler(addComment));
router.get("/reply/:commentId", protect, asyncHandler(getRepliesByComment));
router.post("/reply/:commentId", protect, asyncHandler(addReplyToComment));
router.delete("/:commentId", protect, asyncHandler(deleteComment));
export default router;
