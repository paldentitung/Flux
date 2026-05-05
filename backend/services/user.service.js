import AppError from "../utils/AppError.js";
import User from "../models/User.js";

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
