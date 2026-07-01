import express from "express";
import {
  createStoryController,
  getStoryFeedController,
  getUserStoriesController,
  markStoryViewedController,
  getStoryViewersController,
  deleteStoryController,
} from "./story.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createStoryLimiter,
  viewStoryLimiter,
  deletePostLimiter,
} from "../../utils/rateLimiter.js";

const router = express.Router();

router.get("/feed", protect, asyncHandler(getStoryFeedController));
router.get("/user/:userId", protect, asyncHandler(getUserStoriesController));
router.get(
  "/:storyId/viewers",
  protect,
  asyncHandler(getStoryViewersController),
);

router.post(
  "/",
  createStoryLimiter,
  protect,
  upload.array("images"),
  asyncHandler(createStoryController),
);
router.post(
  "/:storyId/view",
  viewStoryLimiter,
  protect,
  asyncHandler(markStoryViewedController),
);

router.delete(
  "/:storyId",
  deletePostLimiter,
  protect,
  asyncHandler(deleteStoryController),
);

export default router;
