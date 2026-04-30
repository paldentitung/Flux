export type User = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  followers: string[];
  following: string[];
  isOnline: boolean;
  lastSeen: Date;
  isVerified: boolean;
  blockedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
};
