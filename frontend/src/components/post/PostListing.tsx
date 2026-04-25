import { mockPosts } from "../../mocks/mockPosts";
import PostCard from "./PostCard";

const PostListing = () => {
  return (
    <div className="flex flex-col space-y-6">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostListing;
