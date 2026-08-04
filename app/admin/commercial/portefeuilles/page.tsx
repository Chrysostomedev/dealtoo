"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { Lock } from "lucide-react";

type WalletReadRow = {
  id: string;
  sellerName: string;
  phone: string;
  balanceCredits: number;
  status: string;
};

export default function CommercialPortefeuillesPage() {
  const mockWallets: WalletReadRow[] = [
    { id: "w-1", sellerName: "IvoirTech Store", phone: "+225 0707070707", balanceCredits: 2400, status: "ACTIF" },
    { id: "w-2", sellerName: "Akwaba Auto", phone: "+225 0101010101", balanceCredits: 150, status: "SOUS_SEUIL" },
  ];

  const columns: ColumnConfig<WalletReadRow>[] = [
    {
      header: "Vendeur",
      key: "sellerName",
      render: (_, row) => (
        <div>
          <span className="font-semibold text-slate-900 text-xs block">{row.sellerName}</span>
          <span className="text-[11px] text-slate-400 font-mono">{row.phone}</span>
        </div>
      ),
    },
    {
      header: "Solde Disponible",
      key: "balanceCredits",
      render: (_, row) => (
        <span className="font-bold text-slate-900 text-xs px-2.5 py-1 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
          {row.balanceCredits.toLocaleString("fr-FR")} Crédits
        </span>
      ),
    },
    {
      header: "Mode d'accès",
      key: "status",
      render: () => (
        <span className="inline-flex items-center text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl">
          <Lock size={12} className="mr-1" /> Lecture Seule
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Consultation des Portefeuilles Vendeurs"
        subtitle="Vue d'information en lecture seule pour l'assistance commerciale."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockWallets} />
      </div>
    </div>
  );
}