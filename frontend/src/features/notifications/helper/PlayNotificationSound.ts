import notificationSound from "../assets/notification.mp3";

const audio = new Audio(notificationSound);

export const playNotificationSound = () => {
  audio.currentTime = 0;
  audio.play().catch(() => {});
};
