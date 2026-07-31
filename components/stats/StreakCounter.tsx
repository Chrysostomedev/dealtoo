"use client";

// ============================================================================
// StreakCounter — série de jours consécutifs d'activité (gamification).
//
// Bonnes pratiques appliquées :
// - `enDanger` est une PROP calculée par l'appelant (ex: "dernière activité
//   il y a plus de 20h"), jamais recalculée ici : ce composant ne doit pas
//   connaître la règle métier de calcul du risque de rupture, seulement
//   l'afficher — cohérent avec la séparation Clean Architecture (la règle
///  vit dans core/use-cases/CalculerStreak.ts).
// - L'animation de flamme est en boucle infinie légère (scale) : ambiante,
//   pas distrayante, s'arrête visuellement en `enDanger` (couleur grise).
// ============================================================================

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  jours: number;
  /** true si l'utilisateur risque de perdre sa série (ex: pas d'activité depuis >20h) */
  enDanger?: boolean;
}

export function StreakCounter({ jours, enDanger }: StreakCounterProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
        enDanger ? "border-ink-faint/30 bg-white/5" : "border-brand-500/30 bg-brand-500/10"
      )}
      title={enDanger ? "Activez-vous aujourd'hui pour garder votre série !" : `${jours} jours consécutifs`}
    >
      <motion.span
        animate={enDanger ? {} : { scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame className={cn("size-4", enDanger ? "text-ink-faint" : "fill-brand-500 text-brand-500")} />
      </motion.span>
      <span className={cn("font-mono text-sm font-semibold", enDanger ? "text-ink-faint" : "text-ink")}>
        {jours}j
      </span>
      {enDanger && <span className="text-[11px] text-ink-faint">série en danger</span>}
    </div>
  );
}