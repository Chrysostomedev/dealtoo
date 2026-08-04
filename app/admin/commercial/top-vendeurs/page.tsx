"use client";

import React from "react";
import { Flame, MessageCircle, PhoneCall } from "lucide-react";

const TOP_SELLERS = [
  { id: "TP-01", name: "Konan Guy", phone: "+225 07 11 22 33 44", activeAds: 34, location: "Abidjan, Cocody", status: "Prospect Pro" },
  { id: "TP-02", name: "Diallo & Frères", phone: "+225 05 66 77 88 99", activeAds: 22, location: "Abidjan, Treichville", status: "Particulier Actif" },
  { id: "TP-03", name: "Sangaré Boutique", phone: "+225 01 22 33 44 55", activeAds: 16, location: "Bouaké", status: "Prospect Pro" },
];

export default function TopVendeursPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Top Vendeurs (+10 Annonces)</h1>
        <p className="text-xs text-slate-500 mt-0.5">Utilisateurs à fort volume sans abonnement payant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_SELLERS.map((seller) => (
          <div key={seller.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-100">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{seller.activeAds} Annonces en ligne</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">{seller.status}</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">{seller.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{seller.location}</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">{seller.phone}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
              <a
                href={`tel:${seller.phone}`}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
              <a
                href={`https://wa.me/${seller.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}