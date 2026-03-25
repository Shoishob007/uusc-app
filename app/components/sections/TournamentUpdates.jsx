"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { tournamentUpdates } from "@/app/data/dummy";

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
      });
      gsap.from(".news-card", {
        scrollTrigger: { trigger: ".news-grid", start: "top 85%", once: true },
        y: 35,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = tournamentUpdates;

  return (
    <section
      id="updates"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F8FAFC] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <SectionHeader
            eyebrow="Latest News"
            title="Tournament"
            titleHighlight="Updates"
            subtitle="Announcements, draw releases, results, and more - all in one place."
          />
        </div>

        {/* Featured article */}
        {featured && (
          <div className="news-featured group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 mb-6 cursor-pointer">
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 md:h-full min-h-[220px] overflow-hidden bg-slate-100">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/badminton-scene-3.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#05101E]/30" />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge
                      color={typeColor[featured.type] ?? "muted"}
                      size="md"
                    >
                      {featured.badge}
                    </Badge>
                    <span className="text-[#94A3B8] text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.date}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-[#13233A] mb-3 leading-snug group-hover:text-[#9E1B24] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[#4A6380] text-sm leading-relaxed">
                    {featured.body}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[#9E1B24] text-sm font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Read full article <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary articles grid */}
        <div className="news-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((u) => (
            <div
              key={u.id}
              className="news-card group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={u.image}
                  alt={u.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/badminton-scene-3.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F35]/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge color={typeColor[u.type] ?? "muted"} size="sm">
                    {u.badge}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[#94A3B8] text-xs">{u.date}</span>
                </div>
                <h3 className="font-display font-bold text-[#13233A] text-sm leading-snug mb-2 group-hover:text-[#9E1B24] transition-colors">
                  {u.title}
                </h3>
                <p className="text-[#4A6380] text-xs leading-relaxed line-clamp-2">
                  {u.body}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[#9E1B24] text-xs font-semibold">
                  Read more <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
