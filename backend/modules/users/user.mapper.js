export const userMapper = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    followersCount: user.followers?.length || 0,
    followingCount: user.following?.length || 0,
    isOnline: user.isOnline,
    isVerified: user.isVerified,
    lastSeen: user.lastSeen,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
