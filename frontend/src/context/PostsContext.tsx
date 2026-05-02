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
import { useAuth } from "../hooks/useAuth";

type PostProviderProps = { children: ReactNode };

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState({
    create: false,
    delete: false,
    update: false,
  });

  const setL = (key: keyof typeof loading, val: boolean) =>
    setLoading((prev) => ({ ...prev, [key]: val }));

  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    getPosts()
      .then((res) => setPosts(res.data))
      .catch(() => toast.error("Failed to load posts"));
  }, [user]);

  const handleCreatePost = async (formData: FormData) => {
    try {
      setL("create", true);
      const res = await createPost(formData);
      if (res?.data) setPosts((prev) => [res.data, ...prev]);
      return res;
    } finally {
      setL("create", false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      setL("delete", true);
      const res = await deletePost(postId);
      if (res?.data) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
        toast.success(res.message || "Post deleted");
      }
      return res;
    } finally {
      setL("delete", false);
    }
  };

  const handleUpdatePost = async (postId: string, formData: FormData) => {
    try {
      setL("update", true);
      const res = await updatePost(postId, formData);
      if (res?.data) {
        setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
        toast.success(res.message || "Post updated");
      }
      return res?.data;
    } finally {
      setL("update", false);
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
