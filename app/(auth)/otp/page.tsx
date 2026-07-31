"use client";

// ============================================================================
// app/(auth)/otp/page.tsx — Vérification par code à usage unique.
//
// Bonnes pratiques appliquées :
// - Le compte à rebours de renvoi (`secondesRestantes`) est un `useEffect`
//   avec `setInterval` NETTOYÉ au démontage (`clearInterval` dans le retour)
//   — erreur classique sinon : fuite de timer si l'utilisateur quitte la page.
// - `onComplete` de <OTPInput> déclenche la vérification automatiquement dès
//   que les 6 chiffres sont saisis : pas besoin d'un bouton "Valider" séparé,
//   flow plus rapide (comme WhatsApp/la plupart des apps mobile-first).
// ============================================================================

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/AuthCard";
import { OTPInput } from "@/components/auth/OTPInput";

const DUREE_RENVOI = 60; // secondes

export default function OTPPage() {
  const [secondesRestantes, setSecondesRestantes] = useState(DUREE_RENVOI);
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    if (secondesRestantes === 0) return;
    const intervalle = setInterval(() => setSecondesRestantes((s) => s - 1), 1000);
    return () => clearInterval(intervalle); // évite la fuite de timer
  }, [secondesRestantes]);

  const verifierCode = async (code: string) => {
    setVerification(true);
    // TODO: await authService.verifierOTP(code)
    await new Promise((r) => setTimeout(r, 700));
    setVerification(false);

    if (code === "000000") {
      toast.error("Code incorrect", { description: "Vérifiez le code reçu et réessayez." });
    } else {
      toast.success("Compte vérifié !", { description: "Redirection vers votre tableau de bord..." });
    }
  };

  const renvoyerCode = () => {
    setSecondesRestantes(DUREE_RENVOI);
    toast.info("Nouveau code envoyé");
  };

  return (
    <AuthCard titre="Vérifiez votre identité" sousTitre="Entrez le code à 6 chiffres envoyé au +225 07 •• •• •• 42.">
      <OTPInput onComplete={verifierCode} />

      {verification && <p className="mt-4 text-center text-xs text-ink-faint">Vérification en cours…</p>}

      <div className="mt-6 text-center text-sm">
        {secondesRestantes > 0 ? (
          <p className="text-ink-faint">
            Renvoyer le code dans <span className="font-mono">{secondesRestantes}s</span>
          </p>
        ) : (
          <button onClick={renvoyerCode} className="font-medium text-brand-500 hover:underline">
            Renvoyer le code
          </button>
        )}
      </div>
    </AuthCard>
  );
}