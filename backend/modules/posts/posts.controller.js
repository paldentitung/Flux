import Post from "./post.model.js";
import {
  createPostService,
  deletePostService,
  getPostByIdService,
  getPostService,
  likePostService,
  updatePostService,
} from "./posts.service.js";
import AppError from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
export const getPostsController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await getPostService(page, limit);

  res
    .status(200)
    .json({ success: true, message: "Posts fetched", data: result });
};

export const getPostByIdController = async (req, res) => {
  const result = await getPostByIdService(req.params.postId);
  res
    .status(200)
    .json({ success: true, message: "Post fetched", data: result });
};
export const createPostController = async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;

  const images = [];

  if (req.files?.length) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, "flux/posts");

      images.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }
  }

  const post = await createPostService(userId, content, images);

  res.status(201).json({
    success: true,
    message: "Post created",
    data: post,
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

  const result = await updatePostService(postId, userId, updates);

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

  const { post, alreadyLiked } = await likePostService(userId, postId);

  res.status(200).json({
    success: true,
    message: alreadyLiked ? "Post Unliked" : "Post Liked",
    likes: post.likes,
    likesCount: post.likes.length,
  });
};
