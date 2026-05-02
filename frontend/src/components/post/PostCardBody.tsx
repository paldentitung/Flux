import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "../../types/post.types";
import { useAuth } from "../../hooks/useAuth";
import { usePostCard } from "../../hooks/usePostCard";

type Props = {
  post: Post;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const PostCardBody = ({ post, onEditClick, onDeleteClick }: Props) => {
  const { useCleanUsername } = useAuth();
  const { menuOpen, setMenuOpen, formatDate } = usePostCard(post);

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
            @{useCleanUsername(post.userId.username)} •{" "}
            {formatDate(post.createdAt)}
          </span>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-(--muted-foreground)"
          >
            •••
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 bg-(--post-card-bg) border border-(--post-card-border) rounded-lg shadow-lg z-10 w-36 py-1">
              <button
                onClick={onEditClick}
                className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] cursor-pointer"
              >
                Edit post
              </button>
              <button
                onClick={onDeleteClick}
                className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] cursor-pointer"
              >
                Delete post
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] cursor-pointer">
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

      {/* Images */}
      {post.images?.length === 1 && (
        <img
          src={post.images[0]}
          className="w-full rounded-lg object-cover max-h-100"
        />
      )}
      {post.images?.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {post.images.slice(0, 4).map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-full h-48 object-cover rounded-lg" />
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

      {/* Actions */}
      <div className="flex items-center justify-between text-(--muted-foreground) pt-2">
        <div className="flex gap-2">
          <button className="flex items-center gap-1 hover:text-red-500 transition">
            <Heart size={18} />
            <span className="text-xs">{post.likes.length}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-(--primary) transition">
            <MessageCircle size={17} />
          </button>
        </div>
        <button className="flex items-center gap-1 hover:text-(--primary) transition">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostCardBody;
