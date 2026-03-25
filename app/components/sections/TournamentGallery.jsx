"use client";
import { useState, useRef, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { tournamentGallery } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

export default function TournamentGallery() {
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gal-item", {
        scrollTrigger: { trigger: ".bento-grid", start: "top 82%", once: true },
        scale: 0.92,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
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
      id="gallery"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F1F5F9] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <SectionHeader
            eyebrow="Recent Moments"
            title="Last Tournament"
            titleHighlight="Gallery"
            subtitle="Key moments from our latest championship - captured in a bento collage."
          />
        </div>

        {/* Bento grid */}
        <div className="bento-grid grid grid-cols-3 md:grid-cols-4 auto-rows-[180px] gap-3">
          {tournamentGallery.map((img) => {
            const spanClass = img.span || "";
            return (
              <div
                key={img.id}
                className={`gal-item relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm ${spanClass}`}
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.image}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/badminton-scene-2.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium">
                    {img.caption}
                  </p>
                </div>
              </div>
            );
          })}
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
              onError={(e) => {
                e.currentTarget.src = "/assets/badminton-scene-2.svg";
              }}
            />
            <div className="bg-white px-5 py-3">
              <p className="text-[#13233A] text-sm font-medium">
                {lightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
