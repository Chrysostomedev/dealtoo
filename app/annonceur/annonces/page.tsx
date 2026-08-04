"use client";

import React, { useState } from "react";
import { 
  Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye, Zap, 
  CheckCircle2, AlertCircle, PauseCircle, ArrowUpDown, Grid, List
} from "lucide-react";
import Link from "next/link";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { formatPrix } from "@/lib/utils";

const mockAnnoncesListe = [
  {
    id: "ann-101",
    titre: "Toyota Land Cruiser Prado V6 2022",
    description: "Km: 45 000 km, Essence, Automatique. Véhicule bien entretenu chez le concessionnaire.",
    prix: 38500000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    localisation: "Abidjan, Cocody Riviera 3",
    vues: 4890,
    vendeur: "Kouassi Tech Pro",
    note: 4.9,
    nombreAvis: 52,
    planAbonnement: "business" as const,
    negociable: true,
    livraisonGratuite: false,
    certifie: true,
    estBoostee: true,
    statut: "active",
    date: "12/05/2026",
  },
  {
    id: "ann-102",
    titre: "Villa Duplex 5 Pièces avec Piscine",
    description: "Superficie 500m2 avec ACD disponible. Quartier sécurisé avec portail automatique.",
    prix: 185000000,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    localisation: "Abidjan, Bingerville",
    vues: 12400,
    vendeur: "Kouassi Tech Pro",
    note: 5.0,
    nombreAvis: 14,
    planAbonnement: "business" as const,
    negociable: false,
    livraisonGratuite: false,
    certifie: true,
    estBoostee: true,
    statut: "active",
    date: "01/06/2026",
  },
  {
    id: "ann-103",
    titre: "Samsung Galaxy S24 Ultra 512GB",
    description: "Couleur Noir Titane. État 10/10. Vendu avec tous les accessoires d'origine.",
    prix: 690000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    localisation: "Abidjan, Yopougon",
    vues: 640,
    vendeur: "Kouassi Tech Pro",
    note: 4.6,
    nombreAvis: 8,
    planAbonnement: "business" as const,
    negociable: true,
    livraisonGratuite: true,
    certifie: true,
    estBoostee: false,
    statut: "en_attente",
    date: "28/07/2026",
  },
  {
    id: "ann-104",
    titre: "Écran Dell UltraSharp 27'' 4K USB-C",
    description: "Moniteur pro pour création graphique et montage vidéo. DCI-P3 98%.",
    prix: 280000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    localisation: "Abidjan, Treichville",
    vues: 310,
    vendeur: "Kouassi Tech Pro",
    note: 4.8,
    nombreAvis: 6,
    planAbonnement: "business" as const,
    negociable: false,
    livraisonGratuite: true,
    certifie: false,
    estBoostee: false,
    statut: "suspendue",
    date: "14/04/2026",
  },
];

export default function AnnoncesGestionPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("tous");

  const filtered = mockAnnoncesListe.filter((item) => {
    const matchSearch = item.titre.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === "tous" || item.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Gestion de mes Annonces</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gérez vos 24 annonces en ligne, suivez la modération et activez des options de visibilité.
          </p>
        </div>

        <Link
          href="/annonceur/publier"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-orange-600 active:scale-95"
        >
          <Plus size={18} />
          <span>Créer une nouvelle annonce</span>
        </Link>
      </div>

      {/* Barre de Filtres et Outils */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs md:flex-row md:items-center md:justify-between">
        {/* Recherche */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par titre ou mot-clé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-slate-50 pl-10 pr-4 py-2 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
          />
        </div>

        {/* Filtres par statut */}
        <div className="flex flex-wrap items-center gap-2">
          {["tous", "active", "en_attente", "suspendue"].map((statut) => (
            <button
              key={statut}
              onClick={() => setFilterStatut(statut)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                filterStatut === statut
                  ? "bg-[#163A2C] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {statut.replace("_", " ")}
            </button>
          ))}

          {/* Switch Grid / Table */}
          <div className="ml-2 flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400"}`}
              title="Mode Grille"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${viewMode === "table" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400"}`}
              title="Mode Liste"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Affichage des Annonces */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="relative group">
              {/* Badge de statut superposé */}
              <div className="absolute right-3 top-3 z-20">
                {item.statut === "active" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    <CheckCircle2 size={12} /> En ligne
                  </span>
                )}
                {item.statut === "en_attente" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    <AlertCircle size={12} /> Modération
                  </span>
                )}
                {item.statut === "suspendue" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    <PauseCircle size={12} /> En pause
                  </span>
                )}
              </div>

              {/* Composant AnnonceCard */}
              <AnnonceCard {...item} />

              {/* Barre d'Actions Rapides sous la carte */}
              <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-white p-2 border border-slate-200 shadow-2xs">
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-100 rounded-lg">
                  <Edit size={13} /> Modifier
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-bold text-amber-600 hover:bg-amber-50 rounded-lg">
                  <Zap size={13} /> Booster
                </button>
                <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vue Tableau */
        <div className="overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                <th className="py-3.5 px-4">Annonce</th>
                <th className="py-3.5 px-4">Prix</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Vues</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="size-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{item.titre}</p>
                        <span className="text-[10px] text-slate-400">{item.localisation}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{formatPrix(item.prix)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.statut === "active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {item.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{item.vues} vues</td>
                  <td className="py-3 px-4 text-slate-400">{item.date}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}