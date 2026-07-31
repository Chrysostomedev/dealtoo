// ============================================================================
// app/(marketplace)/page.tsx — Accueil de la marketplace.
// ============================================================================

import { ArrowRight, Briefcase, ShoppingBag, Wrench } from "lucide-react";
import Link from "next/link";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { BoutiqueCard } from "@/components/cards/BoutiqueCard";
import { EmploiCard } from "@/components/cards/EmploiCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { Hero } from "@/components/sections/Hero";
import { FiltreLocalisationCI } from "@/components/ui/FiltreLocalisationCI";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { PubStoryCard } from "@/components/cards/PubStoryCard";
import { ANNONCES, BOUTIQUES, CATEGORIES, EMPLOIS, SERVICES } from "@/lib/mock-data";

// En-tête de section utilitaire
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
     
      <CategoryGrid categories={CATEGORIES} />

      {/* --- Filtre par Localisation (Côte d'Ivoire) ------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FiltreLocalisationCI />
        </div>
        
      </section>
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-6">
  <PubStoryCard/>
</div>


      {/* --- Annonces tendances -------------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Ils se sont abonnés" icon={ShoppingBag} href="/annonces" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.map((annonce) => (
              <AnnonceCard key={annonce.id} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Récemment consultés" icon={ShoppingBag} href="/annonces" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.map((annonce) => (
              <AnnonceCard key={annonce.id} {...annonce} />
            ))}
          </div>
        </div>
      </section>

<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-6">
  <StoriesSection />
</div>
      
      {/* --- Offres d'emploi récentes ---------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Dernières annonces" icon={Briefcase} href="/emploi" />
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
      {/* <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Boutiques à la une</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BOUTIQUES.map((boutique) => (
              <BoutiqueCard key={boutique.slug} {...boutique} />
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}