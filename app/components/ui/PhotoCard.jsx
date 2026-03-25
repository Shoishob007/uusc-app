"use client";
import Image from "next/image";

/**
 * PhotoCard – overlay-style image card with caption
 */
export default function PhotoCard({
  src,
  alt = "",
  caption,
  className = "",
  aspectRatio = "aspect-video",
  overlay = true,
}) {
  return (
    <div
      className={`relative group overflow-hidden rounded-2xl ${aspectRatio} ${className}`}
    >
      <Image
        src={src}
        alt={alt || caption || "Photo"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium truncate">{caption}</p>
        </div>
      )}
    </div>
  );
}
