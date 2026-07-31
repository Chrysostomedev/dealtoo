"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Clock, MapPin, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDateRelative } from "@/lib/utils";

export interface EmploiCardProps {
  id?: string;
  poste: string;
  entreprise: string;
  logo: string;
  localisation: string;
  typeContrat: "CDI" | "CDD" | "Stage" | "Freelance";
  salaireMin?: number;
  salaireMax?: number;
  tags: string[];
  datePublication: Date;
  urgent?: boolean;
  surCliquer?: () => void;
}

export function EmploiCard({
  poste,
  entreprise,
  logo,
  localisation,
  typeContrat,
  salaireMin,
  salaireMax,
  tags,
  datePublication,
  urgent,
  surCliquer,
}: EmploiCardProps) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={surCliquer}
      // UI LIGHT PREMIUM: Fond Blanc cassé doux (#FAF9F6), bordures subtiles et ombre portée orange au hover
      className={cn(
        "group relative flex cursor-pointer flex-col sm:flex-row items-start gap-4 rounded-2xl bg-[#FAF9F6] p-4.5 border transition-all duration-300",
        urgent
          ? "border-[#FF6600]/30 shadow-[0_4px_20px_rgba(255,102,0,0.08)] hover:border-[#FF6600] hover:shadow-[0_8px_25px_rgba(255,102,0,0.18)]"
          : "border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-md hover:bg-white"
      )}
    >
      {/* Badge Urgent Vibrant (Couleur Logo) */}
      {urgent && (
        <span className="absolute -top-2.5 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-[#FF6600] px-3 py-0.5 text-[11px] font-bold text-white shadow-sm">
          <Zap className="size-3 fill-white" /> Urgent
        </span>
      )}

      {/* Container Logo Entreprise */}
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-white p-2 border border-slate-200/60 shadow-sm flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={entreprise}
          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Infos Principales */}
      <div className="min-w-0 flex-1 w-full space-y-2.5">
        {/* En-tête : Titre & Type de Contrat */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-[#FF6600]">
              {poste}
            </h3>
            <p className="text-xs font-semibold text-slate-500">{entreprise}</p>
          </div>

          {/* Badge Type Contrat (Utilisation du Jaune du logo pour capter l'œil) */}
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#FFC700]/20 px-2.5 py-1 text-xs font-bold text-slate-900 border border-[#FFC700]/40">
            <Briefcase className="size-3 text-slate-800" />
            {typeContrat}
          </span>
        </div>

        {/* Tags de Compétences */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white border border-slate-200/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 shadow-2xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Pied de Carte : Localisation, Date, Salaire & Bouton */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200/60 text-xs">
          {/* Metas (Localisation + Date) */}
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#FF6600]" /> {localisation}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-slate-400" /> {formatDateRelative(datePublication)}
            </span>
          </div>

          {/* Salaire & Action */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {salaireMin && (
              <span className="font-mono text-xs font-extrabold text-slate-900 bg-[#FFC700] px-2 py-0.5 rounded-md shadow-2xs">
                {salaireMin.toLocaleString("fr-FR")}
                {salaireMax ? ` – ${salaireMax.toLocaleString("fr-FR")}` : "+"} FCFA
              </span>
            )}

            {/* Bouton d'action Rapide avec Flèche sur Hover */}
            <div className="flex size-7 items-center justify-center rounded-full bg-[#FF6600] text-white shadow-[0_2px_8px_rgba(255,102,0,0.3)] transition-all group-hover:scale-110 group-hover:bg-[#E55C00]">
              <ArrowUpRight className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}