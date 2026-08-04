"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import AdminCard from "@/components/admin/ui/AdminCard";
import { ShieldCheck, Award, Calendar, Search, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";

type Advertiser = {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  yearsActive: number;
  adsCount: number;
  currentBadges: string[];
};

export default function BadgesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("senior_2yr");

  // Simulation des annonceurs avec calcul d'ancienneté
  const advertisers: Advertiser[] = [
    {
      id: "usr_101",
      name: "Kouassi Électronique",
      email: "contact@kouassi-elec.ci",
      registrationDate: "12/05/2024",
      yearsActive: 2,
      adsCount: 42,
      currentBadges: ["Vendeur Vérifié"],
    },
    {
      id: "usr_102",
      name: "Auto Immobilier Abidjan",
      email: "info@autoimmo.ci",
      registrationDate: "01/02/2023",
      yearsActive: 3,
      adsCount: 120,
      currentBadges: ["Vendeur Vérifié", "Top Vendeur"],
    },
    {
      id: "usr_103",
      name: "Boutique Fashion Plateau",
      email: "fashion@plateau.ci",
      registrationDate: "10/11/2025",
      yearsActive: 0,
      adsCount: 15,
      currentBadges: [],
    },
  ];

  const filteredAdvertisers = advertisers.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestion des Badges & Certifications"
        subtitle="Attribution manuelle et automatisée des distinctions d'ancienneté et de confiance."
      />

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Award size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Badges « 2 ans d'Ancienneté »</span>
            <h4 className="text-lg font-bold text-slate-900">128 Accordés</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldCheck size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Comptes Certifiés</span>
            <h4 className="text-lg font-bold text-slate-900">450 Annonceurs</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Éligibles ce mois</span>
            <h4 className="text-lg font-bold text-slate-900">14 Annonceurs</h4>
          </div>
        </div>
      </div>

      {/* Moteur d'attribution */}
      <AdminCard
        title="Attribution Rapide aux Annonceurs Éligibles"
        subtitle="Sélectionnez un badge et appliquez-le aux comptes remplissant les critères."
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un annonceur par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={selectedBadge}
            onChange={(e) => setSelectedBadge(e.target.value)}
            className="w-full md:w-64 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-orange-500 bg-white"
          >
            <option value="senior_2yr">Badge 🎗️ 2 Ans d'Ancienneté</option>
            <option value="verified_pro">Badge ✅ Vendeur Pro Certifié</option>
            <option value="top_seller">Badge ⭐ Top Vendeur DEALTOO</option>
          </select>
        </div>

        {/* Table des résultats */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-2">Annonceur</th>
                <th className="py-3 px-2">Inscription</th>
                <th className="py-3 px-2">Ancienneté</th>
                <th className="py-3 px-2">Badges Actuels</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredAdvertisers.map((adv) => {
                const isEligible2Yr = adv.yearsActive >= 2;
                const has2YrBadge = adv.currentBadges.includes("2 Ans d'Ancienneté");

                return (
                  <tr key={adv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-2 font-semibold text-slate-800">
                      <div>{adv.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{adv.email}</div>
                    </td>
                    <td className="py-3 px-2 text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{adv.registrationDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-lg text-[10px] ${
                          isEligible2Yr ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {adv.yearsActive} ans
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex flex-wrap gap-1">
                        {adv.currentBadges.length > 0 ? (
                          adv.currentBadges.map((b, i) => (
                            <span key={i} className="bg-orange-50 text-orange-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-orange-100">
                              {b}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Aucun</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      {has2YrBadge ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold text-[11px]">
                          <CheckCircle2 size={14} /> <span>Badge Attribué</span>
                        </span>
                      ) : (
                        <button
                          disabled={selectedBadge === "senior_2yr" && !isEligible2Yr}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                            selectedBadge === "senior_2yr" && !isEligible2Yr
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : "bg-orange-500 text-white hover:bg-orange-600 shadow-xs"
                          }`}
                        >
                          Accorder le Badge
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}