"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import Link from "next/link";

type Reclamation = {
  id: string;
  sellerName: string;
  subject: string;
  priority: "HAUTE" | "NORMALE";
  status: "OUVERT" | "EN_COURS" | "RESOLU";
  createdAt: string;
};

export default function ReclamationsPage() {
  const mockReclamations: Reclamation[] = [
    { id: "REC-401", sellerName: "Kouassi Electronics", subject: "Contestation Débit WhatsApp", priority: "HAUTE", status: "OUVERT", createdAt: "Il y a 15 min" },
    { id: "REC-398", sellerName: "ImmoIvoire SARL", subject: "Explication Solde Crédits", priority: "NORMALE", status: "EN_COURS", createdAt: "Il y a 2h" },
  ];

  const columns: ColumnConfig<Reclamation>[] = [
    { header: "Ticket", key: "id", render: (_, row) => <span className="font-mono text-xs font-bold text-teal-700">{row.id}</span> },
    { header: "Vendeur", key: "sellerName", render: (_, row) => <span className="text-xs font-semibold text-slate-800">{row.sellerName}</span> },
    { header: "Sujet", key: "subject", render: (_, row) => <span className="text-xs text-slate-600">{row.subject}</span> },
    {
      header: "Priorité",
      key: "priority",
      render: (_, row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${row.priority === "HAUTE" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}>
          {row.priority}
        </span>
      ),
    },
    {
      header: "Action",
      key: "actions",
      render: (_, row) => (
        <Link href={`/admin/reclamations/${row.id}`} className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-medium hover:bg-teal-700 transition-colors">
          Traiter le ticket
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestion des Réclamations Vendeurs"
        subtitle="Espace de résolution des litiges de facturation et demandes d'assistance."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockReclamations} />
      </div>
    </div>
  );
}