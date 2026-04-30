import { useState, useRef } from "react";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";
import { Image } from "lucide-react";
import { usePosts } from "../../hooks/usePosts";

const PostComposer = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  console.log(fileRef);

  const reset = () => {
    setText("");
    setFiles([]);
    setImages([]);
    setOpen(false);
  };

  const { handleCreatePost, loading } = usePosts();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    setFiles((prev) => [...prev, ...selectedFiles]);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previews]);
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("content", text);

    files.forEach((file) => {
      formData.append("images", file);
    });

    await handleCreatePost(formData);

    reset();
  };
  return (
    <div>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 p-5 w-full rounded-lg bg-(--post-card-bg) border border-(--post-card-border) text-(--muted-foreground) hover:bg-(--surface-hover) transition"
      >
        <img src="/favicon.svg" className="w-6 h-6" />
        <span>What’s on your mind?</span>
      </button>

      <Modal isOpen={open} onClose={reset}>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-(--foreground) font-semibold text-lg">
              New Post
            </h2>

            <button
              onClick={reset}
              className="p-2 rounded-full hover:bg-(--surface-hover) transition"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex gap-4">
            <img src="/favicon.svg" className="w-9 h-9 rounded-full" />

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Share something thoughtful..."
              className="w-full bg-transparent outline-none text-(--foreground)"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-lg max-h-60 object-cover"
                />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center">
            <div
              onClick={() => fileRef.current?.click()}
              className="p-2 rounded-full hover:bg-(--surface-hover) cursor-pointer transition"
            >
              <Image size={18} />
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={reset}
                className="px-4 py-2 rounded-full text-(--muted-foreground) hover:bg-(--surface-hover) transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={!text || loading}
                className="px-4 py-2 rounded-full bg-[hsl(var(--primary))] text-white disabled:opacity-40 hover:opacity-90 transition"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostComposer;
