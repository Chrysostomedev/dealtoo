"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Sparkles } from "lucide-react";
import { PromoCarousel } from "@/components/ui/PromoCarousel";
import { MarqueeListings } from "@/components/ui/MarqueeListings";

const POPULAIRES = ["Appartements", "iPhone", "Emploi", "Voitures", "Freelance"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-4 pb-12 pt-6 lg:px-8 lg:pb-16 lg:pt-10">
<div className="w-full">        
      
          {/* CÔTÉ DROIT : Tes vraies bannières visuelles (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
className="lg:col-span-10 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/60"          >
            {/* Le carrousel contenant tes visuels Dealtoo (image_90435d) */}
            <PromoCarousel />
          </motion.div>

     
      </div>

      {/* Marquee d'Annonces */}
      <div className="mt-12">
        <MarqueeListings />
      </div>
    </section>
  );
}