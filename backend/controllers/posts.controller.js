import Post from "../models/Post.js";
import {
  createPostService,
  deletePostService,
  getPostService,
  updatePostService,
} from "../services/posts.service.js";
import AppError from "../utils/AppError.js";

export const getPostsController = async (req, res) => {
  const result = await getPostService();
  res
    .status(200)
    .json({ success: true, message: "Posts fetched", data: result });
};
export const createPostController = async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;

  const images =
    req.files?.map(
      (file) => `http://localhost:3000/uploads/${file.filename}`,
    ) || [];

  const result = await createPostService(userId, content, images);

  res.status(201).json({
    success: true,
    message: "Post created",
    data: result,
  });
};

export const updatePostController = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const updates = {
    ...req.body,
  };

  let existingImages = [];

  if (req.body.existingImages) {
    existingImages = JSON.parse(req.body.existingImages);
  }

  let newImages = [];
  if (req.files?.length) {
    newImages = req.files.map(
      (file) => `http://localhost:3000/uploads/${file.filename}`,
    );
  }

  if (req.files || req.body.existingImages) {
    updates.images = [...existingImages, ...newImages];
  }

  const result = await updatePostService(userId, postId, updates);

  res.status(200).json({
    success: true,
    message: "Post updated",
    data: result,
  });
};

export const deletePostController = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const result = await deletePostService(userId, postId);

  res.status(200).json({
    success: true,
    message: "Post deleted",
    data: result,
  });
};
export const likePostController = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    post.likes.pull(userId);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Unliked",
      likes: post.likes,
      likesCount: post.likes.length,
    });
  }

  post.likes.push(userId);
  await post.save();

  res.status(200).json({
    success: true,
    message: alreadyLiked ? "Post Unliked" : "Post Liked",
    likes: post.likes,
    likesCount: post.likes.length,
  });
};
