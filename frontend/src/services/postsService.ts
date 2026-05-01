import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getPosts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "somethink went wrong");
    }
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "something went wrong");
    }

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
  }
};
