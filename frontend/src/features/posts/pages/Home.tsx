import PostCardSkeleton from "../components/PostCardSkeleton.tsx";
import PostComposer from "../components/PostComposer.tsx";
import PostListing from "../components/PostListing.tsx";
import StoryTray from "../../stories/components/StoryTray.tsx";
import StoryTraySkeleton from "../../stories/components/StoryTraySkeleton.tsx";
import { usePosts } from "../hooks/usePosts.ts";
import { useStories } from "../../stories/hooks/useStories.ts";
import { useAuth } from "../../auth/hooks/useAuth.ts";

const Home = () => {
  const { posts, handleCreatePost, loading } = usePosts();
  const {
    groups,
    loading: storyLoading,
    handleMarkViewed,
    handleCreateStory,
    handleDeleteStory,
    handleGetViewers,
  } = useStories();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="py-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-(--foreground)">
          Today
        </h1>
        <span className="text-sm text-(--muted-foreground)">
          A slow scroll through your circle.{" "}
          {user?.name ? `Hello, ${user.name}!` : ""}
        </span>
      </div>

      {storyLoading.fetch && groups.length === 0 ? (
        <StoryTraySkeleton />
      ) : (
        <StoryTray
          groups={groups}
          currentUserId={user?._id ?? ""}
          currentUserAvatar={user?.avatar?.url ?? ""}
          onMarkViewed={handleMarkViewed}
          onCreateStory={handleCreateStory}
          createLoading={storyLoading.create}
          onDeleteStory={handleDeleteStory}
          onGetViewers={handleGetViewers}
        />
      )}

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
