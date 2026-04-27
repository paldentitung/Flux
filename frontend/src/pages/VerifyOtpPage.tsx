import { Sparkles } from "lucide-react";

const VerifyOtpPage = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden md:flex flex-col justify-between p-12 overflow-hidden bg-[hsl(var(--surface))] border-r border-[hsl(var(--border))]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(60% 60% at 30% 20%, hsl(239 84% 35% / 0.5), transparent 70%), radial-gradient(50% 50% at 80% 80%, hsl(266 84% 45% / 0.4), transparent 70%)",
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span
              className="grid place-items-center h-9 w-9 rounded-xl shadow-(--shadow-glow)"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-4 w-4 text-[hsl(var(--primary-foreground))]" />
            </span>
            <span className="text-xl font-semibold text-[hsl(var(--foreground))]">
              Flux
            </span>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight max-w-md text-[hsl(var(--foreground))]">
            Back in a{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              moment
            </span>
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-sm leading-relaxed">
            Enter the code we sent to reset your password.
          </p>
        </div>

        <div className="relative text-xs text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} Flux
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Enter the code
            </h2>
            <p>
              We sent a 6-digit OTP to{" "}
              <span className="text-[hsl(var(--foreground))] font-medium">
                / email/
              </span>
              . It expires in 10 minutes.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-2 block">
                One-time code
              </label>
              <div className="flex gap-2.5">
                {Array(6)
                  .fill("")
                  .map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="input-auth text-center text-xl font-semibold w-full aspect-square"
                    />
                  ))}
              </div>
            </div>

            <button
              className="w-full h-11 rounded-xl text-[hsl(var(--primary-foreground))] text-sm font-semibold shadow-(--shadow-glow) hover:opacity-90 transition-opacity"
              style={{ background: "var(--gradient-primary)" }}
            >
              Verify OTP
            </button>
          </div>

          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
            Didn't receive it?{" "}
            <button className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors">
              Resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
