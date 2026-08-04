"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { HelpCircle, FileText } from "lucide-react";

type IncidentRow = {
  id: string;
  seller: string;
  action: string;
  creditsDebited: number;
  timestamp: string;
};

export default function IncidentsPage() {
  const mockIncidents: IncidentRow[] = [
    { id: "INC-901", seller: "Kouassi Electronics", action: "Clic WhatsApp (Annonce #DLT-8941)", creditsDebited: 8, timestamp: "04/08/2026 10:42" },
    { id: "INC-902", seller: "ImmoIvoire SARL", action: "Affichage Téléphone (Annonce #DLT-8940)", creditsDebited: 5, timestamp: "04/08/2026 09:15" },
  ];

  const columns: ColumnConfig<IncidentRow>[] = [
    { header: "Réf Débit", key: "id", render: (_, row) => <span className="font-mono text-xs font-bold text-teal-700">{row.id}</span> },
    { header: "Vendeur", key: "seller", render: (_, row) => <span className="text-xs font-semibold text-slate-800">{row.seller}</span> },
    { header: "Action Génératrice", key: "action", render: (_, row) => <span className="text-xs text-slate-600">{row.action}</span> },
    { header: "Crédits Débités", key: "creditsDebited", render: (_, row) => <span className="text-xs font-bold text-rose-600">-{row.creditsDebited} Crédits</span> },
    { header: "Horodatage", key: "timestamp", render: (_, row) => <span className="text-xs text-slate-400">{row.timestamp}</span> },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Explication des Débits & Traces d'Interactions"
        subtitle="Historique précis des débits automatiques du portefeuille vendeur pour résolution de litiges."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockIncidents} />
      </div>
    </div>
  );
}