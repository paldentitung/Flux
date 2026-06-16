import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { userMapper } from "../utils/userMapper.js";

export const getMyProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export const getUserProfileService = async (userId, viewerId) => {
  const user = await User.findById(userId)
    .select("-password -email")
    .populate("followers", "_id username name avatar")
    .populate("following", "_id username name avatar");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.blockedUsers.includes(viewerId)) {
    throw new AppError("You are blocked by this user", 403);
  }

  const userObj = user.toObject();
  delete userObj.blockedUsers;

  return userObj;
};
export const followUserService = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw new AppError("You cannot follow yourself", 400);
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(currentUserId),
    User.findById(targetUserId),
  ]);

  if (!currentUser || !targetUser) {
    throw new AppError("User not found", 404);
  }

  // block check
  if (
    currentUser.blockedUsers.includes(targetUserId) ||
    targetUser.blockedUsers.includes(currentUserId)
  ) {
    throw new AppError("Cannot follow this user", 400);
  }

  //check if already following
  if (currentUser.following.includes(targetUserId)) {
    throw new AppError("Already following", 400);
  }

  await Promise.all([
    User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetUserId },
    }),
    User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: currentUserId },
    }),
  ]);

  return { success: true };
};

export const unfollowUserService = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw new Error("You cannot unfollow yourself");
  }

  const currentUser = await User.findById(currentUserId);

  if (!currentUser) {
    throw new Error("User not found");
  }

  if (!currentUser.following.includes(targetUserId)) {
    throw new Error("You are not following this user");
  }

  await Promise.all([
    User.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    }),
    User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUserId },
    }),
  ]);

  return { success: true };
};

export const changeAvatarService = async (userId, avatarURL) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = User.findByIdAndUpdate(
    userId,
    { avatar: avatarURL },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedUser;
};

export const removeAvatarService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.avatar) {
    return user;
  }

  const filePath = path.join(process.cwd(), user.avatar);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Failed to delete avatar file:", err.message);
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: null },
    { new: true },
  );

  return updatedUser;
};

export const updateProfileService = async (userId, formData) => {
  const allowedFields = ["name", "bio"];

  const updates = {};
  for (const field of allowedFields) {
    if (formData[field] !== undefined) {
      updates[field] = formData[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError("No valid fields to update", 400);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .populate("followers", "_id username name avatar")
    .populate("following", "_id username name avatar");

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return updatedUser;
};

export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new AppError("Invalid old password", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return userMapper(user);
};

export const blockUserService = async (userId, targetUserId) => {
  if (userId === targetUserId) {
    throw new AppError("You cannot block yourself", 400);
  }

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!targetUser) {
    throw new AppError("User not found", 404);
  }

  // Already blocked
  if (user.blockedUsers.includes(targetUserId)) {
    throw new AppError("User already blocked", 400);
  }

  // Add to blocked list
  user.blockedUsers.push(targetUserId);

  // Remove follow relationship
  user.following = user.following.filter(
    (id) => id.toString() !== targetUserId,
  );

  user.followers = user.followers.filter(
    (id) => id.toString() !== targetUserId,
  );

  targetUser.following = targetUser.following.filter(
    (id) => id.toString() !== userId,
  );

  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== userId,
  );

  await user.save();
  await targetUser.save();

  return userMapper(targetUser);
};

export const unblockUserService = async (userId, targetUserId) => {
  await User.updateOne(
    { _id: userId },
    {
      $pull: { blockedUsers: targetUserId },
    },
  );

  return true;
};
