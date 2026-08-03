"use client";

import React, { useState } from "react";
import { 
  TrendingUp, Eye, ShoppingBag, MessageSquare, ArrowUpRight, ArrowDownRight, 
  Calendar, Zap, Plus, Award, AlertCircle, Sparkles, Filter, RefreshCw
} from "lucide-react";
import Link from "next/link";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { formatPrix } from "@/lib/utils";

// Mock Data pour le tableau de bord
const kpiStats = [
  {
    title: "Chiffre d'affaires (Mois)",
    value: 2850000,
    unit: "FCFA",
    change: "+18.4%",
    isPositive: true,
    description: "vs 2,408,000 FCFA le mois dernier",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "Vues Totales sur Annonces",
    value: 48920,
    unit: "",
    change: "+12.1%",
    isPositive: true,
    description: "3,420 vues ces dernières 24h",
    icon: Eye,
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Annonces Actives",
    value: 24,
    unit: "/ 30",
    change: "+3 ce mois",
    isPositive: true,
    description: "6 emplacements d'annonces restants",
    icon: ShoppingBag,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Taux de Réponse WhatsApp",
    value: 98.2,
    unit: "%",
    change: "-0.5%",
    isPositive: false,
    description: "Temps moyen de réponse : 8 min",
    icon: MessageSquare,
    color: "from-purple-500 to-violet-700",
  },
];

const mockRecentAnnonces = [
  {
    id: "ann-1",
    titre: "iPhone 15 Pro Max 256GB Naturel Titane",
    description: "État neuf sous blister scellé. Garantie Apple 1 an. Livraison rapide à Abidjan.",
    prix: 780000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    localisation: "Abidjan, Cocody",
    vues: 1420,
    vendeur: "Kouassi Tech Pro",
    note: 4.9,
    nombreAvis: 48,
    planAbonnement: "business" as const,
    negociable: true,
    livraisonGratuite: true,
    certifie: true,
    estBoostee: true,
  },
  {
    id: "ann-2",
    titre: "MacBook Pro M3 Max 36GB RAM 1TB SSD",
    description: "Ordinateur professionnel idéal pour développeurs et designers. Facture disponible.",
    prix: 1950000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    localisation: "Abidjan, Marcory Zone 4",
    vues: 890,
    vendeur: "Kouassi Tech Pro",
    note: 5.0,
    nombreAvis: 19,
    planAbonnement: "business" as const,
    negociable: false,
    livraisonGratuite: true,
    certifie: true,
    estBoostee: false,
  },
  {
    id: "ann-3",
    titre: "PlayStation 5 Slim Édition Digital 1TB",
    description: "Pack avec 2 manettes DualSense gratuites + 3 jeux inclus. Produit original.",
    prix: 345000,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80",
    localisation: "Abidjan, Plateau",
    vues: 2340,
    vendeur: "Kouassi Tech Pro",
    note: 4.7,
    nombreAvis: 31,
    planAbonnement: "business" as const,
    negociable: true,
    livraisonGratuite: false,
    certifie: true,
    estBoostee: true,
  },
];

const recentActivities = [
  { id: 1, type: "lead", message: "Nouveau message WhatsApp reçu pour iPhone 15 Pro", time: "Il y a 4 min", icon: MessageSquare, color: "text-emerald-500 bg-emerald-50" },
  { id: 2, type: "boost", message: "Le boost Gold sur 'MacBook Pro M3' a été activé", time: "Il y a 32 min", icon: Zap, color: "text-amber-500 bg-amber-50" },
  { id: 3, type: "view", message: "Pic de trafic ! 450 vues sur votre boutique en 1h", time: "Il y a 2h", icon: TrendingUp, color: "text-blue-500 bg-blue-50" },
  { id: 4, type: "review", message: "Nouveau commentaire 5 étoiles par Yves N'Guessan", time: "Il y a 5h", icon: Award, color: "text-purple-500 bg-purple-50" },
];

export default function DashboardAnnonceurPage() {
  const [period, setPeriod] = useState("30d");

  return (
    <div className="space-y-8">
      {/* En-tête du Dashboard */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Bienvenue, Kouassi Tech ! 👋
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300">
              <Sparkles className="size-3 text-amber-600" /> Vendeur Pro Business
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Voici les performances récapitulatives de votre boutique Dealtoo aujourd'hui.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setPeriod("7d")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === "7d" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setPeriod("30d")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === "30d" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              30 jours
            </button>
            <button
              onClick={() => setPeriod("1y")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === "1y" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              1 an
            </button>
          </div>

          <Link
            href="/annonceur/annonces/nouvelle"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
          >
            <Plus size={16} />
            <span>Déposer une annonce</span>
          </Link>
        </div>
      </div>

      {/* Grille des Cartes KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-xs`}>
                  <Icon size={18} />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {typeof stat.value === "number" && stat.unit === "FCFA" ? formatPrix(stat.value) : stat.value}
                </span>
                {stat.unit !== "FCFA" && <span className="text-sm font-bold text-slate-600">{stat.unit}</span>}
              </div>

              <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className={`inline-flex items-center gap-1 font-bold ${stat.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
                <span className="text-slate-400 truncate max-w-[140px]">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Principale Graphique & Activités */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Visualisation Trafic / Vues fictive en CSS Barres */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Aperçu du Trafic & Interactions</h2>
              <p className="text-xs text-slate-500">Progression hebdomadaire des vues et clics vers WhatsApp</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#FF6600]"></span> Vues Annonces</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-emerald-500"></span> Clics WhatsApp</span>
            </div>
          </div>

          {/* Représentation Visuelle Chart Barres */}
          <div className="h-64 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {[
              { day: "Lun", vues: 65, clics: 40 },
              { day: "Mar", vues: 85, clics: 55 },
              { day: "Mer", vues: 45, clics: 30 },
              { day: "Jeu", vues: 95, clics: 70 },
              { day: "Ven", vues: 120, clics: 90 },
              { day: "Sam", vues: 150, clics: 110 },
              { day: "Dim", vues: 110, clics: 80 },
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div 
                    style={{ height: `${item.vues}%` }} 
                    className="w-1/2 bg-[#FF6600]/80 rounded-t-sm group-hover:bg-[#FF6600] transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded transition-opacity pointer-events-none">
                      {item.vues * 20}
                    </span>
                  </div>
                  <div 
                    style={{ height: `${item.clics}%` }} 
                    className="w-1/2 bg-emerald-500/80 rounded-t-sm group-hover:bg-emerald-500 transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded transition-opacity pointer-events-none">
                      {item.clics * 10}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Taux de clic (CTR)</span>
              <p className="text-base font-black text-slate-900 mt-1">14.8%</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Temps moyen/page</span>
              <p className="text-base font-black text-slate-900 mt-1">2 min 45s</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Contacts Directs</span>
              <p className="text-base font-black text-emerald-600 mt-1">485 Leads</p>
            </div>
          </div>
        </div>

        {/* Fil d'Activité en Direct */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Activités Récentes</h2>
            <button className="text-xs font-bold text-[#FF6600] hover:underline flex items-center gap-1">
              <RefreshCw size={12} /> Actualiser
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`p-2.5 rounded-xl ${act.color} shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 leading-snug">{act.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <div className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">Offre Pro</span>
                <Zap className="size-4 animate-bounce" />
              </div>
              <p className="text-xs font-medium">Boostez vos annonces pour obtenir jusqu'à 5x plus de visibilité à Abidjan !</p>
              <Link
                href="/annonceur/boosts"
                className="inline-block text-xs font-extrabold bg-white text-slate-900 px-3 py-1.5 rounded-lg shadow-xs hover:bg-slate-100"
              >
                Découvrir les Boosts →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Annonces Populaires avec composant AnnonceCard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">Vos Annonces les Plus Populaires</h2>
            <p className="text-xs text-slate-500">Elles génèrent 80% des contacts de votre boutique ce mois-ci</p>
          </div>
          <Link href="/annonceur/annonces" className="text-xs font-bold text-[#FF6600] hover:underline">
            Voir les 24 annonces →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockRecentAnnonces.map((item) => (
            <AnnonceCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}