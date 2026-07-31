"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface PubStoryProps {
  id: string;
  titre: string;
  sousTitre?: string;
  image: string;
  lienHref?: string;
  badge?: string;
}

export function PubStoryCard({
  titre,
  sousTitre,
  image,
  lienHref = "#",
  badge = "Sponsorisé",
}: PubStoryProps) {
  return (
    <motion.a
      href={lienHref}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex flex-col justify-between w-48 sm:w-56 h-80 sm:h-96 rounded-3xl overflow-hidden shrink-0 group border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image de fond */}
      <img
        src={image}
        alt={titre}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Overlay Gradient pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-black/20" />

      {/* Top Header : Badge Sponsorisé */}
      <div className="relative z-10 p-3.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white tracking-wide uppercase">
          <Sparkles className="size-3 text-[#FFC700]" />
          {badge}
        </span>
      </div>

      {/* Bottom Content : Titre + CTA */}
      <div className="relative z-10 p-4 space-y-2">
        {sousTitre && (
          <p className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
            {sousTitre}
          </p>
        )}
        <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-sm line-clamp-2">
          {titre}
        </h3>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs font-bold text-white/90 group-hover:text-white transition-colors">
            En savoir plus
          </span>
          <div className="size-7 rounded-full bg-white/20 group-hover:bg-[#FF6600] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}