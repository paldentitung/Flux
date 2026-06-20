import User from "../users/user.model.js";
import Post from "../posts/post.model.js";

export const searchService = async (query) => {
  const [users, posts] = await Promise.all([
    User.find({
      username: {
        $regex: query,
        $options: "i",
      },
    })
      .select("-password")
      .limit(5),

    Post.find({
      content: {
        $regex: query,
        $options: "i",
      },
    })
      .populate("userId", "username avatar")
      .limit(10),
  ]);

  return {
    users,
    posts,
  };
};
