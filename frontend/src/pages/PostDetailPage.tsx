import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/post/PostCard";
import { useEffect } from "react";
const PostDetailPage = () => {
  const { postId } = useParams();
  const { posts, fetchedPostById } = usePosts();

  const post = posts.find((p) => p._id === postId);

  useEffect(() => {
    if (!post && postId) {
      fetchedPostById(postId);
    }
  }, [postId, post]);

  const displayPost = post;

  if (!displayPost) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <PostCard post={displayPost} />
    </div>
  );
};

export default PostDetailPage;
