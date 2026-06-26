import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  changeAvatarController,
  followUserController,
  unfollowUserController,
  removeAvatarConroller,
  updateProfileController,
  getMyProfileController,
  getUserProfileConroller,
  changePasswordController,
  blockUserController,
  unblockUserController,
  togglePrivacyController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  cancelFollowRequestController,
  getBlocksUsersController,
  getSuggestedUsers,
  updateNotificationPreferences,
} from "./user.controller.js";
import { upload } from "../../middleware/upload.middleware.js";
import {
  changeAvatarLimiter,
  changePasswordLimiter,
  followLimiter,
  updateProfileLimiter,
} from "../../utils/rateLimiter.js";

const router = express.Router();

router.get("/me", protect, asyncHandler(getMyProfileController));
router.get("/user/:userId", protect, asyncHandler(getUserProfileConroller));

router.post("/:id/follow", protect, asyncHandler(followUserController));
router.delete("/:id/unfollow", protect, asyncHandler(unfollowUserController));

router.patch(
  "/me/avatar",
  changeAvatarLimiter,
  protect,
  upload.single("avatar"),
  asyncHandler(changeAvatarController),
);

router.delete("/me/avatar", protect, asyncHandler(removeAvatarConroller));

router.post(
  "/me/profile",
  updateProfileLimiter,
  protect,
  asyncHandler(updateProfileController),
);

router.patch(
  "/me/password",
  changePasswordLimiter,
  protect,
  asyncHandler(changePasswordController),
);

router.post("/:id/block", protect, asyncHandler(blockUserController));
router.post("/:id/unblock", protect, asyncHandler(unblockUserController));

router.patch("/me/privacy", protect, asyncHandler(togglePrivacyController));

router.post(
  "/follow-requests/:id/accept",
  protect,
  asyncHandler(acceptFollowRequestController),
);
router.post(
  "/follow-requests/:id/reject",
  protect,
  asyncHandler(rejectFollowRequestController),
);
router.delete(
  "/follow-requests/:id",
  protect,
  asyncHandler(cancelFollowRequestController),
);

router.get("/me/blocked", protect, asyncHandler(getBlocksUsersController));
router.get("/suggestions", protect, asyncHandler(getSuggestedUsers));

router.patch(
  "/me/notification-preferences",
  protect,
  updateNotificationPreferences,
);
export default router;
