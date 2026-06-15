import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import Modal from "./ui/Modal";
import Avatar from "./ui/Avatar";
import type { User } from "../types/user.types";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Tab = "followers" | "following";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  defaultTab?: Tab;
};

const FollowModal = ({
  isOpen,
  onClose,
  user,
  defaultTab = "followers",
}: Props) => {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [search, setSearch] = useState("");
  const { handleFollowUser, handleUnFollowUser } = useProfile();
  const { user: currentUser } = useAuth();

  const followerIds = user.followers ?? [];
  const followingIds = user.following ?? [];

  const activeList = tab === "followers" ? followerIds : followingIds;
  const filtered = activeList.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) setTab(defaultTab);
  }, [isOpen, defaultTab]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-full gap-3 ">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--post-card-border)">
          <div className="flex gap-1 justify-center items-center mx-auto">
            <button
              onClick={() => setTab("followers")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition hover:cursor-pointer ${
                tab === "followers"
                  ? "bg-[hsl(var(--primary))] text-(--primary)"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              Followers
              <span className="ml-1.5 text-xs opacity-70">
                {followerIds.length}
              </span>
            </button>
            <button
              onClick={() => setTab("following")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition hover:cursor-pointer ${
                tab === "following"
                  ? "bg-[hsl(var(--primary))] text-(--primary)"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              Following
              <span className="ml-1.5 text-xs opacity-70">
                {followingIds.length}
              </span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-(--muted-foreground) hover:text-(--foreground) transition p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className=" border-b border-(--post-card-border)">
          <div className="flex items-center gap-2 bg-(--surface-hover) rounded-full px-4 py-2 border border-(--post-card-border)">
            <Search size={14} className="text-(--muted-foreground)" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-(--foreground) placeholder:text-(--muted-foreground)"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col overflow-y-auto max-h-80">
          {filtered.length === 0 ? (
            <p className="text-sm text-(--muted-foreground) text-center py-10">
              {search
                ? "No results found"
                : tab === "followers"
                  ? "No followers yet"
                  : "Not following anyone yet"}
            </p>
          ) : (
            filtered.map((u) => {
              const isFollowingThisUser =
                currentUser?.following?.some((f) => f._id === u._id) ?? false;
              const isSelf = currentUser?._id === u._id;

              return (
                <div
                  key={u._id}
                  className="flex items-center gap-3 px-5 py-3 border-b border-(--post-card-border) last:border-b-0"
                >
                  <Avatar
                    src={u.avatar}
                    name={u.name || u.username}
                    size={40}
                  />
                  <Link
                    to={`/profile/${u._id}`}
                    className="flex flex-col flex-1 min-w-0"
                  >
                    <span className="text-sm font-medium text-(--foreground) truncate">
                      {u.name || u.username}
                    </span>
                    <span className="text-xs text-(--muted-foreground)">
                      @{u.username}
                    </span>
                  </Link>

                  {!isSelf &&
                    (isFollowingThisUser ? (
                      <button
                        onClick={() => handleUnFollowUser(u._id)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-400/40 text-red-500 hover:bg-red-500/10 transition"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleFollowUser({
                            _id: u._id,
                            username: u.username,
                            name: u.name,
                            avatar: u.avatar,
                          })
                        }
                        className="text-xs px-3 py-1.5 rounded-lg border border-(--post-card-border) text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition"
                      >
                        Follow
                      </button>
                    ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FollowModal;
