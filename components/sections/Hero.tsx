"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Sparkles } from "lucide-react";
import { PromoCarousel } from "@/components/ui/PromoCarousel";
import { MarqueeListings } from "@/components/ui/MarqueeListings";

const POPULAIRES = ["Appartements", "iPhone", "Emploi", "Voitures", "Freelance"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-4 pb-12 pt-6 lg:px-8 lg:pb-16 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Disposition Côte à Côte (Flex / Grid) */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* CÔTÉ GAUCHE : Titre + Recherche + Populaire (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* Titre Impactant */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Trouvez tout ce qu&apos;il vous faut en{" "}
              <span className="text-[#FF6600]">Côte d&apos;Ivoire</span>
            </motion.h1>

            <p className="text-sm font-semibold text-slate-500 sm:text-base">
              Des milliers d&apos;annonces et boutiques certifiées près de chez vous.
            </p>

            {/* Barre de Recherche Compacte & Flex */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-white p-2 border border-slate-200/90 shadow-lg shadow-slate-200/50 focus-within:border-[#FF6600] transition-all"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                
                {/* Champ produit */}
                <div className="flex flex-1 items-center gap-2.5 px-3 py-1.5">
                  <Search className="size-4 text-[#FF6600] shrink-0" />
                  <input
                    type="text"
                    placeholder="iPhone, Appartement, Job..."
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="hidden h-6 w-px bg-slate-200 sm:block" />

                {/* Champ Ville */}
                <div className="flex items-center gap-2 px-3 py-1.5 sm:w-36">
                  <MapPin className="size-4 text-amber-500 shrink-0" />
                  <input
                    type="text"
                    defaultValue="Abidjan"
                    placeholder="Ville..."
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Bouton */}
                <button
                  type="button"
                  className="h-10 w-full sm:w-auto px-6 rounded-xl bg-[#FF6600] hover:bg-[#e05a00] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                >
                  Rechercher
                </button>
              </div>
            </motion.div>

            {/* Mots-clés populaires */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 pt-1"
            >
             
            </motion.div>
          </div>

          {/* CÔTÉ DROIT : Tes vraies bannières visuelles (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/60"
          >
            {/* Le carrousel contenant tes visuels Dealtoo (image_90435d) */}
            <PromoCarousel />
          </motion.div>

        </div>
      </div>

      {/* Marquee d'Annonces */}
      <div className="mt-12">
        <MarqueeListings />
      </div>
    </section>
  );
}