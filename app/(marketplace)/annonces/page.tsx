"use client";

// ============================================================================
// app/(marketplace)/annonces/page.tsx — Listing complet des annonces.
//
// Bonnes pratiques appliquées :
// - "use client" nécessaire ICI car la page gère un état local (onglet actif).
//   Dans une vraie implémentation, cet état serait plutôt synchronisé avec
//   l'URL (`useSearchParams` + `router.push`) pour rendre les filtres
//   partageables/bookmarkables — laissé en `useState` ici pour la démo UI.
// - Le filtrage est une fonction pure dérivée du rendu (`annoncesFiltrees`),
//   jamais stockée dans un second `useState` : une seule source de vérité
//   (`categorieActive`) évite les bugs de désynchronisation.
// ============================================================================

import { useMemo, useState } from "react";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { Tabs } from "@/components/ui/Tabs";
import { ANNONCES } from "@/lib/mock-data";

const ONGLETS = [
  { value: "tous", label: "Tous" },
  { value: "electronique", label: "Électronique" },
  { value: "mode", label: "Mode" },
  { value: "immobilier", label: "Immobilier" },
];

export default function AnnoncesPage() {
  const [categorieActive, setCategorieActive] = useState("tous");

  // Filtrage de démo basé sur le titre (à remplacer par un vrai champ
  // `categorie` sur l'entité Annonce + un appel service côté serveur).
  const annoncesFiltrees = useMemo(() => {
    if (categorieActive === "tous") return ANNONCES;
    const motsClefs: Record<string, string[]> = {
      electronique: ["iphone", "tech"],
      mode: ["polo", "lacoste"],
      immobilier: ["terrain", "titré"],
    };
    const mots = motsClefs[categorieActive] ?? [];
    return ANNONCES.filter((a) => mots.some((m) => a.titre.toLowerCase().includes(m)));
  }, [categorieActive]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Toutes les annonces</h1>
          <p className="mt-1 text-sm text-ink-soft">{annoncesFiltrees.length} résultats</p>
        </div>

        <Tabs items={ONGLETS} value={categorieActive} onChange={setCategorieActive} />
      </div>

      {annoncesFiltrees.length === 0 ? (
        <p className="py-16 text-center text-ink-faint">Aucune annonce dans cette catégorie pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {annoncesFiltrees.map((annonce) => (
            <AnnonceCard key={annonce.id} {...annonce} />
          ))}
        </div>
      )}
    </div>
  );
}