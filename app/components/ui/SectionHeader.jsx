"use client";

/**
 * SectionHeader – reusable section title + subtitle block
 */
export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClass =
    {
      center: "text-center items-center mx-auto",
      left: "text-left  items-start",
      right: "text-right items-end",
    }[align] ?? "text-center items-center mx-auto";

  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E1B24]">
          <span className="w-6 h-px bg-[#9E1B24] inline-block" />
          {eyebrow}
          <span className="w-6 h-px bg-[#9E1B24] inline-block" />
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13233A] leading-tight">
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-[#3F556F] text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
