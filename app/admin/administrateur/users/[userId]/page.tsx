"use client";

import { use } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { CheckCircle2, Shield, Wallet, Smartphone, History, Edit3 } from "lucide-react";
import Link from "next/link";

export default function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);

  const mockUser = {
    id: userId,
    name: "Kouamé Jean",
    phone: "+225 0708091011",
    isPhoneVerified: true,
    role: "CLIENT",
    walletBalance: 4500,
    createdAt: "12 Juillet 2026",
    adsCount: 14,
    lastLogin: "04 Août 2026 - 10:15",
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title={`Compte Utilisateur #${userId}`}
          subtitle="Aperçu global, solde du portefeuille et paramétrage du compte."
        />
        <Link
          href={`/admin/users/${userId}/roles`}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Shield size={15} />
          <span>Modifier le Rôle</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 font-extrabold text-xl flex items-center justify-center">
              KJ
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{mockUser.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{mockUser.id}</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Téléphone</span>
              <span className="font-semibold text-slate-800 font-mono">{mockUser.phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Vérification OTP</span>
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <CheckCircle2 size={12} className="mr-1" /> Vérifié
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Rôle Actuel</span>
              <span className="font-bold text-slate-900 px-2 py-0.5 rounded-lg bg-slate-100">{mockUser.role}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Inscription</span>
              <span className="text-slate-700">{mockUser.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2">
              <div className="flex items-center space-x-2 text-orange-600">
                <Wallet size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Solde Crédits</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{mockUser.walletBalance.toLocaleString("fr-FR")} Crédits</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center space-x-2 text-slate-600">
                <Smartphone size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Annonces Publiées</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{mockUser.adsCount} Annonces</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}