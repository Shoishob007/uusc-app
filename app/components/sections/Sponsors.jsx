"use client";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { sponsors } from "@/app/data/dummy";

function SponsorCard({ sponsor }) {
  return (
    <a
      href={sponsor.website ?? "#sponsors"}
      className="shrink-0 w-44 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F1F5F9] border border-slate-200 flex items-center justify-center text-[#13233A] font-display font-black text-lg mb-3">
        {sponsor.name.slice(0, 2).toUpperCase()}
      </div>
      <p className="font-display font-bold text-sm text-[#13233A] leading-tight">{sponsor.name}</p>
      <p className="text-[#94A3B8] text-xs mt-1 capitalize">{sponsor.tier} sponsor</p>
    </a>
  );
}

export default function Sponsors() {
  const marquee = [...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="py-20 lg:py-28 bg-[#F1F5F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex justify-center">
          <SectionHeader
            eyebrow="Partnership"
            title="Our"
            titleHighlight="Sponsors"
            subtitle="Brands that support our courts, our events, and the future of badminton at UUSC."
          />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex gap-4 w-max px-4">
          {marquee.map((s, i) => (
            <SponsorCard key={`s-${i}`} sponsor={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
