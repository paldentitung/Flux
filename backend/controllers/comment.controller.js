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

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    message: "Comment fetch successfully",
    comments,
  });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const deleted = await Comment.findByIdAndDelete(commentId);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  if (comment.userId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Not allowed",
    });
  }

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};
