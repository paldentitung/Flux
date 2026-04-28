import { getMe } from "../services/authService";
import type { User } from "../types/auth.types";
import { AuthContext } from "./createContext";
import { useEffect, useState, type ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const res = await getMe();
    if (res) setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("user data", user);
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
