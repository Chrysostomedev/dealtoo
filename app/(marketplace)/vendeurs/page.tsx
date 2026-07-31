"use client";

import React, { useState } from "react";
import { ShieldCheck, Search } from "lucide-react";
import { VendeurCard, VendeurProps } from "@/components/cards/VendeurCard";

const vendeursExemples: VendeurProps[] = [
  {
    id: "1",
    nom: "TechMarket Abidjan",
    type: "Boutique",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    banniere: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
    certifie: true,
    topVendeur: true,
    note: 4.9,
    nombreAvis: 128,
    localisation: "Cocody, Abidjan",
    membreDepuis: "2022",
    totalVentes: 340,
    tauxReponse: "< 15 min",
    categories: ["Informatique", "Smartphones"],
    produitsApercu: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200",
    ],
  },
  {
    id: "2",
    nom: "Koffi Construction & Design",
    type: "Entreprise",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    banniere: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=600",
    certifie: true,
    topVendeur: false,
    note: 4.8,
    nombreAvis: 95,
    localisation: "Marcory, Abidjan",
    membreDepuis: "2021",
    totalVentes: 180,
    tauxReponse: "< 1 heure",
    categories: ["BTP", "Architecture"],
    produitsApercu: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200",
    ],
  },
  {
    id: "3",
    nom: "Awa Mode & Luxe",
    type: "Boutique",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    banniere: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600",
    certifie: true,
    topVendeur: true,
    note: 5.0,
    nombreAvis: 210,
    localisation: "Plateau, Abidjan",
    membreDepuis: "2023",
    totalVentes: 520,
    tauxReponse: "< 5 min",
    categories: ["Mode", "Accessoires"],
    produitsApercu: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=200",
    ],
  },
];

export default function NosVendeursPage() {
  const [recherche, setRecherche] = useState("");
  const [filtreType, setFiltreType] = useState<string>("Tous");

  const vendeursFiltres = vendeursExemples.filter((v) => {
    const matchType = filtreType === "Tous" || v.type === filtreType;
    const matchSearch = v.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-20">
      <section className="relative overflow-hidden bg-white border-b border-slate-200/60 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6600]/10 text-[#FF6600] text-xs font-bold mb-4">
              <ShieldCheck className="size-4" /> Marketplace Vérifiée
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Nos Vendeurs & <span className="text-[#FF6600]">Annonceurs Certifiés</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Découvrez des professionnels et boutiques vérifiés avec soin.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 p-2 bg-slate-50/90 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex-1 flex items-center gap-2 px-3 bg-white rounded-xl border border-slate-200/60">
              <Search className="size-4 text-slate-400" />
              <input
                type="text"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Rechercher un vendeur, une boutique..."
                className="w-full py-2.5 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {["Tous", "Boutique", "Entreprise", "Indépendant"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFiltreType(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filtreType === type
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendeursFiltres.map((v) => (
            <VendeurCard key={v.id} vendedor={v} />
          ))}
        </div>
      </section>
    </div>
  );
}