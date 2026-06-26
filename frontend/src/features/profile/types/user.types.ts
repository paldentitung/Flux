export type User = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  avatar: avatarType | null;
  bio: string;
  followers: UserSummary[];
  following: UserSummary[];
  isOnline: boolean;
  lastSeen: Date;
  isPrivate: boolean;
  isVerified: boolean;
  blockedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
  notificationPreferences?: NotificationPreferences;
};

export type avatarType = {
  url: string;
  publicId: string;
};
export type UserSummary = {
  _id: string;
  username: string;
  name?: string;
  avatar: avatarType | null;
};
export interface UpdateProfileData {
  name?: string;
  bio?: string;
}
export type NotificationPreferences = {
  follow: boolean;
  follow_request: boolean;
  follow_request_accepted: boolean;
  comment: boolean;
  like: boolean;
};
