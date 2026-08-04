"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import { Settings, Bell, Shield, Database, Save } from "lucide-react";

export default function ParametresPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <PageHeader
        title="Paramètres Globaux Platform"
        subtitle="Configuration technique, passerelles de paiement Orange/MTN/Moov et notifications system."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Settings size={16} className="text-orange-600" />
            <span>Informations Générales DEALTOO</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Nom de l'application</label>
              <input type="text" defaultValue="DEALTOO Côte d'Ivoire" className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email Support Client</label>
              <input type="email" defaultValue="support@dealtoo.ci" className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Shield size={16} className="text-orange-600" />
            <span>Sécurité & Expiration OTP</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Durée de validité Code SMS (secondes)</label>
              <input type="number" defaultValue={300} className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-sm">
            <Save size={15} />
            <span>Sauvegarder les configurations</span>
          </button>
        </div>
      </div>
    </div>
  );
}