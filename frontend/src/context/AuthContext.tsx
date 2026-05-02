import { getMe } from "../services/authService";
import type { User } from "../types/user.types";
import { AuthContext } from "./createContext";
import { useEffect, useState, type ReactNode } from "react";

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

  useEffect(() => {
    console.log("user data", user);
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
