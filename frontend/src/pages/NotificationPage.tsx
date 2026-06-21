import {
  Heart,
  UserPlus,
  MessageCircle,
  AtSign,
  CheckCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
import { useNotifications } from "../hooks/useNotifications";

type NotificationType =
  | "follow"
  | "follow_request"
  | "follow_request_accepted"
  | "comment"
  | "like";

type Notification = {
  _id: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  postId?: string | null;
  sender: { _id: string; name?: string; username: string; avatar?: string };
};

const ICONS: Record<NotificationType, typeof Heart> = {
  follow: UserPlus,
  follow_request: UserPlus,
  follow_request_accepted: UserPlus,
  comment: MessageCircle,
  like: Heart,
};

const ICON_COLORS: Record<NotificationType, string> = {
  follow: "var(--notif-icon-follow)",
  follow_request: "var(--notif-icon-follow)",
  follow_request_accepted: "var(--notif-icon-follow)",
  comment: "var(--notif-icon-comment)",
  like: "var(--notif-icon-like)",
};

const MESSAGES: Record<NotificationType, string> = {
  follow: "started following you",
  follow_request: "requested to follow you",
  follow_request_accepted: "accepted your follow request",
  comment: "commented on your post",
  like: "liked your post",
};

const NotificationPage = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    loading,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDelete,
    handleAccept,
    handleReject,
  } = useNotifications();

  const handleNotificationClick = (n: Notification) => {
    if (!n.isRead) handleMarkAsRead(n._id);

    if ((n.type === "like" || n.type === "comment") && n.postId) {
      navigate(`/post/${n.postId}`);
    } else if (
      n.type === "follow" ||
      n.type === "follow_request" ||
      n.type === "follow_request_accepted"
    ) {
      navigate(`/profile/${n.sender._id}`);
    }
  };

  return (
    <div
      style={{ fontFamily: "var(--font-body)" }}
      className="min-h-screen bg-(--background)"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-2xl text-(--foreground)"
            >
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-(--muted-foreground) mt-1">
                {unreadCount} unread
              </p>
            )}
          </div>

          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1.5 text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) transition px-3 py-1.5 rounded-lg hover:bg-(--surface-hover)"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-(--muted-foreground) text-center py-10">
            Loading...
          </p>
        )}

        {/* List */}
        {!loading && notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-(--surface) flex items-center justify-center mb-4">
              <Heart size={22} className="text-(--muted-foreground)" />
            </div>
            <p className="text-(--foreground) font-medium mb-1">
              No notifications yet
            </p>
            <p className="text-sm text-(--muted-foreground)">
              When something happens, it'll show up here
            </p>
          </div>
        ) : (
          <div className="flex flex-col rounded-2xl border border-(--post-card-border) overflow-hidden bg-(--post-card-bg)">
            {(notifications as Notification[]).map((n, i) => {
              const Icon = ICONS[n.type];
              return (
                <div
                  key={n._id}
                  onClick={() => handleNotificationClick(n)}
                  className={`flex items-start gap-3 px-4 py-3.5 transition cursor-pointer hover:bg-(--surface-hover) ${
                    i !== notifications.length - 1
                      ? "border-b border-(--post-card-border)"
                      : ""
                  }`}
                  style={{
                    background: !n.isRead
                      ? "var(--notif-unread-bg)"
                      : "transparent",
                    borderLeft: !n.isRead
                      ? "3px solid var(--notif-unread-border)"
                      : "3px solid transparent",
                  }}
                >
                  {/* Avatar + type icon */}
                  <div className="relative shrink-0">
                    <Avatar
                      src={n.sender.avatar}
                      name={n.sender.name || n.sender.username}
                      size={42}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-(--post-card-bg)"
                      style={{ background: "var(--surface-elevated)" }}
                    >
                      <Icon size={11} style={{ color: ICON_COLORS[n.type] }} />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[hsl(var(--text-primary))] leading-relaxed">
                      <span className="font-semibold">
                        {n.sender.name || n.sender.username}
                      </span>{" "}
                      <span className="text-[hsl(var(--text-muted))]">
                        {MESSAGES[n.type]}
                      </span>
                    </p>
                    <p className="text-xs text-[hsl(var(--text-muted))] mt-1.5">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>

                    {/* Accept / Reject buttons for follow requests */}
                    {n.type === "follow_request" && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(n.sender._id, n._id);
                          }}
                          className="px-3 py-1 text-xs font-medium rounded-lg text-white transition"
                          style={{ background: "#533483" }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(n.sender._id, n._id);
                          }}
                          className="px-3 py-1 text-xs font-medium rounded-lg border border-[hsl(var(--post-card-border))] text-[hsl(var(--text-muted))] hover:text-red-500 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 mt-1">
                    {!n.isRead && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--notif-unread-border)" }}
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(n._id);
                      }}
                      className="text-xs text-(--muted-foreground) hover:text-red-500 transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
