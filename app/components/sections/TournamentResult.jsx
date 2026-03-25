"use client";
import { useEffect, useRef } from "react";
import { Trophy, Medal, Award, Users, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { lastTournament } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const podiumColors = [
  {
    rank: 1,
    icon: Trophy,
    color: "#F7B731",
    bg: "rgba(247,183,49,0.1)",
    border: "rgba(247,183,49,0.3)",
    label: "Champion",
    height: "h-36",
  },
  {
    rank: 2,
    icon: Medal,
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.2)",
    label: "Runner-Up",
    height: "h-24",
  },
  {
    rank: 3,
    icon: Award,
    color: "#CD7F32",
    bg: "rgba(205,127,50,0.1)",
    border: "rgba(205,127,50,0.2)",
    label: "3rd Place",
    height: "h-20",
  },
];

const roundLabel = { QF: "Quarter-Final", SF: "Semi-Final", F: "Final" };

export default function TournamentResult() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".result-header", {
        scrollTrigger: { trigger: ".result-header", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".podium-block", {
        scrollTrigger: { trigger: ".podium-row", start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "back.out(1.5)",
      });
      gsap.from(".match-row", {
        scrollTrigger: { trigger: ".matches-table", start: "top 82%" },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#EEF5FF] relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F7B731]/4 blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="result-header flex flex-col items-center mb-14 gap-3">
          <SectionHeader
            eyebrow="Latest Results"
            title="Last Tournament"
            titleHighlight="Results"
            subtitle={`${lastTournament.name} · ${lastTournament.date}`}
          />
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#3F556F]">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#9E1B24]" />
              {lastTournament.totalParticipants} Players
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#F7B731]" />
              {lastTournament.totalMatches} Matches
            </span>
          </div>
        </div>

        {/* Podium */}
        <div className="podium-row flex items-end justify-center gap-4 sm:gap-6 mb-16">
          {/* Reorder: 2nd, 1st, 3rd */}
          {[
            lastTournament.podium[1],
            lastTournament.podium[0],
            lastTournament.podium[2],
          ].map((p) => {
            const config = podiumColors.find((c) => c.rank === p.rank);
            return (
              <div
                key={p.rank}
                className="podium-block flex flex-col items-center gap-3 w-36 sm:w-44"
              >
                {/* Trophy icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                  }}
                >
                  <config.icon
                    className="w-6 h-6"
                    style={{ color: config.color }}
                  />
                </div>
                {/* Player name */}
                <div className="text-center">
                  <p className="font-display font-bold text-[#13233A] text-sm leading-tight">
                    {p.player}
                  </p>
                  <p className="text-xs text-[#3F556F]">{p.club}</p>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: config.color }}
                  >
                    {p.prize}
                  </p>
                </div>
                {/* Podium block */}
                <div
                  className={`w-full ${config.height} rounded-t-2xl flex items-end justify-center pb-3`}
                  style={{
                    background: `linear-gradient(0deg, ${config.bg} 0%, transparent 100%)`,
                    border: `1px solid ${config.border}`,
                    borderBottom: "none",
                  }}
                >
                  <span
                    className="font-display font-black text-4xl"
                    style={{ color: config.color }}
                  >
                    {p.rank === 1 ? "1" : p.rank === 2 ? "2" : "3"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Match Results */}
        <div className="matches-table max-w-3xl mx-auto">
          <h3 className="font-display font-bold text-lg text-[#13233A] mb-5 flex items-center gap-2">
            <span className="w-6 h-px bg-[#9E1B24]" />
            Match Results
          </h3>
          <div className="rounded-2xl border border-[#C9D8EC] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0E4D92]/20 border-b border-[#C9D8EC]">
                  <th className="text-left px-5 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Round
                  </th>
                  <th className="text-left px-5 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Winner
                  </th>
                  <th className="text-center px-5 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Score
                  </th>
                  <th className="text-left px-5 py-3 text-[#3F556F] font-semibold text-xs uppercase tracking-wide">
                    Opponent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E3ECF8]">
                {lastTournament.matches.map((m, i) => (
                  <tr
                    key={i}
                    className="match-row hover:bg-[#F3F8FF] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <Badge
                        color={
                          m.round === "F"
                            ? "gold"
                            : m.round === "SF"
                              ? "sky"
                              : "muted"
                        }
                        size="sm"
                      >
                        {roundLabel[m.round] ?? m.round}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-[#13233A]">
                      {m.player1}
                    </td>
                    <td className="px-5 py-3.5 text-center font-mono text-[#F7B731] text-xs">
                      {m.p1score}
                    </td>
                    <td className="px-5 py-3.5 text-[#3F556F]">{m.player2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Highlights */}
          <p className="text-xs text-[#3F556F] mt-4 text-center italic">
            {lastTournament.highlights}
          </p>
        </div>
      </div>
    </section>
  );
}
