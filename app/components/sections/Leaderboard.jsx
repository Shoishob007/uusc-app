"use client";
import { useEffect, useRef } from "react";
import { Crown, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { leaderboard } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const rankIcon = (rank) =>
  rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;
const rankColor = (rank) =>
  rank === 1
    ? "#F7B731"
    : rank === 2
      ? "#94A3B8"
      : rank === 3
        ? "#CD7F32"
        : "#233A57";

export default function Leaderboard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lb-header", {
        scrollTrigger: { trigger: ".lb-header", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".lb-row", {
        scrollTrigger: { trigger: ".lb-table", start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="leaderboard"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F7FAFF] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(247,183,49,0.05),transparent)] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lb-header flex justify-center mb-14">
          <SectionHeader
            eyebrow="Rankings"
            title="Player"
            titleHighlight="Leaderboard"
            subtitle="Top performers ranked by total points earned across all UUSC tournaments this season."
          />
        </div>

        {/* Top 3 highlight cards */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {leaderboard.slice(0, 3).map((p, i) => {
            const colors = [
              {
                bg: "rgba(247,183,49,0.08)",
                border: "rgba(247,183,49,0.3)",
                text: "#F7B731",
              },
              {
                bg: "rgba(148,163,184,0.08)",
                border: "rgba(148,163,184,0.2)",
                text: "#94A3B8",
              },
              {
                bg: "rgba(205,127,50,0.08)",
                border: "rgba(205,127,50,0.2)",
                text: "#CD7F32",
              },
            ][i];
            return (
              <div
                key={p.rank}
                className="flex-1 rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <span className="text-3xl shrink-0">{rankIcon(p.rank)}</span>
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: colors.border }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/player-portrait.svg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-[#13233A] truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-[#3F556F]">{p.club}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="font-display font-extrabold text-xl"
                    style={{ color: colors.text }}
                  >
                    {p.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#3F556F]">pts</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full table */}
        <div className="lb-table rounded-2xl border border-[#C9D8EC] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0E4D92]/15 border-b border-[#C9D8EC]">
                <th className="text-left px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide w-12">
                  #
                </th>
                <th className="text-left px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                  Player
                </th>
                <th className="text-center px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide hidden sm:table-cell">
                  Club
                </th>
                <th className="text-center px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide hidden md:table-cell">
                  W/L
                </th>
                <th className="text-right px-4 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E3ECF8]">
              {leaderboard.map((p) => (
                <tr
                  key={p.rank}
                  className="lb-row hover:bg-[#F3F8FF] transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: rankColor(p.rank) }}
                    >
                      {rankIcon(p.rank)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#D4E1F3] shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/player-portrait.svg";
                        }}
                      />
                      <span className="font-semibold text-[#13233A]">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center text-[#3F556F] hidden sm:table-cell">
                    {p.club}
                  </td>
                  <td className="px-4 py-3.5 text-center hidden md:table-cell">
                    <span className="text-[#9E1B24] font-mono text-xs">
                      {p.wl}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-display font-bold text-[#F7B731]">
                    {p.points.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
