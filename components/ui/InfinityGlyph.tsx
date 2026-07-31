"use client";

import { motion, useReducedMotion } from "framer-motion";

type InfinityGlyphProps = {
  /** Largeur en px, la hauteur est calculée au bon ratio */
  size?: number;
  className?: string;
  /**
   * "ambient": tourne lentement en fond, discret — pour le Hero.
   * "trace": se dessine en boucle façon "on a cherché partout" — pour le 404.
   */
  variant?: "ambient" | "trace";
};

const PATH =
  "M 60 100 C 60 70, 100 70, 130 100 C 160 130, 200 130, 200 100 C 200 70, 160 70, 130 100 C 100 130, 60 130, 60 100 Z";

export function InfinityGlyph({ size = 260, className = "", variant = "ambient" }: InfinityGlyphProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 260 200"
      width={size}
      height={(size * 200) / 260}
      className={`overflow-visible drop-shadow-[0_0_35px_theme(colors.brand.500/40%)] ${className}`}
      aria-hidden
    >
      {variant === "ambient" ? (
        <motion.path
          d={PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={14}
          strokeLinecap="round"
          className="text-brand-500/60"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 42 }}
          style={{ transformOrigin: "130px 100px" }}
        />
      ) : (
        <>
          <path
            d={PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={10}
            strokeLinecap="round"
            className="text-white/10"
          />
          <motion.path
            d={PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={10}
            strokeLinecap="round"
            className="text-gold-400"
            initial={{ pathLength: 0 }}
            animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }
            }
          />
        </>
      )}
    </svg>
  );
}