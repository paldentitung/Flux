import { useEffect, useState, useCallback } from "react";
import {
  getCommentByPost,
  getReplyComment,
  addReplyComment,
  addComment,
  likeComment,
} from "../services/commentService";
import { usePosts } from "../features/posts/hooks/usePosts";
import toast from "react-hot-toast";

export const useComments = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>(
    {},
  );
  const { setPosts } = usePosts();

  const fetchComments = useCallback(async (postId: string) => {
    try {
      setLoading(true);
      const res = await getCommentByPost(postId);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddComment = async (postId: string, text: string) => {
    try {
      setLoading(true);
      await addComment(postId, text);
      await fetchComments(postId);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                commentsCount: post.commentsCount + 1,
              }
            : post,
        ),
      );
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

  const handleLikeComment = async (commentId: string) => {
    try {
      const res = await likeComment(commentId);

      if (res.success) {
        toast.success(res.message);
      }
      return { liked: res.data.liked, likesCount: res.data.likesCount };
    } catch (error) {
      console.error("Failed to add reply comment", error);
      throw error;
    }
  };

  return {
    comments,
    loading,
    loadingReplies,
    fetchComments,
    fetchReplyComments,
    handleAddComment,
    handleAddReplyComment,
    handleLikeComment,
  };
};
