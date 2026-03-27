"use client";
import { useEffect, useRef } from "react";
import { Users, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Badge from "@/app/components/ui/Badge";
import { lastTournament } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const roundLabel = { QF: "QF", SF: "SF", F: "Final" };

function parseSets(score) {
  return score.split(", ").map((s) => s.split("-"));
}

const clubColors = {
  UUSC: { bg: "#0E4D92", abbr: "UU" },
  "DBC Eagles": { bg: "#9E1B24", abbr: "DBC" },
  "Star Court": { bg: "#2D6A27", abbr: "SC" },
};
function getClubColor(club) {
  return (
    clubColors[club] ?? { bg: "#374151", abbr: club.slice(0, 2).toUpperCase() }
  );
}

export default function TournamentResult() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".result-header", {
        scrollTrigger: {
          trigger: ".result-header",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".final-card", {
        scrollTrigger: { trigger: ".final-card", start: "top 80%", once: true },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
      });
      gsap.from(".match-card", {
        scrollTrigger: {
          trigger: ".matches-list",
          start: "top 82%",
          once: true,
        },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const champion = lastTournament.podium[0];
  const runnerUp = lastTournament.podium[1];
  const otherMatches = lastTournament.matches.filter((m) => m.round !== "F");

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 110% at 85% 50%, rgba(3,10,18,0.8), #020b14 62%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(3,18,30,0.04),transparent_40%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="result-header flex flex-col items-center mb-14 gap-3">
          <SectionHeader
            eyebrow="Latest Results"
            title="Last Tournament"
            titleHighlight="Results"
            subtitle={`${lastTournament.name} Â· ${lastTournament.date}`}
            darkMode
          />
          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-400 mt-1">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#F7B731]" />
              {lastTournament.totalParticipants} Players
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#F7B731]" />
              {lastTournament.totalMatches} Matches
            </span>
          </div>
        </div>

        {/* Final â€” football score hero card */}
        <div className="final-card rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-[0_12px_50px_rgba(0,0,0,0.5)]">
          {/* Title bar */}
          <div className="bg-gradient-to-r from-[#F7B731] via-[#E6A500] to-[#F7B731] px-6 py-2 flex items-center justify-center gap-2">
            <span className="text-[#0a1628] text-xs font-black uppercase tracking-[0.18em]">
              {lastTournament.name}
            </span>
            <span className="text-[#0a1628]/50 text-xs">Â·</span>
            <span className="text-[#0a1628] text-xs font-bold uppercase tracking-widest">
              Grand Final
            </span>
          </div>

          {/* Main score */}
          <div
            className="relative px-6 py-8 sm:px-10"
            style={{
              background:
                "linear-gradient(135deg,#071525 0%,#0e2240 50%,#071525 100%)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Champion */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-black text-lg border-2 border-[#F7B731]/50 shadow-lg"
                  style={{ background: getClubColor(champion.club).bg }}
                >
                  {getClubColor(champion.club).abbr}
                </div>
                <p className="text-white font-bold text-sm sm:text-base text-center leading-tight">
                  {champion.player}
                </p>
                <span className="text-slate-400 text-xs">{champion.club}</span>
                <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#F7B731]/20 border border-[#F7B731]/40 text-[#F7B731] text-xs font-bold uppercase tracking-wider">
                  Champion
                </span>
              </div>

              {/* Score */}
              <div className="text-center shrink-0 px-2">
                <div className="flex items-center justify-center gap-3 sm:gap-5">
                  <span className="font-black text-5xl sm:text-6xl text-white leading-none">
                    {parseSets(champion.score).length}
                  </span>
                  <span className="text-slate-500 text-2xl font-light">:</span>
                  <span className="font-black text-5xl sm:text-6xl text-slate-500 leading-none">
                    0
                  </span>
                </div>
                <p className="text-[#F7B731] text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                  Sets Won
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                  {parseSets(champion.score).map(([w, l], si) => (
                    <span
                      key={si}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold border border-white/10 text-slate-200"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-white">{w}</span>
                      <span className="text-slate-500 mx-0.5">-</span>
                      <span className="text-slate-400">{l}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Runner-up */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-black text-lg border-2 border-white/15 shadow-lg"
                  style={{ background: getClubColor(runnerUp.club).bg }}
                >
                  {getClubColor(runnerUp.club).abbr}
                </div>
                <p className="text-slate-300 font-semibold text-sm sm:text-base text-center leading-tight">
                  {runnerUp.player}
                </p>
                <span className="text-slate-500 text-xs">{runnerUp.club}</span>
                <span className="mt-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
                  Runner-Up
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SF & QF matches */}
        <div className="matches-list space-y-2.5">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.18em] mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-slate-600" />
            All Match Results
            <span className="h-px flex-1 bg-slate-600/40" />
          </h3>
          {otherMatches.map((m, i) => {
            const sets = parseSets(m.p1score);
            return (
              <div
                key={i}
                className="match-card flex items-center gap-3 rounded-xl border border-white/[0.08] px-4 py-3.5 hover:border-white/15 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <Badge
                  color={m.round === "SF" ? "sky" : "muted"}
                  size="sm"
                  className="shrink-0 min-w-[40px] justify-center"
                >
                  {roundLabel[m.round]}
                </Badge>
                <span className="text-white font-semibold text-sm flex-1 truncate">
                  {m.player1}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {sets.map(([w, l], si) => (
                    <span
                      key={si}
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-white/10 text-slate-200"
                      style={{ background: "rgba(247,183,49,0.10)" }}
                    >
                      <span className="text-[#F7B731]">{w}</span>
                      <span className="text-slate-600">-</span>
                      <span className="text-slate-400">{l}</span>
                    </span>
                  ))}
                </div>
                <span className="text-slate-500 text-sm flex-1 text-right truncate">
                  {m.player2}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
