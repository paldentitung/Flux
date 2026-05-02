import request from "./api";

export const getPosts = () => {
  return request("/posts");
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
