const RightSidebar = () => {
  const users = [
    {
      image: "../favicon.svg",
      name: "Kai Tanaka",
      handle: "@kaitanaka",
    },
    {
      image: "../favicon.svg",
      name: "Maya Rivera",
      handle: "@mayarivera",
    },
    {
      image: "../favicon.svg",
      name: "Jordan Lee",
      handle: "@jordanlee",
    },
  ];

  const tags = [
    { name: "design", count: "12.4k" },
    { name: "editorial", count: "8.1k" },
    { name: "typography", count: "5.7k" },
  ];

  return (
    <div className="w-72 min-h-screen  flex-col bg-[hsl(var(--background-tertiary))] border-l border-white/5 py-6 px-4 gap-3 hidden lg:flex">
      <div className="rounded-xl border border-white/5 bg-[hsl(var(--surface))] p-5 flex flex-col gap-4">
        <p className="text-[10px] font-medium tracking-widest uppercase text-[hsl(var(--muted-foreground))]">
          Suggested for you
        </p>
        <div className="flex flex-col divide-y divide-white/5">
          {users.map((u) => (
            <div
              key={u.handle}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <img src={u.image} alt="" className="w-8 h-8" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{u.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {u.handle}
                </p>
              </div>
              <button className="text-[11px] font-medium border border-white/10 bg-[hsl(var(--primary))] rounded-full px-3 py-1 hover:bg-white/5 transition-colors shrink-0">
                follow{" "}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-[hsl(var(--surface))] p-5 flex flex-col gap-4">
        <p className="text-[10px] font-medium tracking-widest uppercase text-[hsl(var(--muted-foreground))]">
          Trending tags
        </p>
        <div className="flex flex-col divide-y divide-white/5">
          {tags.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 py-2.5 first:pt-0 last:pb-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="text-xs text-[hsl(var(--muted-foreground))] w-3">
                #
              </span>
              <span className="text-sm flex-1">{t.name}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))] tabular-nums">
                {t.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[hsl(var(--muted-foreground))] text-center tracking-wide mt-auto pt-2">
        © {new Date().getFullYear()} Flux · An editorial network.
      </p>
    </div>
  );
};
export default RightSidebar;
