import { useState, useRef } from "react";
import Modal from "./ui/Modal";
import { X, Camera } from "lucide-react";
import Avatar from "./ui/Avatar";
import type { User } from "../types/user.types";
import LoadingButton from "./ui/LoadingButton";

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}) => {
  const [preview, setPreview] = useState<string | null>(user.avatar);
  const [bioLength, setBioLength] = useState(user.bio?.length ?? 0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className=" bg-(--background) rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--post-card-border)">
          <span className="text-sm font-semibold text-(--foreground)">
            Edit profile
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-(--muted-foreground) hover:bg-(--post-card-bg) transition"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-5 pt-5">
          <div className="relative group">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {preview ? (
              <img
                src={preview}
                className="w-[72px] h-[72px] rounded-full object-cover border-2 border-(--post-card-border)"
              />
            ) : (
              <Avatar
                src={user.avatar}
                name={user.name || user.username}
                size={72}
                className="border-2 border-(--post-card-border) rounded-full"
              />
            )}

            <div
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer flex items-center justify-center"
            >
              <Camera size={18} color="white" />
            </div>

            {/* Badge */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#533483] border-2 border-(--background) flex items-center justify-center"
            >
              <Camera size={10} color="white" />
            </button>
          </div>

          <div>
            <p className="text-sm font-medium text-(--foreground)">
              Profile photo
            </p>
            <p className="text-xs text-(--muted-foreground)">
              JPG, PNG or GIF · Max 5MB
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3.5 p-5">
          <div>
            <label className="block text-xs font-medium text-(--muted-foreground) uppercase tracking-widest mb-1.5">
              Name
            </label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full bg-(--post-card-bg) border border-(--post-card-border) rounded-xl px-3 py-2.5 text-sm text-(--foreground) outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-(--muted-foreground) uppercase tracking-widest mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-(--muted-foreground)">
                @
              </span>
              <input
                type="text"
                defaultValue={user.username}
                className="w-full bg-(--post-card-bg) border border-(--post-card-border) rounded-xl pl-6 pr-3 py-2.5 text-sm text-(--foreground) outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label className="text-xs font-medium text-(--muted-foreground) uppercase tracking-widest">
                Bio
              </label>
              <span
                className={`text-xs transition ${bioLength > 140 ? "text-red-400" : "text-(--muted-foreground)"}`}
              >
                {bioLength} / 160
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Tell people about yourself…"
              defaultValue={user.bio}
              maxLength={160}
              onChange={(e) => setBioLength(e.target.value.length)}
              className="w-full bg-(--post-card-bg) border border-(--post-card-border) rounded-xl px-3 py-2.5 text-sm text-(--foreground) resize-none outline-none focus:border-purple-500 transition leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-5 pb-5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-(--post-card-border) text-sm text-(--muted-foreground) hover:bg-(--post-card-bg) transition"
          >
            Cancel
          </button>

          <LoadingButton className="px-5 py-2 rounded-xl text-sm font-medium text-white transition">
            Save changes
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
