import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user.id;

  const comment = await Comment.create({ postId, userId, text });

  const populated = await comment.populate(
    "userId",
    "_id name username avatar",
  ); // ✅

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    comment: populated,
  });
};

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId })
    .populate("userId", "_id name username avatar")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Comment fetch successfully",
    data: comments,
  });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
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

  // If this comment is a reply, remove its reference from parent comment.
  await Comment.updateOne(
    { replies: comment._id },
    { $pull: { replies: comment._id } },
  );
  await Comment.findByIdAndDelete(commentId);

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};

export const addReplyToComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    return res.status(404).json({
      success: false,
      message: "Parent comment not found",
    });
  }

  const reply = await Comment.create({
    postId: parentComment.postId,
    userId,
    text,
  });

  parentComment.replies.push(reply._id);
  await parentComment.save();

  const populatedReply = await reply.populate(
    "userId",
    "_id name username avatar",
  );

  res.status(201).json({
    success: true,
    message: "Reply added successfully",
    data: populatedReply,
  });
};

export const getRepliesByComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId).populate({
    path: "replies",
    options: { sort: { createdAt: -1 } },
    populate: { path: "userId", select: "_id name username avatar" },
  });

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Replies fetched successfully",
    data: comment.replies,
  });
};
