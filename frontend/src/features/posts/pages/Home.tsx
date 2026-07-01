import PostCardSkeleton from "../components/PostCardSkeleton.tsx";
import PostComposer from "../components/PostComposer.tsx";
import PostListing from "../components/PostListing.tsx";
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
      <PostComposer onSubmit={handleCreatePost} loading={loading.create} />
      {loading && posts.length === 0 ? (
        <div className="flex flex-col space-y-6">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : (
        <PostListing posts={posts} />
      )}
    </div>
  );
};

export default Home;
