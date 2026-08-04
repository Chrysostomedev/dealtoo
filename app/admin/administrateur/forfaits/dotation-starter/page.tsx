"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import { Gift, Zap, Film, Save } from "lucide-react";

export default function DotationStarterPage() {
  return (
     <div className="space-y-8">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <PageHeader
             title="Grille des Formules & Quotas"
             subtitle="Paramétrage dynamique des offres d'abonnement et de la dotation initiale de bienvenue."
           />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Crédits de bienvenue offerts</label>
            <input type="number" defaultValue={50} className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Limite d'annonces simultanées</label>
            <input type="number" defaultValue={3} className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Nombre de Ventes Flash offertes</label>
            <input type="number" defaultValue={0} className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Capsules Vidéo offertes</label>
            <input type="number" defaultValue={0} className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors shadow-sm">
            <Save size={15} />
            <span>Enregistrer la dotation</span>
          </button>
        </div>
        </div>  
      </div>
    </div>
  );
}