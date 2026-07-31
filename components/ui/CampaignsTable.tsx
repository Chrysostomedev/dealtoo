"use client";

import { Play, Pause, ExternalLink, Volume2, FileText } from "lucide-react";

type Campaign = {
  id: string;
  name: string;
  type: "Spot Radio" | "Sponsor Émission" | "Bannière Web";
  program: string;
  startDate: string;
  endDate: string;
  status: "active" | "paused" | "completed";
  budget: string;
  diffusions: number;
};

const CAMPAIGNS: Campaign[] = [
  {
    id: "CAMP-001",
    name: "Campagne Crédit Scolaire 2026",
    type: "Spot Radio",
    program: "La Matinale Grâce & Vérité",
    startDate: "01/07/2026",
    endDate: "31/08/2026",
    status: "active",
    budget: "2 500 000 FCFA",
    diffusions: 142,
  },
  {
    id: "CAMP-002",
    name: "Sponsoring Rubrique Éco",
    type: "Sponsor Émission",
    program: "Carrefour Entreprises",
    startDate: "15/05/2026",
    endDate: "15/10/2026",
    status: "active",
    budget: "4 800 000 FCFA",
    diffusions: 88,
  },
  {
    id: "CAMP-003",
    name: "Offre Digital Banking - App SIB",
    type: "Bannière Web",
    program: "Site Web RGE & App Mobile",
    startDate: "10/06/2026",
    endDate: "10/07/2026",
    status: "completed",
    budget: "950 000 FCFA",
    diffusions: 45000,
  },
  {
    id: "CAMP-004",
    name: "Promo Épargne Rentrée",
    type: "Spot Radio",
    program: "Soirée Espoir & Louange",
    startDate: "01/08/2026",
    endDate: "15/09/2026",
    status: "paused",
    budget: "1 200 000 FCFA",
    diffusions: 0,
  },
];

export default function CampaignsTable() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-[#163A2C]/[0.08] shadow-[0_10px_30px_-15px_rgba(22,58,44,0.05)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-black text-[#163A2C] text-base">Vos Campagnes Publicitaires</h3>
          <p className="text-xs text-[#163A2C]/50 font-medium mt-0.5">Suivi en direct des diffusions antenne et web</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#FBF6EA] border border-[#163A2C]/10 text-[#163A2C] font-extrabold text-xs hover:bg-[#F0A93E]/20 transition">
          Exporter le Rapport (PDF)
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#163A2C]/[0.08] text-[10px] font-black uppercase tracking-wider text-[#163A2C]/40">
              <th className="pb-3 px-3">Nom / Référence</th>
              <th className="pb-3 px-3">Format</th>
              <th className="pb-3 px-3">Programme Cible</th>
              <th className="pb-3 px-3">Statut</th>
              <th className="pb-3 px-3">Volume Diffusé</th>
              <th className="pb-3 px-3">Budget Eng.</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#163A2C]/[0.04] text-xs font-bold text-[#163A2C]">
            {CAMPAIGNS.map((c) => (
              <tr key={c.id} className="hover:bg-[#FBF6EA]/50 transition-colors">
                <td className="py-4 px-3">
                  <p className="font-extrabold text-sm text-[#163A2C]">{c.name}</p>
                  <p className="text-[10px] text-[#163A2C]/40 font-mono mt-0.5">{c.id} • Du {c.startDate} au {c.endDate}</p>
                </td>
                <td className="py-4 px-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-[#163A2C] text-[11px]">
                    {c.type === "Spot Radio" && <Volume2 size={12} className="text-[#F0A93E]" />}
                    {c.type}
                  </span>
                </td>
                <td className="py-4 px-3 text-[#163A2C]/70">{c.program}</td>
                <td className="py-4 px-3">
                  {c.status === "active" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                      <Play size={10} fill="currentColor" /> En cours
                    </span>
                  )}
                  {c.status === "paused" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase">
                      <Pause size={10} fill="currentColor" /> En Pause
                    </span>
                  )}
                  {c.status === "completed" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase">
                      Terminé
                    </span>
                  )}
                </td>
                <td className="py-4 px-3 font-mono">
                  {c.diffusions.toLocaleString()} {c.type === "Bannière Web" ? "vues" : "spots"}
                </td>
                <td className="py-4 px-3 font-extrabold text-[#163A2C]">{c.budget}</td>
                <td className="py-4 px-3 text-right">
                  <button className="p-2 rounded-xl hover:bg-[#163A2C] hover:text-white text-[#163A2C]/60 transition" title="Consulter les détails">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}