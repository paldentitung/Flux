import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

const ImageLightbox = ({ images, startIndex, onClose }: Props) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {images.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-2 text-white/70 hover:text-white transition z-10"
          >
            <ChevronLeft size={36} />
          </button>
        )}

        <img
          src={images[current]}
          className="max-h-[80vh] max-w-full rounded-lg object-contain"
        />

        {images.length > 1 && (
          <button
            onClick={next}
            className="absolute right-2 text-white/70 hover:text-white transition z-10"
          >
            <ChevronRight size={36} />
          </button>
        )}

        {images.length > 1 && (
          <div className="absolute -bottom-8 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body, // ← renders outside the card's stacking context
  );
};

export default ImageLightbox;
