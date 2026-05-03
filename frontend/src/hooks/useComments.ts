import { useEffect, useState } from "react";
import { getCommentByPost } from "../services/commentService";

export const useComments = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    console.log("Comments updated:", comments);
  }, [comments]);
  return {
    comments,
    loading,
    fetchComments,
  };
};
