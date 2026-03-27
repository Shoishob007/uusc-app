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
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold rounded-full transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide";

  const variants = {
    primary: {
      shell:
        "bg-[#9E1B24] border border-[#9E1B24] text-white hover:shadow-[0_12px_28px_rgba(158,27,36,0.26)]",
      fill: "bg-gradient-to-r from-[#B61F2A] via-[#C62828] to-[#D53030]",
      sheen: "bg-gradient-to-r from-white/0 via-white/20 to-white/0",
      content: "text-white",
    },
    outline: {
      shell:
        "bg-transparent border-2 border-[#9E1B24] text-[#9E1B24] hover:shadow-[0_10px_24px_rgba(158,27,36,0.12)]",
      fill: "bg-[#9E1B24]",
      sheen: "bg-gradient-to-r from-white/0 via-white/25 to-white/0",
      content: "group-hover:text-white",
    },
    ghost: {
      shell: "bg-[#EDF5FF]/30 border border-[#C9D8EC] text-[#3F556F]",
      fill: "bg-[#EDF5FF]",
      sheen: "bg-gradient-to-r from-white/0 via-white/35 to-white/0",
      content: "group-hover:text-[#13233A]",
    },
    danger: {
      shell:
        "bg-[#7F1019] border border-[#7F1019] text-white hover:shadow-[0_12px_28px_rgba(127,16,25,0.3)]",
      fill: "bg-gradient-to-r from-[#95111E] via-[#A91923] to-[#B71D28]",
      sheen: "bg-gradient-to-r from-white/0 via-white/20 to-white/0",
      content: "text-white",
    },
    gold: {
      shell:
        "bg-[#F7B731] border border-[#D99A1E] text-[#13233A] font-bold hover:shadow-[0_12px_28px_rgba(247,183,49,0.28)]",
      fill: "bg-gradient-to-r from-[#FFCD57] via-[#F7B731] to-[#E6A016]",
      sheen: "bg-gradient-to-r from-white/0 via-white/30 to-white/0",
      content: "text-[#13233A]",
    },
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  const selectedVariant = variants[variant] ?? variants.primary;
  const classes = `${base} ${selectedVariant.shell} ${sizes[size] ?? sizes.md} ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 z-0 origin-right scale-x-0 transition-transform duration-400 ease-[cubic-bezier(.22,.8,.2,1)] group-hover:origin-left group-hover:scale-x-100 ${selectedVariant.fill}`}
      />
      <span
        aria-hidden
        className={`absolute -inset-y-full left-[-40%] z-0 w-1/3 rotate-12 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100 ${selectedVariant.sheen}`}
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${selectedVariant.content}`}
      >
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
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
      {content}
    </button>
  );
}
