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
  darkMode = false,
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
        <span
          className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${darkMode ? "text-[#F7B731]" : "text-[#9E1B24]"}`}
        >
          <span
            className={`w-6 h-px inline-block ${darkMode ? "bg-[#F7B731]" : "bg-[#9E1B24]"}`}
          />
          {eyebrow}
          <span
            className={`w-6 h-px inline-block ${darkMode ? "bg-[#F7B731]" : "bg-[#9E1B24]"}`}
          />
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-[#13233A]"}`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className={darkMode ? "text-[#F7B731]" : "text-gradient"}>
            {titleHighlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${darkMode ? "text-slate-400" : "text-[#3F556F]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
