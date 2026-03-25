"use client";
import { useEffect, useRef } from "react";
import { Target, Heart, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Target,
    label: "Our Mission",
    description:
      "To develop the next generation of badminton champions through disciplined training, world-class facilities, and a culture of relentless excellence.",
    accent: "#9E1B24",
    iconBg: "rgba(158,27,36,0.12)",
    iconBorder: "rgba(158,27,36,0.25)",
    topGradient: "linear-gradient(90deg, #9E1B24, #C62828)",
  },
  {
    icon: Heart,
    label: "Our Values",
    description:
      "Teamwork, integrity, resilience, and respect. We believe the character built on the court extends to every aspect of life.",
    accent: "#0E4D92",
    iconBg: "rgba(14,77,146,0.12)",
    iconBorder: "rgba(14,77,146,0.25)",
    topGradient: "linear-gradient(90deg, #0E4D92, #1D76D2)",
  },
  {
    icon: Star,
    label: "Our Vision",
    description:
      "To be the premier badminton institution in South Asia - producing national champions, nurturing youth talent, and inspiring millions.",
    accent: "#B8860B",
    iconBg: "rgba(247,183,49,0.14)",
    iconBorder: "rgba(247,183,49,0.32)",
    topGradient: "linear-gradient(90deg, #F7B731, #D4920A)",
  },
];

export default function Overview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Keep this section visible even if scroll animations fail to initialize.
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
              eyebrow="Who We Are"
              title="More Than a Sports"
              titleHighlight="Club"
              subtitle="UUSC has been the heartbeat of competitive badminton in Dhaka since 2009 - a community of athletes, coaches, and champions united by one purpose."
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
              seasoned competitor, UUSC is where your game - and your character
              - will flourish.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#9E1B24] to-[#C62828]" />
              <span className="text-[#9E1B24] text-sm font-semibold tracking-wide">
                Est. 2009 - Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Pillar cards */}
        <div className="overview-cards grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="overview-card group relative flex flex-col gap-5 rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-[0_10px_36px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden transition-all duration-300"
            >
              {/* Colored top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: p.topGradient }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: p.iconBg,
                  border: `1.5px solid ${p.iconBorder}`,
                }}
              >
                <p.icon
                  className="w-6 h-6"
                  style={{ color: p.accent }}
                  strokeWidth={2}
                />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#13233A] mb-2">
                  {p.label}
                </h3>
                <p className="text-[#4A6380] text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div
                className="mt-auto h-0.5 w-8 rounded-full group-hover:w-16 transition-all duration-500"
                style={{ background: p.topGradient }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
