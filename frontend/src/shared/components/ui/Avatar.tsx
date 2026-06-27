import { useContext, useState } from "react";
import { NotificationsContext } from "../../context/createContext";
import { useNotifications } from "../../../features/notifications/hooks/useNotifications";

type AvatarProps = {
  src?: string | null;
  name?: string;
  size?: number;
  className?: string;
  userId?: string;
  showOnlineStatus?: boolean;
};

const Avatar = ({
  src,
  name = "User",
  size = 40,
  className = "",
  userId,
  showOnlineStatus = false,
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const { onlineUsers } = useNotifications();

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const showFallback = !src || imgError;
  const fallbackBg =
    "linear-gradient(145deg, hsl(268 38% 42%) 0%, hsl(232 42% 26%) 100%)";
  const isOnline =
    showOnlineStatus && userId
      ? onlineUsers.some((id) => id.toString() === userId.toString())
      : false;

  const dotSize = Math.max(8, size * 0.24);

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`flex items-center justify-center rounded-full overflow-hidden font-semibold ${
          showFallback
            ? "text-white"
            : "bg-(--surface-hover) text-(--foreground)"
        } ${className}`}
        style={{
          width: size,
          height: size,
          ...(showFallback ? { background: fallbackBg } : {}),
        }}
      >
        {!showFallback ? (
          <img
            src={src!}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className="leading-none"
            style={{ fontSize: Math.max(11, size * 0.38) }}
          >
            {initials}
          </span>
        )}
      </div>

      {showOnlineStatus && (
        <span
          className={`absolute bottom-0.5 right-0.5 rounded-full ring-2 ring-(--background) transition-colors ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
          style={{ width: dotSize, height: dotSize }}
        />
      )}
    </div>
  );
};
export default Avatar;
