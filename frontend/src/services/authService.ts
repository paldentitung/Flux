const API_BASE_URL = import.meta.env.VITE_API_URL;
import toast from "react-hot-toast";

export const register = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const verifyOtp = async ({
  email,
  otp,
  isReset,
}: {
  email: string;
  otp: string;
  isReset?: boolean;
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, isReset }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const getMe = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/get-me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return null;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return null;
  }
};

export const resendOTP = async ({ email }: { email: string }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return null;
  }
};

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return null;
  }
};

export const resetPassword = async ({
  email,
  otp,
  newPassword,
}: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    console.log("RESET PASSWORD:", { email, otp, newPassword });

    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
