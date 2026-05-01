import Post from "../models/Post.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const getPostService = async () => {
  const posts = await Post.find()
    .populate("userId", "-password")
    .sort({ createdAt: -1 });
  return posts;
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

export const updatePostService = async (postId, updates) => {
  const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    throw new AppError("Post not found", 404);
  }

  return updatedPost;
};

export const deletePostService = async (postId) => {
  const deletedPost = await Post.findByIdAndDelete(postId);

  if (!deletedPost) {
    throw new AppError("Post not found", 404);
  }

  return deletedPost;
};
