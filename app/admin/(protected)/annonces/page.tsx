"use client";

// ============================================================================
// app/(admin)/annonces/page.tsx — Modération des annonces.
//
// Bonnes pratiques appliquées :
// - "use client" nécessaire : les actions Approuver/Rejeter modifient un état
//   local affiché immédiatement (mise à jour optimiste), avant confirmation
//   serveur — meilleure perception de rapidité pour le modérateur.
// - Les actions sont des fonctions pures qui ne touchent QU'à l'état local
//   `annonces` ; le vrai appel API (TODO) serait fait en parallèle avec
//   rollback en cas d'échec (pattern optimistic update).
// ============================================================================

import { Check, Eye, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Colonne, DataTable } from "@/components/data/DataTable";
import { formatPrix } from "@/lib/utils";

interface AnnonceModeration {
  id: string;
  titre: string;
  vendeur: string;
  prix: number;
  statut: "En attente" | "Approuvée" | "Rejetée";
  signalements: number;
}

const DONNEES_INITIALES: AnnonceModeration[] = [
  { id: "m1", titre: "iPhone 14 Pro Max 256Go", vendeur: "TechStore CI", prix: 485_000, statut: "En attente", signalements: 0 },
  { id: "m2", titre: "Montre luxe réplique premium", vendeur: "Deals Express", prix: 45_000, statut: "En attente", signalements: 4 },
  { id: "m3", titre: "Canapé d'angle en cuir", prix: 320_000, vendeur: "Déco Ivoire", statut: "Approuvée", signalements: 0 },
];

export default function AdminAnnoncesPage() {
  const [annonces, setAnnonces] = useState(DONNEES_INITIALES);

  const traiter = (id: string, decision: "Approuvée" | "Rejetée") => {
    // Mise à jour optimiste immédiate ; TODO: appeler l'API puis rollback
    // `setAnnonces` vers l'état précédent si la requête échoue.
    setAnnonces((prev) => prev.map((a) => (a.id === id ? { ...a, statut: decision } : a)));
    toast.success(decision === "Approuvée" ? "Annonce approuvée" : "Annonce rejetée");
  };

  const colonnes: Colonne<AnnonceModeration>[] = [
    { header: "Annonce", accessor: "titre", className: "font-medium" },
    { header: "Vendeur", accessor: "vendeur", className: "text-ink-faint" },
    { header: "Prix", accessor: "prix", render: (v) => <span className="font-mono">{formatPrix(v as number)}</span> },
    {
      header: "Signalements",
      accessor: "signalements",
      render: (v) =>
        (v as number) > 0 ? (
          <Badge variant="ruby">{v as number} signalement(s)</Badge>
        ) : (
          <span className="text-ink-faint">—</span>
        ),
    },
    {
      header: "Statut",
      accessor: "statut",
      render: (v) => (
        <Badge variant={v === "Approuvée" ? "emerald" : v === "Rejetée" ? "ruby" : "gold"}>{v as string}</Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id) => (
        <div className="flex gap-1.5">
          <button
            onClick={() => traiter(id as string, "Approuvée")}
            className="flex size-8 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
            aria-label="Approuver"
          >
            <Check className="size-4" />
          </button>
          <button
            onClick={() => traiter(id as string, "Rejetée")}
            className="flex size-8 items-center justify-center rounded-md bg-ruby-500/10 text-ruby-500 hover:bg-ruby-500/20"
            aria-label="Rejeter"
          >
            <X className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md bg-ink-faint/10 text-ink-soft hover:bg-ink-faint/20" aria-label="Voir">
            <Eye className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Modération des annonces</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {annonces.filter((a) => a.statut === "En attente").length} annonce(s) en attente de validation
      </p>

      <div className="mt-5">
        <DataTable colonnes={colonnes} donnees={annonces} keyExtractor={(a) => a.id} />
      </div>
    </div>
  );
}