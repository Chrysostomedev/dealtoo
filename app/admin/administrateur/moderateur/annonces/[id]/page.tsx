"use client";

import { use, useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { CheckCircle2, XCircle, ShieldAlert, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function DetailModerationAnnoncePage({ params }: { params: Promise<{ annonceId: string }> }) {
  const { annonceId } = use(params);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [error, setError] = useState("");

  const mockAd = {
    id: annonceId,
    ref: "DLT-9001",
    title: "Terrain 500m² Songon Documenté",
    sellerName: "Kouadio Immobilier",
    category: "Immobilier",
    price: 12000000,
    description: "Superbe terrain constructible avec ACD en bordure de voie principale à Songon.",
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim() || rejectReason.trim().length < 10) {
      setError("Le motif de rejet est OBLIGATOIRE et doit comporter au moins 10 caractères.");
      return;
    }
    // Simulation rejet réussi
  };

  return (
    <div className="max-w-4xl space-y-8">
      <Link href="/admin/moderation/annonces" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors">
        <ArrowLeft size={14} className="mr-1" /> Retour à la file
      </Link>

      <PageHeader
        title={`Examen Annonce #${mockAd.ref}`}
        subtitle="Validation manuelle du contenu avant publication sur DEALTOO."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">{mockAd.title}</h3>
            <span className="inline-block px-3 py-1 rounded-xl bg-orange-50 text-orange-700 text-xs font-bold">
              {mockAd.price.toLocaleString("fr-FR")} FCFA
            </span>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {mockAd.description}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-800">Visuels Soumis (3)</h4>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 h-fit">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Décision de Modération</h3>

          {!showRejectForm ? (
            <div className="space-y-3">
              <button className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center space-x-1.5">
                <CheckCircle2 size={15} />
                <span>Valider l'annonce</span>
              </button>
              <button
                onClick={() => setShowRejectForm(true)}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center justify-center space-x-1.5"
              >
                <XCircle size={15} />
                <span>Rejeter avec motif</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 block">
                Motif du rejet <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => { setRejectReason(e.target.value); setError(""); }}
                placeholder="Expliquez clairement la raison du rejet..."
                className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none"
              />
              {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setShowRejectForm(false)}
                  className="w-1/2 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="w-1/2 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm"
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}