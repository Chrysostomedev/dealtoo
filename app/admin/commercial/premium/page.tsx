"use client";

import React, { useState } from "react";
import { Crown, Mail, Phone, ExternalLink } from "lucide-react";

interface PremiumUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: "PREMIUM PRO" | "BOOST VIP";
  adsCount: number;
  assignedAgent: string;
}

const PREMIUM_USERS: PremiumUser[] = [
  { id: "USR-01", name: "Kouassi Electronics", email: "contact@kouassi-elec.ci", phone: "+225 07 00 11 22 33", plan: "PREMIUM PRO", adsCount: 28, assignedAgent: "Kouassi Jean-Marc" },
  { id: "USR-02", name: "Auto Abidjan Direct", email: "vente@autoabidjan.ci", phone: "+225 05 44 33 22 11", plan: "BOOST VIP", adsCount: 45, assignedAgent: "Awa Touré" },
  { id: "USR-03", name: "Immobilier Lagunaire", email: "patrimoine@lagune.ci", phone: "+225 01 99 88 77 66", plan: "PREMIUM PRO", adsCount: 19, assignedAgent: "Non assigné" },
];

export default function AbonnePremiumPage() {
  const [users] = useState<PremiumUser[]>(PREMIUM_USERS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Abonnés Premium & Entreprises</h1>
        <p className="text-xs text-slate-500 mt-0.5">Contacts commerciaux prioritaires à accompagner.</p>
      </div>

      {/* DataTable */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Vendeur / Entreprise</th>
                <th className="p-4">Plan Actif</th>
                <th className="p-4">Annonces actives</th>
                <th className="p-4">Commercial Assigné</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{u.name}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{u.email}</span>
                      <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{u.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 w-max">
                      <Crown className="w-3 h-3 text-amber-500" />
                      <span>{u.plan}</span>
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">{u.adsCount} annonces</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${u.assignedAgent === "Non assigné" ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-700"}`}>
                      {u.assignedAgent}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}