"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export default function RoomImages({ images, alt }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  if (images.length === 0) return null;

  // Native horizontal scroll = real swipe on touch devices (iOS included).
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  const go = (e: React.MouseEvent, to: number) => {
    e.preventDefault();
    const el = scrollerRef.current;
    if (!el) return;
    const target = (to + images.length) % images.length;
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative h-48 w-full overflow-hidden group">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {/* Arrows are for pointer devices; touch users simply swipe. */}
          <button
            onClick={(e) => go(e, idx - 1)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-base leading-none"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={(e) => go(e, idx + 1)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-base leading-none"
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
