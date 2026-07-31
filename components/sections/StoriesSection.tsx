"use client";

import React from "react";
import { CreateFlashCard } from "../cards/CreateFlashCard";
import { PubStoryCard, PubStoryProps } from "../cards/PubStoryCard";

const PUBS_MOCK: PubStoryProps[] = [
  {
    id: "1",
    titre: "Acheter un abonnement pro Dealtoo",
    sousTitre: "Investissement",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Sponsorisé",
  },
  {
    id: "2",
    titre: "Profils vérifiés : gagnez la confiance",
    sousTitre: "Badge Bleu",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "A la une",
  },
  {
    id: "3",
    titre: "Boostez vos ventes automobiles cette semaine",
    sousTitre: "Offre Spéciale",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function StoriesSection() {
  const handleCreateFlash = () => {
    alert("Ouverture du formulaire de publication Flash !");
  };

  return (
    <section className="w-full py-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none px-4 sm:px-0">
        {/* Carte d'action d'ajout */}
        <CreateFlashCard onClick={handleCreateFlash} />

        {/* Liste des pubs story qui défilent */}
        {PUBS_MOCK.map((pub) => (
          <PubStoryCard key={pub.id} {...pub} />
        ))}
      </div>
    </section>
  );
}