import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  changeAvatarConroller,
  followUserController,
  unfollowUserController,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();
router.post("/:id/follow", protect, asyncHandler(followUserController));
router.delete("/:id/unfollow", protect, asyncHandler(unfollowUserController));

router.post(
  "/me/avatar",
  protect,
  upload.single("avatar"),
  changeAvatarConroller,
);
export default router;
