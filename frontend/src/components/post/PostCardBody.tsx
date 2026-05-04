import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import type { Post } from "../../types/post.types";
import { useAuth } from "../../hooks/useAuth";
import { usePostCard } from "../../hooks/usePostCard";
import { useComments } from "../../hooks/useComments";
import CommentItem from "./CommentItem";
import { usePosts } from "../../hooks/usePosts";
import Avatar from "../ui/Avatar";

type Props = {
  post: Post;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const PostCardBody = ({ post, onEditClick, onDeleteClick }: Props) => {
  const { useCleanUsername, user } = useAuth();
  const { menuOpen, setMenuOpen, formatDate } = usePostCard(post);
  const {
    comments,
    loading,
    fetchComments,
    handleAddComment,
    handleAddReplyComment,
  } = useComments();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsliked] = useState<boolean | null>(
    post.likes.includes(user?._id || ""),
  );
  useEffect(() => {
    fetchComments(post._id);
  }, [post._id]);

  const submitComment = () => {
    if (!newComment.trim()) return;
    handleAddComment(post._id, newComment);
    setNewComment("");
  };

  const { handleLikePost } = usePosts();
  const toggleLike = () => {
    setIsliked((prev) => !prev);
    handleLikePost(post._id);
  };

  return (
    <div className="bg-(--post-card-bg) border border-(--post-card-border) p-5 rounded-xl flex flex-col gap-4 shadow-sm">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <Avatar
          src={post.userId.avatar}
          name={post.userId.name || post.userId.username}
          size={40}
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

        {/* Overflow menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-(--muted-foreground) px-1"
          >
            •••
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 bg-(--post-card-bg) border border-(--post-card-border) rounded-lg shadow-lg z-10 w-36 py-1">
              {post.userId._id === user?._id ? (
                <>
                  <button
                    onClick={onEditClick}
                    className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition"
                  >
                    Edit post
                  </button>
                  <button
                    onClick={onDeleteClick}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[hsl(var(--surface-hover))] transition"
                  >
                    Delete post
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {}}
                  className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition"
                >
                  Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <p className="text-(--foreground) text-sm leading-relaxed">
        {post.content}
      </p>

      {/* ── Images ── */}
      {post.images?.length === 1 && (
        <img
          src={post.images[0]}
          className="w-full rounded-lg object-cover max-h-96"
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

      {/* ── Action bar ── */}
      <div className="flex items-center justify-between text-(--muted-foreground) pt-1 border-t border-(--post-card-border)">
        <div className="flex gap-1">
          <button
            onClick={toggleLike}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--surface-hover))] hover:text-red-500 transition text-sm cursor-pointer"
          >
            {isLiked ? (
              <Heart size={16} className="fill-red-500 text-red-500" />
            ) : (
              <Heart size={16} />
            )}
            <span className="text-xs">{post.likes.length}</span>
          </button>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer text-sm ${
              showComments
                ? "text-(--primary) bg-[hsl(var(--surface-hover))]"
                : "hover:bg-[hsl(var(--surface-hover))] hover:text-(--primary)"
            }`}
          >
            <MessageCircle size={16} />
            <span className="text-xs">{comments?.length ?? 0}</span>
          </button>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--surface-hover))] hover:text-(--primary) transition text-sm">
          <Share2 size={16} />
        </button>
      </div>

      {/* ── Comments section ── */}
      {showComments && (
        <div className="flex flex-col gap-1">
          {loading ? (
            <p className="text-xs text-(--muted-foreground) text-center py-4">
              Loading comments...
            </p>
          ) : comments.length === 0 ? (
            <p className="text-xs text-(--muted-foreground) text-center py-4">
              No comments yet. Be the first!
            </p>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                onAddReply={handleAddReplyComment}
              />
            ))
          )}

          {/* New comment input */}
          <div className="flex items-center gap-2 pt-2 border-t border-(--post-card-border) mt-1">
            <Avatar
              src={user?.avatar}
              name={user?.name || user?.username}
              size={32}
            />
            <div className="flex flex-1 items-center bg-(--surface-hover) rounded-full px-4 py-2 gap-2 border border-(--post-card-border)">
              <input
                type="text"
                placeholder="Write a comment…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitComment()}
                className="flex-1 bg-transparent outline-none text-sm text-(--foreground) placeholder:text-(--muted-foreground)"
              />
              <button
                onClick={() => submitComment()}
                className="text-(--muted-foreground) hover:text-(--primary) transition"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCardBody;
