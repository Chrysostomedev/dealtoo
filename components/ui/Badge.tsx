import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "emerald" | "ruby" | "neutral";

const variants: Record<Variant, string> = {
  gold: "bg-gold-500/15 text-gold-500 border-gold-500/25",
  emerald: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
  ruby: "bg-ruby-500/15 text-ruby-500 border-ruby-500/25",
  neutral: "bg-white/8 text-ink-soft border-white/10",
};

export function Badge({
  children,
  icon: Icon,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[11px] font-medium backdrop-blur-md",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon className="size-3" />}
      {children}
    </span>
  );
}