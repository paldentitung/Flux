import { useContext, useState } from "react";
import { login, register, verifyOtp } from "../services/authService";
import toast from "react-hot-toast";
import { AuthContext } from "../context/createContext";
import { useLocation, useNavigate } from "react-router-dom";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside provider");
  }

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleRegister = async (formData: RegisterFormData): Promise<any> => {
    try {
      setLoading(true);
      const data = await register(formData);
      toast.success("Registered successfully");
      navigate("/verify-otp", { state: { email: formData.email } });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      setLoading(true);
      const data = await verifyOtp({ email, otp });
      toast.success("OTP verified successfully");
      navigate("/");
      return data;
    } finally {
      setLoading(false);
    }
  };
  const useCleanUsername = (username?: string) =>
    username?.replace(/\s/g, "") ?? "";

  const handleLogin = async (formData: LoginFormData): Promise<any> => {
    try {
      setLoading(true);
      const data = await login(formData);
      if (!data) return;
      toast.success("Login successfull");
      navigate("/");
      return data;
    } finally {
      setLoading(false);
    }
  };
  return {
    handleRegister,
    handleVerifyOtp,
    loading,
    user: context.user,
    useCleanUsername,
    handleLogin,
  };
};
