"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type PromoSlide = {
  id: string;
  /** Lien de destination — passez le vôtre, sinon la slide n'est pas cliquable */
  href?: string;
  title: string;
  /** Mot mis en avant, surligné en jaune comme sur votre visuel */
  highlight?: string;
  subtitle?: string;
  tagline?: string;
  /** Illustration à droite de la slide */
  image?: string;
};

const DEFAULT_SLIDES: PromoSlide[] = [
  {
    id: "1",
    title: "Tu veux plus de",
    highlight: "visibilité",
    subtitle: "Choisis ton abonnement !",
    tagline: "Simple. Pratique. Efficace.",
    image: "https://picsum.photos/seed/promo1/500/400",
  },
  {
    id: "2",
    title: "Lance ta",
    highlight: "boutique",
    subtitle: "Vends en illimité, sans commission cachée.",
    tagline: "Configuration en 2 minutes.",
    image: "https://picsum.photos/seed/promo2/500/400",
  },
  {
    id: "3",
    title: "Cumule des",
    highlight: "avantages",
    subtitle: "Le programme Fidélis récompense tes achats.",
    tagline: "Dès la première annonce.",
    image: "https://picsum.photos/seed/promo3/500/400",
  },
];

type PromoCarouselProps = {
  /** Vos propres slides (image, texte, lien). Sinon des exemples s'affichent. */
  slides?: PromoSlide[];
  /** Intervalle d'auto-défilement en millisecondes */
  intervalMs?: number;
};

/**
 * Bandeau promotionnel plein largeur en carrousel auto (4s par défaut),
 * flèches de navigation + pastilles, pause au survol, swipe au clavier.
 * Fournissez vos propres `slides` avec vos images et vos liens.
 */
export function PromoCarousel({ slides = DEFAULT_SLIDES, intervalMs = 4000 }: PromoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, intervalMs, slides.length]);

  const slide = slides[index];

  const variants = {
    enter: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? -40 : 40 }),
  };

  const Content = (
    <div className="relative flex min-h-[260px] flex-col-reverse items-center gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-6 py-8 shadow-2xl shadow-brand-500/30 sm:flex-row sm:gap-4 sm:px-10 sm:py-10">
      {/* Décor discret */}
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-14 -left-14 h-56 w-56 rounded-full bg-gold-400/20 blur-2xl" />

      {/* Texte — blanc, gras, mot clé surligné en jaune */}
      <div className="relative z-10 flex-1 text-center sm:text-left">
        <p className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {slide.title}
          {slide.highlight && (
            <>
              <br />
              <span className="inline-block rounded-md bg-gold-400 px-2 py-0.5 text-black">
                {slide.highlight}
              </span>
            </>
          )}
        </p>
        {slide.subtitle && (
          <p className="mt-3 text-lg font-semibold text-white sm:text-xl">{slide.subtitle}</p>
        )}
        {slide.tagline && <p className="mt-2 text-sm font-medium text-white/85">{slide.tagline}</p>}
      </div>

      {/* Illustration */}
      {slide.image && (
        <div className="relative z-10 w-40 shrink-0 sm:w-56 lg:w-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt="" className="w-full rounded-2xl object-cover shadow-xl" loading="lazy" />
        </div>
      )}
    </div>
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {slide.href ? (
            <Link href={slide.href} className="block">
              {Content}
            </Link>
          ) : (
            Content
          )}
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          {/* Flèches — cercles semi-transparents comme sur votre visuel */}
          <button
            onClick={() => goTo(index - 1, -1)}
            aria-label="Slide précédente"
            className="absolute left-2 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 sm:left-4"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => goTo(index + 1, 1)}
            aria-label="Slide suivante"
            className="absolute right-2 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 sm:right-4"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Pastilles */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Aller à la slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-gold-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}