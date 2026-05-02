import { useContext } from "react";

import { PostsContext } from "../context/createContext";

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used inside <PostsProvider>");
  return ctx;
};
