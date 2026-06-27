import request from "../../../shared/services/api";

export const getPosts = (page = 1, limit = 10) => {
  return request(`/posts?page=${page}&limit=${limit}`);
};

export const getPostById = async (postId: string) => {
  return request(`/posts/${postId}`, {}, true);
};
export const createPost = (formData: FormData) => {
  return request("/posts", {
    method: "POST",
    body: formData,
  });
};

export const deletePost = (postId: string) => {
  return request(`/posts/${postId}`, {
    method: "DELETE",
  });
};

export const updatePost = (postId: string, formData: FormData) => {
  return request(`/posts/${postId}`, {
    method: "PATCH",
    body: formData,
  });
};

export const likePost = async (postId: string) => {
  return request(`/posts/${postId}/like`, {
    method: "POST",
  });
};
