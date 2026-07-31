"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "brand" | "glass" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  gold: "bg-gold-500 text-canvas font-semibold shadow-[0_0_24px_rgba(255,201,60,0.35)] hover:bg-gold-600",
  brand:
    "text-white font-semibold bg-[image:var(--gradient-brand)] shadow-lg shadow-brand-500/25 hover:brightness-110",
  glass:
    "bg-white/8 text-ink backdrop-blur-xl border border-white/10 hover:bg-white/12",
  ghost: "text-ink-soft hover:text-ink hover:bg-white/5",
  danger: "bg-ruby-500/15 text-ruby-500 border border-ruby-500/30 hover:bg-ruby-500/25",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-sm",
  md: "h-11 px-5 text-sm gap-2 rounded-md",
  lg: "h-13 px-7 text-base gap-2 rounded-md",
  icon: "h-11 w-11 rounded-full justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "brand", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center font-body transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";