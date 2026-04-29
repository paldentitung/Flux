import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingButton from "../components/ui/LoadingButton";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const { handleLogin, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Fill up all the fields");
    }

    await handleLogin(formData);
  };
  return (
    <div className="min-h-screen grid md:grid-cols-2">
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
            A quieter place to{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              share what matters
            </span>
            .
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-sm leading-relaxed">
            Built for writers, designers, and slow thinkers who still believe
            the feed can be beautiful.
          </p>
          <div className="flex items-center gap-4 pt-4">
            {[12, 32, 47, 8].map((i, idx) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/80?img=${i}`}
                alt=""
                className="h-9 w-9 rounded-full ring-2 ring-[hsl(var(--background))] object-cover"
                style={{ marginLeft: idx ? -14 : 0 }}
              />
            ))}
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              Joined this week · 2,340 people
            </span>
          </div>
        </div>

        <div className="relative text-xs text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} Flux
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Welcome back
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Sign in to pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-auth"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-(--auth-link) hover:text-[hsl(var(--accent))] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-auth"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-3 top-3"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingText="Signing up…"
              className="w-full h-11 rounded-xl text-[hsl(var(--primary-foreground))] text-sm font-semibold shadow-(--shadow-glow) hover:opacity-90 hover:cursor-pointer"
              style={{ background: "var(--gradient-primary)" }}
            >
              Sign up
            </LoadingButton>
          </form>

          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
