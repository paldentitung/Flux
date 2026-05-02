import { useEffect, useState, type ReactNode } from "react";
import { PostsContext } from "./createContext";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../services/postsService";
import type { Post } from "../types/post.types";
import toast from "react-hot-toast";

type PostProviderProps = {
  children: ReactNode;
};
export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPosts().then((result) => setPosts(result.data));
  }, []);

  const handleCreatePost = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await createPost(formData);
      if (res?.data) setPosts((prev) => [res.data, ...prev]);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      setLoading(true);
      const res = await deletePost(postId);
      if (res?.data) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
        toast.success(res.message || "Post delete");
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (postId: string, formData: FormData) => {
    try {
      setLoading(true);

      const res = await updatePost(postId, formData);

      const updatedPost = res?.data;

      if (updatedPost) {
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? updatedPost : p)),
        );

        toast.success(res?.data?.message || "Post updated");
      }

      return updatedPost;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        handleCreatePost,
        handleDeletePost,
        handleUpdatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
