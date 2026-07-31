"use client";

// ============================================================================
// app/(annonceur)/publier/page.tsx — Formulaire de publication d'annonce.
//
// Bonnes pratiques appliquées :
// - "use client" nécessaire : formulaire contrôlé + navigation entre étapes.
// - Ceci est volontairement l'ÉTAPE 1 d'un futur wizard multi-étapes (voir
//   README § Composants clés → PublierAnnonceForm). La logique de progression
//   (étape courante, validation Zod par étape, sauvegarde de brouillon) est
//   à construire dans `components/form/PublierAnnonceForm.tsx` ; cette page
//   ne fait que monter ce composant plus tard. Pour l'instant, un formulaire
//   simple pour valider le style visuel des champs.
// - Chaque champ est un <Input> du design system : aucune classe Tailwind
//   redéfinie ici, la cohérence visuelle vient du composant partagé.
// ============================================================================

import { ImagePlus, MapPin, Tag, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const ETAPES = ["Catégorie & titre", "Détails & photos", "Prix & localisation"] as const;

export default function PublierPage() {
  const [etape, setEtape] = useState(0);

  const etapeSuivante = () => setEtape((e) => Math.min(e + 1, ETAPES.length - 1));
  const etapePrecedente = () => setEtape((e) => Math.max(e - 1, 0));

  const soumettre = () => {
    // TODO: brancher sur core/use-cases/PublierAnnonce + services/annonces.service.ts
    toast.success("Annonce publiée avec succès !", { description: "+15 XP gagnés" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-ink">Publier une annonce</h1>

      {/* Indicateur d'étapes */}
      <div className="mt-5 flex items-center gap-2">
        {ETAPES.map((label, index) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={
                "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold " +
                (index <= etape ? "bg-brand-500 text-white" : "bg-white/8 text-ink-faint")
              }
            >
              {index + 1}
            </span>
            {index < ETAPES.length - 1 && (
              <span className={"h-px flex-1 " + (index < etape ? "bg-brand-500" : "bg-white/8")} />
            )}
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-ink-faint">{ETAPES[etape]}</p>

      {/* Contenu de l'étape courante */}
      <div className="mt-6 space-y-4 rounded-md border border-white/5 bg-surface p-5">
        {etape === 0 && (
          <>
            <Input label="Titre de l'annonce" icon={Tag} placeholder="Ex : iPhone 14 Pro Max 256Go" />
            <Input label="Catégorie" placeholder="Ex : Électronique" />
          </>
        )}

        {etape === 1 && (
          <>
            <Input label="Description" placeholder="Décrivez l'état, les accessoires inclus..." />
            <button
              type="button"
              className="flex w-full flex-col items-center gap-2 rounded-md border border-dashed border-white/15 py-8 text-ink-faint transition-colors hover:border-brand-500/40 hover:text-ink-soft"
            >
              <ImagePlus className="size-6" />
              <span className="text-sm">Ajouter des photos (max 8)</span>
            </button>
          </>
        )}

        {etape === 2 && (
          <>
            <Input label="Prix (FCFA)" icon={Wallet} type="number" placeholder="Ex : 250000" />
            <Input label="Localisation" icon={MapPin} placeholder="Ex : Cocody, Abidjan" />
          </>
        )}
      </div>

      {/* Navigation entre étapes */}
      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={etapePrecedente} disabled={etape === 0}>
          Précédent
        </Button>

        {etape < ETAPES.length - 1 ? (
          <Button variant="brand" onClick={etapeSuivante}>
            Continuer
          </Button>
        ) : (
          <Button variant="gold" onClick={soumettre}>
            Publier l&apos;annonce
          </Button>
        )}
      </div>
    </div>
  );
}