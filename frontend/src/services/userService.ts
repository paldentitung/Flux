import type {
  UpdateProfileData,
  NotificationPreferences,
} from "../types/user.types";
import request from "../shared/services/api";

export const followUser = async (targetUserId: string) => {
  return request(
    `/user/${targetUserId}/follow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    true,
  );
};
export const unfollowUser = async (targetUserId: string) => {
  return request(
    `/user/${targetUserId}/unfollow`,
    {
      method: "DELETE",
    },
    true,
  );
};

export const changeAvatar = async (formData: FormData) => {
  return request(
    "/user/me/avatar",
    {
      method: "PATCH",
      body: formData,
    },
    true,
  );
};
export const removeAvatar = async () => {
  return request(
    "/user/me/avatar",
    {
      method: "DELETE",
    },
    true,
  );
};

export const updateProfile = async (formData: UpdateProfileData) => {
  return request(
    "/user/me/profile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    true,
  );
};

export const getUserProfile = async (userId: string) => {
  return request(`/user/user/${userId}`, {}, true);
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  return request(
    "/user/me/password",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    },
    true,
  );
};

export const blockUser = async (id: string) => {
  return request(
    `/user/${id}/block`,
    {
      method: "POST",
    },
    true,
  );
};
export const unblockUser = async (id: string) => {
  return request(
    `/user/${id}/unblock`,
    {
      method: "POST",
    },
    true,
  );
};

export const toggleUserPrivary = async () => {
  return request(
    "/user/me/privacy",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
    true,
  );
};

export const getBlockedUsers = async () => {
  return request(
    "/user/me/blocked",
    {
      method: "GET",
    },
    true,
  );
};

export const toggleNotficationPreferences = async (
  updated: NotificationPreferences,
) => {
  return request(
    "/user/me/notification-preferences",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    },
    true,
  );
};
