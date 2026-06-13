export type User = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  followers: {
    _id: string;
    username: string;
    name?: string;
    avatar: string | null;
  }[];
  following: {
    _id: string;
    username: string;
    name?: string;
    avatar: string | null;
  }[];
  isOnline: boolean;
  lastSeen: Date;
  isVerified: boolean;
  blockedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
};
