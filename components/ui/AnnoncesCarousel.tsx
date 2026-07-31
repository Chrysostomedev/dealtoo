"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnnonceCard, AnnonceCardProps } from "./AnnonceCard";

interface AnnoncesCarouselProps {
  titre?: string;
  annonces: AnnonceCardProps[];
}

export function AnnoncesCarousel({ titre = "Annonces à la une", annonces }: AnnoncesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-6">
      {/* En-tête avec Navigation Desktop */}
      <div className="mb-4 flex items-center justify-between px-4 sm:px-0">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{titre}</h2>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => scroll("left")}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-[#FF6600] hover:bg-[#FF6600] hover:text-white"
            aria-label="Annonces précédentes"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-[#FF6600] hover:bg-[#FF6600] hover:text-white"
            aria-label="Annonces suivantes"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Conteneur Scrollable (Touch / Drag / Buttons) */}
      <div
        ref={scrollContainerRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-0 scroll-smooth"
      >
        {annonces.map((annonce) => (
          <div
            key={annonce.id}
            className="w-[82vw] flex-shrink-0 snap-start sm:w-[280px] md:w-[310px]"
          >
            <AnnonceCard {...annonce} />
          </div>
        ))}
      </div>
    </section>
  );
}