"use client";

import React from "react";
import VisitorLineChart from "@/components/charts/VisitorLineChart";
import BandChartCard from "@/components/charts/BandChartCard";
import { Eye, Smartphone, Globe, TrendingUp } from "lucide-react";

const YEAR_DATA = [
  { label: "Jan", value: 45 },
  { label: "Fév", value: 266 },
  { label: "Mar", value: 215 },
  { label: "Avr", value: 250 },
  { label: "Mai", value: 740 },
  { label: "Juin", value: 95 },
  { label: "Juil", value: 115 },
  { label: "Août", value: 180 },
  { label: "Sep", value: 310 },
  { label: "Oct", value: 420 },
  { label: "Nov", value: 580 },
  { label: "Déc", value: 890 },
];

const COUNTRY_DATA = [
  { code: "CI", country: "Côte d'Ivoire", flag: "🇨🇮", visits: 18450, percentage: 65 },
  { code: "SN", country: "Sénégal", flag: "🇸🇳", visits: 4200, percentage: 15 },
  { code: "BF", country: "Burkina Faso", flag: "🇧🇫", visits: 2800, percentage: 10 },
  { code: "FR", country: "France", flag: "🇫🇷", visits: 1950, percentage: 7 },
  { code: "OTHER", country: "Autres pays", flag: "🌍", visits: 850, percentage: 3 },
];

export default function VisiteursGlobalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900">Évolution globale du trafic</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-orange-50 text-orange-600"><Eye className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Visites</p>
            <p className="text-lg font-bold text-slate-900">28,250</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600"><Globe className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Pages Vues / session</p>
            <p className="text-lg font-bold text-slate-900">4.2</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600"><Smartphone className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Trafic Mobile</p>
            <p className="text-lg font-bold text-slate-900">78.4%</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600"><TrendingUp className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Croissance</p>
            <p className="text-lg font-bold text-slate-900">+14.2%</p>
          </div>
        </div>
      </div>

      <VisitorLineChart title="Évolution des visites mensuelles (Web & Mobile)" data={YEAR_DATA} />
      <BandChartCard title="Répartition globale par pays d'origine" data={COUNTRY_DATA} />
    </div>
  );
}