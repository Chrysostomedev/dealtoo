"use client";

// ============================================================================
// XPBar — barre de progression d'expérience (gamification).
//
// Bonnes pratiques appliquées :
// - Le calcul du pourcentage est dérivé (`Math.min(100, ...)`) et jamais
//   stocké : la barre reflète toujours xpActuel/xpNiveauSuivant sans risque
//   de désynchronisation.
// - `initial={{ width: 0 }}` + `animate={{ width: pourcentage }}` : la barre
//   se remplit au montage plutôt que d'apparaître déjà pleine — renforce la
//   sensation de progression à chaque visite du dashboard.
// - Le "+X XP" flottant (voir toast dans CartContext) est volontairement géré
//   ailleurs (sonner) pour garder ce composant purement présentationnel.
// ============================================================================

import { motion } from "framer-motion";

interface XPBarProps {
  xpActuel: number;
  xpNiveauSuivant: number;
  niveau: number;
}

export function XPBar({ xpActuel, xpNiveauSuivant, niveau }: XPBarProps) {
  const pourcentage = Math.min(100, Math.round((xpActuel / xpNiveauSuivant) * 100));

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-ink-soft">Niveau {niveau}</span>
        <span className="font-mono text-ink-faint">
          {xpActuel.toLocaleString("fr-FR")} / {xpNiveauSuivant.toLocaleString("fr-FR")} XP
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pourcentage}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-[image:var(--gradient-brand)]"
        />
      </div>
    </div>
  );
}