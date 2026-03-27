"use client";

import { useEffect, useState } from "react";
import { Menu, X, Feather, CircleUserRound } from "lucide-react";
import { navLinks } from "@/app/data/dummy";
import Button from "@/app/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const session = window.localStorage.getItem("uusc_session");
    setIsLoggedIn(Boolean(session));
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-[#F7FAFF]/98 border-[#C9D8EC] shadow-[0_8px_28px_rgba(19,35,58,0.16)]"
          : "bg-[#F7FAFF]/95 border-[#DCE7F6]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9E1B24] to-[#C62828] flex items-center justify-center">
              <Feather className="w-5 h-5 text-white" strokeWidth={2.4} />
            </div>
            <div>
              <p className="font-display font-bold text-[#13233A] tracking-wide leading-tight">
                UUSC
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-[60vw] py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-[#3F556F] hover:text-[#13233A] hover:bg-[#EDF5FF] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isLoggedIn ? (
              <a
                href="#profile"
                className="inline-flex items-center gap-2 rounded-full border border-[#C9D8EC] bg-white px-4 py-2 text-sm font-semibold text-[#13233A] hover:bg-[#EDF5FF] transition-colors"
                aria-label="Open profile"
              >
                <CircleUserRound className="w-4 h-4 text-[#9E1B24]" />
                Profile
              </a>
            ) : (
              <>
                <Button variant="outline" size="sm" href="#signin">
                  Sign In
                </Button>
                <Button variant="primary" size="sm" href="#register">
                  Register
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#13233A] text-white hover:bg-[#1B3150]"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-40 bg-[#081224]/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-3 right-3 top-3 rounded-2xl bg-[#F7FAFF] border border-[#C9D8EC] shadow-2xl p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="max-h-[65vh] overflow-y-auto flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1D3552] hover:bg-[#EDF5FF]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {isLoggedIn ? (
                <a
                  href="#profile"
                  className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-[#C9D8EC] bg-white px-4 py-2.5 text-sm font-semibold text-[#13233A] hover:bg-[#EDF5FF] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <CircleUserRound className="w-4 h-4 text-[#9E1B24]" />
                  Profile
                </a>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    href="#signin"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    href="#register"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
