import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/post/PostCard";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
const PostDetailPage = () => {
  const { postId } = useParams();
  const { posts, fetchedPostById } = usePosts();

  const post = posts.find((p) => p._id === postId);
  const navigate = useNavigate();
  useEffect(() => {
    if (!post && postId) {
      fetchedPostById(postId);
    }
  }, [postId, post]);

  const displayPost = post;

  if (!displayPost) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <PostCard post={displayPost} />
    </div>
  );
};

export default PostDetailPage;
