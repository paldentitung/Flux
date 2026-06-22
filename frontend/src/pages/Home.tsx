import PostComposer from "../features/posts/components/PostComposer.tsx";
import PostListing from "../features/posts/components/PostListing.tsx";
import { usePosts } from "../features/posts/hooks/usePosts.ts";

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
      <PostComposer onSubmit={handleCreatePost} loading={loading.create} />
      <PostListing posts={posts} />
    </div>
  );
};

export default Home;
