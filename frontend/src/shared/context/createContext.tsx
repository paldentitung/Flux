import { createContext } from "react";
import type { AuthContextType } from "../../features/auth/types/auth.types";
import type { PostsContextValue } from "../../features/posts/types/post.types";
import type { NotificationsContextType } from "../../features/notifications/types/notifications.types";

export const AuthContext = createContext<AuthContextType | null>(null);
export const PostsContext = createContext<PostsContextValue | null>(null);
export const NotificationsContext =
  createContext<NotificationsContextType | null>(null);
