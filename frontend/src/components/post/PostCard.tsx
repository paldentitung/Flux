import { Heart, MessageCircle, Send, Share2 } from "lucide-react";
import type { Post } from "../../types/post.types";
import { useState } from "react";
import { formatDistanceToNow, differenceInHours } from "date-fns";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const formatPostDate = (date: string) => {
    const d = new Date(date);
    const hoursAgo = differenceInHours(new Date(), d);

    if (hoursAgo < 24) {
      return formatDistanceToNow(d, { addSuffix: true }); // "2 hours ago"
    }

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }); // "May 1, 2026"
  };
  return (
    <div className="bg-(--post-card-bg) border border-(--post-card-border) p-5 rounded-xl flex flex-col gap-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={post.userId.avatar ?? "/placeholder.jpg"}
          alt={post.userId.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col mr-auto">
          <h2 className="text-(--foreground) font-medium text-sm">
            {post.userId.name}
          </h2>
          <span className="text-xs text-(--muted-foreground)">
            @{post.userId.username} • {formatPostDate(post.createdAt)}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-(--muted-foreground)"
          >
            •••
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-6 bg-(--post-card-bg) border border-(--post-card-border) rounded-lg shadow-lg z-10 w-36 py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] hover:cursor-pointer">
                Edit post
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] hover:cursor-pointer">
                Delete post
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] hover:cursor-pointer">
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-(--foreground) text-sm leading-relaxed">
        {post.content}
      </p>

      {/* Image (only render if exists) */}
      {post.images?.length === 1 && (
        <img
          src={post.images[0]}
          className="w-full rounded-lg object-cover max-h-100"
        />
      )}

      {post.images?.length > 1 && (
        <div className="grid grid-cols-2 gap-2 relative">
          {post.images.slice(0, 4).map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-full h-48 object-cover rounded-lg" />

              {/* Overlay for 4th image if more exist */}
              {i === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <span className="text-white text-lg font-semibold">
                    +{post.images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-(--muted-foreground) pt-2">
        <div className="flex gap-2">
          <button className="flex items-center gap-1 hover:text-red-500 transition">
            <Heart size={18} />
            <span className="text-xs">{post.likes.length}</span>
          </button>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-1 hover:text-(--primary) transition "
          >
            <MessageCircle size={17} />
            {/* <span className="text-xs">{post.comments.length ?? 0}</span> */}
          </button>
        </div>

        <button className="flex items-center gap-1 hover:text-(--primary) transition">
          <Share2 size={18} />
        </button>
      </div>

      {/* {showComments && (
        <div className="mt-2 space-y-3 border-t border-(--post-card-border) pt-3">
          {post.comments?.length > 0 ? (
            post.comments?.map((c) => (
              <div key={c.id} className="flex gap-2">
                <img src={c.userId.avatar} className="w-6 h-6 rounded-full" />

                <div>
                  <p className="text-xs text-(--foreground)">
                    <span className="font-medium">{c.userId.name}</span>{" "}
                    {c.text}
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
      )} */}
    </div>
  );
};

export default PostCard;
