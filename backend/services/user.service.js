import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";
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
