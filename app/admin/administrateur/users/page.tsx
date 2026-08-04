"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import StatsCard from "@/components/admin/cards/StatsCard";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { CheckCircle2, XCircle, Shield, MoreVertical, Search, Filter } from "lucide-react";
import Link from "next/link";

type UserRow = {
  id: string;
  name: string;
  phone: string;
  isPhoneVerified: boolean;
  role: "CLIENT" | "COMMERCIAL" | "ADMINISTRATEUR";
  walletBalance: number;
  createdAt: string;
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const mockUsers: UserRow[] = [
    { id: "usr-1", name: "Kouamé Jean", phone: "+225 0708091011", isPhoneVerified: true, role: "CLIENT", walletBalance: 4500, createdAt: "2026-07-12" },
    { id: "usr-2", name: "Awa Touré", phone: "+225 0504030201", isPhoneVerified: true, role: "COMMERCIAL", walletBalance: 0, createdAt: "2026-06-01" },
    { id: "usr-3", name: "Bamba Lassina", phone: "+225 0102030405", isPhoneVerified: false, role: "CLIENT", walletBalance: 1200, createdAt: "2026-08-01" },
  ];

  const columns: ColumnConfig<UserRow>[] = [
    {
      header: "Utilisateur",
      key: "name",
      render: (_, row) => (
        <div>
          <span className="font-semibold text-slate-900 text-xs block">{row.name}</span>
          <span className="text-[11px] text-slate-400 font-mono">{row.id}</span>
        </div>
      ),
    },
    {
      header: "Téléphone & OTP",
      key: "phone",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-600 font-mono">{row.phone}</span>
          {row.isPhoneVerified ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 size={10} className="mr-1" /> Vérifié
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <XCircle size={10} className="mr-1" /> En attente
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Rôle",
      key: "role",
      render: (_, row) => (
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
          row.role === "ADMINISTRATEUR" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
          row.role === "COMMERCIAL" ? "bg-teal-50 text-teal-700 border-teal-200" :
          "bg-slate-100 text-slate-700 border-slate-200"
        }`}>
          {row.role}
        </span>
      ),
    },
    {
      header: "Solde Crédits",
      key: "walletBalance",
      render: (_, row) => (
        <span className="font-semibold text-slate-900 text-xs">
          {row.walletBalance.toLocaleString("fr-FR")} Crédits
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Link
            href={`/admin/administrateur/users/${row.id}`}
            className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-medium hover:bg-orange-600 transition-colors"
          >
            Fiche
          </Link>
          <Link
            href={`/admin/administrateur/users/${row.id}/roles`}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors"
            title="Modifier le rôle"
          >
            <Shield size={14} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestion des Comptes & Rôles"
        subtitle="Supervision des comptes utilisateurs, statuts de vérification téléphonique et attribution des permissions."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatsCard label="Comptes Inscrits" value="12,840" delta="+12%" trend="up" href="/admin/users" />
        <StatsCard label="Taux Vérification Tel" value="89.4%" delta="+2.1%" trend="up" href="/admin/users/verification" />
        <StatsCard label="Comptes Commerciaux" value="14" delta="Actifs" trend="neutral" href="/admin/users" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, téléphone, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Filter size={14} className="text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
            >
              <option value="ALL">Tous les rôles</option>
              <option value="CLIENT">Clients</option>
              <option value="COMMERCIAL">Commerciaux</option>
              <option value="ADMINISTRATEUR">Administrateurs</option>
            </select>
          </div>
        </div>

        <DataTable columns={columns} data={mockUsers} />
      </div>
    </div>
  );
}