"use client";

import {
  Car,
  Smartphone,
  Monitor,
  Sofa,
  Home,
  PawPrint,
  Shirt,
  Sparkles,
  Briefcase,
  Wrench,
  GraduationCap,
  Calendar,
  UserSearch,
  Gift,
  BookOpen,
  UtensilsCrossed,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ICONS = {
  Car,
  Smartphone,
  Monitor,
  Sofa,
  Home,
  PawPrint,
  Shirt,
  Sparkles,
  Briefcase,
  Wrench,
  GraduationCap,
  Calendar,
  UserSearch,
  Gift,
  BookOpen,
  UtensilsCrossed,
  LayoutGrid,
} as const;

export type Category = {
  slug: string;
  label: string;
  icon: keyof typeof ICONS;
  count?: number; // Optionnel : nombre d'annonces
};

type Props = {
  category: Category;
  className?: string;
};

export function CategoryCard({ category, className }: Props) {
  const Icon = ICONS[category.icon] ?? LayoutGrid;

  return (
    <Link
      href={`/annonces?cat=${category.slug}`}
      className={cn(
        // BASE LIGHT PREMIUM: Fond blanc cassé (#FAF9F6), bordure fine et clean
        "group relative flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#FAF9F6] p-4 text-center border border-slate-200/80 shadow-2xs transition-all duration-300",
        // INTERACTION PRO: Fond passe au blanc pur, bordure orange subtile, ombre douce au hover
        "hover:bg-white hover:border-[#FF6600]/40 hover:shadow-[0_8px_20px_rgba(255,102,0,0.1)] hover:-translate-y-1",
        "active:scale-95",
        className
      )}
    >
      {/* Conteneur Icône : Style sobre et unifié avec accentuation Orange Logo au Hover */}
      <div className="flex size-11 items-center justify-center rounded-xl bg-white border border-slate-200/60 text-slate-700 shadow-2xs transition-all duration-300 group-hover:bg-[#FF6600] group-hover:text-white group-hover:border-[#FF6600] group-hover:shadow-[0_4px_12px_rgba(255,102,0,0.3)]">
        <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
      </div>

      {/* Label de Catégorie */}
      <div className="space-y-0.5">
        <span className="block text-xs font-bold text-slate-800 transition-colors group-hover:text-[#FF6600] line-clamp-1">
          {category.label}
        </span>
        {category.count !== undefined && (
          <span className="block text-[10px] font-medium text-slate-400">
            {category.count} offres
          </span>
        )}
      </div>
    </Link>
  );
}