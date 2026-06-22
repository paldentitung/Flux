import request from "../shared/services/api";

export const search = async (query: string) => {
  return request(`/search?q=${query}`, {}, true);
};
