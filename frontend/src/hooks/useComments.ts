import { useEffect, useState } from "react";
import {
  getCommentByPost,
  getReplyComment,
  addReplyComment,
  addComment,
} from "../services/commentService";

export const useComments = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>(
    {},
  );

  const fetchComments = async (postId: string) => {
    try {
      setLoading(true);
      const res = await getCommentByPost(postId);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (postId: string, text: string) => {
    try {
      setLoading(true);
      await addComment(postId, text);
      await fetchComments(postId);
    } catch (error) {
      console.error("Failed to add comment", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplyComments = async (commentId: string) => {
    try {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
      const res = await getReplyComment(commentId);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: res.data }
            : comment,
        ),
      );
    } catch (error) {
      console.error("Failed to fetch reply comments", error);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleAddReplyComment = async (commentId: string, text: string) => {
    try {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
      await addReplyComment(commentId, text);
      await fetchReplyComments(commentId);
    } catch (error) {
      console.error("Failed to add reply comment", error);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  useEffect(() => {
    console.log("Comments updated:", comments);
  }, [comments]);

  return {
    comments,
    loading,
    loadingReplies,
    fetchComments,
    fetchReplyComments,
    handleAddComment,
    handleAddReplyComment,
  };
};
