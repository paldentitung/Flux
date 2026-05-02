import { Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth.ts";
import { useState } from "react";
import LoadingButton from "../components/ui/LoadingButton";

const ForgotPasswordPage = () => {
  const { handleForgotPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
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
            .
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-sm leading-relaxed">
            Enter your email and we'll send a one-time code to get you back in.
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
              Forgot password?
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              No worries — enter your email and we'll send you a reset code.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPassword({ email });
            }}
            className="space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-auth"
              />
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingText="Sending…"
              variant="primary"
              className="w-full h-11 rounded-xl text-sm font-semibold"
            >
              Send OTP
            </LoadingButton>
          </form>

          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
            Remembered it?{" "}
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

export default ForgotPasswordPage;
