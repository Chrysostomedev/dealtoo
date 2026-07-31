"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
} from "lucide-react";
import { formatPrix } from "@/components/cards/ServiceCard";

export default function OffresProfessionnellesPage() {
  const [periode, setPeriode] = useState<"mensuel">("mensuel");

  const plansPro = [
    {
      id: "free",
      nom: "Gratuit",
      tagline: "Idéal pour débuter et booster vos premières ventes",
      prixMensuel: 0,
      // prixAnnuel: 0,
      badge: "Indépendant",
      populaire: false,
      caracteristiques: [
        "Jusqu'à 5 annonces actives",
        "Badge Vendeur Vérifié",
        "Remontée d'annonce (1x/semaine)",
        "Support client standard",
        "Statistiques de vues simples",
      ],
    },
    {
      id: "starter",
      nom: "Pro Starter",
      tagline: "Idéal pour débuter et booster vos premières ventes",
      prixMensuel: 1000,
      // prixAnnuel: 12000,
      badge: "Indépendant",
      populaire: false,
      caracteristiques: [
        "Jusqu'à 15 annonces actives",
        "Badge Vendeur Vérifié",
        "Remontée d'annonce (1x/semaine)",
        "Support client standard",
        "Statistiques de vues simples",
      ],
    },
    {
      id: "business",
      nom: "Pro Business",
      tagline: "Le choix N°1 pour les boutiques et petites entreprises",
      prixMensuel: 2000,
      // prixAnnuel: 28000,
      badge: "Recommandé",
      populaire: true,
      caracteristiques: [
        "Annonces illimitées",
        "Badge Boutique Officielle Certifiée",
        "Boutique personnalisée avec logo & bannière",
        "Bouton WhatsApp direct sur les fiches",
        "Remontées automatiques (3x/semaine)",
        "Statistiques détaillées & Analytics",
        "Support prioritaire 7j/7",
      ],
    },
    {
      id: "pro",
      nom: "Business Pro",
      tagline: "Pour les grandes marques et réseaux de distribution",
      prixMensuel: 5000,
      // prixAnnuel: 60000,
      badge: "Premium",
      populaire: false,
      caracteristiques: [

  
        "1 annonce(s) et badges",
        "Téléphone ",
        " SMS ",
        " WhatsApp ",
        "Accès aux messages ",
        "Capsule(s) vidéo(s) & 0 Flash(s) (6 images)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-24">
      <section className="relative pt-20 pb-16 bg-white border-b border-slate-200/50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold tracking-wide shadow-md mb-6">
            <Crown className="size-4 fill-amber-400" />
            ESPACE ABONNEMENTS PROFESSIONNELS
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Passez au niveau supérieur avec nos <span className="text-[#FF6600]">Offres Pro</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Profitez d'une visibilité maximale, gagnez la confiance de vos clients avec nos badges certifiés.
          </p>

          {/* <div className="mt-10 inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setPeriode("mensuel")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                periode === "mensuel" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Facturation Mensuelle
            </button>
            <button
              onClick={() => setPeriode("mensuel")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                periode === "mensuel" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Facturation Annuelle
              <span className="px-2 py-0.5 rounded-full bg-[#FF6600] text-white text-[10px]">-20%</span>
            </button>
          </div> */}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          {plansPro.map((plan) => {
       const prix = plan.prixMensuel;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  plan.populaire
                    ? "bg-slate-900 text-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] ring-2 ring-[#FF6600]"
                    : "bg-white text-slate-900 shadow-[0_4px_30px_-5px_rgba(0,0,0,0.04)] border border-slate-200/80"
                }`}
              >
                {plan.populaire && (
                  <div className="absolute -top-4 right-8 bg-gradient-to-r from-[#FF6600] to-[#FFC700] text-slate-950 font-black text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    Le plus populaire
                  </div>
                )}

                <div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      plan.populaire
                        ? "bg-white/10 text-amber-300 border border-white/10"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {plan.badge}
                  </span>

                  <h3 className="text-2xl font-bold tracking-tight mt-4">{plan.nom}</h3>
                  <p className={`mt-2 text-xs ${plan.populaire ? "text-slate-300" : "text-slate-500"}`}>
                    {plan.tagline}
                  </p>

                  <div className="my-6 pt-6 border-t border-slate-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight">
                        {formatPrix(prix)}
                      </span>
                      <span className={`text-xs ${plan.populaire ? "text-slate-400" : "text-slate-500"}`}>
                        / mois
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3.5 my-6">
                    {plan.caracteristiques.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs font-medium">
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                            plan.populaire ? "bg-[#FF6600] text-white" : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          <Check className="size-3 stroke-[3]" />
                        </span>
                        <span className={plan.populaire ? "text-slate-200" : "text-slate-700"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                    plan.populaire
                      ? "bg-[#FF6600] text-white hover:bg-[#E55C00] hover:shadow-[0_8px_25px_rgba(255,102,0,0.4)]"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Souscrire maintenant
                  <ArrowRight className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Garanties */}
      <section className="max-w-5xl mx-auto px-4 mt-20">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="size-12 rounded-2xl bg-orange-50 text-[#FF6600] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="size-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Paiement 100% Sécurisé</h4>
            <p className="text-xs text-slate-500 mt-1">Mobile Money (Orange, Wave, MTN) & CB</p>
          </div>
          <div>
            <div className="size-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Zap className="size-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Activation Immédiate</h4>
            <p className="text-xs text-slate-500 mt-1">Avantages débloqués à l'instant</p>
          </div>
          <div>
            <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Award className="size-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Sans Engagement</h4>
            <p className="text-xs text-slate-500 mt-1">Modifiez ou annulez à tout moment</p>
          </div>
        </div>
      </section>
    </div>
  );
}