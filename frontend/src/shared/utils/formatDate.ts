export const formatDate = (date: string): string => {
  const now = new Date();
  const created = new Date(date);
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: created.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
