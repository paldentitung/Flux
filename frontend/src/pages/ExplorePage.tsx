const posts = [
  {
    id: 1,
    user: "@sorenv",
    likes: 248,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    user: "@noor.builds",
    likes: 412,
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
  },
  {
    id: 3,
    user: "@elibrandt",
    likes: 156,
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
  },
  {
    id: 4,
    user: "@kaitanaka",
    likes: 1024,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
];

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
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PostCard = ({
  post,
  className = "",
}: {
  post: (typeof posts)[0];
  className?: string;
}) => (
  <div
    className={`group relative overflow-hidden rounded-(--radius) cursor-pointer border transition-all duration-300 hover:border-[hsl(var(--primary)/0.3)] ${className}`}
    style={{
      background: "var(--post-card-bg)",
      borderColor: "var(--post-card-border)",
      boxShadow: "var(--shadow-card)",
    }}
  >
    <img
      src={post.image}
      alt={`Post by ${post.user}`}
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
    {/* gradient */}
    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
    {/* hover glow tint */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: "var(--post-action-hover)" }}
    />
    {/* footer */}
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3.5 py-3">
      <span
        className="text-[12px] font-medium tracking-wide"
        style={{
          color: "hsl(var(--foreground) / 0.85)",
          fontFamily: "var(--font-body)",
        }}
      >
        {post.user}
      </span>
      <span
        className="flex items-center gap-1.5 text-[12px]"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <span style={{ color: "var(--post-like-active)" }}>
          <HeartIcon />
        </span>
        {post.likes.toLocaleString()}
      </span>
    </div>
  </div>
);

const ExplorePage = () => {
  return (
    <div
      className="min-h-screen px-10 py-9"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold tracking-tight mb-1"
          style={{
            color: "hsl(var(--foreground))",
            fontFamily: "var(--font-heading)",
          }}
        >
          Explore
        </h1>
        <p
          className="text-[13px]"
          style={{
            color: "hsl(var(--muted-foreground))",
            fontFamily: "var(--font-body)",
          }}
        >
          A wider view of what the community is making.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-7">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search users or posts..."
          className="w-full rounded-(--radius) pl-10 pr-4 py-3 text-[13px] transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            background: "hsl(var(--input))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "hsl(var(--ring))";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "hsl(var(--border))";
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "240px 240px",
        }}
      >
        {/* Col 1 Row 1 */}
        <PostCard post={posts[0]} className="col-start-1 row-start-1" />
        {/* Col 2 spans 2 rows */}
        <PostCard
          post={posts[1]}
          className="col-start-2 row-start-1 row-span-2"
        />
        {/* Col 3 spans 2 rows */}
        <PostCard
          post={posts[2]}
          className="col-start-3 row-start-1 row-span-2"
        />
        {/* Col 1 Row 2 */}
        <PostCard post={posts[3]} className="col-start-1 row-start-2" />
      </div>
    </div>
  );
};

export default ExplorePage;
