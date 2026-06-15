import { updatePostService } from "../services/posts.service.js";
import {
  followUserService,
  unfollowUserService,
  changeAvatarService,
  removeAvatarService,
  updateProfileService,
  getMyProfileService,
  getUserProfileService,
} from "../services/user.service.js";

export const getMyProfileController = async (req, res) => {
  const result = await getMyProfileService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Profile fetched",
    data: result,
  });
};

export const getUserProfileConroller = async (req, res) => {
  const { userId } = req.params;
  const result = await getUserProfileService(userId);

  res.status(200).json({
    success: true,
    message: "Profile fetched",
    data: result,
  });
};

export const followUserController = async (req, res, next) => {
  const currentUserId = req.user.id;
  const targetUserId = req.params.id;

  const result = await followUserService(currentUserId, targetUserId);
  res.status(200).json({
    success: true,
    message: "User followed successfully",
    data: result,
  });
};

export const unfollowUserController = async (req, res) => {
  const currentUserId = req.user.id;
  const targetUserId = req.params.id;

  const result = await unfollowUserService(currentUserId, targetUserId);
  res.status(200).json({
    success: true,
    message: "User unfollowed successfully",
    data: result,
  });
};

export const changeAvatarConroller = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const avatarUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  const result = await changeAvatarService(req.user._id, avatarUrl);

  res.status(200).json({
    success: true,
    message: "Avatar changed",
    data: result,
  });
};

export const removeAvatarConroller = async (req, res) => {
  const result = await removeAvatarService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Avatar remove",
    data: result,
  });
};

export const updateProfileController = async (req, res) => {
  const result = await updateProfileService(req.user._id, req.body);
  res.status(200).json({
    success: true,
    message: "Profile updated",
    data: result,
  });
};
