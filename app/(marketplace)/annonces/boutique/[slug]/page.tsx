// ============================================================================
// app/(marketplace)/boutique/[slug]/page.tsx — Vitrine publique d'une boutique.
//
// Bonnes pratiques appliquées :
// - Réutilise `AnnonceCard` pour afficher les produits de la boutique :
//   AUCUNE duplication de carte "produit de boutique" — c'est la même
//   entité Annonce, juste filtrée par vendeur.
// - `notFound()` si le slug ne correspond à rien (voir page annonce/[id]).
// ============================================================================

import { MapPin, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { LevelBadge } from "@/components/stats/LevelBadge";
import { ANNONCES, BOUTIQUES } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BoutiquePage({ params }: PageProps) {
  const { slug } = await params;
  const boutique = BOUTIQUES.find((b) => b.slug === slug);

  if (!boutique) notFound();

  // Démo : on affiche toutes les annonces mock comme si elles appartenaient
  // à cette boutique. En prod : ANNONCES.filter(a => a.boutiqueId === boutique.id).
  const produitsBoutique = ANNONCES;

  return (
    <div>
      {/* Bandeau de couverture */}
      <div className="relative h-40 sm:h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={boutique.couverture} alt="" aria-hidden className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 lg:px-8">
        {/* En-tête profil, chevauche le bandeau (-mt négatif) */}
        <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar src={boutique.logo} nom={boutique.nom} taille="lg" className="size-24 ring-4 ring-canvas" />
            <div>
              <h1 className="font-display text-2xl font-bold text-ink">{boutique.nom}</h1>
              <div className="mt-1 flex items-center gap-3 text-sm text-ink-soft">
                <span className="flex items-center gap-1">
                  <Star className="size-3.5 fill-gold-500 text-gold-500" />
                  <span className="font-mono">{boutique.note.toFixed(1)}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> Abidjan
                </span>
                <LevelBadge niveau={boutique.niveau} taille="sm" />
              </div>
            </div>
          </div>

          <Button variant="gold">S&apos;abonner</Button>
        </div>

        {/* Grille des produits */}
        <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-ink">
          {produitsBoutique.length} produits
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {produitsBoutique.map((annonce) => (
            <AnnonceCard key={annonce.id} {...annonce} />
          ))}
        </div>
      </div>
    </div>
  );
}