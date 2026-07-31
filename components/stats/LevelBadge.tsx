// ============================================================================
// LevelBadge — badge de niveau vendeur (palier de gamification).
//
// Bonnes pratiques appliquées :
// - La correspondance niveau → palier est une fonction pure `getPalier`,
//   testable isolément et facilement déplaçable vers `core/use-cases` si
//   la logique de paliers devient plus complexe (ex: dépend de règles métier).
// - Aucune dépendance à l'état : composant purement présentationnel, donc
//   Server Component par défaut (pas de "use client").
// ============================================================================

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  niveau: number;
  taille?: "sm" | "md";
  className?: string;
}

/** Règle métier : au-delà de 30, tous les niveaux sont "Légende" */
function getPalier(niveau: number) {
  if (niveau >= 30) return "Légende";
  if (niveau >= 20) return "Expert";
  if (niveau >= 10) return "Confirmé";
  return "Débutant";
}

export function LevelBadge({ niveau, taille = "md", className }: LevelBadgeProps) {
  const palier = getPalier(niveau);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 pl-1 pr-2.5",
        taille === "sm" ? "py-0.5 text-[11px]" : "py-1 text-xs",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-gold-500 font-mono font-bold text-canvas",
          taille === "sm" ? "size-4 text-[9px]" : "size-5 text-[10px]"
        )}
      >
        {niveau}
      </span>
      <Crown className="size-3 text-gold-500" />
      <span className="font-medium text-gold-500">{palier}</span>
    </div>
  );
}