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
const router = express.Router();

router.get("/", protect, asyncHandler(getPostsController));
router.get("/:postId", protect, asyncHandler(getPostByIdController));
router.post(
  "/",
  protect,
  upload.array("images"),
  asyncHandler(createPostController),
);
router.patch(
  "/:postId",
  protect,
  upload.array("images"),
  asyncHandler(updatePostController),
);
router.delete("/:postId", protect, asyncHandler(deletePostController));

router.post("/:postId/like", protect, asyncHandler(likePostController));

export default router;
