import { Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
const VerifyOtpPage = () => {
  const { handleVerifyOtp, loading } = useAuth();

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // numbers only
    const updated = [...digits];
    updated[index] = value.slice(-1);
    setDigits(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus(); // auto-advance
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // back on delete
    }
  };

  const handleSubmit = async () => {
    const otp = digits.join("");
    if (otp.length < 6) return;
    await handleVerifyOtp(otp);
  };

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
            Enter the code we sent to verify your account.
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
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              We sent a 6-digit OTP to{" "}
              <span className="text-[hsl(var(--foreground))] font-medium">
                {email}
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
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="input-auth text-center text-xl font-semibold w-full aspect-square"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || digits.join("").length < 6}
              className="w-full h-11 rounded-xl text-[hsl(var(--primary-foreground))] text-sm font-semibold shadow-(--shadow-glow) hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "var(--gradient-primary)" }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
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
