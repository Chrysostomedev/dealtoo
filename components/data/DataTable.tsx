// ============================================================================
// DataTable — tableau de données générique pour tout le back-office.
//
// Bonnes pratiques appliquées :
// - Générique TypeScript (`<T>`) : UN SEUL composant sert pour les tableaux
//   Utilisateurs, Annonces, Rôles... au lieu d'un tableau custom par page.
//   Les colonnes définissent quoi afficher (`accessor`) et comment le
//   afficher (`render` optionnel, ex: badge de statut coloré).
// - `keyExtractor` explicite plutôt qu'un `index` de boucle comme clé React :
//   essentiel ici car les lignes peuvent être triées/filtrées (un index
//   changerait de ligne à chaque filtre → bugs de réconciliation React).
// - Server Component par défaut : aucune interactivité propre (tri, pagination)
//   n'est encore branchée ici — à ajouter en `"use client"` si besoin plus tard,
//   sans changer la forme de l'API du composant.
// ============================================================================

export interface Colonne<T> {
  header: string;
  accessor: keyof T;
  render?: (valeur: T[keyof T], ligne: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  colonnes: Colonne<T>[];
  donnees: T[];
  keyExtractor: (ligne: T) => string;
  /** Affiché si `donnees` est vide, plutôt qu'un tableau vide déroutant */
  messageVide?: string;
}

export function DataTable<T>({ colonnes, donnees, keyExtractor, messageVide = "Aucune donnée." }: DataTableProps<T>) {
  if (donnees.length === 0) {
    return <p className="rounded-md border border-dashed border-ink-faint/20 py-12 text-center text-sm text-ink-faint">{messageVide}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-ink-faint/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink-faint/10 bg-ink-faint/5">
            {colonnes.map((col) => (
              <th key={String(col.accessor)} className="whitespace-nowrap px-4 py-3 font-medium text-ink-soft">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {donnees.map((ligne) => (
            <tr key={keyExtractor(ligne)} className="border-b border-ink-faint/5 last:border-0 hover:bg-ink-faint/5">
              {colonnes.map((col) => (
                <td key={String(col.accessor)} className={"px-4 py-3 text-ink " + (col.className ?? "")}>
                  {col.render ? col.render(ligne[col.accessor], ligne) : String(ligne[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}