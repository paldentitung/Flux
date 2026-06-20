import { useEffect, useState } from "react";
import type { User } from "../../types/user.types";
import { useProfile } from "../../hooks/useProfile";

const RightSidebar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [followState, setFollowState] = useState<
    Record<string, "following" | "requested">
  >({});
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchSuggestions = async (skipValue = 0) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/suggestions?skip=${skipValue}`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (data.success) {
        if (data.data.length === 0 && skipValue > 0) {
          // exhausted the pool — loop back to the start
          return fetchSuggestions(0);
        }
        setUsers(data.data);
        setSkip(skipValue);
        setHasMore(data.data.length === 5); // fewer than 5 back = likely last page
      }
    } catch (err) {
      console.error("Failed to load suggestions", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, []);
  const handleRefresh = () => {
    fetchSuggestions(skip + 5);
  };
  const { handleFollowUser } = useProfile();
  const initials = (name?: string) =>
    (name || "?")
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  const visibleUsers = users.slice(0, visibleCount);

  return (
    <div className="w-72 min-h-screen flex-col bg-[hsl(var(--background-tertiary))] border-l border-white/5 py-6 px-4 gap-3 hidden lg:flex fixed right-0">
      <div className="rounded-xl border border-white/5 bg-[hsl(var(--surface))] p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium tracking-widest uppercase text-[hsl(var(--muted-foreground))]">
            Suggested for you
          </p>
          <button
            onClick={handleRefresh}
            aria-label="Refresh suggestions"
            className="text-[hsl(var(--muted-foreground))] hover:text-white transition-colors"
          >
            <RefreshIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col divide-y divide-white/5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 animate-pulse"
              >
                <div className="w-8 h-8 rounded-full bg-white/5" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 rounded bg-white/5" />
                  <div className="h-2.5 w-1/2 rounded bg-white/5" />
                </div>
                <div className="h-6 w-14 rounded-full bg-white/5" />
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              No new suggestions right now
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-white/5">
              {visibleUsers.map((u) => {
                const state = followState[u._id];
                const label =
                  state === "following"
                    ? "Following"
                    : state === "requested"
                      ? "Requested"
                      : u.isPrivate
                        ? "Request"
                        : "Follow";

                return (
                  <div
                    key={u._id}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] flex items-center justify-center text-[11px] font-medium shrink-0">
                        {initials(u.name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{u.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                        @{u.username}
                      </p>
                    </div>
                    <button
                      onClick={() => handleFollowUser(u)}
                      className={`text-[11px] font-medium rounded-full px-3 py-1 transition-colors shrink-0 border ${
                        state
                          ? "bg-white/5 border-white/10 text-[hsl(var(--muted-foreground))]"
                          : "border-white/10 bg-[hsl(var(--primary))] hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </button>
                  </div>
                );
              })}
            </div>

            {visibleCount < users.length && (
              <button
                onClick={() => setVisibleCount(users.length)}
                className="text-xs text-[hsl(var(--muted-foreground))] hover:text-white transition-colors pt-1"
              >
                Show more
              </button>
            )}
          </>
        )}
      </div>

      <p className="text-[10px] text-[hsl(var(--muted-foreground))] text-center tracking-wide mt-auto pt-2">
        © {new Date().getFullYear()} Flux · An editorial network.
      </p>
    </div>
  );
};

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <path
      d="M3 12a9 9 0 0115.4-6.36M21 12a9 9 0 01-15.4 6.36"
      strokeLinecap="round"
    />
    <path
      d="M3 4v5h5M21 20v-5h-5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RightSidebar;
