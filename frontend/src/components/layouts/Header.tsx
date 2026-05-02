import { Plus, User } from "lucide-react";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";
import Modal from "../ui/Modal";
import { useState, useRef } from "react";
import { usePosts } from "../../hooks/usePosts.ts";
import ComposerForm from "../post/ComposerForm";
import toast from "react-hot-toast";
const Header = () => {
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
          <Plus
            size={20}
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-white transition-colors"
          />
          <User
            size={20}
            className="cursor-pointer hover:text-white transition-colors"
          />
        </div>
      </div>

      <Modal isOpen={open} onClose={reset}>
        <ComposerForm
          text={text}
          images={images}
          loading={loading}
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

export default Header;
