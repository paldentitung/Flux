import { useState, useEffect, useRef } from "react";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../services/notificationService";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuth } from "../../auth/hooks/useAuth";

import { getNotificationMessage } from "../helper/getNotificationMessage";
import { playNotificationSound } from "../helper/PlayNotificationSound";
import { NotificationsContext } from "../../../shared/context/createContext";
import { Socket } from "socket.io-client";
export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
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
      if (res.success) toast.success(res.message);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (requesterId: string, notificationId: string) => {
    try {
      const res = await rejectFollowRequest(requesterId);
      if (res.success) toast.success(res.message);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      query: { userId: user._id },
      withCredentials: true,
    });

    // save to ref
    socketRef.current = socket;

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      playNotificationSound();
      toast.success(
        `${notification.sender?.username} ${getNotificationMessage(notification.type)}`,
      );
    });
    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("userOnline", (userId: string) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    socket.on("userOffline", (userId: string) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    return () => {
      socket.off("newNotification");
      socket.off("onlineUsers");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?._id]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        socket: socketRef.current,
        fetchNotifications,
        handleMarkAsRead,
        handleMarkAllAsRead,
        handleDelete,
        handleAccept,
        handleReject,
        onlineUsers,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
