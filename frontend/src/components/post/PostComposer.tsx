import { useState, useRef } from "react";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";
import { Image } from "lucide-react";

const PostComposer = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | undefined>();

  const fileRef = useRef<HTMLInputElement | null>(null);
  console.log(fileRef);
  const reset = () => {
    setText("");
    setImage(undefined);
    setOpen(false);
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

          {image && (
            <img src={image} className="rounded-lg max-h-60 object-cover" />
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
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
                disabled={!text}
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
