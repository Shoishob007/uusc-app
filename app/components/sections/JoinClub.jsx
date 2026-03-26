"use client";
import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  Loader,
  Check,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Button from "@/app/components/ui/Button";
import { membershipPlans } from "@/app/data/dummy";

gsap.registerPlugin(ScrollTrigger);

const INPUT_CLASS =
  "w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-[#13233A] text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#9E1B24]/60 focus:ring-1 focus:ring-[#9E1B24]/20 transition-all";

export default function JoinClub() {
  const sectionRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Pro",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".join-header", {
        scrollTrigger: {
          trigger: ".join-header",
          start: "top 88%",
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
      });
      // Only animate packages on scroll, don't hide them initially
      gsap.from(".package-card", {
        scrollTrigger: {
          trigger: ".packages-grid",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        immediateRender: false,
      });
      gsap.from(".join-form", {
        scrollTrigger: { trigger: ".join-form", start: "top 88%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section
      id="join"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="join-header flex justify-center mb-12">
          <SectionHeader
            eyebrow="Become a Member"
            title="Join Our"
            titleHighlight="Club"
            subtitle="Choose a package, then complete the form. Our team will contact you within 24 hours."
          />
        </div>

        {/* Packages cards */}
        <div className="packages-grid grid md:grid-cols-3 gap-5 mb-10 min-h-96">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`package-card rounded-2xl border bg-white p-6 shadow-sm hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 block visible opacity-100 ${
                plan.popular ? "border-[#9E1B24]/35" : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF1F3] text-[#9E1B24] text-xs font-semibold mb-3">
                  Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-xl text-[#13233A]">
                {plan.name}
              </h3>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display font-black text-3xl text-[#9E1B24]">
                  {plan.price}
                </span>
                <span className="text-[#4A6380] text-sm pb-1">
                  {plan.priceNote}
                </span>
              </div>
              <div className="mt-5 space-y-2.5">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check
                      className="w-4 h-4 mt-0.5 text-[#9E1B24] shrink-0"
                      strokeWidth={2.4}
                    />
                    <span className="text-[#4A6380] text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, plan: plan.name }))
                }
                className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  form.plan === plan.name
                    ? "bg-[#13233A] text-white"
                    : "bg-[#F8FAFC] border border-slate-200 text-[#13233A] hover:border-[#9E1B24]/30"
                }`}
              >
                {form.plan === plan.name ? "Selected" : `Select ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="join-form max-w-3xl mx-auto">
          {status === "success" ? (
            <div className="rounded-3xl bg-white border border-[#9E1B24]/30 p-10 flex flex-col items-center text-center gap-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#9E1B24]/12 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#9E1B24]" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#13233A]">
                Application Sent
              </h3>
              <p className="text-[#4A6380] text-sm max-w-md">
                Thanks for your interest. Our membership team will reach out
                within 24 hours with the next steps.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatus("idle")}
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 shadow-sm"
            >
              <h3 className="font-display font-bold text-xl text-[#13233A]">
                Membership Application
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className={INPUT_CLASS + " pl-10"}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={INPUT_CLASS + " pl-10"}
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className={INPUT_CLASS + " pl-10"}
                />
              </div>

              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className={INPUT_CLASS}
              >
                {membershipPlans.map((plan) => (
                  <option key={plan.id} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>

              <div className="relative">
                <MessageCircle className="absolute left-3 top-3.5 w-4 h-4 text-[#94A3B8]" />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us your experience level, goals, or any questions..."
                  className={INPUT_CLASS + " pl-10 resize-none"}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                disabled={status === "loading"}
                icon={
                  status === "loading" ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : null
                }
                iconPosition="right"
              >
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
