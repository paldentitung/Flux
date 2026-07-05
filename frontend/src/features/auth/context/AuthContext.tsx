import { getMe } from "../services/authService";
import type { User } from "../../profile/types/user.types";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../../../shared/context/createContext";
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      if (res) setUser(res.data);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
