import { useState } from "react";
import { followUser, unfollowUser } from "../services/userService";
import { useAuth } from "./useAuth";
import type { User, UserSummary } from "../types/user.types";
import { toast } from "react-hot-toast";
export const useProfile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleFollowUser = async (targetUser: UserSummary) => {
    if (!user) return;
    const prevFollowing: UserSummary[] = user.following ?? [];

    setUser({
      ...user,
      following: [...prevFollowing, targetUser],
    });

    try {
      await followUser(targetUser._id);
    } catch (error) {
      console.error(error);
      setUser({ ...user, following: prevFollowing });
    }
  };

  const handleUnFollowUser = async (targetUserId: string) => {
    if (!user) return;

    const prevFollowing = user.following ?? [];

    // optimistic update
    setUser({
      ...user,
      following: prevFollowing.filter((f: any) => f._id !== targetUserId),
    });

    try {
      await unfollowUser(targetUserId);
    } catch (error: any) {
      toast.error(error.message);

      // rollback
      setUser({
        ...user,
        following: prevFollowing,
      });
    }
  };

  return {
    handleFollowUser,
    handleUnFollowUser,
    loading,
  };
};
