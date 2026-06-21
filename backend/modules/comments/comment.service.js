import Comment from "./comment.model.js";
import Post from "../posts/post.model.js";

export const addCommentService = async ({ postId, userId, text }) => {
  const comment = await Comment.create({ postId, userId, text });

  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 },
  });

  const populated = await comment.populate(
    "userId",
    "_id name username avatar",
  ); // ✅

  return populated;
};

export const getCommentsByPostService = async (postId) => {
  const comments = await Comment.find({
    postId,
    _id: { $nin: await Comment.distinct("replies") },
  })
    .populate("userId", "_id name username avatar")
    .populate({
      path: "replies",
      populate: { path: "userId", select: "_id name username avatar" },
    })
    .sort({ createdAt: -1 });

  return comments;
};

export const deleteCommentService = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  if (comment.userId.toString() !== userId) {
    const error = new Error("Not allowed");
    error.statusCode = 403;
    throw error;
  }

  // If this comment is a reply, remove its reference from parent comment.
  await Comment.updateOne(
    { replies: comment._id },
    { $pull: { replies: comment._id } },
  );
  await Comment.findByIdAndDelete(commentId);
};

export const addReplyToCommentService = async ({ commentId, userId, text }) => {
  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    const error = new Error("Parent comment not found");
    error.statusCode = 404;
    throw error;
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

  return populatedReply;
};

export const getRepliesByCommentService = async (commentId) => {
  const comment = await Comment.findById(commentId).populate({
    path: "replies",
    options: { sort: { createdAt: -1 } },
    populate: { path: "userId", select: "_id name username avatar" },
  });

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  return comment.replies;
};
