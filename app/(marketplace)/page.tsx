// ============================================================================
// app/(marketplace)/page.tsx — Accueil de la marketplace.
//
// Bonnes pratiques appliquées :
// - Server Component par défaut : cette page ne fait aucun useState/useEffect,
//   donc PAS de "use client" ici — seuls les enfants qui en ont besoin
//   (Hero, cartes) le déclarent eux-mêmes. Moins de JS envoyé au client.
// - Les données viennent (pour l'instant) de `lib/mock-data.ts` ; le jour où
//   l'API est branchée, seul cet import change (ex: appel à
//   `services/annonces.service.ts` dans un `async function Page()`),
//   la structure de la page reste identique.
// - Chaque section est un composant dédié (Hero, CategoryGrid...) : la page
//   ne fait QUE les assembler, elle ne contient aucune logique de présentation.
// ============================================================================

import { ArrowRight, Briefcase, ShoppingBag, Wrench } from "lucide-react";
import Link from "next/link";
import { FilterBar } from "@/components/ui/FilterBar";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { BoutiqueCard } from "@/components/cards/BoutiqueCard";
import { EmploiCard } from "@/components/cards/EmploiCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { Hero } from "@/components/sections/Hero";
import { ANNONCES, BOUTIQUES, CATEGORIES, EMPLOIS, SERVICES } from "@/lib/mock-data";

// Petit composant utilitaire interne : en-tête de section avec lien "Voir plus".
// Défini ici (et non exporté) car spécifique à cette page — s'il devient
// utilisé ailleurs, le sortir vers components/sections/SectionHeader.tsx.
function EnteteSection({
  titre,
  icon: Icon,
  href,
}: {
  titre: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
        <Icon className="size-5 text-brand-500" />
        {titre}
      </h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-brand-500"
      >
        Voir plus <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

export default function AccueilPage() {
  return (
    <>
      <Hero />
<FilterBar />
      <CategoryGrid categories={CATEGORIES} />

      {/* --- Annonces tendances -------------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Annonces tendances" icon={ShoppingBag} href="/annonces" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.map((annonce) => (
              <AnnonceCard key={annonce.id} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Offres d'emploi récentes ---------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Offres d'emploi récentes" icon={Briefcase} href="/emploi" />
          <div className="grid gap-3 lg:grid-cols-2">
            {EMPLOIS.map((emploi) => (
              <EmploiCard key={emploi.poste} {...emploi} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Services populaires ------------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Services populaires" icon={Wrench} href="/services" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.titre} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Boutiques à la une ---------------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Boutiques à la une</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BOUTIQUES.map((boutique) => (
              <BoutiqueCard key={boutique.slug} {...boutique} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}