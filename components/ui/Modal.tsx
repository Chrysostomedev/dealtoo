"use client";

// ============================================================================
// Modal — boîte de dialogue générique du design system.
//
// Bonnes pratiques appliquées :
// - Fermeture au clic sur l'overlay ET à la touche Échap (useEffect + keydown).
// - role="dialog" + aria-modal pour les lecteurs d'écran.
// - AnimatePresence : le composant DOIT rester monté par le parent (pas de
//   `if (!ouvert) return null` avant le AnimatePresence) pour que la sortie
//   s'anime — c'est l'erreur n°1 avec Framer Motion + modales.
// - On bloque le scroll du body pendant l'ouverture pour éviter le double-scroll
//   overlay/page sur mobile.
// ============================================================================

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  ouvert: boolean;
  onClose: () => void;
  titre?: string;
  children: ReactNode;
  /** Largeur max — utile pour les formulaires (lg) vs confirmations (sm) */
  taille?: "sm" | "md" | "lg";
}

const TAILLES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({ ouvert, onClose, titre, children, taille = "md" }: ModalProps) {
  // Échap pour fermer + verrouillage du scroll body, uniquement quand ouvert.
  useEffect(() => {
    if (!ouvert) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [ouvert, onClose]);

  return (
    <AnimatePresence>
      {ouvert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />

          {/* Contenu */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={titre}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={cn(
              "relative w-full rounded-lg border border-white/10 bg-surface/95 p-5 shadow-2xl backdrop-blur-2xl",
              TAILLES[taille]
            )}
          >
            {titre && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-ink">{titre}</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-ink-soft hover:bg-white/5 hover:text-ink"
                  aria-label="Fermer"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}