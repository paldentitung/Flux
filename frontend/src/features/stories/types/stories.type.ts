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

export interface Story {
  _id: string;
  userId: StoryUser | string;
  content?: string;
  images: StoryImage[];
  viewers: StoryViewer[] | string[];
  createdAt: string;
  updatedAt: string;
}

// Shape returned by getStoryFeedService — grouped by user
export interface StoryFeedGroup {
  user: StoryUser;
  stories: Story[];
}
