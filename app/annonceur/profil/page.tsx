"use client";

import React from "react";
import { 
  Building2, MapPin, Phone, Mail, Globe, ShieldCheck, Camera, 
  Save, CheckCircle, Clock, FileText, BadgeCheck
} from "lucide-react";

export default function ProfilBoutiqueAnnonceurPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Cover & Avatar Header */}
      <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Photo de Couverture */}
        <div className="h-48 w-full bg-gradient-to-r from-[#163A2C] via-teal-900 to-slate-900 relative">
          <button className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-xl bg-black/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur hover:bg-black/60">
            <Camera size={14} /> Changer la couverture
          </button>
        </div>

        {/* Profil Content */}
        <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="relative size-24 rounded-2xl bg-white p-1 border-4 border-white shadow-md overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&q=80"
                alt="Logo Vendeur"
                className="size-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">Kouassi Tech Pro</h1>
                <BadgeCheck className="size-5 text-[#FF6600]" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Boutique Électronique Certifiée • Membre depuis 2024</p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-[#FF6600] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600">
            <Save size={16} /> Enregistrer les modifications
          </button>
        </div>
      </div>

      {/* Formulaire de Configuration */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Colonne Gauche: Informations Générales */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Informations sur la Boutique
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nom Commercial</label>
                <input
                  type="text"
                  defaultValue="Kouassi Tech Pro"
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Numéro de Téléphone / WhatsApp</label>
                <input
                  type="text"
                  defaultValue="+225 07 08 09 10 11"
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Adresse Physique / Commune</label>
                <input
                  type="text"
                  defaultValue="Abidjan, Cocody Deux-Plateaux Vallons, Rue des Jardins"
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Description de la Boutique</label>
                <textarea
                  rows={4}
                  defaultValue="Vente de smartphones, ordinateurs portables et accessoires électroniques d'origine garantis 12 mois à Abidjan. Service après-vente disponible."
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite: Statut d'Abonnement & Vérification */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Badge & Niveau de Compte
            </h2>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 uppercase">Plan Business Pro</span>
                <span className="rounded-md bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5">Actif</span>
              </div>
              <p className="text-xs text-amber-800">Votre abonnement est valide jusqu'au 31 Décembre 2026.</p>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center justify-between">
                <span>Vérification d'identité</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle size={14} /> Validée</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Registre du Commerce (RCCM)</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle size={14} /> Conforme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}