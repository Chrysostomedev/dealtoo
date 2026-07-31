"use client";

// ============================================================================
// PaymentMethodCard — carte sélectionnable pour un moyen de paiement
// (Mobile Money, carte bancaire...). Réutilisée sur la page de paiement
// d'abonnement, et réutilisable demain sur un tunnel de paiement e-commerce
// (panier → checkout) pour rester cohérent.
//
// Bonnes pratiques appliquées :
// - Composant CONTRÔLÉ (`selectionne` + `onSelect`) comme <Tabs> et <Switch> :
//   le parent gère un seul état "méthode choisie parmi N", jamais un état
//   local par carte (qui permettrait plusieurs sélections simultanées par erreur).
// - `role="radio"` + `aria-checked` : sémantiquement, choisir un moyen de
//   paiement EST un choix exclusif (radio group), pas une checkbox.
// ============================================================================

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodCardProps {
  id: string;
  nom: string;
  description: string;
  icon: LucideIcon;
  selectionne: boolean;
  onSelect: (id: string) => void;
}

export function PaymentMethodCard({ id, nom, description, icon: Icon, selectionne, onSelect }: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selectionne}
      onClick={() => onSelect(id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-md border p-4 text-left transition-colors",
        selectionne ? "border-brand-500/60 bg-brand-500/8" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          selectionne ? "bg-brand-500 text-white" : "bg-white/8 text-ink-soft"
        )}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{nom}</p>
        <p className="text-xs text-ink-faint">{description}</p>
      </div>

      {/* Pastille radio custom, cohérente avec le style du design system */}
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
          selectionne ? "border-brand-500" : "border-white/20"
        )}
      >
        {selectionne && <span className="size-2.5 rounded-full bg-brand-500" />}
      </span>
    </button>
  );
}