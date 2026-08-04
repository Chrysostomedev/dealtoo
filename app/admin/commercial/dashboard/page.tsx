"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import StatsCard from "@/components/admin/cards/StatsCard";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { Headphones, AlertTriangle, CheckCircle2 } from "lucide-react";

type ReclamationRow = {
  id: string;
  sellerName: string;
  type: string;
  status: "OUVERT" | "EN_COURS" | "RESOLU";
  date: string;
};

export default function CommercialDashboard() {
  const mockReclamations: ReclamationRow[] = [
    { id: "REC-401", sellerName: "Kouassi Electronics", type: "Contestation Débit WhatsApp", status: "OUVERT", date: "Il y a 15 min" },
    { id: "REC-398", sellerName: "ImmoIvoire SARL", type: "Explication Solde Crédits", status: "EN_COURS", date: "Il y a 2 heures" },
  ];

  const columns: ColumnConfig<ReclamationRow>[] = [
    { header: "N° Ticket", key: "id", render: (_, row) => <span className="font-mono text-xs font-bold text-teal-700">{row.id}</span> },
    { header: "Vendeur", key: "sellerName", render: (_, row) => <span className="text-xs font-semibold text-slate-800">{row.sellerName}</span> },
    { header: "Motif réclamation", key: "type", render: (_, row) => <span className="text-xs text-slate-600">{row.type}</span> },
    {
      header: "Statut",
      key: "status",
      render: (_, row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          row.status === "OUVERT" ? "bg-amber-100 text-amber-800" : "bg-teal-100 text-teal-800"
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      key: "actions",
      render: (_, row) => (
        <button className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] hover:bg-teal-700 transition-colors">
          Traiter
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Espace Commercial & Support"
        subtitle="Traitement des réclamations vendeurs, explications de débits et consultation en lecture seule des portefeuilles."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatsCard label="Réclamations Ouvertes" value="8" delta="À traiter" trend="neutral" href="/admin/reclamations" />
        <StatsCard label="Incidents Débits Expliqués" value="42 ce mois" delta="+15%" trend="up" href="/admin/incidents" />
        <StatsCard label="Temps Réponse Moyen" value="18 min" delta="-4 min" trend="up" href="/admin/reclamations" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Dernières demandes de support enregistrées</h3>
        <DataTable columns={columns} data={mockReclamations} />
      </div>
    </div>
  );
}