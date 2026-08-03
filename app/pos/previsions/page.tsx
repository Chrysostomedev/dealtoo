"use client";

import React from "react";
import { TrendingUp, Sparkles, AlertTriangle, ArrowUpRight, BarChart3 } from "lucide-react";
import { formatPrix } from "@/lib/utils";

export default function POSPrevisionsPage() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-amber-400" />
          <h1 className="text-2xl font-black">Prévisions IA & Intelligence Stock</h1>
        </div>
        <p className="text-xs text-slate-300">
          Analyse prédictive des ruptures de stock à venir et recommandations de réapprovisionnement pour votre boutique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alerte Rupture Imminente */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" /> Alerte Rupture sous 7 jours
          </h2>

          <div className="space-y-3">
            {[
              { product: "iPhone 15 Pro Max 256GB", stockActuel: 4, venteMoyenne: "2.1 unités/jour", joursRestants: 2 },
              { product: "Écouteurs AirPods Pro 2", stockActuel: 5, venteMoyenne: "1.8 unités/jour", joursRestants: 3 },
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{p.product}</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Vitesse de vente : {p.venteMoyenne}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-amber-900">{p.joursRestants} jours restants</span>
                  <span className="block text-[10px] text-amber-700">Stock actuel : {p.stockActuel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estimation CA Mois Suivant */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="size-5 text-emerald-500" /> Prédiction Chiffre d'Affaires
          </h2>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">CA Estimé Mois Prochain</span>
            <p className="text-3xl font-black text-emerald-900">{formatPrix(3450000)}</p>
            <p className="text-xs font-medium text-emerald-800">
              Sur la base des ventes historiques du mois dernier (+14.2% de croissance prévue).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}