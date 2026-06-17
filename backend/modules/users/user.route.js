import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  changeAvatarConroller,
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
} from "./user.controller.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

router.get("/me", protect, asyncHandler(getMyProfileController));
router.get("/user/:userId", protect, asyncHandler(getUserProfileConroller));

router.post("/:id/follow", protect, asyncHandler(followUserController));
router.delete("/:id/unfollow", protect, asyncHandler(unfollowUserController));

router.patch(
  "/me/avatar",
  protect,
  upload.single("avatar"),
  asyncHandler(changeAvatarConroller),
);

router.delete("/me/avatar", protect, asyncHandler(removeAvatarConroller));

router.post("/me/profile", protect, asyncHandler(updateProfileController));

router.patch("/me/password", protect, asyncHandler(changePasswordController));

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
export default router;
