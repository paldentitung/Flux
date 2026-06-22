import { useState, useEffect } from "react";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../services/notificationService";
import toast from "react-hot-toast";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await getMyNotifications();
      if (res.success) {
        setNotifications(res.data);
        setUnreadCount(res.unreadCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      const deleted = notifications.find((n) => n._id === id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      if (deleted && !deleted.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleAccept = async (requesterId: string, notificationId: string) => {
    try {
      const res = await acceptFollowRequest(requesterId);
      // remove the follow_request notification, it's done

      if (res.success) {
        toast.success(res.message);
      }
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (requesterId: string, notificationId: string) => {
    try {
      const res = await rejectFollowRequest(requesterId);
      if (res.success) {
        toast.success(res.message);
      }
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDelete,
    handleAccept,
    handleReject,
  };
};
