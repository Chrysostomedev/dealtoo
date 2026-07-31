"use client";

// ============================================================================
// Switch — interrupteur on/off du design system (utilisé pour les
// permissions dans /admin/roles, ou tout réglage booléen).
//
// Bonnes pratiques appliquées :
// - Composant CONTRÔLÉ (checked/onChange fournis par le parent) : cohérent
//   avec le reste du design system (voir <Tabs>), aucune source de vérité
//   dupliquée en interne.
// - `role="switch"` + `aria-checked` : sémantique d'accessibilité correcte,
//   différente d'une simple checkbox.
// ============================================================================

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <label className={cn("flex items-center gap-2.5", disabled && "opacity-50")}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand-500" : "bg-white/15"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 size-5 rounded-full bg-white shadow-sm"
          style={{ left: checked ? "calc(100% - 22px)" : "2px" }}
        />
      </button>
      {label && <span className="text-sm text-ink-soft">{label}</span>}
    </label>
  );
}