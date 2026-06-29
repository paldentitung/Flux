import type { Socket } from "socket.io-client";

export type NotificationsContextType = {
  notifications: any[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  handleMarkAsRead: (id: string) => Promise<void>;
  handleMarkAllAsRead: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleAccept: (requesterId: string, notificationId: string) => Promise<void>;
  handleReject: (requesterId: string, notificationId: string) => Promise<void>;
  onlineUsers: string[];
  socket: Socket | null;
};
