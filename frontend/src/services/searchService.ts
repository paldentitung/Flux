import request from "./api";

export const search = async (query: string) => {
  return request(`/search?q=${query}`, {}, true);
};
