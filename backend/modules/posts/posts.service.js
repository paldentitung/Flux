import Post from "./post.model.js";
import User from "../users/user.model.js";
import AppError from "../../utils/AppError.js";
import { createNotification } from "../notifications/notifications.service.js";

export const getPostService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .populate("userId", "-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return posts;
};

export const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId)
    .populate("userId", "-password")
    .sort({ createdAt: -1 });
  return post;
};
export const createPostService = async (userId, content, images = []) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("user not found", 404);
  }
  const newPost = await Post.create({
    userId,
    content,
    images,
    likes: [],
  });
  return newPost;
};

export const updatePostService = async (postId, userId, updates) => {
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId, userId },
    updates,
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).populate("userId", "_id username name avatar");

  if (!updatedPost) {
    throw new AppError("Post not found or unauthorized", 404);
  }

  return updatedPost;
};

export const deletePostService = async (userId, postId) => {
  const deletedPost = await Post.findOneAndDelete({
    _id: postId,
    userId,
  });

  if (!deletedPost) {
    throw new AppError("Post not found or unauthorized", 404);
  }

  return deletedPost;
};

export const likePostService = async (userId, postId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const alreadyLiked = post.likes.some((id) => id.equals(userId));

  if (alreadyLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
    await createNotification({
      recipient: post.userId,
      sender: userId,
      type: "like",
      postId,
    });
  }

  await post.save();

  return {
    post,
    alreadyLiked,
  };
};
