"use client";

import { use, useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { ShieldAlert, AlertTriangle, Snowflake, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DetailAlertePage({ params }: { params: Promise<{ alerteId: string }> }) {
  const { alerteId } = use(params);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeReason, setFreezeReason] = useState("");
  const [error, setError] = useState("");

  const mockAlerte = {
    id: alerteId,
    sellerName: "Akwaba Auto",
    sellerPhone: "+225 0101010101",
    type: "Clicks répétés (Bot IP)",
    riskScore: 92,
    detectedAt: "04/08/2026 à 10:14",
    details: "142 clics sur la révélation de numéro enregistrés en moins de 3 minutes depuis la même adresse IP.",
  };

  const handleToggleFreeze = () => {
    if (!isFrozen && (!freezeReason.trim() || freezeReason.trim().length < 10)) {
      setError("Un motif explicatif d'au moins 10 caractères est requis pour geler la facturation.");
      return;
    }
    setIsFrozen(!isFrozen);
    setError("");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <Link href="/admin/antifraude" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors">
        <ArrowLeft size={14} className="mr-1" /> Retour aux alertes
      </Link>

      <PageHeader
        title={`Analyse d'Alerte #${alerteId}`}
        subtitle="Examen détaillé du comportement suspect et contrôle du gel de facturation."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Type d'anomalie</span>
              <h3 className="text-base font-bold text-slate-900">{mockAlerte.type}</h3>
            </div>
            <span className="text-sm font-extrabold px-3 py-1 rounded-xl bg-rose-100 text-rose-800">
              Score: {mockAlerte.riskScore}/100
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800">Logs de détection</h4>
            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono leading-relaxed">
              {mockAlerte.details}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Action : Gel temporaire de facturation</h4>
            <p className="text-[11px] text-slate-500">
              Le gel bloque instantanément tout débit automatique sur le portefeuille de ce vendeur le temps de l'investigation.
            </p>

            {!isFrozen && (
              <div className="space-y-1.5">
                <textarea
                  rows={3}
                  value={freezeReason}
                  onChange={(e) => { setFreezeReason(e.target.value); setError(""); }}
                  placeholder="Saisissez le motif de gel (Obligatoire pour traçabilité)..."
                  className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none"
                />
                {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
              </div>
            )}

            <button
              onClick={handleToggleFreeze}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-semibold shadow-sm transition-colors ${
                isFrozen
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }`}
            >
              {isFrozen ? <CheckCircle size={15} /> : <Snowflake size={15} />}
              <span>{isFrozen ? "Dégeler la facturation" : "Geler la facturation"}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 h-fit">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Vendeur Concerné</h3>
          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-900">{mockAlerte.sellerName}</p>
            <p className="text-slate-500 font-mono">{mockAlerte.sellerPhone}</p>
            <p className="text-slate-400 text-[11px]">Détecté le {mockAlerte.detectedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}