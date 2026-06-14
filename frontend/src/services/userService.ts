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
