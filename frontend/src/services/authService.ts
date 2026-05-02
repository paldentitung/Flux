import request from "./api";

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) =>
  request(
    "/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    false,
  );

export const verifyOtp = (data: {
  email: string;
  otp: string;
  isReset?: boolean;
}) =>
  request("/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getMe = () => request("/auth/get-me");

export const login = (data: { email: string; password: string }) =>
  request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const logout = () => request("/auth/logout", { method: "POST" });

export const resendOTP = (data: { email: string }) =>
  request(
    "/auth/resend-otp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    false,
  );

export const forgotPassword = (data: { email: string }) =>
  request(
    "/auth/forgot-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    false,
  );

export const resetPassword = (data: {
  email: string;
  otp: string;
  newPassword: string;
}) =>
  request(
    "/auth/reset-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    false,
  );
