"use client";

import { BadgeCheck, Eye, MapPin, Heart, Bookmark, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn, formatPrix, formatVues } from "@/lib/utils";

export type PlanAbonnement = "business" | "starter" | "free";

export interface AnnonceCardProps {
  id: string;
  titre: string;
  description?: string;
  prix: number;
  image: string;
  localisation: string;
  vues: number;
  vendeur: string;
  note?: number; // Ex: 4.8
  nombreAvis?: number; // Ex: 24
  planAbonnement?: PlanAbonnement; // "business", "starter" ou "free"
  negociable?: boolean;
  livraisonGratuite?: boolean;
  certifie?: boolean;
  estBoostee?: boolean;
}

export function AnnonceCard({
  id,
  titre,
  description = "Produit en excellent état, disponible immédiatement. Contactez le vendeur pour plus de détails.",
  prix,
  image,
  localisation,
  vues,
  vendeur,
  note = 4.8,
  nombreAvis = 12,
  planAbonnement = "free",
  negociable,
  livraisonGratuite,
  certifie,
  estBoostee = false,
}: AnnonceCardProps) {
  const [favori, setFavori] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  // Configuration visuelle du badge d'abonnement
  const renderBadgeAbonnement = () => {
    switch (planAbonnement) {
      case "business":
        return (
          <span
            className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-xs font-black text-white shadow-xs"
            title="Abonnement Business Pro"
          >
            B
          </span>
        );
      case "starter":
        return (
          <span
            className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#FF6600] to-orange-400 text-xs font-black text-white shadow-xs"
            title="Abonnement Starter"
          >
            S
          </span>
        );
      case "free":
      default:
        return (
          <span
            className="flex size-7 items-center justify-center rounded-lg bg-slate-200 text-xs font-black text-slate-600 border border-slate-300"
            title="Compte Gratuit"
          >
            F
          </span>
        );
    }
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300",
        estBoostee && "ring-1 ring-[#FF6600]/30"
      )}
    >
      {/* Container Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Link href={`/annonces/${id}`} className="block size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={titre}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        </Link>

        {/* Badges d'Opportunité */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5 pointer-events-none">
          {negociable && (
            <span className="rounded-md bg-slate-900/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
              Négociable
            </span>
          )}
          {livraisonGratuite && (
            <span className="rounded-md bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
              Livraison gratuite
            </span>
          )}
        </div>

        {/* Bouton Favori (Coeur) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFavori((f) => !f);
          }}
          className="absolute right-2.5 top-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 border border-slate-200/80 text-slate-600 shadow-2xs backdrop-blur-md transition-colors hover:bg-white hover:text-rose-500"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              favori && "fill-rose-500 text-rose-500"
            )}
          />
        </button>

        {/* Barre du bas : Prix & Bookmark */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between">
          <div className="rounded-md bg-slate-900/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
            {formatPrix(prix)}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setBookmark((b) => !b);
            }}
            className="flex size-8 items-center justify-center rounded-full bg-white/90 border border-slate-200 text-slate-600 shadow-xs backdrop-blur transition hover:bg-white hover:text-amber-500"
            aria-label="Sauvegarder"
          >
            <Bookmark
              className={cn(
                "size-4 transition-colors",
                bookmark && "fill-amber-500 text-amber-500"
              )}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-3.5 gap-3">
        <Link href={`/annonces/${id}`} className="space-y-1.5 block">
          {/* Titre */}
          <h3 className="line-clamp-1 text-sm font-semibold text-slate-800 leading-snug transition-colors group-hover:text-[#FF6600]">
            {titre}
          </h3>

          {/* Petite Description */}
          <p className="line-clamp-2 text-xs text-slate-500 leading-relaxed">
            {description}
          </p>

          {/* Étoiles & Nombre d'avis */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-3.5 fill-current",
                    i < Math.floor(note) ? "text-amber-400" : "text-slate-200"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-700">{note}</span>
            <span className="text-[11px] text-slate-400">({nombreAvis} avis)</span>
          </div>

          {/* Infos Localisation & Vues */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="size-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{localisation}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <Eye className="size-3.5 text-slate-400" />
              <span>{formatVues(vues)}</span>
            </div>
          </div>
        </Link>

        {/* Vendeur & Badge Abonnement */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 truncate">
            {certifie && <BadgeCheck className="size-4 shrink-0 text-[#FF6600]" />}
            <span className="truncate font-semibold text-slate-800">{vendeur}</span>
          </div>

          {/* Badge Abonnement (B, S, F) */}
          <div className="shrink-0">{renderBadgeAbonnement()}</div>
        </div>
      </div>
    </article>
  );
}