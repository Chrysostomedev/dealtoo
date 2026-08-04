"use client";

import React from "react";
import { Receipt, Search, Filter, Download, CheckCircle, XCircle } from "lucide-react";
import { formatPrix } from "@/lib/utils";

const transactionsMock = [
  { id: "TRX-901", client: "Comptant (Client Passage)", total: 780000, mode: "Wave", caissier: "Kouassi V.", date: "14:22", status: "completed" },
  { id: "TRX-902", client: "Koffi Yves", total: 165000, mode: "Espèces", caissier: "Kouassi V.", date: "13:45", status: "completed" },
  { id: "TRX-903", client: "Awa Diallo", total: 36000, mode: "Orange Money", caissier: "Jean M.", date: "11:10", status: "cancelled" },
];

export default function POSEnregistrementsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Journal des Ventes & Transactions</h1>
          <p className="text-sm text-slate-500 mt-1">Historique complet des encaissements effectués au point de vente.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold">
          <Download size={16} /> Exporter Journal (Excel)
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
              <th className="py-3.5 px-4">Réf Transaction</th>
              <th className="py-3.5 px-4">Client</th>
              <th className="py-3.5 px-4">Montant Total</th>
              <th className="py-3.5 px-4">Mode de Paiement</th>
              <th className="py-3.5 px-4">Caissier</th>
              <th className="py-3.5 px-4">Heure</th>
              <th className="py-3.5 px-4 text-right">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {transactionsMock.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">{t.id}</td>
                <td className="py-3 px-4 text-slate-700">{t.client}</td>
                <td className="py-3 px-4 font-black text-slate-900">{formatPrix(t.total)}</td>
                <td className="py-3 px-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">{t.mode}</span></td>
                <td className="py-3 px-4 text-slate-600">{t.caissier}</td>
                <td className="py-3 px-4 text-slate-400">{t.date}</td>
                <td className="py-3 px-4 text-right">
                  {t.status === "completed" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle size={14} /> Validé</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 font-bold"><XCircle size={14} /> Annulé</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}