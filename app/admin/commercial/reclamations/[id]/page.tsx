"use client";

import { use, useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DetailReclamationPage({ params }: { params: Promise<{ reclamationId: string }> }) {
  const { reclamationId } = use(params);
  const [reply, setReply] = useState("");

  return (
    <div className="max-w-3xl space-y-8">
      <Link href="/admin/reclamations" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors">
        <ArrowLeft size={14} className="mr-1" /> Retour aux tickets
      </Link>

      <PageHeader
        title={`Ticket #${reclamationId} — Contestation Débit`}
        subtitle="Échange direct avec le vendeur Kouassi Electronics."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-900">
              <span>Kouassi Electronics (Vendeur)</span>
              <span className="text-[10px] text-slate-400 font-normal">10:15</span>
            </div>
            <p className="text-xs text-slate-600">
              Bonjour, j'ai été débité de 8 crédits pour un message WhatsApp mais je n'ai reçu aucun appel du client.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <label className="text-xs font-bold text-slate-800">Réponse Commerciale / Support</label>
          <textarea
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Rédigez votre explication ou confirmation de régularisation..."
            className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none"
          />
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-1.5 shadow-sm">
              <Send size={14} />
              <span>Envoyer la réponse</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}