"use client";

import { Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RECENTES = ["Peugeot 406","Stage commercial","iPhone 13 Pro", "Appartement Cocody", "Chauffeur privé"];

type SearchPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};


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
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panneau — fond blanc opaque */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recherche"
        className={`relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl transition-all duration-200 ease-out motion-reduce:transition-none sm:h-fit sm:max-h-[70vh] sm:max-w-2xl sm:rounded-2xl ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        {/* Champ de recherche */}
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-5 py-4">
          <Search className="size-5 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Que recherchez-vous ?"
            className="w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Fermer la recherche"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!query && (
            <>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Recherches récentes
              </p>
              <ul className="flex flex-wrap gap-2">
                {RECENTES.map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => setQuery(r)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {query && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <Sparkles className="size-5 text-brand-500" />
              <p className="text-sm text-gray-500">
                Résultats pour{" "}
                <span className="font-medium text-gray-900">« {query} »</span>
              </p>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}