"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { clubMembers } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

function MemberCard({ member: m }) {
  return (
    <div className="shrink-0 w-56 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm group hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <img
          src={m.avatar}
          alt={m.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/assets/player-portrait.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F35]/70 via-transparent to-transparent" />
        <div className="absolute top-2 right-2">
          <Badge color={m.category === "Coach" ? "gold" : "sky"} size="sm">
            {m.category}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <p className="font-display font-bold text-sm text-[#13233A] truncate">
          {m.name}
        </p>
        <p className="text-[#9E1B24] text-xs font-medium mt-0.5 truncate">
          {m.role}
        </p>
        {m.ranking && (
          <p className="text-[#4A6380] text-xs mt-1">{m.ranking}</p>
        )}
        {m.experience && (
          <p className="text-[#4A6380] text-xs mt-1">Exp: {m.experience}</p>
        )}
      </div>
    </div>
  );
}

export default function ClubMembers() {
  const sectionRef = useRef(null);

  const row1 = [...clubMembers, ...clubMembers];
  const row2 = [
    ...clubMembers.slice().reverse(),
    ...clubMembers.slice().reverse(),
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".members-header", {
        scrollTrigger: {
          trigger: ".members-header",
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
      id="members"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F1F5F9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="members-header flex justify-center">
          <SectionHeader
            eyebrow="Meet the Team"
            title="Club"
            titleHighlight="Members"
            subtitle="The coaches and athletes who define UUSC - scroll to explore our full roster."
          />
        </div>
      </div>

      {/* Row 1 - left scroll */}
      <div className="relative overflow-hidden mb-4">
        <div className="animate-marquee flex gap-4 w-max px-4">
          {row1.map((m, i) => (
            <MemberCard key={`r1-${i}`} member={m} />
          ))}
        </div>
      </div>

      {/* Row 2 - right scroll */}
      <div className="relative overflow-hidden">
        <div className="animate-marquee-reverse flex gap-4 w-max px-4">
          {row2.map((m, i) => (
            <MemberCard key={`r2-${i}`} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
