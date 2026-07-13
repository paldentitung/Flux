import { FaTimes } from "react-icons/fa";
import { Image } from "lucide-react";

interface Props {
  text: string;
  images: string[];
  loading: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onText: (val: string) => void;
  currentUserAvatar?: string;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ComposerForm = ({
  text,
  images,
  loading,
  fileRef,
  onText,
  onFile,
  onSubmit,
  onCancel,
  currentUserAvatar,
}: Props) => (
  <div className="flex flex-col gap-5">
    <div className="flex justify-between items-center">
      <h2 className="text-(--foreground) font-semibold text-lg">New Post</h2>
      <button
        onClick={onCancel}
        className="p-2 rounded-full hover:bg-(--surface-hover) transition"
      >
        <FaTimes />
      </button>
    </div>

    <div className="flex gap-4">
      <img
        src={currentUserAvatar || "/user.png"}
        className="w-9 h-9 rounded-full object-cover"
      />
      <input
        value={text}
        onChange={(e) => onText(e.target.value)}
        type="text"
        placeholder="Share something thoughtful..."
        className="w-full bg-transparent outline-none text-(--foreground)"
      />
    </div>

    {images.length > 0 && (
      <div className="grid grid-cols-2 gap-2 max-h-62 overflow-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
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
          onChange={onFile}
          accept="image/jpeg,image/jpg,image/png,image/webp"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full text-(--muted-foreground) hover:bg-(--surface-hover) transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={(!text && images.length === 0) || loading}
          className="px-4 py-2 rounded-full bg-[hsl(var(--primary))] text-white disabled:opacity-40 hover:opacity-90 transition"
        >
          {loading ? "posting..." : "Post"}
        </button>
      </div>
    </div>
    {!text && images.length === 0 && !loading && (
      <p className="text-xs text-(--muted-foreground) px-1 -mt-1">
        Write something or add a photo to post.
      </p>
    )}
  </div>
);

export default ComposerForm;
