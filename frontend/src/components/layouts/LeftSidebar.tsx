import { Link } from "react-router-dom";
import {
  Home,
  Compass,
  MessageCircle,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const LeftSidebar = () => {
  const links = [
    { name: "Home", path: "/", Icon: Home },
    { name: "Explore", path: "/explore", Icon: Compass },
    { name: "Messages", path: "/messages", Icon: MessageCircle },
    { name: "Notifications", path: "/notifications", Icon: Bell },
    { name: "Profile", path: "/profile", Icon: User },
    { name: "Settings", path: "/settings", Icon: Settings },
  ];

  return (
    <div className="w-64 min-h-screen  flex-col bg-[hsl(--sidebar-primary)] border-r border-white/6 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <h1 className="text-[hsl(--sidebar-foreground)] font-bold text-xl tracking-tight">
          Flux
        </h1>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {links.map((l) => {
          const Icon = l.Icon;

          return (
            <Link
              key={l.path}
              to={l.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-(--sidebar-icon) hover:bg-(--sidebar-item-hover) hover:text-(--sidebar-foreground) transition-colors"
            >
              <Icon size={18} />
              <span>{l.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/6">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[hsl(var(--sidebar-user-bg))]">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-(--sidebar-online) border-2 border-[hsl(var(--sidebar-background))]" />
          </div>

          <div className="flex-1">
            <p className="text-[hsl(var(--sidebar-foreground))] text-sm font-medium">
              Username
            </p>
            <p className="text-(--sidebar-icon) text-xs">@handle</p>
          </div>

          <button className="p-2 rounded-md text-(--sidebar-icon) hover:bg-[hsl(var(--sidebar-item-hover))] hover:text-[hsl(var(--sidebar-foreground))] transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
