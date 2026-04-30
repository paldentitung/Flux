import { FaTimes } from "react-icons/fa";
import { Image } from "lucide-react";

interface Props {
  text: string;
  images: string[];
  loading: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onText: (val: string) => void;
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
      <img src="/favicon.svg" className="w-9 h-9 rounded-full" />
      <input
        value={text}
        onChange={(e) => onText(e.target.value)}
        type="text"
        placeholder="Share something thoughtful..."
        className="w-full bg-transparent outline-none text-(--foreground)"
      />
    </div>

    {images.length > 0 && (
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, i) => (
          <img key={i} src={img} className="rounded-lg max-h-60 object-cover" />
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
          disabled={!text || loading}
          className="px-4 py-2 rounded-full bg-[hsl(var(--primary))] text-white disabled:opacity-40 hover:opacity-90 transition"
        >
          {loading ? "posting..." : "Post"}
        </button>
      </div>
    </div>
  </div>
);

export default ComposerForm;
