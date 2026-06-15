import type { UpdateProfileData } from "../types/user.types";
import request from "./api";

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
