import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/post/PostCard";
import type { Post } from "../types/post.types";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { fetchedPostById } = usePosts();

  useEffect(() => {
    if (!postId) return;
    fetchedPostById(postId).then(setPost);
  }, [postId]); // ✅ no fetchedPostById in deps

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <PostCard post={post} />
    </div>
  );
};

export default PostDetailPage;
