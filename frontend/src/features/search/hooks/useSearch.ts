import toast from "react-hot-toast";
import { search } from "../services/searchService";
import { useState } from "react";
import type { User } from "../../profile/types/user.types";
import type { Post } from "../types/post.types";
export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    users: User[];
    posts: Post[];
  }>({
    users: [],
    posts: [],
  });

  const handleSearching = async (query: string) => {
    if (!query.trim()) {
      setData({ users: [], posts: [] });
      return;
    }

    setLoading(true);

    try {
      const res = await search(query);
      console.log("search data", res);
      setData(res.data);
      return res.data.data;
    } catch (error: any) {
      toast.error(error.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSearching,
    loading,
    data,
  };
};
