import {
  createPostService,
  getPostService,
} from "../services/posts.service.js";

export const getPostsController = async (req, res) => {
  const result = await getPostService();
  res
    .status(200)
    .json({ success: true, message: "Posts fetched", data: result });
};
export const createPostController = async (req, res) => {
  const userId = req.user._id;
  const { content, images } = req.body;
  const result = await createPostService(userId, content, images);

  res
    .status(201)
    .json({ success: true, message: "Post created", data: result });
};
