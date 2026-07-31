"use client";

// ============================================================================
// Tabs — contrôle segmenté (ex: "Tous / Annonces / Emploi / Services").
//
// Bonnes pratiques appliquées :
// - `layoutId` Framer Motion partagé : un SEUL élément indicateur est animé
//   d'un onglet à l'autre (au lieu de faire disparaître/réapparaître un fond
//   par onglet), ce qui donne l'effet "pilule qui glisse" fluide et gratuit.
// - Composant contrôlé (value/onChange) : aucun état interne caché, le
//   parent reste la seule source de vérité (facile à synchroniser avec l'URL
//   via useSearchParams si besoin).
// - role="tablist" / role="tab" pour l'accessibilité clavier et lecteurs d'écran.
// ============================================================================

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1",
        className
      )}
    >
      {items.map((item) => {
        const actif = item.value === value;

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={actif}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              actif ? "text-canvas" : "text-ink-soft hover:text-ink"
            )}
          >
            {/* Pilule active — partagée entre tous les boutons via layoutId */}
            {actif && (
              <motion.span
                layoutId="tabs-pilule-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gold-500"
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {item.label}
              {item.count !== undefined && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                    actif ? "bg-canvas/15" : "bg-white/8"
                  )}
                >
                  {item.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}