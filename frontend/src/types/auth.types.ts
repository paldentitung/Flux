import type { User } from "./user.types";
export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
  isAuthLoading: boolean;
};
