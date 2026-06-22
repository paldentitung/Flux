import request from "../../../shared/services/api";

export const getMyNotifications = () => request("/notifications", {}, true);

export const markAsRead = (id: string) =>
  request(`/notifications/${id}/read`, { method: "PATCH" }, true);

export const markAllAsRead = () =>
  request("/notifications/read-all", { method: "PATCH" }, true);

export const deleteNotification = (id: string) =>
  request(`/notifications/${id}`, { method: "DELETE" }, true);

export const acceptFollowRequest = (requesterId: string) =>
  request(
    `/user/follow-requests/${requesterId}/accept`,
    { method: "POST" },
    true,
  );

export const rejectFollowRequest = (requesterId: string) =>
  request(
    `/user/follow-requests/${requesterId}/reject`,
    { method: "POST" },
    true,
  );
