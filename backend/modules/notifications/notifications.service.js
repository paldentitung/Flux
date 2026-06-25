import Notification from "./notifications.model.js";
import { getIO, getSocketId } from "../../config/socket.js";
const TYPE_TO_PREF_KEY = {
  follow: "follow",
  follow_request: "followRequest",
  follow_request_accepted: "followRequestAccepted",
  comment: "comment",
  like: "like",
};
import User from "../users/user.model.js";

export default TYPE_TO_PREF_KEY;
/**
 * Create a notification.
 * Called internally from user.service.js when a follow action occurs.
 */
export const createNotification = async ({
  recipient,
  sender,
  type,
  postId = null,
}) => {
  if (recipient.toString() === sender.toString()) return null;

  const recipientUser = await User.findById(recipient).select(
    "notificationPreferences",
  );
  const prefKey = TYPE_TO_PREF_KEY[type];
  if (
    recipientUser &&
    recipientUser.notificationPreferences?.[prefKey] === false
  ) {
    return null;
  }
  // Avoid duplicate unread notifications of the same type between the same users
  const existing = await Notification.findOne({
    recipient,
    sender,
    type,
    isRead: false,
  });
  if (existing) return existing;

  const notification = await Notification.create({
    recipient,
    sender,
    type,
    postId,
  });
  const populated = await notification.populate("sender", "username avatar");

  const socketId = getSocketId(recipient.toString());
  if (socketId) {
    getIO().to(socketId).emit("newNotification", populated);
  }
  return notification;
};

/**
 * Get all notifications for the logged-in user.
 * Returns notifications with populated sender info + unread count.
 */
export const getMyNotifications = async (userId) => {
  const notifications = await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .populate("sender", "username avatar")
    .lean();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { notifications, unreadCount };
};

// Mark a single notification as read.

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true },
    { new: true },
  );
  return notification;
};

// sMark all notifications as read for a user.

export const markAllAsRead = async (userId) => {
  const result = await Notification.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true },
  );
  return result.modifiedCount;
};

// Delete a single notification.
export const deleteNotification = async (notificationId, userId) => {
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: userId,
  });
  return notification;
};
