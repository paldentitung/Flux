import {
  Heart,
  UserPlus,
  MessageCircle,
  AtSign,
  CheckCheck,
} from "lucide-react";
import Avatar from "../components/ui/Avatar";

type NotificationType = "like" | "follow" | "comment" | "mention";

type Notification = {
  _id: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  actor: { _id: string; name?: string; username: string; avatar?: string };
  postPreview?: string;
};

const ICONS: Record<NotificationType, typeof Heart> = {
  like: Heart,
  follow: UserPlus,
  comment: MessageCircle,
  mention: AtSign,
};

const ICON_COLORS: Record<NotificationType, string> = {
  like: "var(--notif-icon-like)",
  follow: "var(--notif-icon-follow)",
  comment: "var(--notif-icon-comment)",
  mention: "var(--notif-icon-message)",
};

const MESSAGES: Record<NotificationType, string> = {
  like: "liked your post",
  follow: "started following you",
  comment: "commented on your post",
  mention: "mentioned you in a comment",
};

const notifications: Notification[] = [
  {
    _id: "1",
    type: "follow",
    read: false,
    createdAt: "2m ago",
    actor: {
      _id: "u1",
      name: "Ramesh Shrestha",
      username: "ramesh",
      avatar: "",
    },
  },
  {
    _id: "2",
    type: "like",
    read: false,
    createdAt: "14m ago",
    actor: { _id: "u2", name: "Sita Gurung", username: "sitag", avatar: "" },
    postPreview: "Just shipped the new dashboard redesign 🎉",
  },
  {
    _id: "3",
    type: "comment",
    read: false,
    createdAt: "1h ago",
    actor: {
      _id: "u3",
      name: "Bikash Thapa",
      username: "bikash_t",
      avatar: "",
    },
    postPreview: "This is exactly what I needed, thanks for sharing!",
  },
  {
    _id: "4",
    type: "mention",
    read: true,
    createdAt: "3h ago",
    actor: { _id: "u4", name: "Anjali Rai", username: "anjalir", avatar: "" },
    postPreview: "@you check this out when you get a chance",
  },
  {
    _id: "5",
    type: "like",
    read: true,
    createdAt: "5h ago",
    actor: { _id: "u5", name: "Prakash KC", username: "prakashkc", avatar: "" },
    postPreview: "Refactored the auth flow, much cleaner now",
  },
  {
    _id: "6",
    type: "follow",
    read: true,
    createdAt: "1d ago",
    actor: { _id: "u6", name: "Maya Tamang", username: "mayat", avatar: "" },
  },
  {
    _id: "7",
    type: "comment",
    read: true,
    createdAt: "2d ago",
    actor: { _id: "u7", name: "Dawa Lama", username: "dawal", avatar: "" },
    postPreview: "Great write-up on state management patterns",
  },
];

const NotificationPage = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

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

          <button className="flex items-center gap-1.5 text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) transition px-3 py-1.5 rounded-lg hover:bg-(--surface-hover)">
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>

        {/* List */}
        {notifications.length === 0 ? (
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
            {notifications.map((n, i) => {
              const Icon = ICONS[n.type];
              return (
                <div
                  key={n._id}
                  className={`flex items-start gap-3 px-4 py-3.5 transition cursor-pointer hover:bg-(--surface-hover) ${
                    i !== notifications.length - 1
                      ? "border-b border-(--post-card-border)"
                      : ""
                  }`}
                  style={{
                    background: !n.read
                      ? "var(--notif-unread-bg)"
                      : "transparent",
                    borderLeft: !n.read
                      ? "3px solid var(--notif-unread-border)"
                      : "3px solid transparent",
                  }}
                >
                  {/* Avatar + type icon */}
                  <div className="relative shrink-0">
                    <Avatar
                      src={n.actor.avatar}
                      name={n.actor.name || n.actor.username}
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
                    <p className="text-sm text-(--foreground) leading-relaxed">
                      <span className="font-semibold">
                        {n.actor.name || n.actor.username}
                      </span>{" "}
                      <span className="text-(--muted-foreground)">
                        {MESSAGES[n.type]}
                      </span>
                    </p>
                    {n.postPreview && (
                      <p className="text-sm text-(--muted-foreground) mt-1 truncate">
                        "{n.postPreview}"
                      </p>
                    )}
                    <p className="text-xs text-(--muted-foreground) mt-1.5">
                      {n.createdAt}
                    </p>
                  </div>

                  {!n.read && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0 mt-2"
                      style={{ background: "var(--notif-unread-border)" }}
                    />
                  )}
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
