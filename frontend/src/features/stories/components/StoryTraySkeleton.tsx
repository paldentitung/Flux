const StoryTraySkeleton = () => (
  <div className="flex gap-4 overflow-x-auto pb-2">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-1 shrink-0 w-16">
        <div className="w-14 h-14 rounded-full bg-(--muted) animate-pulse" />
        <div className="h-2 w-10 rounded bg-(--muted) animate-pulse" />
      </div>
    ))}
  </div>
);

export default StoryTraySkeleton;
