import type { User } from "./user.types";
export type Comment = {
  _id: string;
  postId: string;
  userId: Pick<User, "_id" | "name" | "avatar">;
  text: string;
  likes: string[];
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
};
