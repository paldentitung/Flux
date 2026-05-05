import { Home, Compass, MessageCircle, User, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";

const navItems = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/messages", icon: Bell, label: "Notifications" },
  { to: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const showNav = useHideOnScroll();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 lg:hidden transition-transform duration-300 ${
        showNav ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-center">
        <NavLink
          to="/create"
          aria-label="Create post"
          className="relative -mb-8 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-(--chat-bubble-sent)  transition-transform active:scale-95 hover:opacity-90"
        >
          <MessageCircle size={20} strokeWidth={2.2} className="text-white" />
        </NavLink>
      </div>

      <nav className="w-full flex items-center border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-1 h-15">
        {navItems.slice(0, 2).map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
        <div className="flex-1" />
        {navItems.slice(2).map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>
    </div>
  );
};

const NavItem = ({
  to,
  icon: Icon,
  label,
  end,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `relative flex flex-1 flex-col items-center justify-center gap-0.75 py-2 px-1 rounded-xl transition-colors
       ${
         isActive
           ? "text-(--bottom-nav-icon-active)"
           : "text-(--bottom-nav-icon) hover:text-(--bottom-nav-icon-active) hover:bg-[rgba(99,102,241,0.06)]"
       }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`absolute top-1 w-1 h-1 rounded-full bg-(--bottom-nav-icon-active) transition-opacity duration-200 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
        <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
        <span
          className={`text-[9px] tracking-wide ${isActive ? "font-semibold" : "font-normal"}`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);
export default BottomNav;
