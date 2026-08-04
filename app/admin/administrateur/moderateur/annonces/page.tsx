"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { AlertCircle, CheckCircle2, XCircle, Eye } from "lucide-react";

type AdItem = {
  id: string;
  ref: string;
  title: string;
  seller: string;
  category: string;
  submittedAt: string;
};

export default function ModerationPage() {
  const [selectedAd, setSelectedAd] = useState<AdItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [error, setError] = useState("");

  const mockQueue: AdItem[] = [
    { id: "ad-101", ref: "DLT-9001", title: "Terrain 500m² Songon Documenté", seller: "Kouadio Immobilier", category: "Immobilier", submittedAt: "Il y a 10 min" },
    { id: "ad-102", ref: "DLT-9002", title: "PlayStation 5 avec 2 Manettes", seller: "Gamer Store", category: "High-Tech", submittedAt: "Il y a 25 min" },
  ];

  const handleOpenReject = (ad: AdItem) => {
    setSelectedAd(ad);
    setRejectReason("");
    setError("");
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim() || rejectReason.trim().length < 10) {
      setError("Le motif est OBLIGATOIRE et doit comporter au moins 10 caractères pour la notification.");
      return;
    }
    // Logic d'envoi API mockée
    setIsRejectModalOpen(false);
  };

  const columns: ColumnConfig<AdItem>[] = [
    {
      header: "Référence & Titre",
      key: "title",
      render: (_, row) => (
        <div>
          <span className="text-[11px] font-mono text-orange-600 font-bold">#{row.ref}</span>
          <span className="font-semibold text-slate-900 text-xs block">{row.title}</span>
        </div>
      ),
    },
    { header: "Vendeur", key: "seller", render: (_, row) => <span className="text-xs text-slate-600">{row.seller}</span> },
    { header: "Catégorie", key: "category", render: (_, row) => <span className="text-xs text-slate-500">{row.category}</span> },
    { header: "Soumis", key: "submittedAt", render: (_, row) => <span className="text-xs text-slate-400">{row.submittedAt}</span> },
    {
      header: "Actions Modération",
      key: "actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700 transition-colors">
            Valider
          </button>
          <button
            onClick={() => handleOpenReject(row)}
            className="px-3 py-1 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-medium hover:bg-rose-100 transition-colors"
          >
            Rejeter
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="File de Modération des Annonces"
        subtitle="Examen préalable des annonces soumises. Tout rejet exige la saisie d'un motif clair notifié au vendeur."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockQueue} />
      </div>

      {/* Modale Rejet avec Motif Obligatoire Visuellement Mis en Avant */}
      {isRejectModalOpen && selectedAd && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertCircle size={20} />
              <h3 className="font-bold text-slate-900 text-base">Rejeter l'annonce #{selectedAd.ref}</h3>
            </div>
            <p className="text-xs text-slate-500">
              Veuillez spécifier la raison précise du rejet. Ce texte sera directement envoyé au vendeur par notification.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Motif du rejet <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-400 font-normal">Requis</span>
              </label>
              <textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => { setRejectReason(e.target.value); setError(""); }}
                placeholder="Ex: Photos floues, catégorie inappropriée ou prix non conforme aux règles DEALTOO..."
                className={`w-full text-xs p-3 rounded-2xl bg-slate-50 border ${
                  error ? "border-rose-400 ring-2 ring-rose-500/10" : "border-slate-200"
                } text-slate-800 focus:outline-none focus:border-slate-400 transition-all`}
              />
              {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm"
              >
                Confirmer le rejet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}