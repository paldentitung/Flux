// story.types.ts

export interface StoryImage {
  url: string;
  publicId: string;
}

export interface StoryUser {
  _id: string;
  username: string;
  avatar?: string;
}

export interface StoryViewer {
  _id: string;
  username: string;
  avatar?: string;
}

export interface StoryViewerRef {
  user: string;
  viewedAt: string;
  _id?: string;
}

export interface Story {
  _id: string;
  userId: StoryUser | string;
  content?: string;
  images: StoryImage[];
  viewers: StoryViewerRef[] | string[]; // string[] only for legacy/edge cases
  createdAt: string;
  updatedAt: string;
}

// shape returned specifically by GET /stories/:id/viewers
export interface StoryViewerDetail {
  _id: string;
  username: string;
  avatar?: string | null;
  viewedAt: string;
}

// Shape returned by getStoryFeedService — grouped by user
export interface StoryFeedGroup {
  user: StoryUser;
  stories: Story[];
}
