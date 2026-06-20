import Notification from "./notifications.model.js";

/**
 * Create a notification.
 * Called internally from user.service.js when a follow action occurs.
 */
export const createNotification = async ({ recipient, sender, type }) => {
  if (recipient.toString() === sender.toString()) return null;

  // Avoid duplicate unread notifications of the same type between the same users
  const existing = await Notification.findOne({
    recipient,
    sender,
    type,
    isRead: false,
  });
  if (existing) return existing;

  const notification = await Notification.create({ recipient, sender, type });
  return notification;
};

/**
 * Get all notifications for the logged-in user.
 * Returns notifications with populated sender info + unread count.
 */
export const getMyNotifications = async (userId) => {
  const notifications = await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .populate("sender", "username profilePicture")
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
