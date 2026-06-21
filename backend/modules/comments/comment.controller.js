import {
  addCommentService,
  getCommentsByPostService,
  deleteCommentService,
  addReplyToCommentService,
  getRepliesByCommentService,
  likeCommentService,
} from "./comment.service.js";

export const addComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

  const populated = await addCommentService({ postId, userId, text });

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    comment: populated,
  });
};

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  const comments = await getCommentsByPostService(postId);

  res.status(200).json({
    success: true,
    message: "Comment fetch successfully",
    data: comments,
  });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    await deleteCommentService(commentId, req.user.id);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};

export const addReplyToComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  let populatedReply;
  try {
    populatedReply = await addReplyToCommentService({
      commentId,
      userId,
      text,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }

  res.status(201).json({
    success: true,
    message: "Reply added successfully",
    data: populatedReply,
  });
};

export const getRepliesByComment = async (req, res) => {
  const { commentId } = req.params;

  let replies;
  try {
    replies = await getRepliesByCommentService(commentId);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }

  res.status(200).json({
    success: true,
    message: "Replies fetched successfully",
    data: replies,
  });
};

export const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  const result = await likeCommentService(commentId, userId);

  res.status(200).json({
    success: true,
    message: result.liked ? "Comment liked" : "Comment unliked",
    data: result,
  });
};
