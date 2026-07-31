// ============================================================================
// app/(marketplace)/services/page.tsx — Listing des prestations de service.
// Server Component — même logique que la page /emploi (voir ses commentaires).
// ============================================================================

import { ServiceCard } from "@/components/cards/ServiceCard";
import { SERVICES } from "@/lib/mock-data";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-ink">Services & prestataires</h1>
      <p className="mt-1 text-sm text-ink-soft">{SERVICES.length} prestataires vérifiés près de chez vous</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.titre} {...service} />
        ))}
      </div>
    </div>
  );
}