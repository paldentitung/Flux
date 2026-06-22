import express from "express";
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  updatePostController,
  likePostController,
} from "./posts.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createPostLimiter,
  deletePostLimiter,
  likeLimiter,
  updatePostLimiter,
} from "../../utils/rateLimiter.js";
const router = express.Router();

router.get("/", protect, asyncHandler(getPostsController));
router.get("/:postId", protect, asyncHandler(getPostByIdController));
router.post(
  "/",
  createPostLimiter,
  protect,
  upload.array("images"),
  asyncHandler(createPostController),
);
router.patch(
  "/:postId",
  updatePostLimiter,
  protect,
  upload.array("images"),
  asyncHandler(updatePostController),
);
router.delete(
  "/:postId",
  deletePostLimiter,
  protect,
  asyncHandler(deletePostController),
);

router.post(
  "/:postId/like",
  likeLimiter,
  protect,
  asyncHandler(likePostController),
);

export default router;
