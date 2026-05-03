import request from "./api";

export const getCommentByPost = async (postId: string) => {
  return request(`/comment/${postId}`);
};
