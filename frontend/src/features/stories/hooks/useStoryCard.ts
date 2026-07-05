import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { useStories } from "./useStories";
import type { Story, StoryViewer } from "../types/stories.type";

export const useStoryCard = (story: Story) => {
  const { handleDeleteStory, handleMarkViewed, handleGetViewers, loading } =
    useStories();

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewersOpen, setViewersOpen] = useState(false);
  const [viewers, setViewers] = useState<StoryViewer[]>([]);

  const hasMarkedViewed = useRef(false);

  // Mark as viewed once when the card mounts / becomes active
  useEffect(() => {
    if (!hasMarkedViewed.current) {
      hasMarkedViewed.current = true;
      handleMarkViewed(story._id).catch(() => {
        // silently ignore — viewing shouldn't block the UI
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story._id]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return differenceInHours(new Date(), d) < 24
      ? formatDistanceToNow(d, { addSuffix: true })
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const openViewers = async () => {
    setMenuOpen(false);
    const list = await handleGetViewers(story._id);
    setViewers(list);
    setViewersOpen(true);
  };

  const closeViewers = () => {
    setViewersOpen(false);
    setViewers([]);
  };

  const confirmDelete = async () => {
    const ownerId =
      typeof story.userId === "string" ? story.userId : story.userId._id;
    await handleDeleteStory(story._id, ownerId);
    setDeleteOpen(false);
    setMenuOpen(false);
  };

  return {
    menuOpen,
    setMenuOpen,
    deleteOpen,
    setDeleteOpen,
    viewersOpen,
    viewers,
    openViewers,
    closeViewers,
    confirmDelete,
    loading,
    formatDate,
  };
};
