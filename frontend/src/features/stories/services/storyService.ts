import request from "../../../shared/services/api";

// GET /stories/feed
export const getStoryFeed = async () => {
  return request(`/stories/feed`, {}, true);
};

// GET /stories/user/:userId
export const getUserStories = async (userId: string) => {
  return request(`/stories/user/${userId}`, {}, true);
};

// GET /stories/:storyId/viewers
export const getStoryViewers = async (storyId: string) => {
  return request(`/stories/${storyId}/viewers`, {}, true);
};

// POST /stories  (multipart form-data: images + content)
export const createStory = async (formData: FormData) => {
  return request(
    `/stories`,
    {
      method: "POST",
      body: formData,
    },
    true,
  );
};

// POST /stories/:storyId/view
export const markStoryViewed = async (storyId: string) => {
  return request(
    `/stories/${storyId}/view`,
    {
      method: "POST",
    },
    true,
  );
};

// DELETE /stories/:storyId
export const deleteStory = async (storyId: string) => {
  return request(
    `/stories/${storyId}`,
    {
      method: "DELETE",
    },
    true,
  );
};
