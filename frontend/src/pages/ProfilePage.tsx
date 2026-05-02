import { useState } from "react";
import { Grid3X3, List } from "lucide-react";
import type { User } from "../types/user.types";
import type { Post } from "../types/post.types";
import LoadingButton from "../components/ui/LoadingButton";

const mockUser: User = {
  _id: "1",
  name: "Ava Mercer",
  username: "avamercer",
  email: "ava@example.com",
  avatar: null,
  bio: "Designing quiet interfaces. Lover of typography, late-night coffee, and slow internet.",
  followers: Array(12480).fill("x"),
  following: Array(312).fill("x"),
  isOnline: true,
  lastSeen: new Date(),
  isVerified: true,
  blockedUsers: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
  _id: String(i),
  userId: mockUser,
  content:
    "Some post content here that might be a bit longer to fill the space nicely.",
  images: [],
  likes: [],
  comments: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  __v: 0,
}));

const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const ProfilePage = () => {
  const user = mockUser;
  const posts = mockPosts;
  const isOwnProfile = true;
  const isFollowing = false;
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-(--background)"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      {/* Cover */}
      <div className="relative h-52 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 50%, #e040fb44 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, #7c4dff33 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Profile section */}
      <div className="max-w-3xl mx-auto px-6 mt-2">
        <div className="relative -mt-16 mb-6 flex items-end justify-between">
          {/* Avatar */}
          <div
            className="w-28 h-28 rounded-full shrink-0 flex items-center justify-center text-3xl font-semibold border-4 border-(--background)"
            style={{ background: "#533483", color: "#e9d5ff" }}
          >
            {user.name?.[0] ?? user.username[0].toUpperCase()}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pb-2">
            {isOwnProfile ? (
              <LoadingButton className="px-5  py-2 rounded-lg text-sm font-medium border border-(--post-card-border) text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition">
                Edit profile
              </LoadingButton>
            ) : (
              <>
                <button
                  className="px-5 py-2 rounded-lg text-sm font-medium transition"
                  style={
                    isFollowing
                      ? {
                          border: "1px solid var(--post-card-border)",
                          color: "var(--muted-foreground)",
                        }
                      : { background: "#533483", color: "#fff" }
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className="px-5 py-2 rounded-lg text-sm font-medium border border-(--post-card-border) text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition">
                  Message
                </button>
              </>
            )}
          </div>
        </div>

        {/* Name + bio */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-0.5">
            <h1
              style={{ fontFamily: "'DM Serif Display', serif" }}
              className="text-2xl text-(--foreground)"
            >
              {user.name ?? user.username}
            </h1>
            {user.isVerified && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#8b5cf6">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            )}
          </div>
          <p className="text-sm text-(--muted-foreground) mb-3">
            @{user.username}
          </p>
          {user.bio && (
            <p className="text-sm text-(--foreground) leading-relaxed max-w-lg">
              {user.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-8 border-b border-(--post-card-border) pb-5">
          {[
            { label: "Posts", value: posts.length },
            { label: "Followers", value: user.followers.length },
            { label: "Following", value: user.following.length },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold text-(--foreground)">
                {formatCount(value)}
              </span>
              <span className="text-sm text-(--muted-foreground)">{label}</span>
            </div>
          ))}
        </div>

        {/* Posts header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition ${view === "grid" ? "bg-(--post-card-bg) text-(--foreground)" : "text-(--muted-foreground) hover:text-(--foreground)"}`}
            >
              <Grid3X3 size={17} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition ${view === "list" ? "bg-(--post-card-bg) text-(--foreground)" : "text-(--muted-foreground) hover:text-(--foreground)"}`}
            >
              <List size={17} />
            </button>
          </div>
          <span className="text-xs tracking-widest text-(--muted-foreground) uppercase">
            Gallery
          </span>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p className="text-sm text-(--muted-foreground) text-center py-16">
            No posts yet
          </p>
        ) : view === "grid" ? (
          <div className="grid grid-cols-3 gap-1 pb-10">
            {posts.map((post) => (
              <div
                key={post._id}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition bg-(--post-card-bg)"
              >
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center p-4"
                    style={{
                      background: "linear-gradient(135deg, #1a1a2e, #533483)",
                    }}
                  >
                    <p className="text-xs text-purple-200 line-clamp-4 text-center leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-10">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-(--post-card-bg) border border-(--post-card-border) rounded-xl p-4 cursor-pointer hover:border-(--foreground)/20 transition"
              >
                <p className="text-sm text-(--foreground) leading-relaxed">
                  {post.content}
                </p>
                {post.images?.[0] && (
                  <img
                    src={post.images[0]}
                    className="mt-3 w-full rounded-lg object-cover max-h-64"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
