"use client";

// ============================================================================
// OTPInput — saisie de code de vérification (SMS/Email), 6 cases.
//
// Bonnes pratiques appliquées :
// - Un tableau de refs (`inputsRef`) plutôt que 6 useState séparés : la
//   valeur complète est reconstruite à la volée (`code.join("")`) et
//   remontée au parent via `onComplete` UNE seule fois, quand les 6 cases
//   sont remplies — évite de déclencher une vérification API prématurée.
// - Gestion du collage (`onPaste`) : coller un code SMS reçu ("123456")
//   remplit toutes les cases d'un coup, comportement attendu par les users.
// - `inputMode="numeric"` + `pattern` : clavier numérique sur mobile.
// ============================================================================

import { useRef, useState } from "react";

export function OTPInput({ length = 6, onComplete }: { length?: number; onComplete: (code: string) => void }) {
  const [valeurs, setValeurs] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const mettreAJour = (index: number, valeur: string) => {
    if (!/^[0-9]?$/.test(valeur)) return; // uniquement des chiffres

    const nouvelles = [...valeurs];
    nouvelles[index] = valeur;
    setValeurs(nouvelles);

    if (valeur && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (nouvelles.every((v) => v !== "")) {
      onComplete(nouvelles.join(""));
    }
  };

  const gererTouche = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Retour en arrière : si la case est vide, on va corriger la précédente
    if (e.key === "Backspace" && !valeurs[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const gererCollage = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const texte = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const nouvelles = Array(length).fill("");
    texte.split("").forEach((char, i) => (nouvelles[i] = char));
    setValeurs(nouvelles);
    inputsRef.current[Math.min(texte.length, length - 1)]?.focus();
    if (texte.length === length) onComplete(texte);
  };

  return (
    <div className="flex justify-between gap-2">
      {valeurs.map((valeur, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={valeur}
          onChange={(e) => mettreAJour(index, e.target.value)}
          onKeyDown={(e) => gererTouche(index, e)}
          onPaste={gererCollage}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="size-12 rounded-md border border-white/10 bg-white/[0.04] text-center font-mono text-lg font-semibold text-ink focus:border-brand-500/60 focus:outline-none sm:size-14"
        />
      ))}
    </div>
  );
}