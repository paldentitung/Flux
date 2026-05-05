import type { Post } from "../../types/post.types";
import Modal from "../ui/Modal";
import LoadingButton from "../ui/LoadingButton";
import { usePostCard } from "../../hooks/usePostCard";
import PostCardBody from "./PostCardBody";
const PostCard = ({ post }: { post: Post }) => {
  const p = usePostCard(post);

  return (
    <>
      <PostCardBody
        post={post}
        onEditClick={p.openEdit}
        onDeleteClick={() => p.setDeleteOpen(true)}
        menuOpen={p.menuOpen}
        setMenuOpen={p.setMenuOpen}
        formatDate={p.formatDate}
      />

      {/* Delete Modal */}
      <Modal isOpen={p.deleteOpen} onClose={() => p.setDeleteOpen(false)}>
        <div className="p-6 w-full max-w-md flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-(--foreground) font-semibold text-base">
              Delete Post
            </h2>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Are you sure? This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => p.setDeleteOpen(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-(--post-card-border) text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <LoadingButton
              onClick={p.confirmDelete}
              loading={p.loading.delete}
              loadingText="Deleting..."
              className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Delete
            </LoadingButton>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={p.editOpen} onClose={p.closeEdit}>
        <div
          style={{ background: "var(--color-background-primary)" }}
          className="w-full max-w-md rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 pb-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-(--foreground) font-medium text-sm">
                Edit post
              </h2>
              <button
                onClick={p.closeEdit}
                className="text-(--muted-foreground) text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-(--muted-foreground) mb-4">
              Update your post content or images
            </p>
          </div>

          {/* Textarea */}
          <div className="px-5">
            <textarea
              value={p.content}
              onChange={(e) => p.setContent(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg border border-(--post-card-border) bg-(--post-card-bg) text-(--foreground) text-sm outline-none resize-none"
            />
          </div>

          {/* Images */}
          {(p.existingImages.length > 0 || p.previews.length > 0) && (
            <div className="px-5 mt-3">
              <p className="text-[11px] text-(--muted-foreground) uppercase tracking-wide font-medium mb-2">
                Images
              </p>
              <div className="grid grid-cols-3 gap-2">
                {p.existingImages.map((img, i) => (
                  <div
                    key={`old-${i}`}
                    className="relative aspect-square rounded-lg overflow-hidden border border-(--post-card-border)"
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <button
                      onClick={() => p.removeExisting(i)}
                      className="absolute top-1 right-1 bg-black/55 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {p.previews.map((img, i) => (
                  <div
                    key={`new-${i}`}
                    className="relative aspect-square rounded-lg overflow-hidden border border-(--post-card-border)"
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <button
                      onClick={() => p.removeNew(i)}
                      className="absolute top-1 right-1 bg-black/55 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add images */}
          <div className="px-5 mt-3">
            <button
              onClick={() => p.fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs text-(--muted-foreground) hover:text-(--foreground) transition"
            >
              <span className="text-base leading-none">+</span> Add images
              <input
                ref={p.fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={p.addFiles}
              />
            </button>
          </div>

          {/* Footer */}
          <div className="flex gap-2 p-5 mt-3 border-t border-(--post-card-border)">
            <button
              onClick={p.closeEdit}
              className="flex-1 px-4 py-2 rounded-lg border border-(--post-card-border) text-sm text-(--foreground) hover:bg-[hsl(var(--surface-hover))]"
            >
              Cancel
            </button>

            <LoadingButton
              onClick={p.confirmUpdate}
              loading={p.loading.update}
              loadingText="Saving..."
              variant="primary"
              className="flex-1 px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90"
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostCard;
