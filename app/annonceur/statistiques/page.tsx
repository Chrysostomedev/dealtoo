"use client";

import React from "react";
import { 
  BarChart3, PieChart, TrendingUp, Users, Smartphone, Globe, 
  Calendar, Download, ArrowUpRight, Eye, Share2, MousePointerClick, Heart
} from "lucide-react";
import { formatPrix } from "@/lib/utils";

export default function StatistiquesAnnonceurPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Analyse & Rapports d'Audience</h1>
          <p className="text-sm text-slate-500 mt-1">
            Comprenez le comportement des acheteurs et optimisez l'impact de vos annonces sur Dealtoo.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-all">
          <Download size={16} /> Export Rapport PDF
        </button>
      </div>

      {/* Ratios Globaux */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Vues Globales Boutique", value: "142,500", detail: "+24% ce mois", icon: Eye, color: "text-blue-500" },
          { title: "Clics Bouton WhatsApp", value: "12,480", detail: "Taux d'engagement 8.7%", icon: MousePointerClick, color: "text-emerald-500" },
          { title: "Ajouts aux Favoris", value: "3,890", detail: "Portée organique", icon: Heart, color: "text-rose-500" },
          { title: "Partages sur Réseaux", value: "1,420", detail: "Facebook & WhatsApp", icon: Share2, color: "text-purple-500" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{item.title}</span>
                <Icon className={`size-5 ${item.color}`} />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-3">{item.value}</p>
              <span className="text-xs font-semibold text-emerald-600 mt-2 block">{item.detail}</span>
            </div>
          );
        })}
      </div>

      {/* Cartographie de l'Audience par Commune */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top Communes */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Origine Géographique des Acheteurs</h2>
              <p className="text-xs text-slate-500">Répartition du trafic par zone géographique</p>
            </div>
            <Globe className="size-5 text-slate-400" />
          </div>

          <div className="space-y-4">
            {[
              { location: "Abidjan - Cocody / Deux-Plateaux", percent: 42, count: "59,850 vues" },
              { location: "Abidjan - Marcory Zone 4", percent: 28, count: "39,900 vues" },
              { location: "Abidjan - Yopougon", percent: 15, count: "21,375 vues" },
              { location: "Yamoussoukro", percent: 9, count: "12,825 vues" },
              { location: "Bouaké & San-Pédro", percent: 6, count: "8,550 vues" },
            ].map((loc, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{loc.location}</span>
                  <span>{loc.percent}% ({loc.count})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6600] to-amber-500"
                    style={{ width: `${loc.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition Appareils */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Appareils Utilisés</h2>
              <p className="text-xs text-slate-500">Types de terminaux des visiteurs sur vos annonces</p>
            </div>
            <Smartphone className="size-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-2">
              <span className="text-xs font-bold text-slate-500">Mobiles (iOS / Android)</span>
              <p className="text-3xl font-black text-[#FF6600]">88.5%</p>
              <span className="text-[10px] text-slate-400">126,110 consultations</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-2">
              <span className="text-xs font-bold text-slate-500">Ordinateurs & Tablettes</span>
              <p className="text-3xl font-black text-slate-700">11.5%</p>
              <span className="text-[10px] text-slate-400">16,390 consultations</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            💡 <strong>Conseil Pro :</strong> 88% de vos acheteurs vous consultent sur mobile. Assurez-vous de poster des photos claires et bien cadrées au format vertical !
          </div>
        </div>
      </div>
    </div>
  );
}