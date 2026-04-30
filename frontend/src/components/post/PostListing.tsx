import { usePosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";
import { motion } from "framer-motion";

const PostListing = () => {
  const { posts } = usePosts();
  return (
    <div className="flex flex-col space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
};

export default PostListing;
