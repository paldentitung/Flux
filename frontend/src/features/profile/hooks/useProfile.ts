import { useState } from "react";
import {
  changeAvatar,
  followUser,
  removeAvatar,
  unfollowUser,
  updateProfile,
  changePassword,
  blockUser,
  unblockUser,
  toggleUserPrivary,
  getBlockedUsers,
  toggleNotficationPreferences,
} from "../services/userService";
import { useAuth } from "../../auth/hooks/useAuth";
import type { UpdateProfileData, UserSummary } from "../types/user.types";
import { toast } from "react-hot-toast";
import type { NotificationPreferences } from "../types/user.types";
export const useProfile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<UserSummary[]>([]);

  const handleFollowUser = async (targetUser: UserSummary) => {
    if (!user) return;
    const prevFollowing: UserSummary[] = user.following ?? [];

    setUser({
      ...user,
      following: [...prevFollowing, targetUser],
    });

    try {
      await followUser(targetUser._id);
    } catch (error: any) {
      toast.error(error.message);
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

  const handleChangeAvatar = async (avatar: File) => {
    if (!user) return;
    const previousAvatar = user.avatar;
    const optimisticUrl = URL.createObjectURL(avatar);

    setUser({ ...user, avatar: { url: optimisticUrl, publicId: "" } });

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const res = await changeAvatar(formData);

      if (res.success) {
        setUser({ ...user, avatar: res.data.avatar });
        toast.success("Avatar changed");
      }
    } catch (error: any) {
      setUser({ ...user, avatar: previousAvatar });
      toast.error(error.message);
    } finally {
      URL.revokeObjectURL(optimisticUrl);
    }
  };

  const handleUpdateProfile = async (formData: UpdateProfileData) => {
    if (!user) return;
    const previousData = { name: user.name, bio: user.bio };

    setLoading(true);
    setUser({ ...user, ...formData });

    try {
      const res = await updateProfile(formData);

      if (res.success) {
        setUser({ ...user, ...res.data });
        toast.success(res.message);
      }
    } catch (error: any) {
      setUser({ ...user, ...previousData });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user) return;
    const previousAvatar = user.avatar;

    setUser({ ...user, avatar: null });
    setLoading(true);

    try {
      const res = await removeAvatar();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      setUser({ ...user, avatar: previousAvatar });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    setLoading(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (id: string) => {
    setLoading(true);
    try {
      const res = await blockUser(id);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUnBlockUser = async (id: string) => {
    setLoading(true);
    const previous = blockedUsers;
    setBlockedUsers((prev) => prev.filter((u) => u._id !== id));
    try {
      const res = await unblockUser(id);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      setBlockedUsers(previous);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserPrivary = async () => {
    try {
      const res = await toggleUserPrivary();
      if (res.success) {
        toast.success(res.message);
        setUser((prev) =>
          prev ? { ...prev, isPrivate: res.data.isPrivate } : prev,
        );
      } else {
        toast.error(res.message ?? "Failed to update privacy");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to update privacy");
    }
  };

  const fetchBlockedUsers = async () => {
    try {
      const res = await getBlockedUsers();
      if (res.success) {
        setBlockedUsers(res.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleNotificationPreferences = async (
    updated: NotificationPreferences,
  ) => {
    try {
      const res = await toggleNotficationPreferences(updated);
      if (res.success) {
        setBlockedUsers(res.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    handleFollowUser,
    handleUnFollowUser,
    loading,
    handleChangeAvatar,
    handleUpdateProfile,
    handleRemoveAvatar,
    handleChangePassword,
    handleBlockUser,
    handleUnBlockUser,
    handleToggleUserPrivary,
    fetchBlockedUsers,
    blockedUsers,
    handleNotificationPreferences,
  };
};
