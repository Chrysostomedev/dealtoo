"use client";

// ============================================================================
// app/(admin)/roles/page.tsx — Rôles et matrice de permissions.
//
// Bonnes pratiques appliquées :
// - Modèle de données `PERMISSIONS x ROLES` : une matrice booléenne simple,
//   représentative de ce que gèrent la plupart des systèmes RBAC (Role-Based
//   Access Control) — facile à remplacer par un vrai appel API renvoyant
//   la même forme de données.
// - Chaque case de la matrice est indépendante dans l'état (`permissions`),
//   mise à jour immutablement (spread) : aucune mutation directe de l'état,
//   conforme aux règles de React.
// ============================================================================

import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/Switch";

const ROLES = ["Modérateur", "Gestionnaire", "Super Admin"] as const;
const PERMISSIONS = [
  "Voir les utilisateurs",
  "Suspendre un compte",
  "Modérer les annonces",
  "Gérer les paiements",
  "Gérer les rôles",
] as const;

type Role = (typeof ROLES)[number];
type Permission = (typeof PERMISSIONS)[number];

// Matrice initiale : quelles permissions sont actives pour quel rôle.
const MATRICE_INITIALE: Record<Role, Record<Permission, boolean>> = {
  Modérateur: {
    "Voir les utilisateurs": true,
    "Suspendre un compte": false,
    "Modérer les annonces": true,
    "Gérer les paiements": false,
    "Gérer les rôles": false,
  },
  Gestionnaire: {
    "Voir les utilisateurs": true,
    "Suspendre un compte": true,
    "Modérer les annonces": true,
    "Gérer les paiements": true,
    "Gérer les rôles": false,
  },
  "Super Admin": {
    "Voir les utilisateurs": true,
    "Suspendre un compte": true,
    "Modérer les annonces": true,
    "Gérer les paiements": true,
    "Gérer les rôles": true,
  },
};

export default function AdminRolesPage() {
  const [matrice, setMatrice] = useState(MATRICE_INITIALE);

  const basculer = (role: Role, permission: Permission) => {
    // "Super Admin" garde toujours tout activé — règle métier volontairement
    // codée en dur ici (à déplacer vers core/use-cases si elle se complexifie).
    if (role === "Super Admin") {
      toast.error("Les permissions du Super Admin ne peuvent pas être modifiées.");
      return;
    }

    setMatrice((prev) => ({
      ...prev,
      [role]: { ...prev[role], [permission]: !prev[role][permission] },
    }));
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Rôles & permissions</h1>
      <p className="mt-1 text-sm text-ink-soft">Contrôlez précisément ce que chaque rôle peut faire sur la plateforme.</p>

      <div className="mt-6 overflow-x-auto rounded-md border border-ink-faint/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-faint/10 bg-ink-faint/5">
              <th className="whitespace-nowrap px-4 py-3 font-medium text-ink-soft">Permission</th>
              {ROLES.map((role) => (
                <th key={role} className="whitespace-nowrap px-4 py-3 text-center font-medium text-ink-soft">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((permission) => (
              <tr key={permission} className="border-b border-ink-faint/5 last:border-0">
                <td className="px-4 py-3 text-ink">{permission}</td>
                {ROLES.map((role) => (
                  <td key={role} className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={matrice[role][permission]}
                        onChange={() => basculer(role, permission)}
                        disabled={role === "Super Admin"}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}