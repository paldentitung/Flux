import type { User } from "./user.types";

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
};

export type Post = {
  _id: string;
  userId: User;
  content: string;
  images: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
