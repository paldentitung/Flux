import { Settings } from "lucide-react";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";

import { Link } from "react-router-dom";
const Header = () => {
  const showNav = useHideOnScroll();

  return (
    <>
      <div
        className={`lg:hidden flex justify-between items-center p-5 sticky top-0 backdrop-blur-md transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-[hsl(var(--sidebar-foreground))] font-bold text-xl tracking-tight">
            Flux
          </h1>
        </div>

        <div className="flex items-center gap-3 text-[hsl(var(--sidebar-icon))]">
          <Link to="/settings">
            <Settings
              size={20}
              className="cursor-pointer hover:text-white transition-colors"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
