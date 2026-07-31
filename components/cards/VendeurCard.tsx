"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  BadgeCheck,
  Crown,
  Check,
  Store,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export interface VendeurProps {
  id: string;
  nom: string;
  type: "Boutique" | "Indépendant" | "Entreprise";
  avatar: string;
  banniere?: string;
  certifie: boolean;
  topVendeur?: boolean;
  note: number;
  nombreAvis: number;
  localisation: string;
  membreDepuis: string;
  totalVentes: number;
  tauxReponse: string;
  categories: string[];
  produitsApercu: string[];
}

export function VendeurCard({ vendedor }: { vendedor: VendeurProps }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-slate-200 hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.07)]"
    >
      {/* Mini Bannière */}
      <div className="h-20 w-full bg-gradient-to-r from-slate-100 via-orange-50/50 to-amber-50/40 relative overflow-hidden">
        {vendedor.banniere && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={vendedor.banniere} alt="banniere" className="w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {vendedor.certifie && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-emerald-600 shadow-xs border border-emerald-100">
              <BadgeCheck className="size-3.5 fill-emerald-500 text-white" />
              Certifié
            </span>
          )}
          {vendedor.topVendeur && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC700]/20 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-amber-900 border border-[#FFC700]/40">
              <Crown className="size-3 fill-[#FFC700] text-amber-900" />
              Pro
            </span>
          )}
        </div>
      </div>

      {/* Profil Vendeur */}
      <div className="px-5 pt-0 pb-5 flex-1 flex flex-col justify-between">
        <div className="relative flex items-end justify-between -mt-9 mb-3">
          <div className="relative size-16 shrink-0 rounded-2xl p-1 bg-white shadow-md ring-1 ring-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={vendedor.avatar} alt={vendedor.nom} className="size-full rounded-xl object-cover" />
            <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
              <Check className="size-2.5 text-white stroke-[3]" />
            </span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-200/50">
            <Star className="size-3.5 fill-[#FFC700] text-[#FFC700]" />
            <span className="text-xs font-bold text-slate-800">{vendedor.note.toFixed(1)}</span>
            <span className="text-[10px] text-slate-400">({vendedor.nombreAvis})</span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF6600] transition-colors">
            {vendedor.nom}
          </h3>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
            <Store className="size-3 text-slate-400" />
            {vendedor.type} • {vendedor.localisation}
          </p>
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-center">
          <div>
            <p className="text-[10px] font-medium text-slate-400">Ventes</p>
            <p className="text-xs font-bold text-slate-800">{vendedor.totalVentes}+</p>
          </div>
          <div className="border-x border-slate-200/60">
            <p className="text-[10px] font-medium text-slate-400">Réponse</p>
            <p className="text-xs font-bold text-emerald-600">{vendedor.tauxReponse}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400">Membre</p>
            <p className="text-xs font-bold text-slate-800">{vendedor.membreDepuis}</p>
          </div>
        </div>

        {/* Aperçu Offres */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Offres récentes</p>
          <div className="grid grid-cols-3 gap-1.5">
            {vendedor.produitsApercu.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="apercu" className="size-full object-cover transition-transform group-hover:scale-105 duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-[#FF6600] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Voir la boutique
            <ChevronRight className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Discuter"
            className="p-2 rounded-xl bg-[#FF6600]/10 text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-colors cursor-pointer"
          >
            <MessageCircle className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}