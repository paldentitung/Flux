const LoginPage = () => {
  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-8 lg:px-16">
        <div className="flex flex-col gap-7 w-full max-w-sm">
          <div className="flex flex-col gap-1">
            <h2 className="text-[22px] lg:text-[28px] font-bold text-[hsl(var(--foreground))] tracking-tight leading-none">
              Welcome back
            </h2>
            <p className="text-[13px] lg:text-[15px] text-[hsl(var(--muted-foreground))] leading-relaxed">
              Sign in to pick up where you left off.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[11px] lg:text-[12px] font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="input-auth"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[11px] lg:text-[12px] font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-[12px] lg:text-[13px] text-(--auth-link) hover:text-[hsl(var(--accent))] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input-auth"
              />
            </div>

            <button className="w-full mt-1 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.85)] text-white text-sm lg:text-base font-semibold rounded-lg py-2.5 transition-colors">
              Sign in
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-[13px] lg:text-[14px] text-[hsl(var(--muted-foreground))]">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-(--auth-link) font-bold hover:text-[hsl(var(--accent))] transition-colors"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
      <div
        style={{ background: "var(--gradient-surface)" }}
        className="relative overflow-hidden items-center justify-center hidden lg:flex"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/30 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/30 blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        ></div>

        <div className="relative z-10 max-w-md flex flex-col space-y-7">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-[hsl(var(--sidebar-foreground))] font-semibold text-base tracking-tight">
              Flux
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-[hsl(var(--primary))] shrink-0" />
              <span className="text-[hsl(var(--accent))] text-[11px] font-medium tracking-widest uppercase">
                Social, reimagined
              </span>
            </div>
            <h1 className="text-[2rem] lg:text-[2.5rem] font-bold leading-[1.15] tracking-[-0.035em] text-[hsl(var(--foreground))]">
              Where moments
              <br />
              meet meaning.
            </h1>
          </div>

          <p className="text-sm lg:text-base leading-[1.75] text-[hsl(var(--muted-foreground))] max-w-85">
            A quieter, more editorial place to share what you're making,
            reading, and thinking. No infinite scroll. No engagement traps.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <span className="w-1 h-1 rounded-full bg-[hsl(var(--primary))]" />
            <span className="text-xs text-[hsl(var(--muted-foreground)/0.5)] tracking-wide">
              Flux · 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
