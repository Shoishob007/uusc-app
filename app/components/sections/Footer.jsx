"use client";
import {
  Feather,
  Mail,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Clock3,
} from "lucide-react";

const socials = [
  { Icon: Facebook, href: "#footer", label: "Facebook" },
  { Icon: Twitter, href: "#footer", label: "Twitter" },
  { Icon: Feather, href: "#footer", label: "Google" },
  { Icon: Instagram, href: "#footer", label: "Instagram" },
];

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Club", href: "#about" },
  { label: "Matches", href: "#tournaments" },
  { label: "Blog", href: "#updates" },
  { label: "Shop", href: "#membership" },
  { label: "Players", href: "#members" },
  { label: "Contact", href: "#footer" },
];

const twitterFeed = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=220&q=80",
    title: "Lorem ipsum is simply dummy",
    date: "APRIL 15, 2022",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?auto=format&fit=crop&w=220&q=80",
    title: "Lorem ipsum is simply dummy",
    date: "APRIL 15, 2022",
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-[#17314A]"
      style={{
        background:
          "radial-gradient(80% 110% at 85% 50%, rgba(3, 10, 18, 0.8), #020b14 62%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(3,18,30,0.04),transparent_40%)]" />
      <div className="absolute inset-y-0 right-0 w-[34%] hidden xl:block">
        <div className="absolute inset-0 bg-gradient-to-l from-[#05111d] via-[#061625]/30 to-transparent" />
        <img
          src="/assets/shuttlecock2.png"
          alt="Shuttlecock"
          className="absolute right-10 top-1/2 -translate-y-1/2 w-52 h-52 opacity-85"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1521417531039-5f9c3f4f6d7a?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-10 lg:gap-14">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#12895E] to-[#0C6647] border border-[#1BA170]/40 flex items-center justify-center">
                <Feather className="w-6 h-6 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <p className="font-display text-sm font-bold tracking-[0.08em] text-white">
                  BADMINTON
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#F6C84A]">
                  Sports Club
                </p>
              </div>
            </div>

            <p className="max-w-md text-[#B6C4D1] text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-[#D5DFE8]">
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#F05A66] mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#7D95A9]">
                    Join Our Team
                  </p>
                  <a
                    href="mailto:example@gmail.org"
                    className="text-sm hover:text-white transition-colors"
                  >
                    example@gmail.org
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F05A66] mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#7D95A9]">
                    Contact Us
                  </p>
                  <a
                    href="mailto:mail@demolink.org"
                    className="text-sm hover:text-white transition-colors"
                  >
                    mail@demolink.org
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded bg-[#EF5A67] flex items-center justify-center text-white hover:bg-[#d94956] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-5 text-2xl leading-none">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[#D5DFE8]">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-[#F6C84A] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-5 text-2xl leading-none">
              Twitter Feed
            </h4>
            <div className="space-y-4">
              {twitterFeed.map((tweet) => (
                <article key={tweet.id} className="flex items-start gap-3">
                  <img
                    src={tweet.image}
                    alt="Tweet preview"
                    className="w-16 h-16 object-cover rounded-sm border border-[#31506C]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=220&q=80";
                    }}
                  />
                  <div>
                    <span className="inline-flex items-center rounded-sm bg-[#F3C52D] px-2 py-0.5 text-[11px] font-semibold text-[#202020]">
                      Badminton
                    </span>
                    <p className="mt-1 text-sm text-[#D5DFE8] leading-snug">
                      {tweet.title}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-[#8FA3B5]">
                      <Clock3 className="w-3 h-3" />
                      {tweet.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#19364F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#89A1B6] text-xs">
            © {new Date().getFullYear()} UUSC. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-[#89A1B6]">
            <a
              href="#footer"
              className="hover:text-[#F6C84A] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#footer"
              className="hover:text-[#F6C84A] transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
