import { useEffect, useState, type ReactNode } from "react";
import { PostsContext } from "./createContext";
import { getPosts, createPost } from "../services/postsService";
import type { Post } from "../types/post.types";

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

  return (
    <PostsContext.Provider value={{ posts, loading, handleCreatePost }}>
      {children}
    </PostsContext.Provider>
  );
};
