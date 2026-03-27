"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { milestones } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    value: "30+",
    label: "National Titles",
    context: "Three decades of championship excellence across Bangladesh.",
    color: "#F7B731",
    gradient: "from-[#F7B731]/15 to-transparent",
  },
  {
    value: "500+",
    label: "Active Members",
    context: "A thriving badminton community growing every season.",
    color: "#9E1B24",
    gradient: "from-[#9E1B24]/15 to-transparent",
  },
  {
    value: "12",
    label: "International Players",
    context: "Representing Bangladesh in regional and global circuits.",
    color: "#4A90D9",
    gradient: "from-[#0E4D92]/15 to-transparent",
  },
  {
    value: "6",
    label: "Pro-Grade Courts",
    context: "World-class indoor courts open year-round for members.",
    color: "#F7B731",
    gradient: "from-[#F7B731]/15 to-transparent",
  },
];

const clubImages = [
  {
    src: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
    alt: "Championship arena match",
    cls: "col-span-2 row-span-2 h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    alt: "Training session",
    cls: "h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    alt: "Youth academy courts",
    cls: "h-full",
  },
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
      gsap.from(".achievements-prose", {
        scrollTrigger: {
          trigger: ".achievements-prose",
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
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
            <div className="space-y-3">
              <p className="text-[#3F556F] text-sm leading-relaxed">
                Founded in 2009, UUSC grew from a small local group into one of
                Bangladesh&#39;s leading badminton clubs focused on disciplined
                coaching and competitive development.
              </p>
            </div>

            {/* Achievement stats — prose style with inline colored text */}
            <div className="achievements-prose space-y-2 text-[#3F556F] text-sm leading-relaxed">
              <p>
                We&#39;ve achieved{" "}
                <span className="font-black" style={{ color: "#F7B731" }}>
                  {achievements[0].value} national titles
                </span>{" "}
                through world-class coaching and relentless dedication.
              </p>
              <p>
                Our community boasts over{" "}
                <span className="font-black" style={{ color: "#9E1B24" }}>
                  {achievements[1].value} active members
                </span>{" "}
                who train, compete, and grow together year-round.
              </p>
              <p>
                We&#39;ve developed{" "}
                <span className="font-black" style={{ color: "#4A90D9" }}>
                  {achievements[2].value} international players
                </span>{" "}
                who now represent Bangladesh at higher levels.
              </p>
              <p>
                Our facilities include{" "}
                <span className="font-black" style={{ color: "#F7B731" }}>
                  {achievements[3].value} professional-grade courts
                </span>{" "}
                open year-round for training and tournament preparation.
              </p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
