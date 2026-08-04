"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import { Check, Zap, Film, Edit3, Gift, Star } from "lucide-react";
import Link from "next/link";

/**
 * Structure de données pour la gestion d'un forfait d'abonnement DEALTOO
 */
type Forfait = {
  id: string;
  name: string;
  priceFcfa: number;
  creditsPerMonth: number;
  adsLimit: number;
  photosPerAd: number;
  flashQuota: number;
  capsuleQuota: number;
  badgeStyle: string; // Styles CSS Tailwind pour le badge
  isRecommended?: boolean; // Indicateur pour la mise en avant du forfait Business
};

export default function ForfaitsPage() {
  // Liste des forfaits avec les montants réels issus de la plateforme
  const forfaits: Forfait[] = [
    {
      id: "gratuit",
      name: "Gratuit",
      priceFcfa: 0,
      creditsPerMonth: 0,
      adsLimit: 2,
      photosPerAd: 3,
      flashQuota: 0,
      capsuleQuota: 0,
      badgeStyle: "bg-[#1E88E5] text-white", // Bleu
    },
    {
      id: "starter",
      name: "Starter",
      priceFcfa: 1000,
      creditsPerMonth: 50,
      adsLimit: 5,
      photosPerAd: 5,
      flashQuota: 1,
      capsuleQuota: 0,
      badgeStyle: "bg-[#00897B] text-white", // Teal
    },
    {
      id: "business",
      name: "Business",
      priceFcfa: 2000,
      creditsPerMonth: 200,
      adsLimit: 15,
      photosPerAd: 8,
      flashQuota: 5,
      capsuleQuota: 2,
      badgeStyle: "bg-[#FB8C00] text-white", // Orange
      isRecommended: true, // Forfait mis en avant par défaut
    },
    {
      id: "business-pro",
      name: "Business Pro",
      priceFcfa: 5000,
      creditsPerMonth: 800,
      adsLimit: 50,
      photosPerAd: 15,
      flashQuota: 15,
      capsuleQuota: 8,
      badgeStyle: "bg-[#8E24AA] text-white", // Violet
    },
  ];

  return (
    <div className="space-y-8">
      {/* En-tête de la page avec action rapide */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Grille des Formules & Quotas"
          subtitle="Paramétrage dynamique des offres d'abonnement et de la dotation initiale de bienvenue."
        />
        
        {/* Lien de redirection vers la configuration de la dotation globale */}
        <Link
          href="/admin/administrateur/forfaits/dotation-starter"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Gift size={15} />
          <span>Configurer Dotation Starter</span>
        </Link>
      </div>

      {/* Grille responsive affichant les 4 forfaits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forfaits.map((f) => (
          <div
            key={f.id}
            className={`relative bg-white rounded-3xl border transition-all duration-200 p-6 flex flex-col justify-between space-y-6 ${
              f.isRecommended
                ? "border-orange-400 shadow-md ring-1 ring-orange-400/30"
                : "border-slate-100 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Ruban 'Recommandé' pour le forfait Business */}
            {f.isRecommended && (
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Star size={10} className="fill-white" /> Recommandé
              </div>
            )}

            <div>
              {/* Entête de la carte : Badge & Bouton édition */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-extrabold px-4 py-1.5 rounded-xl shadow-xs ${f.badgeStyle}`}>
                  {f.name}
                </span>
                <Link
                  href={`/admin/administrateur/forfaits/${f.id}/edit`}
                  className="p-1.5 text-slate-400 hover:text-orange-600 transition-colors rounded-lg hover:bg-slate-50"
                  title="Modifier ce forfait"
                >
                  <Edit3 size={16} />
                </Link>
              </div>

              {/* Tarification FCFA */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {f.priceFcfa === 0 ? "0 F CFA" : `${f.priceFcfa.toLocaleString("fr-FR")} FCFA`}
                  </span>
                  {f.priceFcfa > 0 && (
                    <span className="text-xs text-slate-400 font-medium">/ mois</span>
                  )}
                </div>
              </div>

              {/* Inclusions et quotas du forfait */}
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>
                    <strong>{f.creditsPerMonth}</strong> crédits virtuels / mois
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>
                    <strong>{f.adsLimit}</strong> annonces simultanées
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>
                    <strong>{f.photosPerAd}</strong> photos par annonce
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Zap size={14} className="text-amber-500 shrink-0" />
                  <span>
                    <strong>{f.flashQuota}</strong> Ventes Flash incluses
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Film size={14} className="text-indigo-500 shrink-0" />
                  <span>
                    <strong>{f.capsuleQuota}</strong> Capsules Vidéo offertes
                  </span>
                </li>
              </ul>
            </div>

            {/* Action principale d'édition des paramètres */}
            <Link
              href={`/admin/administrateur/forfaits/${f.id}/edit`}
              className={`w-full py-2.5 rounded-xl text-center text-xs font-semibold transition-all duration-200 ${
                f.isRecommended
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              Modifier les quotas
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}