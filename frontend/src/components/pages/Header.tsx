import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <div className="lg:hidden flex justify-between items-center p-5">
      {/* Logo */}
      <div className="flex items-center gap-3 text-sm">
        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>

        <h1 className="text-[hsl(var(--sidebar-foreground))] font-bold text-xl tracking-tight">
          Flux
        </h1>
      </div>

      <div className="flex items-center gap-3 text-[hsl(var(--sidebar-icon))]">
        <Bell
          size={20}
          className="cursor-pointer hover:text-white transition-colors"
        />
        <User
          size={20}
          className="cursor-pointer hover:text-white transition-colors"
        />
      </div>
    </div>
  );
};

export default Header;
