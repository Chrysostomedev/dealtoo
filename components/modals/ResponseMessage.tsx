"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect } from "react";

type ResponseMessageType = "success" | "error";

type ResponseMessageProps = {
  isOpen: boolean;
  onClose: () => void;
  type: ResponseMessageType;
  title?: string;
  message: string;
  /** Fermeture automatique après ce délai (ms). Passez 0 pour désactiver. */
  autoCloseMs?: number;
};

const STYLES: Record<
  ResponseMessageType,
  { icon: typeof CheckCircle2; ring: string; glow: string; iconBg: string; bar: string }
> = {
  success: {
    icon: CheckCircle2,
    ring: "ring-emerald-500/30",
    glow: "shadow-emerald-500/30",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    bar: "bg-emerald-400",
  },
  error: {
    icon: XCircle,
    ring: "ring-ruby-500/30",
    glow: "shadow-ruby-500/30",
    iconBg: "bg-ruby-500/15 text-ruby-500",
    bar: "bg-ruby-500",
  },
};

const DEFAULT_TITLES: Record<ResponseMessageType, string> = {
  success: "Succès",
  error: "Une erreur est survenue",
};

/**
 * Popup flash plein écran pour confirmer un succès ou signaler une erreur.
 * Contrôlé via isOpen / onClose — déclenchez-le après une action
 * (formulaire, paiement, suppression…).
 *
 * Exemple :
 *   const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null);
 *   <ResponseMessage
 *     isOpen={!!flash}
 *     onClose={() => setFlash(null)}
 *     type={flash?.type ?? "success"}
 *     message={flash?.message ?? ""}
 *   />
 */
export function ResponseMessage({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoCloseMs = 4000,
}: ResponseMessageProps) {
  const styles = STYLES[type];
  const Icon = styles.icon;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !autoCloseMs) return;
    const timeout = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timeout);
  }, [isOpen, autoCloseMs, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop plein écran */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Carte — entrée en bond (spring overshoot) */}
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-live="assertive"
            initial={{ opacity: 0, scale: 0.3, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className={`relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-canvas/95 shadow-2xl ${styles.glow} ring-1 ${styles.ring} backdrop-blur-2xl`}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-white/5 hover:text-ink"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>

            <div className="flex flex-col items-center px-6 pb-6 pt-9 text-center sm:px-8">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                className={`flex size-16 items-center justify-center rounded-full ${styles.iconBg}`}
              >
                <Icon className="size-9" />
              </motion.span>

              <h2 className="mt-4 font-display text-lg font-semibold text-ink sm:text-xl">
                {title ?? DEFAULT_TITLES[type]}
              </h2>
              <p className="mt-1.5 text-sm text-ink-soft">{message}</p>

              <button
                onClick={onClose}
                className={`mt-6 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 ${
                  type === "success" ? "bg-emerald-500 hover:bg-emerald-400" : "bg-ruby-500 hover:bg-ruby-400"
                }`}
              >
                D'accord
              </button>
            </div>

            {/* Barre de progression avant fermeture auto */}
            {autoCloseMs > 0 && (
              <motion.div
                key={`${isOpen}-bar`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: autoCloseMs / 1000, ease: "linear" }}
                className={`h-1 ${styles.bar}`}
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}