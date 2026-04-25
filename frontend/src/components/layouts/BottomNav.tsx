import { Home, Compass, MessageCircle, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const items = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Compass, label: "Explore" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
    { to: "/notifications", icon: Bell, label: "Alerts" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0  border-t border-(--bottom-nav-border) backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-5 py-2">
        {items.map((i) => {
          const Icon = i.icon;

          return (
            <Link
              key={i.to}
              to={i.to}
              className="flex flex-col items-center justify-center text-(--bottom-nav-icon) hover:text-(--bottom-nav-icon-active) transition-colors"
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1">{i.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
