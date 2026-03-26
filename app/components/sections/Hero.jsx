"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setOffsetY(window.scrollY * 0.22);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1920&q=80"
          alt="Badminton action scene"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.background = "#0d1c2e";
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#081325]/85 via-[#0E2D50]/70 to-[#7D141C]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,183,49,0.15),transparent_45%)]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white mb-6">
            Ultimate United Sports Club
          </p>

          <h1 className="font-display text-white font-black leading-[1.02] text-4xl sm:text-6xl lg:text-7xl mb-5">
            Smash Hard,
            <span className="block text-[#F7B731]">Train Smart</span>
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
            Elite coaching, professional indoor courts, and a strong club
            culture for players who want to compete with confidence.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="danger" size="lg" href="#join">
              Join Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#tournaments"
              className="border-white/70 text-white hover:bg-white hover:text-[#13233A]"
            >
              Explore Tournaments
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
