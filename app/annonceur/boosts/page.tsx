"use client";

import React, { useState } from "react";
import { 
  Zap, Check, ShieldCheck, Flame, Star, Sparkles, ArrowRight, CreditCard, Rocket
} from "lucide-react";
import { formatPrix } from "@/lib/utils";

const packsBoost = [
  {
    id: "boost-urgent",
    name: "Badge URGENT 7J",
    prix: 2500,
    duree: "7 Jours",
    badgeColor: "bg-red-500",
    features: [
      "Attire 3x plus d'attention",
      "Bandeau rouge distinctif",
      "Apparaît dans le filtre 'Urgent'",
    ],
    popular: false,
  },
  {
    id: "boost-gold",
    name: "Pack GOLD à la Une",
    prix: 15000,
    duree: "14 Jours",
    badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    features: [
      "En tête de catégorie pendant 14j",
      "Diffusion sur la page d'accueil Dealtoo",
      "Relance WhatsApp prioritaire",
      "Notification push acheteurs",
    ],
    popular: true,
  },
  {
    id: "boost-top",
    name: "Remontée Quotidienne",
    prix: 7500,
    duree: "30 Jours",
    badgeColor: "bg-blue-600",
    features: [
      "Annonce remise au top chaque matin",
      "Visibilité constante garantie",
      "Statistiques détaillées de clics",
    ],
    popular: false,
  },
];

export default function BoostsAnnonceurPage() {
  const [selectedPayment, setSelectedPayment] = useState("wave");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 bg-gradient-to-br from-[#163A2C] to-slate-900 text-white p-8 rounded-3xl shadow-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6600] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
          <Flame size={14} /> Booster mes Ventes
        </span>
        <h1 className="text-3xl font-black sm:text-4xl">Multipliez vos Vues par 10 sur Abidjan</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Choisissez un pack de mise en avant et vendez vos articles 5 fois plus vite grâce à nos algorithmes de visibilité prioritaire.
        </p>
      </div>

      {/* Cartes des Packs */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {packsBoost.map((pack) => (
          <div
            key={pack.id}
            className={`relative flex flex-col justify-between rounded-3xl bg-white p-6 border transition-all duration-200 ${
              pack.popular
                ? "border-[#FF6600] shadow-xl ring-2 ring-[#FF6600]/20"
                : "border-slate-200 shadow-xs hover:border-slate-300"
            }`}
          >
            {pack.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF6600] px-4 py-1 text-[10px] font-black uppercase text-white shadow-xs">
                Le Plus Populaire 🔥
              </span>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{pack.name}</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {pack.duree}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{formatPrix(pack.prix)}</span>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                {pack.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Check className="size-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`mt-8 w-full rounded-xl py-3 text-xs font-bold transition-all shadow-md ${
                pack.popular
                  ? "bg-[#FF6600] text-white hover:bg-orange-600"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              Activer ce Boost
            </button>
          </div>
        ))}
      </div>

      {/* Modalité de Paiement Mobile Money Côte d'Ivoire */}
      <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="size-5 text-[#FF6600]" /> Moyen de Paiement Acceptés en Côte d'Ivoire
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { id: "wave", name: "Wave Mobile", color: "bg-sky-500 text-white" },
            { id: "om", name: "Orange Money", color: "bg-orange-500 text-white" },
            { id: "mtn", name: "MTN MoMo", color: "bg-yellow-400 text-slate-900" },
            { id: "card", name: "Carte Visa / Mastercard", color: "bg-slate-900 text-white" },
          ].map((pay) => (
            <button
              key={pay.id}
              onClick={() => setSelectedPayment(pay.id)}
              className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                selectedPayment === pay.id ? "ring-2 ring-[#FF6600] border-transparent" : "border-slate-200"
              } ${pay.color}`}
            >
              {pay.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}