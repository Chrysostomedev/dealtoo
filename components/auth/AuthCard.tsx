// ============================================================================
// AuthCard — enveloppe visuelle commune à /connexion, /inscription, /otp.
//
// Bonnes pratiques appliquées :
// - Un seul composant de mise en page pour toutes les pages d'auth : garantit
//   une cohérence pixel-perfect (halo, largeur, espacement) sans copier-coller
//   le même wrapper dans chaque page.
// - Server Component : purement structurel, aucune interactivité ici (les
//   formulaires à l'intérieur, eux, sont clients).
// ============================================================================

import Link from "next/link";

export function AuthCard({
  titre,
  sousTitre,
  children,
  pied,
}: {
  titre: string;
  sousTitre?: string;
  children: React.ReactNode;
  /** Lien de bas de carte, ex: "Déjà un compte ? Se connecter" */
  pied?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Halos décoratifs cohérents avec le Hero de la marketplace */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-gold-glow)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center font-display text-3xl font-bold text-ink">
          Deal<span className="text-brand-500">too</span>
        </Link>

        <div className="rounded-lg border border-white/10 bg-surface/90 p-6 backdrop-blur-2xl sm:p-8">
          <h1 className="font-display text-xl font-semibold text-ink">{titre}</h1>
          {sousTitre && <p className="mt-1.5 text-sm text-ink-soft">{sousTitre}</p>}

          <div className="mt-6">{children}</div>
        </div>

        {pied && <p className="mt-5 text-center text-sm text-ink-soft">{pied}</p>}
      </div>
    </div>
  );
}