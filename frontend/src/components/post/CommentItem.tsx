import { Send } from "lucide-react";
import { useState } from "react";
import type { Comment } from "../../types/comment.types";
import { formatDate } from "../../utils/formatDate";
import Avatar from "../ui/Avatar";
type Props = {
  comment: Comment;
  isReply?: boolean;
  onAddReply: (commentId: string, text: string) => void;
};

const CommentItem = ({ comment, isReply = false, onAddReply }: Props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const localReplies = comment.replies ?? [];

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    onAddReply(comment._id, replyText); // 👈 use prop
    setReplyText("");
    setShowReplies(true);
    setShowReplyInput(false);
  };

  return (
    <div className={`flex gap-2 ${isReply ? "pl-10 pt-1" : "py-2"}`}>
      <Avatar
        src={comment.userId.avatar}
        name={comment.userId.name || comment.userId.username}
        size={isReply ? 28 : 32}
        className="mt-0.5"
      />

      <div className="flex flex-col flex-1 min-w-0 gap-1">
        {/* Bubble */}
        <div className="bg-(--surface-hover) rounded-2xl px-3 py-2 w-fit max-w-full">
          <p className="text-xs font-semibold text-(--foreground)">
            {comment.userId.name}
          </p>
          <p className="text-sm text-(--foreground) leading-relaxed">
            {comment.text}
          </p>
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-3 pl-1">
          <button
            onClick={handleLike}
            className={`text-xs font-semibold transition ${
              liked
                ? "text-blue-500"
                : "text-(--muted-foreground) hover:text-(--foreground)"
            }`}
          >
            Like{likes > 0 && ` · ${likes}`}
          </button>

          {!isReply && (
            <button
              onClick={() => setShowReplyInput((p) => !p)}
              className="text-xs font-semibold text-(--muted-foreground) hover:text-(--foreground) transition"
            >
              Reply
            </button>
          )}

          <span className="text-xs text-(--muted-foreground)">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        {/* Replies toggle */}
        {!isReply && localReplies.length > 0 && (
          <button
            onClick={() => setShowReplies((p) => !p)}
            className="text-xs font-semibold text-blue-500 hover:underline pl-1 text-left w-fit"
          >
            {showReplies
              ? "Hide replies"
              : `View ${localReplies.length} ${localReplies.length === 1 ? "reply" : "replies"}`}
          </button>
        )}

        {/* Nested replies */}
        {showReplies && (
          <div className="flex flex-col gap-1">
            {localReplies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                isReply
                onAddReply={onAddReply}
              />
            ))}
          </div>
        )}

        {/* Reply input */}
        {showReplyInput && (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex flex-1 items-center bg-(--surface-hover) rounded-full px-3 py-1.5 gap-2 border border-(--post-card-border)">
              <input
                autoFocus
                type="text"
                placeholder="Write a reply…"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReply()}
                className="flex-1 bg-transparent outline-none text-xs text-(--foreground) placeholder:text-(--muted-foreground)"
              />
              <button
                onClick={handleReply}
                className="text-(--muted-foreground) hover:text-(--primary) transition"
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
