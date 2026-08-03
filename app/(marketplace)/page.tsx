// ============================================================================
// app/(marketplace)/page.tsx — Accueil de la marketplace.
// ============================================================================

import {
  ArrowRight,
  Briefcase,
  Calendar,
  Car,
  GraduationCap,
  Home,
  ShoppingBag,
  Smartphone,
  Wrench,
  Sparkles,
} from "lucide-react";
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
import { ANNONCES, BOUTIQUES, CATEGORIES, EMPLOIS, SERVICES, SERVICES_ET_EVENTS } from "@/lib/mock-data";

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
        <PubStoryCard />
      </div>

      {/* --- 1. Ils se sont abonnés (Section Scrollable Horizontalement) ------ */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Ils se sont abonnés" icon={ShoppingBag} href="/annonces" />
          
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {ANNONCES.map((annonce) => (
              <div key={`abonne-${annonce.id}`} className="snap-start shrink-0 w-[280px] sm:w-[320px]">
                <AnnonceCard {...annonce} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 2. Récemment consultés ---------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Récemment consultés" icon={Sparkles} href="/annonces" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.slice(0, 4).map((annonce) => (
              <AnnonceCard key={`recent-${annonce.id}`} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. Section Auto & Moto ---------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Auto & Moto" icon={Car} href="/annonces?categorie=auto-moto" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.slice(0, 4).map((annonce) => (
              <AnnonceCard key={`auto-${annonce.id}`} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. Section Téléphones & Hi-Tech -------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Téléphones & Hi-Tech" icon={Smartphone} href="/annonces?categorie=hi-tech" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.slice(0, 4).map((annonce) => (
              <AnnonceCard key={`hitech-${annonce.id}`} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Section Immobilier ------------------------------------------ */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Immobilier" icon={Home} href="/annonces?categorie=immobilier" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.slice(0, 4).map((annonce) => (
              <AnnonceCard key={`immo-${annonce.id}`} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. Section Apprentissage & Formations ------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Apprentissage & Formations" icon={GraduationCap} href="/annonces?categorie=apprentissage" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.slice(0, 4).map((annonce) => (
              <AnnonceCard key={`app-${annonce.id}`} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. Section Événements ---------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Événements" icon={Calendar} href="/annonces?categorie=evenements" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ANNONCES.slice(0, 4).map((annonce) => (
              <AnnonceCard key={`event-${annonce.id}`} {...annonce} />
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        <StoriesSection />
      </div>

      {/* --- Offres d'emploi récentes ---------------------------------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection titre="Offres d'emplois" icon={Briefcase} href="/emploi" />
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

      {/* --- Section Services, Apprentissage & Événements ---------------- */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnteteSection 
            titre="Services, Formations & Événements" 
            icon={Wrench} 
            href="/services" 
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_ET_EVENTS.map((item) => (
              <ServiceCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}