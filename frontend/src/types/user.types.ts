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
  isPrivate: boolean;
  isVerified: boolean;
  blockedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
  notificationPreferences?: NotificationPreferences;
};
export type UserSummary = {
  _id: string;
  username: string;
  name?: string;
  avatar: string | null;
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
