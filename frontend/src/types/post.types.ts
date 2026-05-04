import type { User } from "./user.types";

export type Post = {
  _id: string;
  userId: User;
  content: string;
  images: string[];
  likes: string[];
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
  handleLikePost: (postId: string) => Promise<void>;
}
