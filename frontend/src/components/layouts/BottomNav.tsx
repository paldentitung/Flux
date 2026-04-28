import { Home, Compass, MessageCircle, Bell, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const items = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Compass, label: "Explore" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
    { to: "/notifications", icon: Bell, label: "Alerts" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const diff = currentScrollY - lastScrollY.current;

      if (diff > 10) {
        setShowNav(false); // scrolling down
      } else if (diff < -10) {
        setShowNav(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t border-(--bottom-nav-border) backdrop-blur-md lg:hidden transition-transform duration-300 ${
        showNav ? "translate-y-0" : "translate-y-full"
      }`}
    >
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
