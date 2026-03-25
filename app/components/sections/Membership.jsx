"use client";
import { useEffect, useRef } from "react";
import { Check, X, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import { membershipPlans } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const planColors = {
  muted: {
    accent: "#94A3B8",
    glow: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.2)",
  },
  sky: {
    accent: "#9E1B24",
    glow: "rgba(158,27,36,0.1)",
    border: "rgba(158,27,36,0.28)",
  },
  gold: {
    accent: "#F7B731",
    glow: "rgba(247,183,49,0.1)",
    border: "rgba(247,183,49,0.3)",
  },
};

export default function Membership() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".membership-header", {
        scrollTrigger: { trigger: ".membership-header", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".plan-card", {
        scrollTrigger: { trigger: ".plans-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F7FAFF] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(14,77,146,0.08),transparent)] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="membership-header flex justify-center mb-14">
          <SectionHeader
            eyebrow="Membership Plans"
            title="Choose Your"
            titleHighlight="Journey"
            subtitle="Flexible plans for every level of commitment. Upgrade or downgrade any time — no lock-ins."
          />
        </div>

        <div className="plans-grid grid md:grid-cols-3 gap-6 items-stretch">
          {membershipPlans.map((plan) => {
            const c = planColors[plan.color] ?? planColors.sky;
            return (
              <div
                key={plan.id}
                className={`plan-card relative flex flex-col rounded-3xl bg-white transition-all duration-300 overflow-hidden
                  ${
                    plan.popular
                      ? "scale-[1.02] shadow-[0_0_60px_rgba(158,27,36,0.2)]"
                      : "hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(158,27,36,0.08)]"
                  }
                `}
                style={{ border: `1px solid ${c.border}` }}
              >
                {plan.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, ${c.accent}, ${c.accent}80)`,
                    }}
                  />
                )}

                {/* Card header */}
                <div className="p-7 pb-5">
                  {plan.popular && (
                    <div className="mb-4">
                      <Badge color="sky" size="md">
                        <Zap className="w-3 h-3 fill-current" /> Most Popular
                      </Badge>
                    </div>
                  )}
                  <h3 className="font-display font-bold text-2xl text-[#13233A] mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-2 mt-3 mb-1">
                    <span
                      className="font-display font-black text-4xl"
                      style={{ color: c.accent }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[#3F556F] text-sm pb-1">
                      {plan.priceNote}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-7 h-px bg-[#EDF5FF]" />

                {/* Features */}
                <div className="p-7 flex-1 space-y-3">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: c.accent }}
                        strokeWidth={2.5}
                      />
                      <span className="text-[#233A57] text-sm">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-40">
                      <X
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#3F556F]"
                        strokeWidth={2}
                      />
                      <span className="text-[#3F556F] text-sm line-through">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="p-7 pt-0">
                  <Button
                    variant={
                      plan.popular
                        ? "primary"
                        : plan.color === "gold"
                          ? "gold"
                          : "outline"
                    }
                    size="md"
                    className="w-full justify-center"
                    href="#join"
                  >
                    {plan.cta} →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
