import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post.types";

const HeartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PostCard = ({
  post,
  className = "",
}: {
  post: Post;
  className?: string;
}) => {
  const hasImage = post?.images?.length > 0;
  const image = post?.images?.[0];
  const username = post?.userId?.username || "unknown";

  return (
    <div
      className={`group relative overflow-hidden rounded-(--radius) cursor-pointer border transition-all duration-300 hover:border-[hsl(var(--primary)/0.3)] ${className}`}
      style={{
        background: "var(--post-card-bg)",
        borderColor: "var(--post-card-border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* IMAGE POST */}
      {hasImage ? (
        <img
          src={image}
          alt={`Post by ${username}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        /* TEXT POST FALLBACK */
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {post?.content || "No image"}
          </p>
        </div>
      )}

      {/* gradient ONLY for image posts */}
      {hasImage && (
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
      )}

      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "var(--post-action-hover)" }}
      />

      {/* footer */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3.5 py-3">
        <span
          className="text-[12px] font-medium tracking-wide"
          style={{ color: "hsl(var(--foreground) / 0.85)" }}
        >
          {username}
        </span>

        <span
          className="flex items-center gap-1.5 text-[12px]"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <span style={{ color: "var(--post-like-active)" }}>
            <HeartIcon />
          </span>
          {post?.likes?.length || 0}
        </span>
      </div>
    </div>
  );
};

const ExplorePage = () => {
  const { posts } = usePosts();

  return (
    <div
      className="min-h-screen px-10 py-9"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold tracking-tight mb-1"
          style={{ color: "hsl(var(--foreground))" }}
        >
          Explore
        </h1>
        <p
          className="text-[13px]"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          A wider view of what the community is making.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-7">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </span>

        <input
          type="text"
          placeholder="Search users or posts..."
          className="w-full rounded-(--radius) pl-10 pr-4 py-3 text-[13px] focus:outline-none focus:ring-2"
          style={{
            background: "hsl(var(--input))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          }}
        />
      </div>

      {/* Grid (scalable version) */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[240px]">
        {posts?.slice(0, 4).map((post, i) => (
          <PostCard
            key={post._id || i}
            post={post}
            className={i === 1 || i === 2 ? "md:row-span-2" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
