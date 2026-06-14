export type User = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  followers: UserSummary[];
  following: UserSummary[];
  isOnline: boolean;
  lastSeen: Date;
  isVerified: boolean;
  blockedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
};
export type UserSummary = {
  _id: string;
  username: string;
  name?: string;
  avatar: string | null;
};
