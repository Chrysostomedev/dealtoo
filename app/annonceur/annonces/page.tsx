"use client";

// ============================================================================
// app/annonceur/annonces/page.tsx — "Mes annonces" (gestion, pas modération).
//
// Différence avec /admin/annonces : ici l'annonceur ne voit QUE ses propres
// annonces et ne peut qu'agir dessus (modifier/booster/supprimer/dépublier),
// jamais approuver/rejeter — cette dernière action reste un privilège admin.
//
// Bonnes pratiques appliquées :
// - Suppression avec confirmation via <Modal> plutôt qu'un `window.confirm`
//   natif (incohérent visuellement avec le design system).
// - `idASupprimer` stocke l'ID en attente de confirmation plutôt que de
//   supprimer directement au clic : évite toute suppression accidentelle.
// ============================================================================

import { Eye, Pencil, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Colonne, DataTable } from "@/components/data/DataTable";
import { Modal } from "@/components/ui/Modal";
import { formatPrix } from "@/lib/utils";

interface MonAnnonce {
  id: string;
  titre: string;
  prix: number;
  vues: number;
  statut: "Active" | "Expirée" | "En attente";
}

const MES_ANNONCES: MonAnnonce[] = [
  { id: "n1", titre: "iPhone 14 Pro Max 256Go", prix: 485_000, vues: 1240, statut: "Active" },
  { id: "n2", titre: "Chaussures en cuir — mocassins", prix: 25_000, vues: 89, statut: "En attente" },
  { id: "n3", titre: "T-shirt Lacoste vintage", prix: 12_000, vues: 45, statut: "Expirée" },
];

const STATUT_VARIANT = { Active: "emerald", Expirée: "neutral", "En attente": "gold" } as const;

export default function MesAnnoncesPage() {
  const [annonces, setAnnonces] = useState(MES_ANNONCES);
  const [idASupprimer, setIdASupprimer] = useState<string | null>(null);

  const confirmerSuppression = () => {
    setAnnonces((prev) => prev.filter((a) => a.id !== idASupprimer));
    toast.success("Annonce supprimée");
    setIdASupprimer(null);
  };

  const booster = (titre: string) => {
    // TODO: rediriger vers le tunnel de paiement du boost
    toast.success(`"${titre}" mise en avant pour 48h`, { description: "+10 XP" });
  };

  const colonnes: Colonne<MonAnnonce>[] = [
    { header: "Annonce", accessor: "titre", className: "font-medium" },
    { header: "Prix", accessor: "prix", render: (v) => <span className="font-mono">{formatPrix(v as number)}</span> },
    { header: "Vues", accessor: "vues", className: "text-ink-faint" },
    {
      header: "Statut",
      accessor: "statut",
      render: (v) => <Badge variant={STATUT_VARIANT[v as MonAnnonce["statut"]]}>{v as string}</Badge>,
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id, ligne) => (
        <div className="flex gap-1.5">
          <button
            onClick={() => booster(ligne.titre)}
            className="flex size-8 items-center justify-center rounded-md bg-gold-500/10 text-gold-500 hover:bg-gold-500/20"
            aria-label="Booster"
            title="Booster l'annonce"
          >
            <Zap className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md bg-brand-500/10 text-brand-500 hover:bg-brand-500/20" aria-label="Modifier">
            <Pencil className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md bg-white/8 text-ink-soft hover:bg-white/12" aria-label="Voir">
            <Eye className="size-4" />
          </button>
          <button
            onClick={() => setIdASupprimer(id as string)}
            className="flex size-8 items-center justify-center rounded-md bg-ruby-500/10 text-ruby-500 hover:bg-ruby-500/20"
            aria-label="Supprimer"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Mes annonces</h1>
          <p className="mt-1 text-sm text-ink-soft">{annonces.length} annonce(s) publiée(s)</p>
        </div>
        <Button variant="gold">Publier une annonce</Button>
      </div>

      <div className="mt-6">
        <DataTable colonnes={colonnes} donnees={annonces} keyExtractor={(a) => a.id} />
      </div>

      {/* Confirmation de suppression — jamais de suppression directe au clic */}
      <Modal ouvert={idASupprimer !== null} onClose={() => setIdASupprimer(null)} titre="Supprimer cette annonce ?" taille="sm">
        <p className="text-sm text-ink-soft">
          Cette action est définitive. L&apos;annonce sera immédiatement retirée de la marketplace.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIdASupprimer(null)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={confirmerSuppression}>
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  );
}