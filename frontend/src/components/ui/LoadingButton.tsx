import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: Variant;
}

const variants: Record<
  Variant,
  { className: string; style?: React.CSSProperties }
> = {
  primary: {
    className:
      "text-[hsl(var(--primary-foreground))] shadow-(--shadow-glow) hover:opacity-90 disabled:opacity-70",
    style: { background: "var(--gradient-primary)" },
  },
  ghost: {
    className:
      "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface))]",
  },
};

const LoadingButton = ({
  loading = false,
  loadingText = "Loading…",
  variant = "primary",
  children,
  disabled,
  className = "",
  style,
  ...props
}: LoadingButtonProps) => {
  const v = variants[variant];

  return (
    <button
      disabled={loading || disabled}
      className={`flex items-center justify-center gap-2 transition-all
        disabled:cursor-not-allowed ${v.className} ${className}`}
      style={{ ...v.style, ...style }}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-30"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
