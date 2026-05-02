import express from "express";
import {
  createPostController,
  deletePostController,
  getPostsController,
  updatePostController,
} from "../controllers/posts.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();

router.get("/", protect, asyncHandler(getPostsController));
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
export default router;
