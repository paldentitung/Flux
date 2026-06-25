import { useContext } from "react";
import { NotificationsContext } from "../../../shared/context/createContext";
export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationsProvider",
    );
  return ctx;
};
