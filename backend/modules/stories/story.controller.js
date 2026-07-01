import {
  createStoryService,
  getStoryFeedService,
  getUserStoriesService,
  markStoryViewedService,
  getStoryViewersService,
  deleteStoryService,
} from "./story.service.js";

export const createStoryController = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  const story = await createStoryService(
    req.user.id,
    req.body.content,
    req.files,
  );
  res.status(201).json({ success: true, story });
};

export const getStoryFeedController = async (req, res) => {
  const feed = await getStoryFeedService(req.user.id);
  res.status(200).json({ success: true, feed });
};

export const getUserStoriesController = async (req, res) => {
  const stories = await getUserStoriesService(req.user.id, req.params.userId);
  res.status(200).json({ success: true, stories });
};

export const markStoryViewedController = async (req, res) => {
  const result = await markStoryViewedService(req.params.storyId, req.user.id);
  res.status(200).json({ success: true, ...result });
};

export const getStoryViewersController = async (req, res) => {
  const viewers = await getStoryViewersService(req.params.storyId, req.user.id);
  res.status(200).json({ success: true, viewers });
};

export const deleteStoryController = async (req, res) => {
  const result = await deleteStoryService(req.params.storyId, req.user.id);
  res.status(200).json({ success: true, ...result });
};
