"use client";

import { BadgeCheck, Eye, Heart, MapPin, Phone, MessageCircle, Bookmark } from "lucide-react";
import { useState } from "react";
import { cn, formatPrix, formatVues } from "@/lib/utils";

export interface AnnonceCardProps {
  id: string;
  titre: string;
  prix: number;
  image: string;
  localisation: string;
  vues: number;
  vendeur: string;
  telephone?: string;
  whatsapp?: string;
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
  telephone = "+2250700000000",
  whatsapp = "2250700000000",
  negociable,
  livraisonGratuite,
  certifie,
  estBoostee = false,
}: AnnonceCardProps) {
const [favori, setFavori] = useState(false);
const [like, setLike] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-white border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300",
        estBoostee && "ring-1 ring-[#FF6600]/30"
      )}
    >
      {/* Container Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={titre}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Badges d'Opportunité */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5">
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

        {/* Bouton Favori */}
        <button
          onClick={() => setFavori((f) => !f)}
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

       <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between">
  <div className="rounded-md bg-slate-900/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
    {formatPrix(prix)}
  </div>

  <button
    onClick={() => setFavori((f) => !f)}
    className="flex size-8 items-center justify-center rounded-full bg-white/90 border border-slate-200 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-amber-500"
    aria-label="Ajouter aux favoris"
  >
    <Bookmark
      className={cn(
        "size-4 transition-colors",
        favori && "fill-amber-500 text-amber-500"
      )}
    />
  </button>
</div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-3.5 gap-3">
        <div className="space-y-1.5">
          {/* Titre */}
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 leading-snug transition-colors group-hover:text-[#FF6600]">
            {titre}
          </h3>

          {/* Infos Localisation & Vues */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="size-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{localisation}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <Eye className="size-3.5 text-slate-400" />
              <span>{formatVues(vues)}</span>
            </div>
          </div>
        </div>

        {/* Vendeur & Boutons de contact direct */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs font-medium text-slate-600 truncate">
            {certifie && <BadgeCheck className="size-4 shrink-0 text-[#FF6600]" />}
            <span className="truncate">{vendeur}</span>
          </div>

          {/* Actions : Appeler & WhatsApp */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={`tel:${telephone}`}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              title="Appeler"
            >
              <Phone className="size-3.5" />
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white transition-colors hover:bg-emerald-600 shadow-2xs"
              title="Contacter sur WhatsApp"
            >
             <svg
  className="size-3.5 fill-current"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.263-1.41l-.378-.222-3.91.871.91-3.794-.241-.397A10.742 10.742 0 0 1 2.22 12c0-5.924 4.817-10.74 10.739-10.74 5.923 0 10.74 4.816 10.74 10.74 0 5.923-4.817 10.741-10.74 10.741m0-23.2C5.97 1.357.6 6.727.6 13.357c0 2.119.555 4.188 1.61 6.01L0 25.357l6.16-1.614c1.761.96 3.754 1.464 5.799 1.464 7.373 0 13.36-5.987 13.36-13.36C25.319 6.727 19.333 1.357 11.95 1.357" />
</svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}