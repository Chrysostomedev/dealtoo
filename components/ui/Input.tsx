"use client";

// ============================================================================
// Input — champ de formulaire réutilisable du design system Dealtoo.
//
// Bonnes pratiques appliquées :
// - forwardRef pour rester compatible avec React Hook Form (register(...)).
// - Un seul composant contrôlé/non-contrôlé : on ne force rien, on laisse
//   le parent gérer value/onChange (ou le passer à RHF).
// - Les états visuels (focus, erreur, disabled) sont dérivés de vraies props,
//   jamais de pseudo-classes CSS seules, pour rester accessible (aria-invalid).
// ============================================================================

import { type LucideIcon } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  /** Texte d'aide affiché sous le champ quand il n'y a pas d'erreur */
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, hint, id, className, ...props }, ref) => {
    // Génère un id stable pour lier <label htmlFor> et l'input (a11y).
    const inputId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center gap-2 rounded-md border bg-white/[0.04] px-3.5 py-2.5 transition-colors",
            "focus-within:border-brand-500/60 focus-within:bg-white/[0.06]",
            error ? "border-ruby-500/50" : "border-white/10"
          )}
        >
          {Icon && <Icon className="size-4 shrink-0 text-ink-faint" />}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              "w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none",
              className
            )}
            {...props}
          />
        </div>

        {/* Erreur prioritaire sur le hint pour ne jamais afficher les deux */}
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-ruby-500">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-ink-faint">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";