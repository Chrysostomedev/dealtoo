"use client";

import { Megaphone, TrendingUp, Radio, Calendar, Download, Plus, Sparkles, Target, Zap } from "lucide-react";
import StatsCard from "@/components/cards/StatsCard";
import AdvertiserPerformanceChart from "@/components/charts/AdvertiserPerformanceChart";
import SpotDistributionDonut from "@/components/charts/SpotDistributionDonut";
import CampaignsTable from "@/components/ui/CampaignsTable";

export default function AdvertiserDashboardPage() {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* ── Header Principal / Bienvenue ────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#FF5A1F]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Espace Régie Dealtoo × RGE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Performances Publicitaires
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
              Suivez en temps réel la diffusion de vos spots, le taux d'engagement auditeurs et la couverture de vos offres commerciales SIB.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition shadow-sm">
              <Calendar size={16} className="text-[#FF5A1F]" />
              <span>Derniers 30 jours</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FF5A1F] hover:bg-[#E04810] text-white text-xs font-black shadow-lg shadow-[#FF5A1F]/25 transition hover:scale-[1.02] active:scale-[0.98]">
              <Plus size={16} strokeWidth={3} />
              <span>Nouveau Spot</span>
            </button>
          </div>
        </div>

        {/* Mini stats rapides Dealtoo */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F]">
              <Radio size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Station Maîtresse</p>
              <p className="text-xs font-black text-white">Radio Grâce-Espoir FM</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Spots Actifs</p>
              <p className="text-xs font-black text-white">18 diffusions / jour</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Target size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Taux Complétion</p>
              <p className="text-xs font-black text-white">98.4% On-Air</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">CTR Digital</p>
              <p className="text-xs font-black text-white">4.12% (+0.8%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cartes KPIs Principales ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          label="Budget Investi (Global)"
          value={9450000}
          isCurrency
          delta="+12%"
          trend="up"
          tooltip="Cumul des montants engagés sur les campagnes en cours"
        />
        <StatsCard
          label="Auditeurs Touchés (FM + Web)"
          value="188 400"
          delta="+24.5%"
          trend="up"
          tooltip="Nombre unique d'auditeurs ayant écouté vos spots"
        />
        <StatsCard
          label="Passages Antenne Validés"
          value={230}
          delta="+18 spots"
          trend="up"
          tooltip="Passages confirmés par les logs automatiques de régie"
        />
        <StatsCard
          label="Conversion / Clics Web Dealtoo"
          value="14 250"
          delta="-2.1%"
          trend="down"
          tooltip="Redirections générées depuis l'application RGE vers l'offre Dealtoo"
        />
      </div>

      {/* ── Bloc Graphiques (Analytics Dealtoo) ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdvertiserPerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <SpotDistributionDonut />
        </div>
      </div>

      {/* ── Table de gestion des Campagnes ──────────────────────────────── */}
      <CampaignsTable />
    </div>
  );
}