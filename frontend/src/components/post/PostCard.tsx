import { ArrowBigDown, Heart, MessageCircle, Send, Share2 } from "lucide-react";
import type { Post } from "../../types/post";
import { useState } from "react";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-(--post-card-bg) border border-(--post-card-border) p-5 rounded-xl flex flex-col gap-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={post.user.avatar ?? "/placeholder.jpg"}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col mr-auto">
          <h2 className="text-(--foreground) font-medium text-sm">
            {post.user.name}
          </h2>
          <span className="text-xs text-(--muted-foreground)">
            @{post.user.username} • {post.createdAt}
          </span>
        </div>

        <button className="text-(--muted-foreground)">•••</button>
      </div>

      {/* Content */}
      <p className="text-(--foreground) text-sm leading-relaxed">
        {post.content}
      </p>

      {/* Image (only render if exists) */}
      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-lg object-cover max-h-100"
        />
      )}
      <div className="flex items-center justify-between text-(--muted-foreground) pt-2">
        <div className="flex gap-2">
          <button className="flex items-center gap-1 hover:text-red-500 transition">
            <Heart size={18} />
            <span className="text-xs">{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-1 hover:text-(--primary) transition "
          >
            <MessageCircle size={17} />
            <span className="text-xs">{post.comments?.length ?? 0}</span>
          </button>
        </div>

        <button className="flex items-center gap-1 hover:text-(--primary) transition">
          <Share2 size={18} />
        </button>
      </div>

      {showComments && (
        <div className="mt-2 space-y-3 border-t border-(--post-card-border) pt-3">
          {post.comments?.length > 0 ? (
            post.comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <img src={c.user.avatar} className="w-6 h-6 rounded-full" />

                <div>
                  <p className="text-xs text-(--foreground)">
                    <span className="font-medium">{c.user.name}</span> {c.text}
                  </p>

                  <span className="text-[10px] text-(--muted-foreground)">
                    {c.createdAt}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-(--muted-foreground)">
              No comments yet. Be the first to comment 💬
            </p>
          )}

          <div className="flex gap-2 items-center pt-2">
            <img src="/favicon.svg" className="w-6 h-6 rounded-full" />

            <input
              placeholder="Write a comment..."
              className="flex-1 bg-transparent outline-none text-xs text-(--foreground)"
            />

            <button className="text-xs text-white bg-[hsl(var(--primary))] p-2 rounded-full">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
