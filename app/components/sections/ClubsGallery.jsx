"use client";
import { useState, useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { clubGalleryImages } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

export default function ClubsGallery() {
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cgal-item", {
        scrollTrigger: { trigger: ".cg-bento", start: "top 82%", once: true },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.3)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const h = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <section
      id="clubs-gallery"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <SectionHeader
            eyebrow="Life at UUSC"
            title="Club"
            titleHighlight="Gallery"
            subtitle="A bento collage of training days, championship moments, and the vibrant community."
          />
        </div>

        {/* Bento grid */}
        <div className="cg-bento grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-3">
          {clubGalleryImages.map((img) => (
            <div
              key={img.id}
              className={`cgal-item relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm ${img.span ?? ""}`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.image}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "/assets/badminton-scene-4.svg"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="max-w-4xl w-full rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.caption}
              className="w-full h-auto"
              onError={(e) => { e.currentTarget.src = "/assets/badminton-scene-4.svg"; }}
            />
            <div className="bg-white px-5 py-3">
              <p className="text-[#13233A] text-sm font-medium">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
