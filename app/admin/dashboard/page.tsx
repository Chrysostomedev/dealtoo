// ============================================================================
// app/(admin)/utilisateurs/page.tsx — Liste et gestion des utilisateurs.
//
// Bonnes pratiques appliquées :
// - Les colonnes sont déclarées comme des DONNÉES (tableau `COLONNES`) passées
//   à <DataTable>, pas comme du JSX répété — ajouter une colonne ne touche
//   pas au composant DataTable lui-même (Open/Closed principle).
// - `render` par colonne isole le "comment afficher" (badge coloré selon le
//   statut) du "quoi afficher" (la donnée brute reste simple à typer/trier).
// ============================================================================

import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Colonne, DataTable } from "@/components/data/DataTable";

interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  type: "Client" | "Annonceur" | "Admin";
  statut: "Actif" | "Suspendu" | "En attente";
  inscrit: string;
}

const UTILISATEURS: Utilisateur[] = [
  { id: "u1", nom: "Aïcha Koné", email: "aicha.kone@mail.com", type: "Annonceur", statut: "Actif", inscrit: "12 juin 2026" },
  { id: "u2", nom: "Lang George", email: "lang.george@mail.com", type: "Client", statut: "Actif", inscrit: "3 juil. 2026" },
  { id: "u3", nom: "Yao Kouassi", email: "yao.k@mail.com", type: "Annonceur", statut: "Suspendu", inscrit: "20 mai 2026" },
  { id: "u4", nom: "Fatou Diabaté", email: "fatou.d@mail.com", type: "Client", statut: "En attente", inscrit: "28 juil. 2026" },
];

const STATUT_VARIANT = {
  Actif: "emerald",
  Suspendu: "ruby",
  "En attente": "gold",
} as const;

const COLONNES: Colonne<Utilisateur>[] = [
  {
    header: "Utilisateur",
    accessor: "nom",
    render: (_valeur, ligne) => (
      <div className="flex items-center gap-2.5">
        <Avatar nom={ligne.nom} taille="sm" />
        <div>
          <p className="font-medium">{ligne.nom}</p>
          <p className="text-xs text-ink-faint">{ligne.email}</p>
        </div>
      </div>
    ),
  },
  { header: "Type de compte", accessor: "type" },
  {
    header: "Statut",
    accessor: "statut",
    render: (valeur) => <Badge variant={STATUT_VARIANT[valeur as Utilisateur["statut"]]}>{valeur as string}</Badge>,
  },
  { header: "Inscrit le", accessor: "inscrit", className: "text-ink-faint" },
];

export default function AdminUtilisateursPage() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Utilisateurs</h1>
          <p className="mt-1 text-sm text-ink-soft">{UTILISATEURS.length} comptes enregistrés</p>
        </div>
      </div>

      <DataTable colonnes={COLONNES} donnees={UTILISATEURS} keyExtractor={(u) => u.id} />
    </div>
  );
}