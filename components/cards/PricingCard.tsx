"use client";

// ============================================================================
// PricingCard — carte de plan d'abonnement.
//
// Bonnes pratiques appliquées :
// - `populaire` change le style ET l'élévation (scale + glow), mais reste
//   une simple prop booléenne : la mise en avant du plan "recommandé" est
//   une décision produit passée en donnée, jamais codée en dur dans le JSX
//   (la page /tarifs peut changer le plan populaire sans toucher au composant).
// - Les fonctionnalités sont une liste de strings + un flag `inclus` optionnel
//   pour griser celles qui NE SONT PAS incluses dans un plan (comparaison
//   visuelle entre plans plus lisible qu'une simple liste tronquée).
// ============================================================================

import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, formatPrix } from "@/lib/utils";

export interface Fonctionnalite {
  label: string;
  inclus?: boolean; // par défaut true
}

export interface PricingCardProps {
  nom: string;
  description: string;
  prix: number;
  periode?: "mois" | "an";
  fonctionnalites: Fonctionnalite[];
  populaire?: boolean;
  onChoisir?: () => void;
}

export function PricingCard({
  nom,
  description,
  prix,
  periode = "mois",
  fonctionnalites,
  populaire,
  onChoisir,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "relative flex flex-col rounded-lg border p-6",
        populaire
          ? "border-gold-500/40 bg-gradient-to-b from-gold-500/10 to-surface shadow-2xl shadow-gold-500/10"
          : "border-white/5 bg-surface"
      )}
    >
      {populaire && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-canvas">
          <Sparkles className="size-3" /> Le plus populaire
        </span>
      )}

      <h3 className="font-display text-lg font-semibold text-ink">{nom}</h3>
      <p className="mt-1 text-sm text-ink-soft">{description}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-mono text-3xl font-bold text-ink">{formatPrix(prix)}</span>
        <span className="text-sm text-ink-faint">/{periode}</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {fonctionnalites.map((f) => (
          <li key={f.label} className="flex items-start gap-2 text-sm">
            {f.inclus === false ? (
              <X className="mt-0.5 size-4 shrink-0 text-ink-faint" />
            ) : (
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            )}
            <span className={f.inclus === false ? "text-ink-faint line-through" : "text-ink-soft"}>{f.label}</span>
          </li>
        ))}
      </ul>

      <Button variant={populaire ? "gold" : "glass"} size="lg" className="mt-6 justify-center" onClick={onChoisir}>
        Choisir {nom}
      </Button>
    </motion.div>
  );
}