"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnnonceGalleryProps {
  images: string[];
  titre: string;
  prix: string;
  nombreFavoris?: number;
}

export function AnnonceGallery({
  images,
  titre,
  prix,
  nombreFavoris = 34,
}: AnnonceGalleryProps) {
  const [indexCourant, setIndexCourant] = useState(0);
  const [estFavori, setEstFavori] = useState(false);
  const [favorisCount, setFavorisCount] = useState(nombreFavoris);

  const imagesList = images.length > 0 ? images : ["/placeholder.jpg"];

  const suivant = () => {
    setIndexCourant((prev) => (prev + 1) % imagesList.length);
  };

  const precedent = () => {
    setIndexCourant((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const toggleFavori = () => {
    setEstFavori(!estFavori);
    setFavorisCount((prev) => (estFavori ? prev - 1 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Image Principale */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-xs border border-slate-200/80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagesList[indexCourant]}
          alt={`${titre} - image ${indexCourant + 1}`}
          className="size-full object-cover transition-transform duration-300"
        />

        {/* Badge Prix sur l'image */}
        <div className="absolute bottom-4 left-4 rounded-xl bg-slate-900/85 px-4 py-2 backdrop-blur-md shadow-lg border border-white/10">
          <span className="font-mono text-xl font-bold text-white">{prix}</span>
        </div>

        {/* Bouton Favori */}
        <button
          onClick={toggleFavori}
          className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 backdrop-blur-md shadow-md transition hover:bg-white hover:text-rose-500"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              estFavori && "fill-rose-500 text-rose-500"
            )}
          />
          <span>{favorisCount}</span>
        </button>

        {/* Flèches de navigation (affichées si plusieurs images) */}
        {imagesList.length > 1 && (
          <>
            <button
              onClick={precedent}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-slate-800 backdrop-blur-md shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
              aria-label="Image précédente"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={suivant}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-slate-800 backdrop-blur-md shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
              aria-label="Image suivante"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniatures cliquables */}
      {imagesList.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {imagesList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setIndexCourant(idx)}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                indexCourant === idx
                  ? "border-[#FF6600] ring-2 ring-[#FF6600]/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Miniature ${idx + 1}`}
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}