import { useEffect, useState } from "react";
import { getPosts, createPost } from "../services/postsService";
import type { Post } from "../types/post.types";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const handleGetPost = async () => {
    const result = await getPosts();
    if (!result) return;

    setPosts(result.data);
  };
  const handleCreatePost = async (formData: FormData) => {
    try {
      setLoading(true);

      const res = await createPost(formData);

      if (res?.data) {
        setPosts((prev) => [res.data, ...prev]); // add new post on top
      }

      return res;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPost();
  }, []);
  useEffect(() => {
    console.log("posts", posts);
  }, []);
  return { posts, handleCreatePost, loading };
};
