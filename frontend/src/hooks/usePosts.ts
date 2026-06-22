import { useContext } from "react";

import { PostsContext } from "../shared/context/createContext";

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used inside <PostsProvider>");
  return ctx;
};
