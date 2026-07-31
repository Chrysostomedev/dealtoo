// ============================================================================
// app/(marketplace)/emploi/page.tsx — Listing des offres d'emploi.
//
// Bonnes pratiques appliquées :
// - Server Component simple : pas d'interactivité pour l'instant, donc pas de
//   "use client". Si des filtres sont ajoutés plus tard (comme sur la page
//   /annonces), extraire la partie filtrable dans un sous-composant client
//   dédié plutôt que de rendre toute la page client.
// ============================================================================

import { EmploiCard } from "@/components/cards/EmploiCard";
import { EMPLOIS } from "@/lib/mock-data";

export default function EmploiPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-ink">Offres d&apos;emploi</h1>
      <p className="mt-1 text-sm text-ink-soft">{EMPLOIS.length} offres disponibles en Côte d&apos;Ivoire</p>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {EMPLOIS.map((emploi) => (
          <EmploiCard key={emploi.poste} {...emploi} />
        ))}
      </div>
    </div>
  );
}