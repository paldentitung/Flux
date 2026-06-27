import { useEffect, useState, type ReactNode } from "react";
import { PostsContext } from "../../../shared/context/createContext";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
  getPostById,
} from "../services/postsService";
import type { Post } from "../types/post.types";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/hooks/useAuth";

type PostProviderProps = { children: ReactNode };

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState({
    create: false,
    delete: false,
    update: false,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const setL = (key: keyof typeof loading, val: boolean) =>
    setLoading((prev) => ({ ...prev, [key]: val }));

  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    getPosts(1, 10)
      .then((res) => {
        setPosts(res.data);
        setHasMore(res.data.length === 10);
      })
      .catch(() => toast.error("Failed to load posts"));
  }, [user]);
  const loadMorePosts = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    console.log("loading page", nextPage);
    try {
      const res = await getPosts(nextPage, 10);
      console.log("got posts", res.data.length);
      setPosts((prev) => [...prev, ...res.data]);
      setHasMore(res.data.length === 10);
      setPage(nextPage);
    } catch {
      toast.error("Failed to load more posts");
    } finally {
      setLoadingMore(false);
    }
  };
  const handleCreatePost = async (formData: FormData) => {
    try {
      setL("create", true);
      const res = await createPost(formData);
      if (res?.data) {
        const postWithUser = {
          ...res.data,
          userId: {
            _id: user!._id,
            name: user!.name,
            username: user!.username,
            avatar: user!.avatar,
          },
        };
        setPosts((prev) => [postWithUser, ...prev]);
      }
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

  const handleLikePost = async (postId: string) => {
    try {
      const res = await likePost(postId);

      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, likes: res.likes } : p)),
      );
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  const fetchedPostById = async (postId: string): Promise<Post> => {
    try {
      const res = await getPostById(postId);

      if (!res.success) {
        throw new Error("Failed to fetch post");
      }
      return res.data;
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      throw error;
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
        handleLikePost,
        setPosts,
        fetchedPostById,
        loadingMore,
        hasMore,
        loadMorePosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
