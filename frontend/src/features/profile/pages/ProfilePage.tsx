import { useState, useEffect } from "react";
import {
  Grid3X3,
  List,
  BadgeCheck,
  Heart,
  MessageCircle,
  Ban,
  Ellipsis,
  Lock,
} from "lucide-react";
import { getUserProfile } from "../services/userService";
import LoadingButton from "../../../shared/components/ui/LoadingButton";
import Avatar from "../../../shared/components/ui/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { usePosts } from "../../posts/hooks/usePosts";
import { useProfile } from "../hooks/useProfile";
import PostCard from "../../posts/components/PostCard";
import EditProfileModal from "../components/EditProfileModal";
import FollowModal from "../components/FollowModal";
import { useParams, useNavigate } from "react-router-dom";
import type { User } from "../types/user.types";
import toast from "react-hot-toast";
import ProfileImageModal from "../components/ProfileImageModal";
import { Link } from "react-router-dom";
const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const ProfilePage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const { user, useCleanUsername } = useAuth();
  const { posts } = usePosts();
  const {
    handleFollowUser,
    handleUnFollowUser,
    handleBlockUser,
    handleUnBlockUser,
  } = useProfile();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [followDefaultTab, setFollowDefaultTab] = useState<
    "followers" | "following"
  >("followers");
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowOpen, setIsFollowOpen] = useState(false);
  const [visitedProfile, setVisitedProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [isBlockedByUser, setIsBlockedByUser] = useState(false);
  const isOwnProfile = !userId || userId === user?._id;
  const [open, setOpen] = useState(false);
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  useEffect(() => {
    if (isOwnProfile) {
      setVisitedProfile(null);
      setIsBlockedByUser(false);
      setIsPrivateAccount(false);
      return;
    }
    setHasRequested(false);
    const fetchProfile = async () => {
      setLoading(true);
      setIsBlockedByUser(false);
      setIsPrivateAccount(false);
      try {
        const res = await getUserProfile(userId!);
        if (res.success) setVisitedProfile(res.data);
      } catch (err: any) {
        if (err?.message === "You are blocked by this user") {
          setIsBlockedByUser(true);
        } else if (err?.message === "This account is private") {
          setIsPrivateAccount(true);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, isOwnProfile]);

  if (!user) return null;
  const handleFollowClick = async () => {
    const targetId = profileUser?._id ?? userId;
    if (!targetId) return;

    await handleFollowUser({
      _id: targetId,
      username: profileUser?.username ?? "",
      name: profileUser?.name ?? "",
      avatar: profileUser?.avatar ?? "",
    });

    if (!isOwnProfile && profileUser) {
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

  const handleBlockClick = async () => {
    if (!profileUser) return;

    setIsBlocking(true);
    try {
      await handleBlockUser(profileUser._id!);
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to block user");
    } finally {
      setIsBlocking(false);
    }
  };

  const handleUnblockClick = async () => {
    if (!profileUser) return;

    setIsBlocking(true);
    try {
      await handleUnBlockUser(profileUser._id!);
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to unblock user");
    } finally {
      setIsBlocking(false);
    }
  };
  const profileUser = isOwnProfile ? user : visitedProfile;
  const isUserBlocked =
    user.blockedUsers?.some((b: any) =>
      typeof b === "string"
        ? b === profileUser?._id
        : b._id === profileUser?._id,
    ) ?? false;

  if (!isOwnProfile && loading) return null; // or a loading spinner

  if (!isOwnProfile && isBlockedByUser) {
    return (
      <div className="min-h-screen bg-(--background) flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-(--post-card-bg) border border-(--post-card-border)">
            <Ban size={28} className="text-(--muted-foreground)" />
          </div>
          <h1 className="text-xl text-(--foreground) mb-2">
            This account is unavailable
          </h1>
          <p className="text-sm text-(--muted-foreground) leading-relaxed">
            You can't view this profile right now.
          </p>
        </div>
      </div>
    );
  }
  if (!isOwnProfile && isPrivateAccount) {
    return (
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
        </div>

        <div className="max-w-3xl mx-auto md:px-6 mt-2">
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            {/* Avatar — no src since profile is private, show initials fallback */}
            <Avatar
              src={undefined}
              name={userId!}
              size={112}
              className="border-4 border-(--background) rounded-full"
            />

            {/* Follow Request button */}
            <div className="pb-2">
              <button
                onClick={async () => {
                  await handleFollowClick();
                  setHasRequested(true);
                }}
                disabled={hasRequested}
                className="px-5 py-2 rounded-lg text-sm font-medium transition active:opacity-15 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#533483", color: "#fff" }}
              >
                {hasRequested ? "Requested" : "Request to Follow"}
              </button>
            </div>
          </div>

          {/* Private notice */}
          <div className="flex flex-col items-center text-center py-16 gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-(--post-card-bg) border border-(--post-card-border)">
              <Lock size={24} className="text-(--muted-foreground)" />
            </div>
            <h2 className="text-lg text-(--foreground)">
              This account is private
            </h2>
            <p className="text-sm text-(--muted-foreground)">
              Follow this account to see their photos and posts.
            </p>
          </div>
        </div>
      </div>
    );
  }
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
            <button onClick={() => setShowProfilePicture(true)}>
              <Avatar
                src={profileUser.avatar}
                name={profileUser.name || profileUser.username}
                size={112}
                className="border-4 border-(--background) rounded-full"
              />
            </button>

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
                <div className="flex gap-2 items-center">
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

                  <div className="relative mt-1">
                    <button onClick={() => setOpen(!open)}>
                      <Ellipsis />
                    </button>

                    {open && (
                      <div className="absolute right-0 top-6 bg-(--post-card-bg) border border-(--post-card-border) rounded-lg shadow-lg z-10 w-36 py-1">
                        <button
                          onClick={
                            isUserBlocked
                              ? handleUnblockClick
                              : handleBlockClick
                          }
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[hsl(var(--surface-hover))] transition"
                        >
                          {isUserBlocked ? "Unblock User" : "Block User"}
                        </button>

                        <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[hsl(var(--surface-hover))] transition">
                          Report User
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
                <Link
                  to={`/post/${post._id}`}
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
                </Link>
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

      <ProfileImageModal
        isOpen={showProfilePicture}
        imageUrl={profileUser.avatar}
        name={profileUser.name || profileUser.username}
        onClose={() => setShowProfilePicture(false)}
      />
    </>
  );
};

export default ProfilePage;
