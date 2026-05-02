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

export interface PostsContextValue {
  posts: Post[];
  loading: {
    create: boolean;
    delete: boolean;
    update: boolean;
  };
  handleCreatePost: (formData: FormData) => Promise<any>;
  handleDeletePost: (postId: string) => Promise<void>;
  handleUpdatePost: (postId: string, formData: FormData) => Promise<void>;
}
