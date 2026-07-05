import { useEffect, useMemo, useRef, useState } from "react";
import type { StoryFeedGroup } from "../types/stories.type";
import { X, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import Avatar from "../../../shared/components/ui/Avatar";

interface StoryViewerModalProps {
  groups: StoryFeedGroup[];
  initialGroupIndex: number;
  currentUserId: string;
  onClose: () => void;
  onMarkViewed: (storyId: string) => void;
  onDeleteStory: (storyId: string, ownerId: string) => Promise<unknown>;
}

interface Slide {
  storyId: string;
  imageUrl: string;
}

const STORY_DURATION = 5000;
const NAV_LOCK_MS = 250;

const StoryViewerModal = ({
  groups,
  initialGroupIndex,
  currentUserId,
  onClose,
  onMarkViewed,
  onDeleteStory,
}: StoryViewerModalProps) => {
  const [groupIndex, setGroupIndex] = useState(initialGroupIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const markedRef = useRef<Set<string>>(new Set());
  const lastNavRef = useRef(0);

  const group = groups[groupIndex];

  const slides: Slide[] = useMemo(() => {
    if (!group) return [];
    return group.stories.flatMap((s) =>
      s.images.map((img) => ({ storyId: s._id, imageUrl: img.url })),
    );
  }, [group]);

  const slide = slides[slideIndex];

  const slideIndexRef = useRef(slideIndex);
  const slidesLenRef = useRef(slides.length);

  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);

  useEffect(() => {
    slidesLenRef.current = slides.length;
  }, [slides.length]);

  // Whenever we land on a brand-new group, always start at its first slide.
  useEffect(() => {
    setSlideIndex(0);
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupIndex]);

  const clearTimer = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const canNavigate = () => {
    const now = Date.now();
    if (now - lastNavRef.current < NAV_LOCK_MS) return false;
    lastNavRef.current = now;
    return true;
  };

  const goNextGroup = () => {
    if (groupIndex < groups.length - 1) {
      setGroupIndex((i) => i + 1);
    } else {
      onClose();
    }
  };

  const goPrevGroup = () => {
    if (groupIndex > 0) {
      setGroupIndex((i) => i - 1);
    }
  };

  const goNextSlide = () => {
    if (slideIndexRef.current < slidesLenRef.current - 1) {
      setSlideIndex((i) => i + 1);
    } else {
      goNextGroup();
    }
  };

  const goPrevSlide = () => {
    if (slideIndexRef.current > 0) {
      setSlideIndex((i) => i - 1);
    } else {
      goPrevGroup();
    }
  };

  const handlePrev = () => {
    if (!canNavigate()) return;
    clearTimer();
    goPrevSlide();
  };

  const handleNext = () => {
    if (!canNavigate()) return;
    clearTimer();
    goNextSlide();
  };

  const handlePrevGroupClick = () => {
    if (!canNavigate()) return;
    clearTimer();
    goPrevSlide();
  };

  const handleNextGroupClick = () => {
    if (!canNavigate()) return;
    clearTimer();
    goNextSlide();
  };

  const handleConfirmDelete = async () => {
    if (!slide || !group) return;
    try {
      setDeleting(true);
      await onDeleteStory(slide.storyId, group.user?._id);
      setDeleteOpen(false);
      // If it was the only slide left in this group, close the viewer;
      // otherwise move on to the next slide/group.
      if (slidesLenRef.current <= 1) {
        onClose();
      } else {
        clearTimer();
        goNextSlide();
      }
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!slide) return;

    if (!markedRef.current.has(slide.storyId)) {
      markedRef.current.add(slide.storyId);
      onMarkViewed(slide.storyId);
    }

    setProgress(0);
    clearTimer();

    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const pct = Math.min(((Date.now() - start) / STORY_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearTimer();
        lastNavRef.current = Date.now();
        goNextSlide();
      }
    }, 50);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupIndex, slideIndex, slides.length]);

  if (!group || !slide || !group.user) return null;

  const isOwnStory = group.user?._id === currentUserId;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-md h-dvh sm:h-[90dvh] bg-black">
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-10 pointer-events-none">
          {slides.map((s, i) => (
            <div
              key={`${s.storyId}-${i}`}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white"
                style={{
                  width:
                    i < slideIndex
                      ? "100%"
                      : i === slideIndex
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-6 left-2 right-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 pointer-events-none">
            <Avatar
              src={group.user?.avatar || "/default-avatar.png"}
              size={32}
            />
            <span className="text-white text-sm font-medium">
              {group.user?.username}
            </span>
          </div>

          <div className="flex items-center gap-1 pointer-events-auto">
            {isOwnStory && (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearTimer();
                    setMenuOpen((v) => !v);
                  }}
                  className="text-white p-1"
                  aria-label="Story options"
                >
                  <MoreVertical size={20} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-black/90 rounded-lg overflow-hidden min-w-32 z-30 border border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        setDeleteOpen(true);
                      }}
                      className="w-full text-left text-red-400 text-sm px-3 py-2 hover:bg-white/10"
                    >
                      Delete story
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearTimer();
                onClose();
              }}
              className="text-white p-1"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <img
          src={slide.imageUrl}
          alt=""
          className="w-full h-full object-contain pointer-events-none"
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-0 top-0 h-full w-1/3 z-[5]"
          aria-label="Previous"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-0 top-0 h-full w-1/3 z-[5]"
          aria-label="Next"
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevGroupClick();
          }}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 text-white z-20 bg-black/30 rounded-full p-1"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextGroupClick();
          }}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 text-white z-20 bg-black/30 rounded-full p-1"
        >
          <ChevronRight size={28} />
        </button>

        {deleteOpen && (
          <div
            className="absolute inset-0 bg-black/70 z-40 flex items-center justify-center px-6"
            onClick={(e) => {
              e.stopPropagation();
              clearTimer();
            }}
          >
            <div className="bg-[hsl(var(--card))] rounded-xl p-4 w-full max-w-xs space-y-3">
              <p className="text-[hsl(var(--card-foreground))] text-sm">
                Delete this story? This can't be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteOpen(false);
                  }}
                  className="text-sm text-[hsl(var(--muted-foreground))] px-3 py-1.5"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfirmDelete();
                  }}
                  disabled={deleting}
                  className="text-sm text-white bg-red-600 rounded-lg px-3 py-1.5 disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewerModal;
