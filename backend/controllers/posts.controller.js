import {
  createPostService,
  deletePostService,
  getPostService,
  updatePostService,
} from "../services/posts.service.js";

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
