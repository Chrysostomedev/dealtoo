"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Eye, Heart, MapPin, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/contexts/CartContext";
import { cn, formatPrix, formatVues } from "@/lib/utils";

export interface AnnonceCardProps {
  id: string;
  titre: string;
  prix: number;
  image: string;
  localisation: string;
  vues: number;
  vendeur: string;
  negociable?: boolean;
  livraisonGratuite?: boolean;
  certifie?: boolean;
  estBoostee?: boolean;
}

export function AnnonceCard({
  id,
  titre,
  prix,
  image,
  localisation,
  vues,
  vendeur,
  negociable,
  livraisonGratuite,
  certifie,
  estBoostee = true,
}: AnnonceCardProps) {
  const [favori, setFavori] = useState(false);
  const { ajouter } = useCart();

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      // UI LIGHT: Fond Blanc cassé doux (#FAF9F6) avec carte blanche + ombres douces
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border transition-all duration-300",
        estBoostee
          ? "border-[#FF6600]/20 shadow-[0_4px_20px_rgba(255,102,0,0.08)] hover:border-[#FF6600]/50 hover:shadow-[0_12px_30px_rgba(255,102,0,0.18)]"
          : "border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-md"
      )}
    >
      {/* Container Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={titre}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges d'Opportunité (Haut Gauche) */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5">
          {negociable && (
            <span className="rounded-full bg-emerald-600/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
              Négociable
            </span>
          )}
          {livraisonGratuite && (
            <span className="flex items-center gap-1 rounded-full bg-[#FFC700] px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-sm">
              <Truck className="size-3" />
              Livraison Offerte
            </span>
          )}
        </div>

        {/* Bouton Favori */}
        <button
          onClick={() => setFavori((f) => !f)}
          className="absolute right-2.5 top-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:scale-110"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              favori ? "fill-rose-500 text-rose-500" : "text-slate-600 group-hover:text-slate-900"
            )}
          />
        </button>

        {/* Prix : Tag Jaune Vibrant du Logo avec Texte Lisible */}
        <div className="absolute bottom-2.5 left-2.5 z-10 rounded-lg bg-[#FFC700] px-2.5 py-1 font-mono text-xs sm:text-sm font-extrabold text-slate-950 shadow-md">
          {formatPrix(prix)}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Détails de l'annonce */}
      <div className="p-3.5 space-y-2.5 bg-[#FAF9F6]">
        <div>
          {/* Titre */}
          <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-slate-900 leading-snug transition-colors group-hover:text-[#FF6600]">
            {titre}
          </h3>

          {/* Localisation et Vues */}
          <div className="mt-1.5 flex items-center gap-2 text-slate-500 text-xs">
            <div className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#FF6600]" />
              <span className="line-clamp-1">{localisation}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Eye className="size-3.5 text-slate-400" />
              <span>{formatVues(vues)}</span>
            </div>
          </div>
        </div>

        {/* Vendeur & Action Panier */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5 text-slate-700 text-xs font-medium">
            {certifie && <BadgeCheck className="size-4 text-[#FF6600]" />}
            <span className="line-clamp-1">{vendeur}</span>
          </div>

          {/* Bouton Panier Orange Logo avec Effet Glow Chaud */}
          <button
            onClick={() => ajouter({ id, titre, prix, image, vendeur })}
            className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6600] text-white shadow-[0_3px_10px_rgba(255,102,0,0.35)] transition-all hover:scale-105 hover:bg-[#E55C00] active:scale-95"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}