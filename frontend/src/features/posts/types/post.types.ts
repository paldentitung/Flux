import type { User } from "../../profile/types/user.types";

export type PostImage = {
  url: string;
  publicId: string;
};

export type Post = {
  _id: string;
  userId: User;
  content: string;
  images: PostImage[];
  likes: string[];
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface PostsContextValue {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: {
    create: boolean;
    delete: boolean;
    update: boolean;
  };
  handleCreatePost: (formData: FormData) => Promise<any>;
  handleDeletePost: (postId: string) => Promise<void>;
  handleUpdatePost: (postId: string, formData: FormData) => Promise<void>;
  handleLikePost: (postId: string) => Promise<void>;
  fetchedPostById: (postId: string) => Promise<Post>;
  loadMorePosts: () => Promise<void>;
  hasMore: boolean;
  loadingMore: boolean;
}
