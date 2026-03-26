"use client";
import { useEffect, useRef } from "react";
import {
  Dumbbell,
  UserCheck,
  Building2,
  CalendarDays,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { services } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  dumbbell: Dumbbell,
  "user-check": UserCheck,
  building: Building2,
  "calendar-days": CalendarDays,
  "graduation-cap": GraduationCap,
  "bar-chart": BarChart3,
};

const colorConfig = {
  sky: {
    accent: "#9E1B24",
    bg: "rgba(158,27,36,0.10)",
    border: "rgba(158,27,36,0.22)",
  },
  red: {
    accent: "#0E4D92",
    bg: "rgba(14,77,146,0.10)",
    border: "rgba(14,77,146,0.22)",
  },
  gold: {
    accent: "#B8860B",
    bg: "rgba(247,183,49,0.13)",
    border: "rgba(247,183,49,0.28)",
  },
};

const fallbackServices = [
  {
    id: "fallback-1",
    title: "Professional Training",
    description: "Structured training tracks from beginner to elite levels.",
    icon: "dumbbell",
    color: "sky",
  },
  {
    id: "fallback-2",
    title: "Expert Coaching",
    description: "Certified coaches for tactical and technical development.",
    icon: "user-check",
    color: "red",
  },
  {
    id: "fallback-3",
    title: "Indoor Facilities",
    description: "Professional indoor courts with quality lighting and setup.",
    icon: "building",
    color: "gold",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const serviceItems =
    Array.isArray(services) && services.length > 0
      ? services
      : fallbackServices;

  useEffect(() => {
    // Keep this section visible even if scroll animations fail to initialize.
    gsap.set(".service-header, .service-card", {
      opacity: 1,
      y: 0,
      clearProps: "opacity,transform",
    });
    return () => {};
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F8FAFC] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="service-header flex justify-center mb-14">
          <SectionHeader
            eyebrow="Our Services"
            title="Everything You Need to"
            titleHighlight="Excel"
            subtitle="From beginner basics to elite competition prep — our comprehensive services are designed so every member reaches their full potential."
          />
        </div>

        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceItems.map((s) => {
            const Icon = iconMap[s.icon] ?? Dumbbell;
            const c = colorConfig[s.color] ?? colorConfig.sky;
            return (
              <div
                key={s.id}
                className="service-card group flex flex-col rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
              >
                {/* Service image */}
                {s.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.parentElement.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-transparent" />
                    <div
                      className="absolute bottom-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: c.accent + "dd" }}
                    >
                      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Subtle left accent line */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: c.accent }}
                  />

                  {!s.image && (
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: c.bg,
                        border: `1.5px solid ${c.border}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: c.accent }}
                        strokeWidth={1.9}
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="font-display font-bold text-base text-[#13233A] mb-1.5 group-hover:text-[#9E1B24] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[#4A6380] text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-auto h-px bg-slate-100 relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full w-0 group-hover:w-full transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg,${c.accent},transparent)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
