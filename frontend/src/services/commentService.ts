import request from "./api";

export const getCommentByPost = async (postId: string) => {
  return request(`/comment/${postId}`);
};

export const addComment = async (postId: string, text: string) => {
  return request(`/comment/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
};

export const getReplyComment = async (commentId: string) => {
  return request(`/comment/reply/${commentId}`);
};
export const addReplyComment = async (commentId: string, text: string) => {
  return request(`/comment/reply/${commentId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
};
