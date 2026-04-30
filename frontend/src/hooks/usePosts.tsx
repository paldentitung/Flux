import { useEffect, useState } from "react";
import { getPosts } from "../services/postsService";
import type { Post } from "../types/post.types";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const handleGetPost = async () => {
    const result = await getPosts();
    if (!result) return;

    setPosts(result.data);
  };

  useEffect(() => {
    handleGetPost();
  }, []);
  useEffect(() => {
    console.log("posts", posts);
  }, []);
  return { posts };
};
