"use client";

import { Briefcase, Compass, Gift, Search, Sparkles, Tag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { label: "Annonces", href: "/annonces", icon: Tag },
  { label: "Emploi", href: "/emploi", icon: Briefcase },
  { label: "Services", href: "/services", icon: Compass },
  { label: "Fidélis", href: "/fidelis", icon: Gift },
];

const RECENTES = ["iPhone 13 Pro", "Appartement Cocody", "Chauffeur privé"];

type SearchPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Palette de recherche originale : s'ouvre au clic sur la barre de recherche,
 * l'icône mobile, ou via ⌘K / Ctrl+K. Entièrement responsive
 * (modal centrée sur desktop, plein écran sur mobile).
 */
export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => {
        setVisible(true);
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    document.body.style.overflow = "";
    const timeout = setTimeout(() => {
      setMounted(false);
      setQuery("");
    }, 200);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-0 pt-0 sm:px-4 sm:pt-[12vh]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panneau */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recherche"
        className={`relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-canvas/95 shadow-2xl shadow-black/60 backdrop-blur-2xl transition-all duration-200 ease-out motion-reduce:transition-none sm:h-fit sm:max-h-[70vh] sm:max-w-2xl sm:rounded-3xl ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div className="h-px w-full shrink-0 bg-gradient-to-r from-brand-500/70 via-gold-400/60 to-brand-500/70" />

        {/* Champ de recherche */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/5 px-5 py-4">
          <Search className="size-5 text-brand-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Que recherchez-vous ?"
            className="w-full bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-white/5 hover:text-ink"
            aria-label="Fermer la recherche"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!query && (
            <>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
                Recherches récentes
              </p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {RECENTES.map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => setQuery(r)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-ink-soft transition-colors duration-200 hover:border-brand-500/30 hover:bg-brand-500/10 hover:text-ink"
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>

              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">Parcourir</p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CATEGORIES.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400/30 hover:bg-gradient-to-b hover:from-brand-500/10 hover:to-gold-400/5 hover:shadow-lg hover:shadow-brand-500/10"
                    >
                      <Icon className="size-5 text-ink-soft transition-colors group-hover:text-brand-400" />
                      <span className="text-sm font-medium text-ink-soft transition-colors group-hover:text-ink">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {query && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <Sparkles className="size-5 text-brand-400" />
              <p className="text-sm text-ink-soft">
                Résultats pour <span className="font-medium text-ink">« {query} »</span>
              </p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="hidden shrink-0 items-center justify-between border-t border-white/5 px-5 py-2.5 text-xs text-ink-faint sm:flex">
          <span>Astuce : utilisez ⌘K pour ouvrir la recherche</span>
          <span className="rounded border border-white/10 px-1.5 py-0.5">Échap pour fermer</span>
        </div>
      </div>
    </div>
  );
}