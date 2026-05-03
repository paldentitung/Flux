import Comment from "../models/Comment.js";

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
