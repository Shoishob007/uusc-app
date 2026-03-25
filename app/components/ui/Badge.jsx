"use client";

/**
 * Badge – pill/label component
 * colors: "sky" | "red" | "gold" | "green" | "muted"
 */
export default function Badge({
  children,
  color = "sky",
  size = "sm",
  className = "",
}) {
  const colors = {
    sky: "bg-[#9E1B24]/12  text-[#9E1B24]  border border-[#9E1B24]/30",
    red: "bg-[#1E4B79]/12  text-[#1E4B79]  border border-[#1E4B79]/28",
    gold: "bg-[#F7B731]/15  text-[#F7B731]  border border-[#F7B731]/30",
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    muted: "bg-[#E9F1FF]      text-[#3F556F]  border border-[#D4E1F3]",
  };
  const sizes = {
    sm: "text-[10px] px-2.5 py-0.5",
    md: "text-xs px-3 py-1",
    lg: "text-sm px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wide ${colors[color] ?? colors.sky} ${sizes[size] ?? sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
}
