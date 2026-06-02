"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
  startIndex: number;
  label: string;
  onClose: () => void;
}

export function GalleryLightbox({
  images,
  startIndex,
  label,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <div className="lightbox-bar">
        <span className="lightbox-label">{label}</span>
        <span className="lightbox-count">
          {index + 1} / {images.length}
        </span>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>
      </div>

      <button
        type="button"
        className="lightbox-nav prev"
        onClick={() => go(-1)}
        aria-label="Anterior"
      >
        <ChevronLeft size={26} />
      </button>

      <div className="lightbox-stage" onClick={onClose}>
        <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
          <Image
            key={index}
            src={images[index]}
            alt={`${label} ${index + 1}`}
            fill
            sizes="92vw"
            className="lightbox-img"
            priority
          />
        </div>
      </div>

      <button
        type="button"
        className="lightbox-nav next"
        onClick={() => go(1)}
        aria-label="Siguiente"
      >
        <ChevronRight size={26} />
      </button>

      <div className="lightbox-strip">
        {images.map((img, i) => (
          <button
            key={`${img}-${i}`}
            type="button"
            className={clsx("lightbox-thumb", i === index && "active")}
            onClick={() => setIndex(i)}
          >
            <Image src={img} alt="" fill sizes="90px" className="cover-image" />
          </button>
        ))}
      </div>
    </div>
  );
}
