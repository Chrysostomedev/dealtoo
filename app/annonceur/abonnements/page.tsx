"use client";

import React, { useState } from "react";
import { Heart, History, Trash2, Eye, Search, Filter, ArrowUpRight } from "lucide-react";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { formatPrix } from "@/lib/utils";

const mockFavoris = [
  {
    id: "fav-1",
    titre: "Toyota RAV4 VX Automatic 2021",
    description: "Faible kilométrage, premier propriétaire, révisé chez le concessionnaire.",
    prix: 22000000,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
    localisation: "Abidjan, Cocody",
    vues: 3200,
    vendeur: "Auto Ivoire",
    note: 4.8,
    nombreAvis: 24,
    planAbonnement: "business" as const,
    negociable: true,
    livraisonGratuite: false,
    certifie: true,
    estBoostee: true,
  },
  {
    id: "fav-2",
    titre: "Lot de 10 MacBooks M1 Pro pour Entreprise",
    description: "Matériel informatique reconditionné à neuf avec garantie 6 mois.",
    prix: 6500000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    localisation: "Abidjan, Plateau",
    vues: 1400,
    vendeur: "Tech Corp CI",
    note: 4.9,
    nombreAvis: 42,
    planAbonnement: "starter" as const,
    negociable: false,
    livraisonGratuite: true,
    certifie: true,
    estBoostee: false,
  },
];

const mockHistoriqueSearch = [
  { id: 1, query: "iPhone 15 Pro Max 256GB", date: "Aujourd'hui à 11:20", resultats: 45 },
  { id: 2, query: "Terrain avec ACD Angré", date: "Hier à 16:45", resultats: 12 },
  { id: 3, query: "Ecran Gamer 144Hz 27 pouces", date: "24/07/2026", resultats: 89 },
];

export default function FavorisHistoriquePage() {
  const [tab, setTab] = useState<"favoris" | "historique">("favoris");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Favoris & Historique</h1>
          <p className="text-sm text-slate-500 mt-1">
            Consultez les annonces enregistrées et l'historique de vos recherches récentes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setTab("favoris")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === "favoris" ? "bg-white text-[#FF6600] shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Heart size={14} /> Favoris ({mockFavoris.length})
          </button>
          <button
            onClick={() => setTab("historique")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === "historique" ? "bg-white text-[#FF6600] shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <History size={14} /> Historique
          </button>
        </div>
      </div>

      {/* Vue Favoris */}
      {tab === "favoris" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockFavoris.map((item) => (
            <AnnonceCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        /* Vue Historique */
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recherches Récemment Effectuées</h2>
            <button className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
              <Trash2 size={12} /> Effacer tout
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {mockHistoriqueSearch.map((h) => (
              <div key={h.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                    <Search size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{h.query}</p>
                    <span className="text-[10px] text-slate-400">{h.date} • {h.resultats} résultats trouvés</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-[#FF6600] hover:underline">
                  Relancer <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}