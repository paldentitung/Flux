import { Share2, Check } from "lucide-react";
import { useState } from "react";

export const ShareButton = ({ postId }: { postId: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/post/${postId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      title={copied ? "Copied!" : "Copy link"}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--surface-hover))] hover:text-(--primary) transition text-sm"
    >
      {copied ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Share2 size={16} />
      )}
    </button>
  );
};
