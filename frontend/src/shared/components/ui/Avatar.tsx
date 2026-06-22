import { useState } from "react";

type AvatarProps = {
  src?: string | null;
  name?: string;
  size?: number;
  className?: string;
};

const Avatar = ({
  src,
  name = "User",
  size = 40,
  className = "",
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const showFallback = !src || imgError;

  const fallbackBg =
    "linear-gradient(145deg, hsl(268 38% 42%) 0%, hsl(232 42% 26%) 100%)";

  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden font-semibold ${
        showFallback ? "text-white" : "bg-(--surface-hover) text-(--foreground)"
      } ${className}`}
      style={{
        width: size,
        height: size,
        ...(showFallback ? { background: fallbackBg } : {}),
      }}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="leading-none" style={{ fontSize: Math.max(11, size * 0.38) }}>
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;
