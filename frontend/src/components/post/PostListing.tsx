import PostCard from "./PostCard";
import { motion } from "framer-motion";
import type { Post } from "../../types/post.types";

const PostListing = ({ posts }: { posts: Post[] }) => {
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
    </div>
  );
};

export default PostListing;
