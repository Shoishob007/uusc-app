"use client";
import { useEffect, useRef } from "react";
import { Trophy, Users, Globe, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { milestones } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { icon: Trophy, value: "30+", label: "National Titles", color: "#B8860B" },
  { icon: Users, value: "500+", label: "Active Members", color: "#9E1B24" },
  {
    icon: Globe,
    value: "12",
    label: "International Players",
    color: "#0E4D92",
  },
  { icon: Zap, value: "6", label: "Pro-Grade Courts", color: "#9E1B24" },
];

const clubImages = [
  {
    src: "/assets/badminton-scene-1.svg",
    alt: "Championship arena",
    cls: "col-span-2 row-span-2 h-full",
  },
  {
    src: "/assets/badminton-scene-3.svg",
    alt: "Training session",
    cls: "h-full",
  },
  { src: "/assets/badminton-scene-4.svg", alt: "Youth academy", cls: "h-full" },
];

export default function AboutClub() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 82%",
          once: true,
        },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".about-images", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 82%",
          once: true,
        },
        x: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".milestone-item", {
        scrollTrigger: {
          trigger: ".milestones-list",
          start: "top 85%",
          once: true,
        },
        x: -25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
      gsap.from(".achievement-stat", {
        scrollTrigger: {
          trigger: ".achievements-grid",
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.4)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F1F5F9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-center mb-16">
          <SectionHeader
            eyebrow="Our Story"
            title="About"
            titleHighlight="UUSC"
            subtitle="Fifteen years of passion, dedication, and championship glory. This is where legends are made."
          />
        </div>

        {/* Two-column: text left, image mosaic right */}
        <div className="about-content grid lg:grid-cols-2 gap-14 items-start mb-16">
          {/* Left: Story + timeline */}
          <div className="about-text space-y-8">
            <div className="space-y-4">
              <p className="text-[#3F556F] text-base leading-relaxed">
                Founded in 2009 by a group of passionate badminton enthusiasts,
                UUSC started with a vision that was simple yet ambitious: to
                build a world-class badminton institution right here in Dhaka.
              </p>
              <p className="text-[#3F556F] text-base leading-relaxed">
                Today we stand as Bangladesh&#39;s most decorated badminton club
                &#8212; with 30 national titles, a roster of international-level
                players, and a youth academy that has produced over a dozen
                national team selections.
              </p>
              <p className="text-[#3F556F] text-base leading-relaxed">
                Our culture is built on relentless training, mutual respect, and
                a deep love for the sport. Every player who walks through our
                doors is treated as family.
              </p>
            </div>

            {/* Achievement stats */}
            <div className="achievements-grid grid grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className="achievement-stat p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${a.color}15`,
                      border: `1px solid ${a.color}28`,
                    }}
                  >
                    <a.icon
                      className="w-4 h-4"
                      style={{ color: a.color }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-lg text-[#13233A] leading-none">
                      {a.value}
                    </div>
                    <div className="text-[#4A6380] text-xs">{a.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#13233A] mb-5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#9E1B24] inline-block" />
                Key Milestones
              </h3>
              <div className="milestones-list relative pl-6 border-l-2 border-[#E2E8F0] space-y-5">
                {milestones.map((m, i) => (
                  <div key={i} className="milestone-item relative">
                    <div className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-[#F1F5F9] border-2 border-[#9E1B24] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9E1B24]" />
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge color="sky" size="sm" className="shrink-0 mt-0.5">
                        {m.year}
                      </Badge>
                      <p className="text-[#4A6380] text-sm leading-relaxed">
                        {m.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image mosaic */}
          <div className="about-images grid grid-cols-2 grid-rows-[200px_200px] gap-3">
            {clubImages.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ${img.cls} shadow-sm`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/badminton-scene-1.svg";
                  }}
                />
              </div>
            ))}
            {/* Quote card */}
            <div className="col-span-2 rounded-2xl bg-[#13233A] p-5 flex flex-col justify-between shadow-sm">
              <p className="text-slate-200 text-sm leading-relaxed italic">
                &#8220;We don&#39;t just train athletes - we build champions
                with character.&#8221;
              </p>
              <div className="mt-4">
                <p className="text-white font-semibold text-sm">
                  Coach Tariq Hossain
                </p>
                <p className="text-slate-400 text-xs">Head Coach, UUSC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
