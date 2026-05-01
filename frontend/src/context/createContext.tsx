import { createContext } from "react";
import type { AuthContextType } from "../types/auth.types";
import type { PostsContextValue } from "../types/post.types";

export const AuthContext = createContext<AuthContextType | null>(null);
export const PostsContext = createContext<PostsContextValue | null>(null);
