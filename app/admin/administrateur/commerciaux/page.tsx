"use client";

import React, { useState } from "react";
import CommercialCard, { CommercialData } from "@/components/admin/cards/CommercialCard";
import { Users, Filter, UserCheck } from "lucide-react";

// Données fictives pour la démonstration
const MOCK_COMMERCIAUX: CommercialData[] = [
  {
    id: "COM-01",
    name: "Kouassi Jean-Marc",
    email: "jm.kouassi@dealtoo.ci",
    phone: "+225 07 08 09 10 11",
    role: "COMMERCIAL",
    isAvailable: true,
    lastLoginDate: "04/08/2026",
    lastLoginTime: "13:15",
    moderatedCount: 142,
  },
  {
    id: "COM-02",
    name: "Awa Touré",
    email: "a.toure@dealtoo.ci",
    phone: "+225 05 01 02 03 04",
    role: "COMMERCIAL",
    isAvailable: true,
    lastLoginDate: "04/08/2026",
    lastLoginTime: "11:40",
    moderatedCount: 98,
  },
  {
    id: "COM-03",
    name: "Bamba Sekou",
    email: "s.bamba@dealtoo.ci",
    phone: "+225 01 02 03 04 05",
    role: "ADMINISTRATEUR",
    isAvailable: false,
    lastLoginDate: "03/08/2026",
    lastLoginTime: "18:20",
    moderatedCount: 310,
  },
  {
    id: "COM-04",
    name: "Yao Patricia",
    email: "p.yao@dealtoo.ci",
    phone: "+225 07 44 55 66 77",
    role: "COMMERCIAL",
    isAvailable: true,
    lastLoginDate: "04/08/2026",
    lastLoginTime: "09:05",
    moderatedCount: 65,
  },
];

export default function CommerciauxPage() {
  const [commerciaux, setCommerciaux] = useState<CommercialData[]>(MOCK_COMMERCIAUX);
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);

  // Basculer le rôle d'un commercial (Retrait/Attribution)
  const handleToggleRole = (id: string) => {
    setCommerciaux((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newRole = item.role === "ADMINISTRATEUR" ? "COMMERCIAL" : "ADMINISTRATEUR";
          return { ...item, role: newRole };
        }
        return item;
      })
    );
  };

  // Basculer l'état de disponibilité
  const handleToggleAvailability = (id: string) => {
    setCommerciaux((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const displayedList = filterAvailableOnly
    ? commerciaux.filter((c) => c.isAvailable)
    : commerciaux;

  const availableCount = commerciaux.filter((c) => c.isAvailable).length;

  return (
    <div className="space-y-6">
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Équipe commerciale & Support
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gérez les rôles, suivez les activités et la disponibilité en temps réel.
          </p>
        </div>

        {/* Filtre rapide */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              filterAvailableOnly
                ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Uniquement disponibles ({availableCount})</span>
          </button>
        </div>
      </div>

      {/* Résumé des statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Équipe</p>
            <p className="text-lg font-bold text-slate-900">{commerciaux.length} membres</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Actuellement disponibles</p>
            <p className="text-lg font-bold text-slate-900">{availableCount} agents</p>
          </div>
        </div>
      </div>

      {/* Grille de cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedList.map((item) => (
          <CommercialCard
            key={item.id}
            commercial={item}
            onToggleRole={handleToggleRole}
            onToggleAvailability={handleToggleAvailability}
          />
        ))}
      </div>
    </div>
  );
}