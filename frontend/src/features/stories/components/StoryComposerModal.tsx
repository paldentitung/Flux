import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import LoadingButton from "../../../shared/components/ui/LoadingButton";
interface StoryComposerModalProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  onSubmit: (content: string) => void;
  onClose: () => void;
  loading: boolean;
}

const StoryComposerModal = ({
  files,
  onRemoveFile,
  onSubmit,
  onClose,
  loading,
}: StoryComposerModalProps) => {
  const [content, setContent] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);

  // Build object URLs once per files change, and revoke old ones —
  // creating them directly in render (as before) leaked a URL every re-render.
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 min-h-screen">
      <div className="bg-[hsl(var(--card))] rounded-xl w-full max-w-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))]">
          <h2 className="font-semibold text-[hsl(var(--card-foreground))]">
            New Story
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[hsl(var(--muted-foreground))]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex gap-2 overflow-x-auto">
            {previews.map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 w-24 h-32 rounded-lg overflow-hidden"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => onRemoveFile(i)}
                  className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a caption..."
            className="w-full resize-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm text-[hsl(var(--card-foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            rows={2}
          />
        </div>

        <div className="px-4 py-3 border-t border-[hsl(var(--border))] flex justify-end">
          <LoadingButton
            loading={loading}
            onClick={() => onSubmit(content)}
            disabled={loading || files.length === 0}
            className="ml-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            loadingText="Sharing..."
          >
            Share to story
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default StoryComposerModal;
