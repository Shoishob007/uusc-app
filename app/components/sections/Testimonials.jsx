"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { testimonials } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-header", {
        scrollTrigger: { trigger: ".testimonials-header", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".testimonials-body", {
        scrollTrigger: { trigger: ".testimonials-body", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const changeSlide = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const outX = dir === 1 ? -60 : 60;
    gsap.to(cardRef.current, {
      x: outX,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(
          (c) => (c + dir + testimonials.length) % testimonials.length,
        );
        gsap.fromTo(
          cardRef.current,
          { x: -outX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          },
        );
      },
    });
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F7FAFF] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(14,77,146,0.07),transparent)] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonials-header flex justify-center mb-14">
          <SectionHeader
            eyebrow="What Members Say"
            title="Stories of"
            titleHighlight="Success"
            subtitle="Real experiences from athletes who have trained, competed, and grown with UUSC."
          />
        </div>

        <div className="testimonials-body">
          {/* Main card */}
          <div
            ref={cardRef}
            className="rounded-3xl bg-white border border-[#C9D8EC] p-8 sm:p-10 relative"
          >
            {/* Large quote icon */}
            <Quote
              className="absolute top-8 right-8 w-16 h-16 text-[#0E4D92]/30"
              fill="currentColor"
              strokeWidth={0}
            />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#F7B731] fill-[#F7B731]"
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-[#13233A]/90 text-lg sm:text-xl leading-relaxed font-light mb-8 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#9E1B24]/40"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/assets/player-portrait.svg";
                }}
              />
              <div>
                <p className="font-display font-bold text-[#13233A]">
                  {t.name}
                </p>
                <p className="text-[#9E1B24] text-sm">{t.role}</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="text-5xl font-display font-black text-[#0E4D92]/40">
                  {String(current + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating) changeSlide(i > current ? 1 : -1);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-7 h-2 bg-[#9E1B24]"
                      : "w-2 h-2 bg-[#C9D8EC] hover:bg-[#9E1B24]/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => changeSlide(-1)}
                className="w-10 h-10 rounded-full border border-[#D4E1F3] hover:border-[#9E1B24]/50 hover:bg-[#9E1B24]/10 flex items-center justify-center text-[#3F556F] hover:text-[#13233A] transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => changeSlide(1)}
                className="w-10 h-10 rounded-full border border-[#D4E1F3] hover:border-[#9E1B24]/50 hover:bg-[#9E1B24]/10 flex items-center justify-center text-[#3F556F] hover:text-[#13233A] transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
