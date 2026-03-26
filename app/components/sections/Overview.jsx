"use client";
import { useEffect, useRef } from "react";
import { UserCheck, Wifi, Feather, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: UserCheck,
    title: "Expert Supervision",
    description:
      "Every session is led by BWF-certified coaches. Each player receives direct attention, structured feedback, and a safe, professional training environment.",
    accent: "#9E1B24",
    iconBg: "rgba(158,27,36,0.10)",
    iconBorder: "rgba(158,27,36,0.22)",
    topGradient: "linear-gradient(90deg, #9E1B24, #C62828)",
  },
  {
    icon: Wifi,
    title: "Fast Internet",
    description:
      "High-speed fiber internet across all club premises. Live score tracking, video analysis, and match streaming are all seamlessly supported.",
    accent: "#0E4D92",
    iconBg: "rgba(14,77,146,0.10)",
    iconBorder: "rgba(14,77,146,0.22)",
    topGradient: "linear-gradient(90deg, #0E4D92, #1D76D2)",
  },
  {
    icon: Feather,
    title: "Badminton Club",
    description:
      "Six professional indoor courts with international-grade flooring, optimized lighting, and equipment maintained at championship standard.",
    accent: "#B8860B",
    iconBg: "rgba(247,183,49,0.12)",
    iconBorder: "rgba(247,183,49,0.28)",
    topGradient: "linear-gradient(90deg, #F7B731, #D4920A)",
  },
  {
    icon: Users,
    title: "Badminton Community",
    description:
      "A vibrant family of 500+ active members across all skill levels. Weekly social events, tournaments, and a culture that builds lasting friendships.",
    accent: "#9E1B24",
    iconBg: "rgba(158,27,36,0.10)",
    iconBorder: "rgba(158,27,36,0.22)",
    topGradient: "linear-gradient(90deg, #9E1B24, #C62828)",
  },
];

export default function Overview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.set(".overview-intro, .overview-card", {
      opacity: 1,
      y: 0,
      clearProps: "opacity,transform",
    });
    return () => {};
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F1F5F9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="overview-intro grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Club Overview"
              title="More Than a Sports"
              titleHighlight="Club"
              subtitle="UUSC has been the heartbeat of competitive badminton in Dhaka since 2009 â€” a community of athletes, coaches, and champions united by one purpose."
            />
          </div>
          <div className="space-y-4">
            <p className="text-[#3F556F] text-base leading-relaxed">
              From humble beginnings with 12 founding members and 2 courts, UUSC
              has grown into a powerhouse with over 500 active members, 6
              professional courts, and 30 national championship titles.
            </p>
            <p className="text-[#3F556F] text-base leading-relaxed">
              Whether you are an aspiring junior, a weekend warrior, or a
              seasoned competitor, UUSC is where your game â€” and your character
              â€” will flourish.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#9E1B24] to-[#C62828]" />
              <span className="text-[#9E1B24] text-sm font-semibold tracking-wide">
                Est. 2009 Â· Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Feature cards - 4 grid */}
        <div className="overview-cards grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="overview-card group relative flex flex-col gap-5 rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-[0_10px_36px_rgba(0,0,0,0.10)] hover:-translate-y-1 overflow-hidden transition-all duration-300"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: f.topGradient }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: f.iconBg, border: `1.5px solid ${f.iconBorder}` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.accent }} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#13233A] mb-2">
                  {f.title}
                </h3>
                <p className="text-[#4A6380] text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
              <div
                className="mt-auto h-0.5 w-8 rounded-full group-hover:w-16 transition-all duration-500"
                style={{ background: f.topGradient }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
