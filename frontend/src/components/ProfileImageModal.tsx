import { X } from "lucide-react";
import { useEffect } from "react";

interface ProfileImageModalProps {
  isOpen: boolean;
  imageUrl?: string | null;
  name: string;
  onClose: () => void;
}

const ProfileImageModal = ({
  isOpen,
  imageUrl,
  name,
  onClose,
}: ProfileImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-center hover:bg-[hsl(var(--surface-hover))] transition"
        >
          <X size={18} />
        </button>

        <img
          src={imageUrl || "/default-avatar.png"}
          alt={name}
          className="w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-2xl object-cover border border-[hsl(var(--post-card-border))] shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ProfileImageModal;
