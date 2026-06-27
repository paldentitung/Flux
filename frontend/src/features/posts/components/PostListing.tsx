import PostCard from "./PostCard";
import { motion } from "framer-motion";
import type { Post } from "../types/post.types";
import { usePosts } from "../hooks/usePosts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
const PostListing = ({ posts }: { posts: Post[] }) => {
  const { loadMorePosts, hasMore, loadingMore } = usePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasMore && !loadingMore) loadMorePosts();
  }, [inView, hasMore, loadingMore]);
  return (
    <div className="flex flex-col space-y-6">
      {posts.map((post) => (
        <motion.div
          key={post._id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
      <div ref={ref}>
        {loadingMore && (
          <p className="text-center text-sm text-(--muted-foreground) py-4">
            Loading...
          </p>
        )}
        {!hasMore && (
          <p className="text-center text-sm text-(--muted-foreground) py-4">
            No more posts
          </p>
        )}
      </div>
    </div>
  );
};

export default PostListing;
