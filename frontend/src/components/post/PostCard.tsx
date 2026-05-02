import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "../../types/post.types";
import { useState, useRef } from "react";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";
import Modal from "../ui/Modal";
import LoadingButton from "../ui/LoadingButton";
type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  // const [showComments, setShowComments] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { useCleanUsername } = useAuth();
  const { handleDeletePost, loading, handleUpdatePost } = usePosts();
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  const handleConfirmDelete = async () => {
    await handleDeletePost(post._id);
    setIsOpen(false);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const reset = () => {
    images.forEach(URL.revokeObjectURL);
    setContent("");
    setFiles([]);
    setImages([]);
    setShowEditModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
    setImages((prev) => [...prev, ...selected.map(URL.createObjectURL)]);
  };
  const handleConfirmUpdatePost = async () => {
    const formData = new FormData();

    formData.append("content", content);

    formData.append("existingImages", JSON.stringify(existingImages));

    files.forEach((f) => formData.append("images", f));

    await handleUpdatePost(post._id, formData);
    reset();
  };
  return (
    <>
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
              @{useCleanUsername(post.userId.username)}•{" "}
              {formatPostDate(post.createdAt)}
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
                <button
                  onClick={() => {
                    setContent(post.content);
                    setExistingImages(post.images || []);
                    setImages([]);
                    setFiles([]);
                    setShowEditModal(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] hover:cursor-pointer"
                >
                  Edit post
                </button>
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] hover:cursor-pointer"
                >
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
                <img
                  src={img}
                  className="w-full h-48 object-cover rounded-lg"
                />

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
              // onClick={() => setShowComments((prev) => !prev)}
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 w-full max-w-md flex flex-col gap-4">
          {/* Text */}
          <div className="flex flex-col gap-1">
            <h2 className="text-(--foreground) font-semibold text-base">
              Delete Post
            </h2>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-(--post-card-border) text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition-colors hover:cursor-pointer"
            >
              Cancel
            </button>
            <LoadingButton
              onClick={handleConfirmDelete}
              loading={loading}
              loadingText="deleting.."
              className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Delete
            </LoadingButton>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={reset}>
        <div className=" w-full max-w-md flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <h2 className="text-(--foreground) font-semibold text-base">
              Edit Post
            </h2>
            <p className="text-sm text-(--muted-foreground)">
              Update your post content or images
            </p>
          </div>

          {/* Text Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-lg border border-(--post-card-border)
        bg-(--post-card-bg) text-(--foreground) text-sm outline-none resize-none"
            rows={4}
          />

          {existingImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {existingImages.map((img, i) => (
                <div key={`old-${i}`} className="relative">
                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-lg"
                  />

                  <button
                    onClick={() =>
                      setExistingImages((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {images.map((img, i) => (
                <div key={`new-${i}`} className="relative">
                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-lg"
                  />

                  <button
                    onClick={() => {
                      setImages((prev) => prev.filter((_, idx) => idx !== i));
                      setFiles((prev) => prev.filter((_, idx) => idx !== i));
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Add Images */}
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 text-sm text-(--muted-foreground)
        hover:text-(--foreground) transition"
          >
            + Add Images
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </button>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-2 rounded-lg border
          border-(--post-card-border) text-sm text-(--foreground)
          hover:bg-[hsl(var(--surface-hover))]"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmUpdatePost}
              className="flex-1 px-4 py-2 rounded-lg bg-[hsl(var(--primary))]
          text-white text-sm font-medium hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostCard;
