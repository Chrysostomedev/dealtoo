"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Zap } from "lucide-react";

interface CreateFlashCardProps {
  onClick?: () => void;
}

export function CreateFlashCard({ onClick }: CreateFlashCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col items-center justify-between w-36 sm:w-44 h-80 sm:h-96 rounded-3xl p-4 shrink-0 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-white border-2 border-dashed border-[#FF6600]/40 hover:border-[#FF6600] transition-all duration-300 group cursor-pointer overflow-hidden shadow-xs hover:shadow-md"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 bg-[#FF6600]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      {/* En-tête Badge Flash */}
      <div className="relative z-10 flex items-center gap-1 bg-[#FF6600] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
        <Zap className="size-3 fill-white" />
        FLASH
      </div>

      {/* Bouton central 'Plus' avec animation Pulse */}
      <div className="relative z-10 my-auto flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#FF6600]/30 animate-ping" />
          <div className="relative size-14 sm:size-16 rounded-full bg-gradient-to-tr from-[#FF6600] to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-90 transition-transform duration-500">
            <Plus className="size-8 stroke-[2.5]" />
          </div>
        </div>

        <span className="text-xs font-black text-slate-900 tracking-tight text-center">
          Publier une <br />
          <span className="text-[#FF6600]">Annonce Flash</span>
        </span>
      </div>

      {/* Bottom text */}
      <span className="relative z-10 text-[10px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
        Visible 24h instantanément
      </span>
    </motion.button>
  );
}