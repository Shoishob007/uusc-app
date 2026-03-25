"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { weeklySchedule } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const levelColor = {
  Beginner: "sky",
  Intermediate: "gold",
  Advanced: "red",
  Competitive: "red",
  "Under-18": "gold",
  "All Levels": "sky",
  Casual: "muted",
};

export default function WeeklySchedule() {
  const [activeDay, setActiveDay] = useState("Monday");
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const activeDayData = weeklySchedule.find((d) => d.day === activeDay);

  const handleDayChange = (day) => {
    if (day === activeDay) return;
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    }
    setActiveDay(day);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".schedule-header", {
        scrollTrigger: {
          trigger: ".schedule-header",
          start: "top 88%",
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F8FAFC]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="schedule-header flex justify-center mb-10">
          <SectionHeader
            eyebrow="Practice Calendar"
            title="Weekly"
            titleHighlight="Schedule"
            subtitle="Browse sessions by day - pick your slot and show up ready to play."
          />
        </div>

        {/* Day tab strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {weeklySchedule.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => handleDayChange(d.day)}
              className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeDay === d.day
                  ? "bg-[#13233A] text-white shadow-md"
                  : "bg-white border border-slate-200 text-[#4A6380] hover:border-[#9E1B24]/40 hover:text-[#9E1B24]"
              }`}
            >
              <span className="hidden sm:inline">{d.day}</span>
              <span className="sm:hidden">{d.short}</span>
            </button>
          ))}
        </div>

        {/* Day sessions */}
        <div ref={contentRef} className="space-y-4">
          {activeDayData?.sessions.length === 0 && (
            <div className="text-center py-12 text-[#94A3B8]">
              <p className="text-lg font-medium">Rest Day</p>
              <p className="text-sm mt-1">No scheduled sessions today.</p>
            </div>
          )}
          {activeDayData?.sessions.map((session, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] hover:border-[#9E1B24]/30 transition-all duration-200"
            >
              {/* Time block */}
              <div className="shrink-0 min-w-[140px]">
                <p className="font-display font-bold text-[#13233A] text-sm">
                  {session.time}
                </p>
                <p className="text-[#94A3B8] text-xs mt-0.5">
                  {activeDayData.day}
                </p>
              </div>

              {/* Divider for desktop */}
              <div className="hidden sm:block w-px h-10 bg-slate-200" />

              {/* Session info */}
              <div className="flex-1 flex flex-wrap items-center gap-3">
                <div>
                  <p className="font-semibold text-[#13233A] text-sm">
                    {session.type}
                  </p>
                  <p className="text-[#4A6380] text-xs mt-0.5">
                    Coach: {session.coach}
                  </p>
                </div>
              </div>

              {/* Right meta */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Badge color={levelColor[session.level] ?? "muted"} size="sm">
                  {session.level}
                </Badge>
                <span className="text-xs bg-slate-100 text-[#4A6380] px-2.5 py-1 rounded-full font-medium">
                  Courts {session.courts}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {[
            { label: "Beginner", color: "sky" },
            { label: "Intermediate", color: "gold" },
            { label: "Advanced / Competitive", color: "red" },
            { label: "All Levels", color: "sky" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <Badge color={l.color} size="sm">
                {l.label}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
