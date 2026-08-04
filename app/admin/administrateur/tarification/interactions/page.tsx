"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import { Phone, MessageSquare, Mail, Sliders, ShieldAlert } from "lucide-react";

export default function TarifsInteractionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Tarification des Interactions & Antifraude"
        subtitle="Définition du coût en crédits par clic ou mise en relation, et seuils de gel automatique."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 text-orange-600">
            <Phone size={20} />
            <h3 className="font-bold text-slate-900 text-sm">Révélation Numéro Tel</h3>
          </div>
          <p className="text-xs text-slate-500">Coût débité du portefeuille vendeur lors du clic client sur "Afficher le numéro".</p>
          <div className="flex items-center space-x-2 pt-2">
            <input type="number" defaultValue={5} className="w-24 text-xs font-bold p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900" />
            <span className="text-xs font-semibold text-slate-600">Crédits / clic</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 text-indigo-600">
            <MessageSquare size={20} />
            <h3 className="font-bold text-slate-900 text-sm">Message WhatsApp Direct</h3>
          </div>
          <p className="text-xs text-slate-500">Mise en relation directe via le canal WhatsApp officiel DEALTOO.</p>
          <div className="flex items-center space-x-2 pt-2">
            <input type="number" defaultValue={8} className="w-24 text-xs font-bold p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900" />
            <span className="text-xs font-semibold text-slate-600">Crédits / envoi</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 text-teal-600">
            <Mail size={20} />
            <h3 className="font-bold text-slate-900 text-sm">Formulaire Message Interne</h3>
          </div>
          <p className="text-xs text-slate-500">Envoi de message via la messagerie de la plateforme.</p>
          <div className="flex items-center space-x-2 pt-2">
            <input type="number" defaultValue={3} className="w-24 text-xs font-bold p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900" />
            <span className="text-xs font-semibold text-slate-600">Crédits / message</span>
          </div>
        </div>
      </div>
    </div>
  );
}