export const getNotificationMessage = (type: string) => {
  switch (type) {
    case "like":
      return "liked your post";
    case "comment":
      return "commented on your post";
    case "follow":
      return "started following you";
    case "follow_request":
      return "sent you a follow request";
    default:
      return "sent you a notification";
  }
};
