import Story from "./story.modal.js";
import User from "../users/user.model.js";
import AppError from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

// ─── Create ─────────────────────────────────────────────────────────────────

export const createStoryService = async (userId, content, files) => {
  if (!files || files.length === 0) {
    throw new AppError(
      "At least one image is required to create a story.",
      400,
    );
  }

  const images = [];
  for (const file of files) {
    const uploaded = await uploadToCloudinary(file.buffer, "stories");

    images.push({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  }
  const story = await Story.create({
    userId,
    content,
    images,
  });

  return story;
};

// ─── Visibility check ───────────────────────────────────────────────────────

export const canViewStory = async (viewerId, storyOwnerId) => {
  if (viewerId.toString() === storyOwnerId.toString()) return true;

  const viewer = await User.findById(viewerId).select("following");
  if (!viewer) return false;

  return viewer.following.some(
    (id) => id.toString() === storyOwnerId.toString(),
  );
};

// ─── Feed (stories from users you follow, grouped by user) ─────────────────

export const getStoryFeedService = async (userId) => {
  const currentUser = await User.findById(userId).select("following");
  if (!currentUser) throw new AppError("User not found.", 404);

  const followingIds = currentUser.following.map((id) => id.toString());
  const allIds = [...followingIds, userId.toString()]; // ← add self

  const stories = await Story.find({ userId: { $in: allIds } })
    .sort({ createdAt: -1 })
    .populate("userId", "username avatar")
    .lean();

  // Group by userId so the frontend tray gets one entry per user
  const grouped = stories.reduce((acc, story) => {
    const ownerId = story.userId._id.toString();
    if (!acc[ownerId]) {
      acc[ownerId] = {
        user: {
          _id: story.userId._id,
          username: story.userId.username,
          avatar: story.userId.avatar?.url ?? null, // flatten { url, publicId } → string
        },
        stories: [],
      };
    }
    acc[ownerId].stories.push(story);
    return acc;
  }, {});

  return Object.values(grouped);
};

// ─── Get a specific user's stories (profile/search access) ─────────────────

export const getUserStoriesService = async (viewerId, targetUserId) => {
  const allowed = await canViewStory(viewerId, targetUserId);
  if (!allowed) {
    throw new AppError("You do not have permission to view this story.", 403);
  }

  const stories = await Story.find({ userId: targetUserId })
    .sort({ createdAt: 1 })
    .populate("userId", "username avatar");

  return stories;
};

// ─── Mark as viewed ──────────────────────────────────────────────────────────

export const markStoryViewedService = async (storyId, viewerId) => {
  const story = await Story.findById(storyId);
  if (!story) throw new AppError("Story not found.", 404);

  const allowed = await canViewStory(viewerId, story.userId);
  if (!allowed) {
    throw new AppError("You do not have permission to view this story.", 403);
  }

  await Story.updateOne({ _id: storyId }, { $addToSet: { viewers: viewerId } });

  return { success: true };
};

// ─── Get viewers (owner-only) ────────────────────────────────────────────────

export const getStoryViewersService = async (storyId, requesterId) => {
  const story = await Story.findById(storyId).populate(
    "viewers",
    "username avatar",
  );
  if (!story) throw new AppError("Story not found.", 404);

  if (story.userId.toString() !== requesterId.toString()) {
    throw new AppError("Only the story owner can view this list.", 403);
  }

  return story.viewers;
};

// ─── Delete ──────────────────────────────────────────────────────────────────

export const deleteStoryService = async (storyId, requesterId) => {
  const story = await Story.findById(storyId);
  if (!story) throw new AppError("Story not found.", 404);

  if (story.userId.toString() !== requesterId.toString()) {
    throw new AppError("You can only delete your own story.", 403);
  }

  await Story.deleteOne({ _id: storyId });
  return { success: true };
};
