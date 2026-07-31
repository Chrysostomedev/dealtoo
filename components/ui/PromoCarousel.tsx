"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type PromoSlide = {
  id: string;
  href?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  tagline?: string;
  image?: string;
};

const DEFAULT_SLIDES: PromoSlide[] = [
  {
    id: "1",
    title: "Tu veux plus de",
    highlight: "visibilité",
    subtitle: "Choisis ton abonnement !",
    tagline: "Simple. Pratique. Efficace.",
    image: "https://dealtoo.s3.eu-west-3.amazonaws.com/pubImages/ea526bfc-7ec1-402a-b681-09142d26d922.png",
  },
  {
    id: "2",
    title: "Lance ta",
    highlight: "boutique",
    subtitle: "Vends en illimité, sans commission cachée.",
    tagline: "Configuration en 2 minutes.",
    image: "https://dealtoo.s3.eu-west-3.amazonaws.com/pubImages/6c7f9e38-cda7-4dff-834e-5e972a37349b.png",
  },
  {
    id: "3",
    title: "Cumule des",
    highlight: "avantages",
    subtitle: "Le programme Fidélis récompense tes achats.",
    tagline: "Dès la première annonce.",
    image: "https://dealtoo.s3.eu-west-3.amazonaws.com/pubImages/pub_dealtoo_4.jpg",
  },
];

type PromoCarouselProps = {
  slides?: PromoSlide[];
  intervalMs?: number;
};

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
    enter: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? -50 : 50 }),
  };

  const Content = (
    <div className="relative flex min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex-col-reverse items-center justify-between gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF6600] via-[#E65C00] to-[#CC5200] p-6 sm:p-10 lg:p-12 shadow-2xl shadow-[#FF6600]/20 sm:flex-row">
      {/* Halo décoratif arrière-plan */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-amber-400/20 blur-3xl" />

      {/* Bloc Texte */}
      <div className="relative z-10 flex-1 text-center sm:text-left">
        <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {slide.title}
          {slide.highlight && (
            <>
              {" "}
              <span className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-slate-900 shadow-md">
                {slide.highlight}
              </span>
            </>
          )}
        </h2>
        
        {slide.subtitle && (
          <p className="mt-4 text-base font-semibold text-white/95 sm:text-lg lg:text-xl">
            {slide.subtitle}
          </p>
        )}
        
        {slide.tagline && (
          <p className="mt-2 text-xs font-medium text-white/80 sm:text-sm">
            {slide.tagline}
          </p>
        )}
      </div>

      {/* Zone Image Agrandie avec Espace */}
      {slide.image && (
        <div className="relative z-10 flex w-full shrink-0 justify-center sm:w-1/2 sm:justify-end">
          <div className="relative w-full max-w-[3  80px] sm:max-w-[560px] lg:max-w-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img  
              src={slide.image}
              alt=""
              className="h-auto w-full rounded-2xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="relative w-full"
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
          transition={{ duration: 0.45, ease: "easeOut" }}
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
          {/* Controls - Boutons Flèches */}
          <button
            onClick={() => goTo(index - 1, -1)}
            aria-label="Slide précédente"
            className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 sm:left-5"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={() => goTo(index + 1, 1)}
            aria-label="Slide suivante"
            className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 sm:right-5"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Indicators / Pastilles */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Aller à la slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[#FFD700]" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}