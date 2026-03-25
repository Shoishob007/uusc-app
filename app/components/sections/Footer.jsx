"use client";
import { useState } from "react";
import {
  Feather,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { navLinks } from "@/app/data/dummy";

const socials = [
  { Icon: Facebook, href: "#footer", label: "Facebook" },
  { Icon: Instagram, href: "#footer", label: "Instagram" },
  { Icon: Twitter, href: "#footer", label: "Twitter" },
  { Icon: Youtube, href: "#footer", label: "YouTube" },
];

const quickLinks = [
  { label: "About UUSC", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Weekly Schedule", href: "#schedule" },
  { label: "Tournaments", href: "#tournaments" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Membership Plans", href: "#membership" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle"); // idle | success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("success");
    setEmail("");
    setTimeout(() => setSubStatus("idle"), 4000);
  };

  return (
    <footer
      id="footer"
      className="bg-[#EAF2FF] border-t border-[#C9D8EC] relative overflow-hidden"
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#9E1B24]/30 to-transparent" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <a href="#hero" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E4D92] to-[#9E1B24] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Feather className="w-5 h-5 text-[#13233A]" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-[#13233A] tracking-wider">
                  UUSC
                </span>
                <p className="text-[9px] text-[#9E1B24] tracking-[0.12em] uppercase leading-none -mt-0.5">
                  Ultimate United Sports Club
                </p>
              </div>
            </a>
            <p className="text-[#3F556F] text-sm leading-relaxed">
              Bangladesh&apos;s premier badminton club, building champions
              through excellence, discipline, and community since 2009.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-[#F3F8FF] border border-[#C9D8EC] flex items-center justify-center text-[#3F556F] hover:text-[#13233A] hover:bg-[#0E4D92]/40 hover:border-[#9E1B24]/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-[#13233A] mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#3F556F] text-sm hover:text-[#9E1B24] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-[#9E1B24]" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-bold text-[#13233A] mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#3F556F]">
                <MapPin className="w-4 h-4 text-[#9E1B24] shrink-0 mt-0.5" />
                <span>
                  House 12, Road 5, Gulshan-1
                  <br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#3F556F]">
                <Phone className="w-4 h-4 text-[#9E1B24] shrink-0" />
                <a
                  href="tel:+8801712345678"
                  className="hover:text-[#13233A] transition"
                >
                  +880 1712 345678
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#3F556F]">
                <Mail className="w-4 h-4 text-[#9E1B24] shrink-0" />
                <a
                  href="mailto:info@uusc.com"
                  className="hover:text-[#13233A] transition"
                >
                  info@uusc.com
                </a>
              </li>
            </ul>

            {/* Opening hours */}
            <div className="mt-5 p-3 rounded-xl bg-[#F5F9FF] border border-[#C9D8EC] text-xs text-[#3F556F] space-y-1">
              <p className="text-[#13233A] font-semibold mb-1">Club Hours</p>
              <p>Mon – Fri: 5:00 PM – 10:00 PM</p>
              <p>Sat – Sun: 9:00 AM – 10:00 PM</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-[#13233A] mb-5 text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-[#3F556F] text-sm mb-5 leading-relaxed">
              Get tournament updates, training tips, and club news delivered
              weekly.
            </p>
            {subStatus === "success" ? (
              <div className="rounded-xl bg-[#9E1B24]/10 border border-[#9E1B24]/30 p-4 text-[#9E1B24] text-sm font-medium">
                🎉 Subscribed! Welcome to the UUSC family.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#F3F8FF] border border-[#D4E1F3] rounded-xl px-4 py-3 text-[#13233A] text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#9E1B24]/60 focus:ring-1 focus:ring-[#9E1B24]/30 transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0E4D92] to-[#9E1B24] text-white text-sm font-semibold rounded-xl px-4 py-3 hover:shadow-[0_0_20px_rgba(158,27,36,0.32)] hover:scale-[1.01] transition-all duration-200"
                >
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#C9D8EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#3F556F] text-xs">
            © {new Date().getFullYear()} UUSC – Ultimate United Sports Club. All
            rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#footer"
                className="text-[#3F556F] text-xs hover:text-[#13233A] transition"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
