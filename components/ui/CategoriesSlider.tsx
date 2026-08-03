"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Smartphone, 
  Car, 
  Home, 
  Shirt, 
  Briefcase, 
  Gamepad2, 
  Wrench 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CATEGORIES_SLIDER = [
  { id: "tous", label: "Tout voir", icon: Sparkles, badge: null, gradient: "from-amber-500 via-[#FF6600] to-orange-500" },
  { id: "electronique", label: "High-Tech", icon: Smartphone, badge: "Populaire", gradient: "from-blue-500 to-indigo-600" },
  { id: "véhicules", label: "Véhicules", icon: Car, badge: "Nouveau", gradient: "from-emerald-500 to-teal-600" },
  { id: "immobilier", label: "Immobilier", icon: Home, badge: null, gradient: "from-violet-500 to-purple-600" },
  { id: "mode", label: "Mode & Style", icon: Shirt, badge: null, gradient: "from-pink-500 to-rose-600" },
  { id: "services", label: "Services", icon: Wrench, badge: null, gradient: "from-amber-500 to-yellow-600" },
  { id: "emploi", label: "Emplois", icon: Briefcase, badge: "Top", gradient: "from-cyan-500 to-blue-600" },
  { id: "gaming", label: "Gaming", icon: Gamepad2, badge: null, gradient: "from-fuchsia-500 to-pink-600" },
];

interface CategoriesSliderProps {
  categorieActive: string;
  onSelectCategory: (id: string) => void;
}

export function CategoriesSlider({ categorieActive, onSelectCategory }: CategoriesSliderProps) {
  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="flex items-center gap-4 overflow-x-auto px-1 py-3 scrollbar-none scroll-smooth">
        {CATEGORIES_SLIDER.map((cat) => {
          const Icon = cat.icon;
          const isSelected = categorieActive === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group flex flex-col items-center gap-2 shrink-0 transition-transform active:scale-95 focus:outline-none"
            >
              {/* Ring Style Story */}
              <div
                className={cn(
                  "relative flex size-16 items-center justify-center rounded-full p-[2.5px] transition-all duration-300 shadow-xs",
                  isSelected
                    ? `bg-gradient-to-tr ${cat.gradient} ring-4 ring-[#FF6600]/20 scale-105`
                    : "bg-slate-200 hover:bg-slate-300"
                )}
              >
                {/* Intérieur Blanc */}
                <div className="flex size-full items-center justify-center rounded-full bg-white transition-transform group-hover:scale-95">
                  <Icon
                    className={cn(
                      "size-6 transition-colors",
                      isSelected ? "text-[#FF6600]" : "text-slate-600 group-hover:text-slate-900"
                    )}
                  />
                </div>

                {/* Badge Story */}
                {cat.badge && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-[#FF6600] px-1.5 py-0.5 text-[9px] font-black text-white shadow-xs">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Libellé */}
              <span
                className={cn(
                  "text-xs font-semibold tracking-tight transition-colors max-w-[76px] truncate text-center",
                  isSelected ? "text-[#FF6600] font-bold" : "text-slate-600 group-hover:text-slate-900"
                )}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}