"use client";

/**
 * Card – reusable content card with optional hover glow
 * variants: "default" | "glass" | "bordered"
 */
export default function Card({
  children,
  variant = "default",
  glow = false,
  className = "",
  onClick,
  ...props
}) {
  const base = "rounded-2xl transition-all duration-300 overflow-hidden";

  const variants = {
    default:
      "bg-white border border-[#D4E1F3] hover:border-[#9E1B24]/40 hover:-translate-y-1",
    glass:
      "bg-white/90 backdrop-blur-xl border border-[#D4E1F3] hover:border-[#9E1B24]/40 hover:-translate-y-1",
    bordered:
      "bg-transparent border-2 border-[#D4E1F3] hover:border-[#9E1B24]/60 hover:-translate-y-1",
  };

  const glowClass = glow
    ? "hover:shadow-[0_8px_40px_rgba(158,27,36,0.16)]"
    : "hover:shadow-xl hover:shadow-black/40";

  return (
    <div
      className={`${base} ${variants[variant] ?? variants.default} ${glowClass} ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
