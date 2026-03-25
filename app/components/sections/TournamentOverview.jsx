"use client";
import { useEffect, useRef } from "react";
import { CalendarDays, MapPin, Users, Trophy, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import { tournaments, clubStats } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const fallbackTournaments = [
  {
    id: "fallback-1",
    status: "upcoming",
    name: "UUSC Monsoon Open",
    date: "June 20-25, 2026",
    venue: "UUSC Main Arena",
    category: "Open",
    prizePool: "BDT 120,000",
    registrations: 32,
    maxSlots: 64,
    image: "/assets/badminton-scene-2.svg",
  },
  {
    id: "fallback-2",
    status: "past",
    name: "UUSC Winter Doubles Cup",
    date: "December 5-8, 2025",
    venue: "UUSC Main Arena",
    category: "Doubles",
    prizePool: "BDT 85,000",
    winner: "Salah / Karim",
    image: "/assets/badminton-scene-4.svg",
  },
];

export default function TournamentOverview() {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const statRefs = useRef([]);
  const tournamentItems =
    Array.isArray(tournaments) && tournaments.length > 0
      ? tournaments
      : fallbackTournaments;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on banner background
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-banner",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Count-up for each stat
      const rawValues = [520, 58, 15, 34];
      const suffixes = ["+", "+", "", ""];
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: rawValues[i],
          duration: 2.2,
          delay: i * 0.15,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: ".parallax-banner",
            start: "top 70%",
            once: true,
          },
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val) + suffixes[i];
          },
        });
      });

      // Tournament cards entrance
      gsap.set(".tourn-card", {
        opacity: 1,
        y: 0,
        clearProps: "opacity,transform",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tournaments"
      ref={sectionRef}
      className="bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* -- Parallax dark banner with count-up stats -- */}
      <div className="parallax-banner relative overflow-hidden h-64 sm:h-72 md:h-80">
        {/* Parallax background image */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 scale-110 bg-[#05101E]"
          style={{
            backgroundImage: "url('/assets/badminton-scene-1.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05101E]/80 via-[#0A1B35]/75 to-[#05101E]/90" />

        {/* Stats */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            Club at a Glance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-6">
            {clubStats.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-display font-black text-4xl sm:text-5xl text-white leading-none mb-1 tabular-nums"
                  ref={(el) => (statRefs.current[i] = el)}
                >
                  0
                </div>
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- Tournament cards -- */}
      <div className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
            <SectionHeader
              align="left"
              eyebrow="Compete & Conquer"
              title="Tournaments"
              titleHighlight="Overview"
              subtitle="Upcoming and recent tournaments. Register before slots fill up."
            />
            <Button variant="outline" size="sm" href="#join">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="tourn-grid grid md:grid-cols-2 gap-6">
            {tournamentItems.map((t) => (
              <div
                key={t.id}
                className="tourn-card group rounded-2xl border border-slate-200 overflow-hidden hover:border-[#9E1B24]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.1)] bg-white shadow-sm"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/badminton-scene-2.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F35] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      color={t.status === "upcoming" ? "sky" : "muted"}
                      size="md"
                    >
                      {t.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge color="gold" size="md">
                      {t.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#13233A] leading-tight group-hover:text-[#9E1B24] transition-colors">
                    {t.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[#4A6380]">
                      <CalendarDays className="w-4 h-4 text-[#9E1B24] shrink-0" />
                      <span>{t.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A6380]">
                      <MapPin className="w-4 h-4 text-[#0E4D92] shrink-0" />
                      <span className="truncate">{t.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A6380]">
                      <Trophy className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span className="font-semibold text-[#B8860B]">
                        {t.prizePool}
                      </span>
                    </div>
                    {t.status === "upcoming" ? (
                      <div className="flex items-center gap-2 text-[#4A6380]">
                        <Users className="w-4 h-4 text-[#9E1B24] shrink-0" />
                        <span>
                          {t.registrations}/{t.maxSlots} registered
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[#4A6380]">
                        <Trophy className="w-4 h-4 text-[#B8860B] shrink-0" />
                        <span className="truncate">{t.winner}</span>
                      </div>
                    )}
                  </div>

                  {t.status === "upcoming" && (
                    <div>
                      <div className="flex justify-between text-xs text-[#4A6380] mb-1.5">
                        <span>Registration Slots</span>
                        <span>
                          {t.registrations}/{t.maxSlots}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#9E1B24] to-[#C62828]"
                          style={{
                            width: `${(t.registrations / t.maxSlots) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    variant={t.status === "upcoming" ? "primary" : "outline"}
                    size="sm"
                    className="w-full justify-center"
                  >
                    {t.status === "upcoming" ? "Register Now" : "View Results"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
