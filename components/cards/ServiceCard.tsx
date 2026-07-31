"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Star } from "lucide-react";

export function formatPrix(prix: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  })
    .format(prix)
    .replace("XOF", "FCFA");
}

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
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col justify-between gap-3.5 rounded-2xl bg-[#FAF9F6]/90 p-5 border border-slate-200/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-300 hover:border-[#FF6600]/30 hover:bg-white hover:shadow-[0_12px_32px_-6px_rgba(255,102,0,0.08)]"
    >
      {/* En-tête : Catégorie & Badge Disponibilité Soft */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100/80 px-3 py-1 text-[11px] font-semibold text-slate-600 transition-colors group-hover:bg-[#FF6600]/10 group-hover:text-[#FF6600]">
          {categorie}
        </span>

        {disponible && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-500/15">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </span>
        )}
      </div>

      {/* Titre du Service */}
      <h3 className="line-clamp-2 text-base font-bold text-slate-800 leading-snug tracking-tight transition-colors group-hover:text-[#FF6600]">
        {titre}
      </h3>

      {/* Prestataire & Note */}
      <div className="flex items-center gap-3 py-1">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FFC700]/70 ring-offset-2 ring-offset-[#FAF9F6] transition-transform group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={prestataire} className="size-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-xs font-bold text-slate-800">{prestataire}</p>
          <div className="flex items-center gap-1 mt-0.5 text-xs">
            <Star className="size-3.5 fill-[#FFC700] text-[#FFC700]" />
            <span className="font-semibold text-slate-900">{note.toFixed(1)}</span>
            <span className="text-slate-400 text-[11px]">({nombreAvis})</span>
          </div>
        </div>
      </div>

      {/* Tarif & Contact */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200/40">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">À partir de</p>
          <div className="inline-flex items-center mt-0.5 rounded-lg bg-[#FFC700]/15 px-2.5 py-1 text-xs font-bold text-slate-900 border border-[#FFC700]/30 backdrop-blur-xs">
            {formatPrix(tarifDepart)}
          </div>
        </div>

        {/* Bouton Contact WhatsApp Soft Glow */}
        <button
          type="button"
          aria-label="Contacter le prestataire"
          className="inline-flex size-9 items-center justify-center rounded-full bg-[#FF6600] text-white shadow-[0_4px_14px_rgba(255,102,0,0.25)] transition-all duration-200 hover:scale-105 hover:bg-[#E55C00] hover:shadow-[0_6px_20px_rgba(255,102,0,0.35)] active:scale-95 cursor-pointer"
        >
          <MessageCircle className="size-4.5" />
        </button>
      </div>

      {/* Localisation */}
      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <MapPin className="size-3.5 text-[#FF6600]/80" /> {localisation}
      </p>
    </motion.article>
  );
}