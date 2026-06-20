import AppError from "../../utils/AppError.js";
import * as notificationService from "./notifications.service.js";

export const getMyNotifications = async (req, res) => {
  const { notifications, unreadCount } =
    await notificationService.getMyNotifications(req.user._id);

  res.status(200).json({
    success: true,
    unreadCount,
    count: notifications.length,
    data: notifications,
  });
};

export const markAsRead = async (req, res) => {
  const notification = await notificationService.markAsRead(
    req.params.id,
    req.user._id,
  );

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification,
  });
};

export const markAllAsRead = async (req, res) => {
  const modifiedCount = await notificationService.markAllAsRead(req.user._id);

  res.status(200).json({
    success: true,
    message: `${modifiedCount} notification(s) marked as read`,
  });
};

export const deleteNotification = async (req, res) => {
  const notification = await notificationService.deleteNotification(
    req.params.id,
    req.user._id,
  );

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Notification deleted",
  });
};
