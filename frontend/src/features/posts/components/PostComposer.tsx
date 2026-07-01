import { useState, useRef } from "react";
import Modal from "../../../shared/components/ui/Modal";

import ComposerForm from "./ComposerForm";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/hooks/useAuth";
import Avatar from "../../../shared/components/ui/Avatar";
const PostComposer = ({
  onSubmit,
  loading,
}: {
  onSubmit: (f: FormData) => Promise<any>;
  loading: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();

  const reset = () => {
    images.forEach(URL.revokeObjectURL);
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
    const res = await onSubmit(formData);
    if (res?.data) toast.success("Posted!");
    reset();
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 p-5 w-full rounded-lg bg-(--post-card-bg) border border-(--post-card-border) text-(--muted-foreground) hover:bg-(--surface-hover) transition"
      >
        <Avatar src={user?.avatar?.url} name={user?.username} size={28} />
        <span>What's on your mind?</span>
      </button>

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
    </div>
  );
};

export default PostComposer;
