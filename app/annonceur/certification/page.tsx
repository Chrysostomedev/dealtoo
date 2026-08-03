"use client";

import React from "react";
import { ShieldCheck, Upload, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function CertificationPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-6 text-[#FF6600]" />
          <h1 className="text-2xl font-black text-slate-900">Badge & Certification Vendeur</h1>
        </div>
        <p className="text-xs text-slate-500">
          Les comptes certifiés reçoivent 4x plus de contacts sur Dealtoo et inspirent 95% de confiance supplémentaire aux acheteurs.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Documents Requis pour Entreprises (Côte d'Ivoire)</h2>

          <div className="space-y-3">
            {[
              { title: "Pièce d'Identité du Gérant (CNI / Passeport)", status: "Validé", verified: true },
              { title: "Registre du Commerce (RCCM)", status: "Validé", verified: true },
              { title: "Déclaration Fiscale d'Existence (DFE)", status: "En cours d'examen", verified: false },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-800">{doc.title}</span>
                </div>
                {doc.verified ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={14} /> {doc.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Clock size={14} /> {doc.status}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#FF6600] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600">
              <Upload size={16} /> Téléverser un nouveau document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}