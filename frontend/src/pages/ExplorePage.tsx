import { useState, useEffect } from "react";
import { usePosts } from "../features/posts/hooks/usePosts";
import { useSearch } from "../hooks/useSearch";
import type { Post } from "../types/post.types";
import type { User } from "../types/user.types";
import { MessageCircle } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
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

const UserIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
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
    <Link
      to={`/post/${post._id}`}
      className={`group relative overflow-hidden rounded-lg cursor-pointer ${className}`}
      style={{ background: "var(--post-card-bg)" }}
    >
      {hasImage ? (
        <img
          src={image}
          alt={`Post by ${username}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center p-4"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #533483)" }}
        >
          <p className="text-xs text-purple-200 line-clamp-4 text-center leading-relaxed">
            {post?.content || "No content"}
          </p>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
        <div className="flex items-center gap-1.5 text-white">
          <HeartIcon />
          <span className="text-sm font-medium">
            {post?.likes?.length || 0}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-white">
          <MessageCircle size={13} fill="white" />
          <span className="text-sm font-medium">
            {/* {post.comments.length} */}
          </span>
        </div>
      </div>

      {/* Username footer — visible by default, hidden on hover */}
      <div className="absolute bottom-0 left-0 right-0 px-3.5 py-3 bg-linear-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <span className="text-[12px] font-medium tracking-wide text-white/85">
          {username}
        </span>
      </div>
    </Link>
  );
};

// ── Search result sub-components ────────────────────────────────────────────

const UserResult = ({ user }: { user: User }) => (
  <Link
    to={`/profile/${user._id}`}
    className="flex items-center gap-3 px-4 py-3 rounded-(--radius) cursor-pointer transition-colors duration-150 hover:bg-[hsl(var(--muted)/0.5)]"
  >
    {user.avatar ? (
      <img
        src={user.avatar}
        alt={user.username}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    ) : (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "hsl(var(--muted))",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        <UserIcon />
      </div>
    )}
    <div className="flex flex-col min-w-0">
      <span
        className="text-[13px] font-medium truncate"
        style={{ color: "hsl(var(--foreground))" }}
      >
        {user.username}
      </span>
      <span
        className="text-[11px]"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        @{user.username}
      </span>
    </div>
  </Link>
);

const PostResult = ({ post }: { post: Post }) => {
  const hasImage = post?.images?.length > 0;
  const username = post?.userId?.username || "unknown";

  return (
    <Link
      to={`/post/${post._id}`}
      className="flex items-center gap-3 px-4 py-3 rounded-(--radius) cursor-pointer transition-colors duration-150 hover:bg-[hsl(var(--muted)/0.5)]"
    >
      <div
        className="w-10 h-10 rounded-md overflow-hidden shrink-0 border"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {hasImage ? (
          <img
            src={post.images[0]}
            alt="Post thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "hsl(var(--muted))" }}
          >
            <span
              className="text-[10px]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Aa
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span
          className="text-[13px] truncate"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {post?.content || "No caption"}
        </span>
        <span
          className="text-[11px] flex items-center gap-1 mt-0.5"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          by {username}
          <span
            className="inline-flex items-center gap-0.5 ml-1"
            style={{ color: "var(--post-like-active)" }}
          >
            <HeartIcon /> {post?.likes?.length || 0}
          </span>
        </span>
      </div>
    </Link>
  );
};

const SearchResultSection = ({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) => (
  <div className="mb-1">
    <div className="flex items-center gap-2 px-4 py-2">
      <span
        className="text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {label}
      </span>
      <span
        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
        style={{
          background: "hsl(var(--muted))",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        {count}
      </span>
    </div>
    {children}
  </div>
);

// ── Main page ────────────────────────────────────────────────────────────────

const ExplorePage = () => {
  const { posts } = usePosts();
  const { handleSearching, loading, data } = useSearch();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  useEffect(() => {
    if (debouncedQuery.trim()) handleSearching(debouncedQuery);
  }, [debouncedQuery]);

  const isSearching = query.trim().length > 0;
  const hasUsers = data?.users?.length > 0;
  const hasPosts = data?.posts?.length > 0;
  const hasAnyResults = hasUsers || hasPosts;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="min-h-screen p-4 lg:p-6">
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
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <SearchIcon />
        </span>

        <input
          type="text"
          value={query}
          placeholder="Search users or posts..."
          onChange={handleChange}
          className="w-full rounded-(--radius) pl-10 pr-4 py-3 text-[13px] focus:outline-none focus:ring-2"
          style={{
            background: "hsl(var(--input))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          }}
        />

        {/* inline loading spinner */}
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </span>
        )}
      </div>

      {/* ── Search results panel ── */}
      {isSearching ? (
        <div
          className="rounded-(--radius) border overflow-hidden"
          style={{
            borderColor: "hsl(var(--border))",
            background: "hsl(var(--card))",
          }}
        >
          {loading ? (
            <div
              className="flex items-center justify-center py-16 text-[13px]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Searching…
            </div>
          ) : !hasAnyResults ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <span className="text-2xl">🔍</span>
              <p
                className="text-[13px] font-medium"
                style={{ color: "hsl(var(--foreground))" }}
              >
                No results for "{query}"
              </p>
              <p
                className="text-[12px]"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Try a different name or keyword.
              </p>
            </div>
          ) : (
            <div className="py-2">
              {hasUsers && (
                <SearchResultSection label="People" count={data.users.length}>
                  {data.users.map((user) => (
                    <UserResult key={user._id} user={user} />
                  ))}
                </SearchResultSection>
              )}

              {hasUsers && hasPosts && (
                <div
                  className="mx-4 my-1"
                  style={{ borderTop: "1px solid hsl(var(--border))" }}
                />
              )}

              {hasPosts && (
                <SearchResultSection label="Posts" count={data.posts.length}>
                  {data.posts.map((post) => (
                    <PostResult key={post._id} post={post} />
                  ))}
                </SearchResultSection>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ── Default explore grid ── */
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px]">
          {posts?.slice(0, 100).map((post, i) => (
            <PostCard
              key={post._id || i}
              post={post}
              className={i === 1 || i === 2 ? "md:row-span-2" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
