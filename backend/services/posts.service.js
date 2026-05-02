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

export const updatePostService = async (postId, userId, updates) => {
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId, userId },
    updates,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

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
