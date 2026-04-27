import { useContext, useState } from "react";
import { Register } from "../services/authService";
import toast from "react-hot-toast";
import { AuthContext } from "../context/createContext";
import { useNavigate } from "react-router-dom";
type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  if (!context) {
    throw new Error("useAuth must be used inside provider");
  }
  const handleRegister = async (formData: RegisterFormData): Promise<any> => {
    try {
      setLoading(true);

      const data = await Register(formData);

      toast.success("Registered successfully");
      navigate("/verify-otp", {
        state: { email: formData.email },
      });
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
};
