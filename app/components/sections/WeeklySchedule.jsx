"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
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
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
            {weeklySchedule.map((d) => (
              <Button
                key={d.day}
                onClick={() => handleDayChange(d.day)}
                variant={activeDay === d.day ? "primary" : "outline"}
                size="sm"
                className="shrink-0 rounded-xl px-4"
              >
                <span className="hidden sm:inline">{d.day}</span>
                <span className="sm:hidden">{d.short}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Day sessions table */}
        <div
          ref={contentRef}
          className="rounded-2xl border border-[#C9D8EC] overflow-hidden"
        >
          {activeDayData?.sessions.length === 0 && (
            <div className="text-center py-12 text-[#94A3B8]">
              <p className="text-lg font-medium">Rest Day</p>
              <p className="text-sm mt-1">No scheduled sessions today.</p>
            </div>
          )}
          {activeDayData?.sessions.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0E4D92]/12 border-b border-[#C9D8EC]">
                  <th className="text-left px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Time
                  </th>
                  <th className="text-left px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Session
                  </th>
                  <th className="text-left px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide hidden sm:table-cell">
                    Coach
                  </th>
                  <th className="text-left px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Level
                  </th>
                  <th className="text-right px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Courts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E3ECF8]">
                {activeDayData?.sessions.map((session, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#F3F8FF] transition-colors duration-200"
                  >
                    <td className="px-4 py-3.5 font-display font-bold text-[#13233A]">
                      {session.time}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#13233A] text-sm">
                        {session.type}
                      </p>
                      <p className="sm:hidden text-[#4A6380] text-xs mt-0.5">
                        {session.coach}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-[#4A6380] hidden sm:table-cell">
                      {session.coach}
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge
                        color={levelColor[session.level] ?? "muted"}
                        size="sm"
                      >
                        {session.level}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-xs bg-slate-100 text-[#4A6380] px-2.5 py-1 rounded-full font-medium">
                        {session.courts}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
