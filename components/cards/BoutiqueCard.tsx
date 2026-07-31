"use client";

// ============================================================================
// BoutiqueCard — carte de vitrine boutique (Light Mode Premium)
// ============================================================================

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { LevelBadge } from "@/components/stats/LevelBadge";
import { cn } from "@/lib/utils";

export interface BoutiqueCardProps {
  slug: string;
  nom: string;
  logo: string;
  couverture: string;
  niveau: number;
  note: number;
  nombreProduits: number;
}

export function BoutiqueCard({
  slug,
  nom,
  logo,
  couverture,
  niveau,
  note,
  nombreProduits,
}: BoutiqueCardProps) {
  return (
    <Link
      href={`/boutique/${slug}`}
      className={cn(
        // BASE LIGHT SOFT & CLASSE: Fond blanc cassé (#FAF9F6), coins généreux (rounded-2xl)
        "group relative block overflow-hidden rounded-2xl bg-[#FAF9F6] border border-slate-200/80 shadow-2xs transition-all duration-300",
        // INTERACTION INSTITUTIONNELLE: Survol doux, passage au blanc pur, lueur orange très discrète
        "hover:bg-white hover:border-[#FF6600]/30 hover:shadow-[0_10px_25px_rgba(255,102,0,0.1)] hover:-translate-y-1"
      )}
    >
      {/* Image de couverture avec overlay subtil */}
      <div className="relative h-28 w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={couverture}
          alt=""
          aria-hidden
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dégradé de transition très doux vers le fond du composant */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Contenu principal */}
      <div className="-mt-8 flex flex-col items-center px-4 pb-5 text-center">
        {/* Avatar Vendeur : Contour Blanc Pur avec ombre pour effet de relief sur la couverture */}
        <div className="relative rounded-full ring-4 ring-[#FAF9F6] shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:ring-white">
          <Avatar src={logo} nom={nom} taille="lg" />
        </div>

        {/* Nom de la Boutique */}
        <h3 className="mt-2.5 line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-[#FF6600]">
          {nom}
        </h3>

        {/* SECTION ÉTOILES & NOTE (Hyper Lisibles et Visibles) */}
        <div className="mt-2 flex items-center justify-center gap-2">
          {/* Badge Note Dorée */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 border border-amber-200/80 shadow-2xs">
            <Star className="size-3.5 fill-[#FFC700] text-[#FFC700]" />
            <span className="font-mono text-xs font-extrabold text-slate-900">
              {note.toFixed(1)}
            </span>
          </div>

          <span className="text-slate-300">•</span>

          {/* Nombre de Produits */}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <ShoppingBag className="size-3.5 text-slate-400" />
            {nombreProduits} {nombreProduits > 1 ? "produits" : "produit"}
          </span>
        </div>

        {/* Badge de Niveau Institutionnel */}
        <div className="mt-3">
          <LevelBadge niveau={niveau} taille="sm" />
        </div>
      </div>
    </Link>
  );
}