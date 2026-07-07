import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Avatar from "../../../shared/components/ui/Avatar";
import { formatDate } from "../../../shared/utils/formatDate";
import type { StoryViewerDetail } from "../types/stories.type";

interface StoryViewersModalProps {
  storyId: string;
  fetchViewers: (storyId: string) => Promise<StoryViewerDetail[]>;
  onClose: () => void;
}

const StoryViewersModal = ({
  storyId,
  fetchViewers,
  onClose,
}: StoryViewersModalProps) => {
  const [viewers, setViewers] = useState<StoryViewerDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchViewers(storyId)
      .then((res) => {
        if (active) setViewers(res);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [storyId, fetchViewers]);

  return (
    <div
      className="absolute inset-0 bg-black/70 z-40 flex items-end justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-[hsl(var(--card))] rounded-t-2xl w-full max-w-md max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))]">
          <h2 className="font-semibold text-[hsl(var(--card-foreground))]">
            Viewers{viewers.length > 0 && ` (${viewers.length})`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[hsl(var(--muted-foreground))]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          {loading ? (
            <p className="text-sm text-[hsl(var(--muted-foreground))] text-center py-6">
              Loading…
            </p>
          ) : viewers.length === 0 ? (
            <p className="text-sm text-[hsl(var(--muted-foreground))] text-center py-6">
              No views yet.
            </p>
          ) : (
            viewers.map((v) => (
              <Link
                key={v._id}
                to={`/profile/${v._id}`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[hsl(var(--surface-hover))] transition"
              >
                <Avatar src={v.avatar} name={v.username} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--card-foreground))] truncate">
                    {v.username}
                  </p>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">
                  {formatDate(v.viewedAt)}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryViewersModal;
