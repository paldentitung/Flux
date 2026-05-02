import PostComposer from "../components/post/PostComposer";
import PostListing from "../components/post/PostListing";
import { usePosts } from "../hooks/usePosts.ts";

const Home = () => {
  const { posts, handleCreatePost, loading } = usePosts();

  return (
    <div className="space-y-6">
      <div className="py-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-(--foreground)">
          Today
        </h1>
        <span className="text-sm text-(--muted-foreground)">
          A slow scroll through your circle. Ava Mercer
        </span>
      </div>
      <PostComposer onSubmit={handleCreatePost} loading={loading} />
      <PostListing posts={posts} />
    </div>
  );
};

export default Home;
