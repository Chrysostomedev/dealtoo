"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { Wallet, PlusCircle, MinusCircle, AlertCircle } from "lucide-react";

type WalletRow = {
  id: string;
  sellerName: string;
  phone: string;
  balanceCredits: number;
  lastTopup: string;
};

export default function PortefeuillesPage() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRow | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"CREDIT" | "DEBIT">("CREDIT");
  const [amount, setAmount] = useState<number>(100);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const mockWallets: WalletRow[] = [
    { id: "w-1", sellerName: "IvoirTech Store", phone: "+225 0707070707", balanceCredits: 2400, lastTopup: "2026-08-02" },
    { id: "w-2", sellerName: "Akwaba Auto", phone: "+225 0101010101", balanceCredits: 150, lastTopup: "2026-07-28" },
  ];

  const handleOpenAdjust = (wallet: WalletRow, type: "CREDIT" | "DEBIT") => {
    setSelectedWallet(wallet);
    setAdjustmentType(type);
    setAmount(100);
    setReason("");
    setError("");
  };

  const handleConfirmAdjustment = () => {
    if (!reason.trim() || reason.trim().length < 8) {
      setError("Un motif valide (min. 8 caractères) est obligatoire pour générer la trace d'audit Finance.");
      return;
    }
    setSelectedWallet(null);
  };

  const columns: ColumnConfig<WalletRow>[] = [
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
      header: "Solde Actuel",
      key: "balanceCredits",
      render: (_, row) => (
        <span className="font-bold text-slate-900 text-xs px-2.5 py-1 rounded-xl bg-orange-50 text-orange-700 border border-orange-200">
          {row.balanceCredits.toLocaleString("fr-FR")} Crédits
        </span>
      ),
    },
    { header: "Dernière Recharge", key: "lastTopup", render: (_, row) => <span className="text-xs text-slate-500">{row.lastTopup}</span> },
    {
      header: "Ajustement Manuel",
      key: "actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenAdjust(row, "CREDIT")}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
          >
            <PlusCircle size={12} />
            <span>Créditer</span>
          </button>
          <button
            onClick={() => handleOpenAdjust(row, "DEBIT")}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold hover:bg-rose-100 transition-colors"
          >
            <MinusCircle size={12} />
            <span>Débiter</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Portefeuilles Vendeurs & Ajustements"
        subtitle="Consultation des soldes de crédits virtuels et régulation manuelle contrôlée avec piste d'audit obligatoire."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockWallets} />
      </div>

      {/* Modale d'Ajustement Financier */}
      {selectedWallet && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-2xl ${adjustmentType === "CREDIT" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {adjustmentType === "CREDIT" ? "Ajout manuel de crédits" : "Débit exceptionnel"}
                </h3>
                <p className="text-[11px] text-slate-400">{selectedWallet.sellerName}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nombre de crédits</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-1">
                  <span>Motif justificatif (Audit Trail) <span className="text-rose-500">*</span></span>
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => { setReason(e.target.value); setError(""); }}
                  placeholder="Ex: Geste commercial suite au ticket #402, correction d'anomalie de facturation..."
                  className={`w-full text-xs p-3 rounded-2xl bg-slate-50 border ${
                    error ? "border-rose-400 ring-2 ring-rose-500/10" : "border-slate-200"
                  } text-slate-800 focus:outline-none transition-all`}
                />
                {error && <p className="text-[11px] text-rose-500 font-medium mt-1">{error}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                onClick={() => setSelectedWallet(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmAdjustment}
                className={`px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-sm transition-colors ${
                  adjustmentType === "CREDIT" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                Valider l'opération
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}