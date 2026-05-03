import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user.id;

  const comment = new Comment({
    postId,
    userId,
    text,
  });

  await comment.save();

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    comment,
  });
};

//create get comment by post
export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    message: "Comment fetch successfully",
    comments,
  });
};
