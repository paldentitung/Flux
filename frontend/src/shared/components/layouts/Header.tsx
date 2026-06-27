import { Settings } from "lucide-react";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";

import { Link } from "react-router-dom";
import FluxLogo from "../ui/Logo";
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
          <FluxLogo />
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
