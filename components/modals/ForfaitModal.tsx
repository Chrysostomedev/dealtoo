"use client";

import React, { useState } from "react";
import { X, Lock, CheckCircle2, CreditCard, ArrowRight } from "lucide-react";

// --- Types ---
export interface PlanData {
  nom: string;
  prixMensuel: number;
  couleurHex?: string; // Ex: "#FF6600" ou "bg-orange-500"
  populaire?: boolean;
}

interface ForfaitModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanData | null;
}

const DUREES = [
  { mois: 1, remise: 0 },
  { mois: 2, remise: 2 },
  { mois: 3, remise: 4, recommande: true },
  { mois: 4, remise: 6 },
  { mois: 5, remise: 8 },
  { mois: 6, remise: 10 },
];

const MOYENS_PAIEMENT = [
  { id: "wave", nom: "Wave CI", color: "bg-sky-500", text: "text-sky-500" },
  { id: "orange", nom: "Orange Money", color: "bg-orange-500", text: "text-orange-500" },
  { id: "mtn", nom: "MTN MoMo", color: "bg-yellow-400", text: "text-black" },
  { id: "moov", nom: "Moov Money", color: "bg-blue-600", text: "text-blue-600" },
  { id: "card", nom: "Carte Bancaire", icon: CreditCard, color: "bg-slate-800", text: "text-slate-800" },
];

export function ForfaitModal({ isOpen, onClose, plan }: ForfaitModalProps) {
  const [dureeSelectionnee, setDureeSelectionnee] = useState(3);
  const [etape, setEtape] = useState<"details" | "paiement">("details");
  const [methodePaiement, setMethodePaiement] = useState<string>("");
  const [flashMessage, setFlashMessage] = useState(false);

  if (!isOpen || !plan) return null;

  // Calculs dynamiques
  const optionDuree = DUREES.find((d) => d.mois === dureeSelectionnee) || DUREES[2];
  const prixBase = plan.prixMensuel * dureeSelectionnee;
  const montantRemise = (prixBase * optionDuree.remise) / 100;
  const totalAPayer = Math.round(prixBase - montantRemise);

  const primaryColor = plan.couleurHex || "#FF6600";

  const reinitialiserEtFermer = () => {
    setEtape("details");
    setFlashMessage(false);
    setMethodePaiement("");
    onClose();
  };

  const LancerPaiement = () => {
    if (!methodePaiement) return;
    setFlashMessage(true);
    setTimeout(() => {
      // Logique de redirection vers la passerelle de paiement
      reinitialiserEtFermer();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all sm:p-8">
        
        {/* Bouton Fermer */}
        <button
          onClick={reinitialiserEtFermer}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* --- MESSAGE FLASH REDIRECTION --- */}
        {flashMessage ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="mx-auto size-16 text-emerald-500 animate-bounce" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Initialisation du paiement</h3>
            <p className="mt-2 text-sm text-slate-500">
              Vous serez redirigé vers l&apos;interface sécurisée de <span className="font-semibold text-slate-800">{MOYENS_PAIEMENT.find(m => m.id === methodePaiement)?.nom}</span>...
            </p>
          </div>
        ) : etape === "details" ? (
          
          /* ================= STEP 1 : DETAILS FORFAIT ================= */
          <div className="space-y-6">
            <div className="text-center">
              <div 
                className="mx-auto flex size-14 items-center justify-center rounded-full text-white shadow-md mb-3"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="text-2xl font-bold">{plan.nom.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{plan.nom}</h2>
              <span className="mt-1 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                À partir de {plan.prixMensuel.toLocaleString("fr-FR")} F CFA/mois
              </span>
            </div>

            {/* Grille de sélection des durées */}
            <div className="grid grid-cols-3 gap-3">
              {DUREES.map((item) => {
                const isSelected = dureeSelectionnee === item.mois;
                return (
                  <button
                    key={item.mois}
                    type="button"
                    onClick={() => setDureeSelectionnee(item.mois)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-3 border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-transparent text-white shadow-lg scale-105"
                        : "border-slate-100 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                    style={isSelected ? { backgroundColor: primaryColor } : {}}
                  >
                    {item.recommande && (
                      <span className="absolute -top-2.5 rounded-full bg-white px-2 py-0.5 text-[9px] font-black uppercase text-orange-600 shadow-sm border border-orange-200">
                        Recommandé
                      </span>
                    )}
                    <span className="text-sm font-bold">{item.mois} mois</span>
                    {item.remise > 0 && (
                      <span className={`text-[11px] font-medium ${isSelected ? "text-white/90" : "text-slate-400"}`}>
                        -{item.remise}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Récapitulatif Tarifaire */}
            <div className="rounded-2xl bg-slate-50 p-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Prix mensuel</span>
                <span className="font-semibold text-slate-800">{plan.prixMensuel.toLocaleString("fr-FR")} F CFA</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Durée</span>
                <span className="font-semibold text-slate-800">{dureeSelectionnee} mois</span>
              </div>
              {optionDuree.remise > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Remise</span>
                  <span>-{optionDuree.remise}%</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-base">Total à payer</span>
                <span className="text-xl font-extrabold" style={{ color: primaryColor }}>
                  {totalAPayer.toLocaleString("fr-FR")} F CFA
                </span>
              </div>
            </div>

            {/* Bouton de confirmation du choix */}
            <button
              type="button"
              onClick={() => setEtape("paiement")}
              style={{ backgroundColor: primaryColor }}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-lg hover:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Payer {totalAPayer.toLocaleString("fr-FR")} F CFA
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Lock className="size-3.5" />
              <span>Paiement 100% sécurisé</span>
            </div>
          </div>
        ) : (

          /* ================= STEP 2 : CHOIX DU PAIEMENT ================= */
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
            <div>
              <button
                type="button"
                onClick={() => setEtape("details")}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 mb-2 inline-block"
              >
                ← Retour au récapitulatif
              </button>
              <h2 className="text-xl font-extrabold text-slate-900">Mode de paiement</h2>
              <p className="text-xs text-slate-500 mt-1">
                Choisissez votre opérateur pour régler <span className="font-bold text-slate-800">{totalAPayer.toLocaleString("fr-FR")} F CFA</span>
              </p>
            </div>

            {/* Grille des opérateurs */}
            <div className="space-y-2.5">
              {MOYENS_PAIEMENT.map((moyen) => {
                const isSelected = methodePaiement === moyen.id;
                return (
                  <button
                    key={moyen.id}
                    type="button"
                    onClick={() => setMethodePaiement(moyen.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-slate-900 bg-slate-50 shadow-sm"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full ${moyen.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {moyen.icon ? <moyen.icon className="size-4" /> : moyen.nom.charAt(0)}
                      </div>
                      <span className="font-bold text-sm text-slate-800">{moyen.nom}</span>
                    </div>
                    <div className={`size-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-slate-900 bg-slate-900" : "border-slate-300"}`}>
                      {isSelected && <div className="size-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Finaliser */}
            <button
              type="button"
              disabled={!methodePaiement}
              onClick={LancerPaiement}
              style={methodePaiement ? { backgroundColor: primaryColor } : {}}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                methodePaiement ? "opacity-100 shadow-lg cursor-pointer hover:brightness-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Confirmer et Payer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}