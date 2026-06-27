const FluxLogo = ({
  size = 32,
  showText = true,
}: {
  size?: number;
  showText?: boolean;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          borderRadius: size * 0.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13 3L4 14h8l-1 7 9-11h-8l1-10z"
            fill="white"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <span
          style={{
            fontSize: size * 0.625,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #a5b4fc, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          Flux
        </span>
      )}
    </div>
  );
};

export default FluxLogo;
