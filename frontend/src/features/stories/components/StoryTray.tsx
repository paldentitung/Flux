import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { StoryFeedGroup } from "../types/stories.type";
import StoryViewerModal from "./StoryViewerModal";
import StoryComposerModal from "./StoryComposerModal";
import Avatar from "../../../shared/components/ui/Avatar";

interface StoryTrayProps {
  groups: StoryFeedGroup[];
  currentUserId: string;
  currentUserAvatar?: string;
  onMarkViewed: (storyId: string) => void;
  onCreateStory: (formData: FormData) => Promise<unknown>;
  onDeleteStory: (storyId: string, ownerId: string) => Promise<unknown>;
  createLoading: boolean;
}

const StoryTray = ({
  groups,
  currentUserId,
  currentUserAvatar,
  onMarkViewed,
  onCreateStory,
  onDeleteStory,
  createLoading,
}: StoryTrayProps) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const [composerFiles, setComposerFiles] = useState<File[] | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const isGroupUnseen = (group: StoryFeedGroup) =>
    group.stories.some(
      (s) =>
        !s.viewers.some(
          (v) => (typeof v === "string" ? v : v._id) === currentUserId,
        ),
    );

  const handlePickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length > 0) setComposerFiles(selected);
    e.target.value = "";
  };

  const removeComposerFile = (index: number) => {
    setComposerFiles((prev) => {
      if (!prev) return prev;
      const next = prev.filter((_, i) => i !== index);
      return next.length > 0 ? next : null; // close composer if last image removed
    });
  };

  const handleSubmitStory = async (content: string) => {
    if (!composerFiles) return;
    const formData = new FormData();
    formData.append("content", content);
    composerFiles.forEach((f) => formData.append("images", f));
    await onCreateStory(formData);
    setComposerFiles(null);
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center gap-1 shrink-0 w-16"
        >
          <div className="relative w-14 h-14 rounded-full">
            <Avatar
              src={currentUserAvatar || "/default-avatar.png"}
              size={56}
            />
            <span className="absolute -bottom-1 -right-1 bg-(--primary) text-(--primary-foreground) rounded-full w-5 h-5 flex items-center justify-center border-2 border-(--background)">
              <Plus size={12} />
            </span>
          </div>
          <span className="text-xs text-(--muted-foreground) truncate w-full text-center">
            Your story
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handlePickFiles}
        />

        {groups.map((group, i) => (
          <button
            type="button"
            key={group.user._id}
            onClick={() => setActiveGroupIndex(i)}
            className="flex flex-col items-center gap-1 shrink-0 w-16"
          >
            <div
              className={`w-14 h-14 rounded-full p-[2px] ${
                isGroupUnseen(group)
                  ? "bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-500"
                  : "bg-(--border)"
              }`}
            >
              <Avatar src={group.user.avatar} size={48} />
            </div>
            <span className="text-xs text-(--muted-foreground) truncate w-full text-center">
              {group.user.username}
            </span>
          </button>
        ))}
      </div>

      {activeGroupIndex !== null && (
        <StoryViewerModal
          groups={groups}
          initialGroupIndex={activeGroupIndex}
          currentUserId={currentUserId}
          onClose={() => setActiveGroupIndex(null)}
          onMarkViewed={onMarkViewed}
          onDeleteStory={onDeleteStory}
        />
      )}

      {composerFiles && (
        <StoryComposerModal
          files={composerFiles}
          onRemoveFile={removeComposerFile}
          onSubmit={handleSubmitStory}
          onClose={() => setComposerFiles(null)}
          loading={createLoading}
        />
      )}
    </>
  );
};

export default StoryTray;
