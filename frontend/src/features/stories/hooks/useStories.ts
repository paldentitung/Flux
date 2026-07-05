// useStories.ts
import { useState, useEffect, useCallback } from "react";
import {
  getStoryFeed,
  createStory,
  markStoryViewed,
  deleteStory,
  getStoryViewers,
} from "../services/storyService";
import type { StoryFeedGroup } from "../types/stories.type";

interface StoriesLoading {
  fetch: boolean;
  create: boolean;
  delete: boolean;
  view: boolean;
}

export const useStories = () => {
  const [groups, setGroups] = useState<StoryFeedGroup[]>([]);
  const [loading, setLoading] = useState<StoriesLoading>({
    fetch: false,
    create: false,
    delete: false,
    view: false,
  });

  const setLoadingKey = (key: keyof StoriesLoading, value: boolean) =>
    setLoading((prev) => ({ ...prev, [key]: value }));

  const fetchFeed = useCallback(async () => {
    setLoadingKey("fetch", true);
    try {
      const res = await getStoryFeed();
      setGroups(res.feed);
      return res.feed;
    } finally {
      setLoadingKey("fetch", false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleCreateStory = async (formData: FormData) => {
    setLoadingKey("create", true);
    try {
      const res = await createStory(formData);
      await fetchFeed(); // refetch so new story lands in the right group
      return res.story;
    } finally {
      setLoadingKey("create", false);
    }
  };

  const handleMarkViewed = async (storyId: string) => {
    setLoadingKey("view", true);
    try {
      await markStoryViewed(storyId);
    } finally {
      setLoadingKey("view", false);
    }
  };

  const handleDeleteStory = async (storyId: string, ownerId: string) => {
    setLoadingKey("delete", true);
    try {
      await deleteStory(storyId);
      setGroups((prev) =>
        prev
          .map((g) =>
            g.user._id === ownerId
              ? { ...g, stories: g.stories.filter((s) => s._id !== storyId) }
              : g,
          )
          .filter((g) => g.stories.length > 0),
      );
    } finally {
      setLoadingKey("delete", false);
    }
  };

  const handleGetViewers = async (storyId: string) => {
    const res = await getStoryViewers(storyId);
    return res.viewers;
  };

  return {
    groups,
    fetchFeed,
    handleCreateStory,
    handleMarkViewed,
    handleDeleteStory,
    handleGetViewers,
    loading,
  };
};
