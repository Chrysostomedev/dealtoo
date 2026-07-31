"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatPrix } from "@/lib/utils";

export interface ServiceCardProps {
  titre: string;
  prestataire: string;
  avatar: string;
  note: number;
  nombreAvis: number;
  categorie: string;
  tarifDepart: number;
  localisation: string;
  disponible?: boolean;
}

export function ServiceCard({
  titre,
  prestataire,
  avatar,
  note,
  nombreAvis,
  categorie,
  tarifDepart,
  localisation,
  disponible,
}: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      // UI LIGHT PREMIUM: Fond Blanc cassé doux (#FAF9F6), bordures subtiles et ombre douce
      className="group relative flex flex-col justify-between gap-3.5 rounded-2xl bg-[#FAF9F6] p-4.5 border border-slate-200/80 shadow-sm transition-all duration-300 hover:border-[#FF6600]/40 hover:bg-white hover:shadow-[0_8px_25px_rgba(255,102,0,0.12)]"
    >
      {/* En-tête : Catégorie & Badge Disponibilité */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200/80 shadow-2xs">
          {categorie}
        </span>

        {disponible && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200/60">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </span>
        )}
      </div>

      {/* Titre du Service */}
      <h3 className="line-clamp-2 text-base font-bold text-slate-900 leading-snug transition-colors group-hover:text-[#FF6600]">
        {titre}
      </h3>

      {/* Prestataire & Note */}
      <div className="flex items-center gap-3">
        {/* Avatar avec contour jaune logo */}
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#FFC700] shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={prestataire} className="size-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-xs font-bold text-slate-800">{prestataire}</p>
          <div className="flex items-center gap-1 mt-0.5 text-xs">
            <Star className="size-3.5 fill-[#FFC700] text-[#FFC700]" />
            <span className="font-mono font-bold text-slate-900">{note.toFixed(1)}</span>
            <span className="text-slate-400 text-[11px]">({nombreAvis} avis)</span>
          </div>
        </div>
      </div>

      {/* Tarif & Contact (Pied de Carte) */}
      <div className="mt-1 flex items-center justify-between pt-3 border-t border-slate-200/60">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">À partir de</p>
          <p className="font-mono text-base font-extrabold text-slate-900 bg-[#FFC700] px-2 py-0.5 rounded-md inline-block mt-0.5 shadow-2xs">
            {formatPrix(tarifDepart)}
          </p>
        </div>

        {/* Bouton Message avec Orange Logo & Effet Hover Glow */}
        <Button
          variant="glass"
          size="icon"
          aria-label="Contacter le prestataire"
          className="size-9 rounded-full bg-[#FF6600] text-white border-none shadow-[0_3px_10px_rgba(255,102,0,0.3)] transition-all hover:scale-110 hover:bg-[#E55C00] active:scale-95"
        >
          <MessageCircle className="size-4.5" />
        </Button>
      </div>

      {/* Localisation */}
      <p className="flex items-center gap-1 text-xs font-medium text-slate-500">
        <MapPin className="size-3.5 text-[#FF6600]" /> {localisation}
      </p>
    </motion.article>
  );
}