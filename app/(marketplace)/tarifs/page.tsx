// ============================================================================
// app/(marketplace)/tarifs/page.tsx — Grille tarifaire des abonnements.
//
// Bonnes pratiques appliquées :
// - Server Component : la grille de plans est statique, aucune interactivité
//   propre à la page (seul <PricingCard> a un bouton, géré par lui-même).
// - Les plans sont des données typées définies en haut de fichier : ajouter
//   un plan = ajouter un objet, aucune modification de balisage nécessaire.
// ============================================================================

import { PricingCard, type PricingCardProps } from "@/components/cards/PricingCard";

const PLANS: PricingCardProps[] = [
  {
    nom: "Essentiel",
    description: "Pour tester la publication d'annonces",
    prix: 0,
    fonctionnalites: [
      { label: "3 annonces actives" },
      { label: "Visibilité standard" },
      { label: "Messagerie intégrée" },
      { label: "Boost d'annonce", inclus: false },
      { label: "Badge Certifié", inclus: false },
    ],
  },
  {
    nom: "Pro",
    description: "Pour les vendeurs réguliers",
    prix: 5_000,
    populaire: true,
    fonctionnalites: [
      { label: "Annonces illimitées" },
      { label: "Visibilité prioritaire" },
      { label: "3 boosts offerts / mois" },
      { label: "Badge Certifié" },
      { label: "Statistiques détaillées" },
    ],
  },
  {
    nom: "Boutique",
    description: "Pour les boutiques et grossistes",
    prix: 15_000,
    fonctionnalites: [
      { label: "Tout le plan Pro" },
      { label: "Vitrine boutique personnalisée" },
      { label: "Boosts illimités" },
      { label: "Gestionnaire de compte dédié" },
      { label: "API & export catalogue" },
    ],
  },
];

export default function TarifsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Un plan pour chaque vendeur
        </h1>
        <p className="mt-3 text-ink-soft">
          Boostez la visibilité de vos annonces et vendez plus vite. Changez de plan à tout moment.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard key={plan.nom} {...plan} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-faint">
        Paiement sécurisé par Mobile Money (Orange, MTN, Moov) ou carte bancaire.
      </p>
    </div>
  );
}