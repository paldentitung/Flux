import { useState, useEffect } from "react";
import { Grid3X3, List, BadgeCheck, Heart, MessageCircle } from "lucide-react";
import { getUserProfile } from "../services/userService";
import LoadingButton from "../components/ui/LoadingButton";
import Avatar from "../components/ui/Avatar";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import { useProfile } from "../hooks/useProfile";
import PostCard from "../components/post/PostCard";
import EditProfileModal from "../components/EditProfileModal";
import FollowModal from "../components/FollowModal";
import { useParams } from "react-router-dom";
import type { User } from "../types/user.types";

const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const ProfilePage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { user, useCleanUsername } = useAuth();
  const { posts } = usePosts();
  const { handleFollowUser, handleUnFollowUser } = useProfile();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [followDefaultTab, setFollowDefaultTab] = useState<
    "followers" | "following"
  >("followers");
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowOpen, setIsFollowOpen] = useState(false);
  const [visitedProfile, setVisitedProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const isOwnProfile = !userId || userId === user?._id;

  useEffect(() => {
    if (isOwnProfile) {
      setVisitedProfile(null);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getUserProfile(userId!);
        if (res.success) setVisitedProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, isOwnProfile]);

  if (!user) return null;

  const handleFollowClick = async () => {
    if (!profileUser) return;

    await handleFollowUser({
      _id: profileUser._id!,
      username: profileUser.username,
      name: profileUser.name,
      avatar: profileUser.avatar,
    });

    if (!isOwnProfile) {
      setVisitedProfile((prev) =>
        prev ? { ...prev, followers: [...prev.followers, user] } : prev,
      );
    }
  };

  const handleUnfollowClick = async () => {
    if (!profileUser) return;

    await handleUnFollowUser(profileUser._id!);

    if (!isOwnProfile) {
      setVisitedProfile((prev) =>
        prev
          ? {
              ...prev,
              followers: prev.followers.filter((f) => f._id !== user._id),
            }
          : prev,
      );
    }
  };
  const profileUser = isOwnProfile ? user : visitedProfile;

  if (!isOwnProfile && loading) return null; // or a loading spinner
  if (!profileUser) return null;

  const userPosts = posts.filter((p) => p.userId._id === profileUser._id);

  const isFollowing =
    user.following?.some((f) => f._id === profileUser._id) ?? false;

  return (
    <>
      <div
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="min-h-screen bg-(--background)"
      >
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
        <div className="max-w-3xl mx-auto  md:px-6 mt-2">
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            {/* Avatar */}
            <Avatar
              src={profileUser.avatar}
              name={profileUser.name || profileUser.username}
              size={112}
              className="border-4 border-(--background) rounded-full"
            />

            {/* Action buttons */}
            <div className="flex gap-2 pb-2">
              {isOwnProfile ? (
                <LoadingButton
                  onClick={() => setIsOpen(true)}
                  className="px-5  py-2 rounded-lg text-sm font-medium border border-(--post-card-border) text-(--foreground) hover:bg-[hsl(var(--surface-hover))] transition"
                >
                  Edit profile
                </LoadingButton>
              ) : (
                <>
                  <button
                    onClick={() =>
                      isFollowing ? handleUnfollowClick() : handleFollowClick()
                    }
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
                {profileUser.name ?? profileUser.username}
              </h1>
              {profileUser.isVerified && (
                <BadgeCheck size={18} className="text-purple-500" />
              )}
            </div>
            <p className="text-sm text-gray-400 mb-3">
              @{useCleanUsername(profileUser?.username)}
            </p>
            {profileUser.bio && (
              <p className="text-sm text-(--foreground) leading-relaxed max-w-lg">
                {profileUser.bio}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-8 border-b border-(--post-card-border) pb-5">
            {[
              { label: "Posts", value: userPosts.length },
              { label: "Followers", value: profileUser.followers.length },
              { label: "Following", value: profileUser.following.length },
            ].map(({ label, value }) => (
              <div
                key={label}
                onClick={() => {
                  if (label === "Followers") {
                    setFollowDefaultTab("followers");
                    setIsFollowOpen(true);
                  } else if (label === "Following") {
                    setFollowDefaultTab("following");
                    setIsFollowOpen(true);
                  }
                }}
                className={`flex items-baseline gap-1.5 ${label !== "Posts" ? "cursor-pointer hover:opacity-70 transition" : ""}`}
              >
                <span className="text-base font-semibold text-(--foreground)">
                  {formatCount(value)}
                </span>
                <span className="text-sm text-(--muted-foreground)">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Posts header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition hover:cursor-pointer ${view === "grid" ? "bg-(--post-card-bg) text-(--foreground)" : "text-(--muted-foreground) hover:text-(--foreground)"}`}
              >
                <Grid3X3 size={17} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition hover:cursor-pointer ${view === "list" ? "bg-(--post-card-bg) text-(--foreground)" : "text-(--muted-foreground) hover:text-(--foreground)"}`}
              >
                <List size={17} />
              </button>
            </div>
            <span className="text-xs tracking-widest text-(--muted-foreground) uppercase">
              Gallery
            </span>
          </div>

          {/* Posts */}
          {userPosts.length === 0 ? (
            <p className="text-sm text-(--muted-foreground) text-center py-16">
              No posts yet
            </p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-3 gap-1 pb-10">
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-(--post-card-bg) group"
                >
                  {post.images?.[0] ? (
                    <img
                      src={post.images[0]}
                      className="w-full h-full object-cover transition group-hover:scale-105"
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

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-5">
                    <div className="flex items-center gap-1.5 text-white">
                      <Heart size={18} fill="white" />
                      <span className="text-sm font-medium">
                        {post.likes.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white">
                      <MessageCircle size={18} fill="white" />
                      <span className="text-sm font-medium">
                        {/* {post.comments.length} */}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 pb-10">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={profileUser}
        />
      )}
      <FollowModal
        isOpen={isFollowOpen}
        onClose={() => setIsFollowOpen(false)}
        user={profileUser}
        defaultTab={followDefaultTab}
      />
    </>
  );
};

export default ProfilePage;
