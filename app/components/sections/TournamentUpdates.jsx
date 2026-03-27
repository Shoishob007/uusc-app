"use client";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Clock,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import { tournamentUpdates, tournaments } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const typeColor = {
  registration: "sky",
  result: "gold",
  draw: "red",
  announcement: "muted",
};

export default function TournamentUpdates() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-featured", {
        scrollTrigger: {
          trigger: ".news-featured",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
      });
      gsap.from(".news-card", {
        scrollTrigger: {
          trigger: ".news-secondary",
          start: "top 85%",
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "power2.out",
        immediateRender: false,
      });
      gsap.from(".tourn-card", {
        scrollTrigger: { trigger: ".tourn-row", start: "top 85%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        immediateRender: false,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = tournamentUpdates;
  const tournamentItems =
    Array.isArray(tournaments) && tournaments.length > 0 ? tournaments : [];

  return (
    <section
      id="updates"
      ref={sectionRef}
      className="py-12 lg:py-20 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 110% at 85% 50%, rgba(3,10,18,0.8), #020b14 62%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(3,18,30,0.04),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-8">
          <SectionHeader
            align="left"
            eyebrow="Tournament Update"
            title="Latest"
            titleHighlight="News"
            subtitle="Announcements, results, draws, and upcoming tournaments â€” all in one place."
            darkMode
          />
          <Button
            variant="outline"
            size="sm"
            href="#tournaments"
            className="border-white/20 text-slate-300 hover:bg-white/10 shrink-0"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Featured article — full width hero card */}
        {featured && (
          <div
            className="news-featured group rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 mb-4 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="grid md:grid-cols-5">
              <div className="relative h-48 md:h-56 md:col-span-2 overflow-hidden bg-slate-800">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1523]/60" />
              </div>
              <div className="p-5 md:p-6 flex flex-col justify-between md:col-span-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge
                      color={typeColor[featured.type] ?? "muted"}
                      size="sm"
                    >
                      {featured.badge}
                    </Badge>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.date}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-[#F7B731] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featured.body}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[#F7B731] text-xs font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Read article <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary news grid â€” varied sizes */}
        <div className="news-secondary grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {rest.map((u) => {
            return (
              <div
                key={u.id}
                className={`news-card group rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className={`relative overflow-hidden bg-slate-800 h-36`}>
                  <img
                    src={u.image}
                    alt={u.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1523]/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <Badge color={typeColor[u.type] ?? "muted"} size="sm">
                      {u.badge}
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span className="text-slate-500 text-xs">{u.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xs leading-snug mb-1.5 group-hover:text-[#F7B731] transition-colors line-clamp-2">
                    {u.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-1">
                    {u.body}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[#F7B731] text-xs font-semibold">
                    Read <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tournament cards row */}
        {tournamentItems.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-[#F7B731]" />
              <h3 className="text-slate-300 text-xs font-bold uppercase tracking-[0.18em]">
                Tournaments
              </h3>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="tourn-row grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tournamentItems.map((t) => (
                <div
                  key={t.id}
                  className="tourn-card group rounded-2xl overflow-hidden border border-white/10 hover:border-[#F7B731]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="relative h-36 overflow-hidden bg-slate-800">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1523] via-[#0B1523]/30 to-transparent" />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <Badge
                        color={t.status === "upcoming" ? "sky" : "muted"}
                        size="sm"
                      >
                        {t.status === "upcoming" ? "Upcoming" : "Completed"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-2.5">
                    <h4 className="font-display font-bold text-white text-sm leading-snug group-hover:text-[#F7B731] transition-colors line-clamp-2">
                      {t.name}
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3 h-3 text-[#F7B731] shrink-0" />
                        <span>{t.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#F7B731] shrink-0" />
                        <span className="truncate">{t.venue}</span>
                      </div>
                      {t.status === "upcoming" ? (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-[#F7B731] shrink-0" />
                          <span>
                            {t.registrations}/{t.maxSlots} registered
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3 h-3 text-[#F7B731] shrink-0" />
                          <span className="truncate">{t.winner}</span>
                        </div>
                      )}
                    </div>
                    <div className="pt-1">
                      <span className="text-[#F7B731] text-xs font-bold">
                        {t.prizePool}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
