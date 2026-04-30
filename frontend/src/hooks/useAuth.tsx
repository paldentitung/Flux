import { useContext, useState } from "react";
import {
  forgotPassword,
  login,
  logout,
  register,
  resendOTP,
  resetPassword,
  verifyOtp,
} from "../services/authService";
import toast from "react-hot-toast";
import { AuthContext } from "../context/createContext";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

type resetPasswordData = {
  email: string;
  otp: string;
  newPassword: string;
};
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside provider");
  }

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const email = location.state?.email;
  const [resendLoading, setResendLoading] = useState(false);
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

  const handleVerifyOtp = async (
    otp: string,
    email: string,
    isReset?: boolean,
  ) => {
    try {
      setLoading(true);
      const data = await verifyOtp({ email, otp, isReset });
      if (!data) return;
      toast.success("OTP verified successfully");

      if (isReset) {
        navigate("/reset-password", { state: { email, otp } });
      } else {
        navigate("/");
      }

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

  const handleResendOTP = async (email: string) => {
    try {
      setResendLoading(true);
      const data = await resendOTP({ email });
      if (!data) return;
      toast.success("Resent OTP successfull");
    } finally {
      setResendLoading(false);
    }
  };

  const handleForgotPassword = async ({ email }: { email: string }) => {
    try {
      setLoading(true);
      const data = await forgotPassword({ email });
      if (!data) return;
      toast.success(data.message || "OTP is Send to email");
      navigate("/verify-otp", { state: { email, isReset: true } });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (formData: resetPasswordData) => {
    try {
      setLoading(true);

      const data = await resetPassword(formData);

      if (!data) return;

      toast.success("Reset password successfully");
      navigate("/login");

      return data;
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logout();
      toast.success("Logout successfully");
      navigate("/login");
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
    handleLogout,
    handleResendOTP,
    resendLoading,
    handleForgotPassword,
    handleResetPassword,
  };
};
