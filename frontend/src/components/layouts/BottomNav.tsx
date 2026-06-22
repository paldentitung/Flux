import { Home, Compass, User, Bell, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";
import Modal from "../../shared/components/ui/Modal.tsx";
import ComposerForm from "../../features/posts/components/ComposerForm.tsx";
import { useState, useRef } from "react";
import { usePosts } from "../../features/posts/hooks/usePosts.ts";
import toast from "react-hot-toast";

const navItems = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const showNav = useHideOnScroll();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { handleCreatePost, loading } = usePosts();

  const reset = () => {
    setText("");
    setFiles([]);
    setImages([]);
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
    setImages((prev) => [...prev, ...selected.map(URL.createObjectURL)]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", text);
    files.forEach((f) => formData.append("images", f));
    await handleCreatePost(formData);
    toast.success("Posted!");
    reset();
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 lg:hidden transition-transform duration-300 ${
          showNav ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-center">
          <div
            aria-label="Create post"
            className="relative -mb-8 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-(--chat-bubble-sent)  transition-transform active:scale-95 hover:opacity-90"
          >
            <Plus
              onClick={() => setOpen(true)}
              size={20}
              strokeWidth={2.2}
              className="text-white"
            />
          </div>
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

      <Modal isOpen={open} onClose={reset}>
        <ComposerForm
          text={text}
          images={images}
          loading={loading.create}
          fileRef={fileRef}
          onText={setText}
          onFile={handleFileChange}
          onSubmit={handleSubmit}
          onCancel={reset}
        />
      </Modal>
    </>
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
  <>
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
  </>
);
export default BottomNav;
