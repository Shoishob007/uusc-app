"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ShuttleRacketLoader({ onDone }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".loader-ring",
        { rotate: 0 },
        { rotate: 360, duration: 3.2, repeat: -1, ease: "none" },
      );

      gsap.fromTo(
        ".loader-shuttle",
        { y: -8, rotate: -15 },
        {
          y: 8,
          rotate: 15,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        },
      );

      gsap.fromTo(
        ".loader-racket",
        { y: 6 },
        { y: -6, duration: 1.1, yoyo: true, repeat: -1, ease: "sine.inOut" },
      );

      const t = gsap.delayedCall(2.2, () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => onDone?.(),
        });
      });

      return () => t.kill();
    }, rootRef);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#F4F8FF] via-[#EAF2FF] to-[#FFEAEA]"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="loader-ring w-48 h-48 rounded-full border border-[#98B4D8] border-dashed absolute" />
        <div className="relative w-44 h-44 flex items-center justify-center">
          <img
            className="loader-racket absolute w-28 drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
            src="/assets/badminton-racket.svg"
            alt="Racket"
          />
          <img
            className="loader-shuttle absolute w-16 translate-x-10 -translate-y-6 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
            src="/assets/shuttlecock.svg"
            alt="Shuttle"
          />
        </div>
        <div className="text-center">
          <p className="font-display text-[#13233A] text-xl tracking-wide font-bold">
            UUSC
          </p>
          <p className="text-[#5F7391] text-xs tracking-[0.24em] uppercase">
            Loading Club Arena
          </p>
        </div>
      </div>
    </div>
  );
}
