"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { ShieldAlert, AlertTriangle, Lock } from "lucide-react";
import Link from "next/link";

type AlertRow = {
  id: string;
  seller: string;
  type: string;
  riskScore: number;
  status: "CRITIQUE" | "ELEVE" | "SUSPECT";
  createdAt: string;
};

export default function AntifraudePage() {
  const mockAlerts: AlertRow[] = [
    { id: "ALT-101", seller: "Akwaba Auto", type: "Clicks répétés (Bot IP)", riskScore: 92, status: "CRITIQUE", createdAt: "Il y a 12 min" },
    { id: "ALT-102", seller: "Boutique Express", type: "Multiple numéros de tel non vérifiés", riskScore: 78, status: "ELEVE", createdAt: "Il y a 45 min" },
  ];

  const columns: ColumnConfig<AlertRow>[] = [
    { header: "Alerte ID", key: "id", render: (_, row) => <span className="font-mono text-xs font-bold text-orange-600">{row.id}</span> },
    { header: "Vendeur Suspect", key: "seller", render: (_, row) => <span className="text-xs font-semibold text-slate-800">{row.seller}</span> },
    { header: "Anomalie Détectée", key: "type", render: (_, row) => <span className="text-xs text-slate-600">{row.type}</span> },
    {
      header: "Score de Risque",
      key: "riskScore",
      render: (_, row) => (
        <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-xl ${
          row.riskScore > 80 ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
        }`}>
          {row.riskScore} / 100
        </span>
      ),
    },
    {
      header: "Action",
      key: "actions",
      render: (_, row) => (
        <Link 
          href={`/admin/administrateur/antifraude/${row.id}`}
          className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold hover:bg-orange-600 transition-colors"
        >
          Analyser & Geler
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Système Antifraude & Surveillance"
        subtitle="Détection en temps réel des comportements suspects et blocage automatisé de la facturation."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockAlerts} />
      </div>
    </div>
  );
}