"use client";

/**
 * Button – reusable CTA component
 * variants: "primary" | "outline" | "ghost" | "danger" | "gold"
 * sizes: "sm" | "md" | "lg"
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  href,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#9E1B24] to-[#C62828] text-white hover:shadow-[0_0_24px_rgba(158,27,36,0.35)] hover:scale-[1.03] active:scale-[0.99]",
    outline:
      "bg-transparent border-2 border-[#9E1B24] text-[#9E1B24] hover:bg-[#9E1B24] hover:text-white hover:shadow-[0_0_20px_rgba(158,27,36,0.2)] active:scale-[0.99]",
    ghost:
      "bg-transparent text-[#3F556F] hover:text-[#13233A] hover:bg-[#EDF5FF] active:scale-[0.99]",
    danger:
      "bg-gradient-to-r from-[#7F1019] to-[#A91923] text-white hover:shadow-[0_0_24px_rgba(127,16,25,0.45)] hover:scale-[1.03] active:scale-[0.99]",
    gold: "bg-gradient-to-r from-[#F7B731] to-[#e8a020] text-[#070B14] font-bold hover:shadow-[0_0_24px_rgba(247,183,49,0.45)] hover:scale-[1.03] active:scale-[0.99]",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  const classes = `${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </button>
  );
}
