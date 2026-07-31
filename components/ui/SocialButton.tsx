"use client";

// ============================================================================
// SocialButton — bouton d'authentification via un fournisseur externe.
//
// Bonnes pratiques appliquées :
// - Le logo Google est du SVG inline (pas une image externe à charger) :
//   rendu instantané, zéro requête réseau, jamais de layout shift.
// - `onClick` est fourni par le parent (ex: signIn("google") via NextAuth /
//   Supabase Auth) : ce composant ne connaît AUCUN détail d'implémentation
//   d'auth — pure présentation, remplaçable derrière n'importe quel provider.
// - `loading` désactive le bouton pendant la redirection OAuth pour éviter
//   les doubles clics.
// ============================================================================

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.48a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.57-5.17 3.57-8.82Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.08.72-2.46 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.24v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.25 14.28A7.2 7.2 0 0 1 4.86 12c0-.79.14-1.56.39-2.28V6.63H1.24A12 12 0 0 0 0 12c0 1.94.46 3.77 1.24 5.37l4.01-3.09Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.24 6.63l4.01 3.09C6.2 6.89 8.86 4.77 12 4.77Z" />
    </svg>
  );
}

interface SocialButtonProps {
  provider: "google";
  onClick?: () => void;
  loading?: boolean;
}

const LABELS: Record<SocialButtonProps["provider"], string> = {
  google: "Continuer avec Google",
};

export function SocialButton({ provider, onClick, loading, ...rest }: SocialButtonProps & { className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-3 rounded-md border border-white/10 bg-white/[0.04] text-sm font-medium text-ink transition-colors hover:bg-white/[0.08] disabled:opacity-60",
        rest.className
      )}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : provider === "google" && <GoogleIcon />}
      {LABELS[provider]}
    </button>
  );
}