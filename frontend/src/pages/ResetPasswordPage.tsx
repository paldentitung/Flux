import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            Almost{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              there
            </span>
            .
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-sm leading-relaxed">
            Create a new password. Make it strong — you won't have to do this
            again.
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
              Reset password
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Choose a new password for your account.
            </p>
          </div>

          <div className="space-y-4">
            {/* New password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="input-auth"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirm-password"
                className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="input-auth"
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3"
                >
                  {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button
              className="w-full h-11 rounded-xl text-[hsl(var(--primary-foreground))] text-sm font-semibold shadow-(--shadow-glow) hover:opacity-90 transition-opacity hover:cursor-pointer"
              style={{ background: "var(--gradient-primary)" }}
            >
              Reset password
            </button>
          </div>

          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
            Back to{" "}
            <a
              href="/login"
              className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
