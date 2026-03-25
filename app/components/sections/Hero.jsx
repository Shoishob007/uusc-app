"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { clubStats } from "@/app/data/dummy";

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
          src="/assets/badminton-scene-1.svg"
          alt="Badminton action scene"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#081325]/80 via-[#0E2D50]/70 to-[#7D141C]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,183,49,0.18),transparent_45%)]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white mb-6">
              Ultimate United Sports Club
            </p>

            <h1 className="font-display text-white font-black leading-[1.02] text-4xl sm:text-6xl lg:text-7xl mb-5">
              Smash Hard,
              <span className="block text-[#F7B731]">Train Smart</span>
            </h1>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Elite coaching, professional indoor courts, and a strong club
              culture for players who want to compete with confidence.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {clubStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-3"
                >
                  <p className="font-display text-white font-extrabold text-xl leading-none">
                    {item.value}
                  </p>
                  <p className="text-white/80 text-xs mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 
          <div className="hidden lg:block">
            <div className="rounded-3xl overflow-hidden border border-white/25 shadow-[0_20px_70px_rgba(0,0,0,0.35)] bg-black/20">
              <img
                src="/assets/badminton-scene-2.svg"
                alt="UUSC match moment"
                className="h-[460px] w-full object-cover"
              />
              <div className="p-5 bg-[#0B1D34]/90 border-t border-white/15">
                <p className="text-white text-sm font-semibold tracking-wide">
                  Weekly sessions, monthly tournaments, and year-round coaching.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7FAFF] to-transparent pointer-events-none" />
    </section>
  );
}
