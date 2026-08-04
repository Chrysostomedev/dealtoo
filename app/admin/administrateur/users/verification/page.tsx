"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import { CheckCircle2, Clock, Smartphone } from "lucide-react";

type VerificationRow = {
  id: string;
  name: string;
  phone: string;
  attemptsCount: number;
  status: "VERIFIE" | "EN_ATTENTE";
  lastOtpSentAt: string;
};

export default function PhoneVerificationPage() {
  const mockVerifs: VerificationRow[] = [
    { id: "usr-1", name: "Kouamé Jean", phone: "+225 0708091011", attemptsCount: 1, status: "VERIFIE", lastOtpSentAt: "04/08/2026 10:00" },
    { id: "usr-3", name: "Bamba Lassina", phone: "+225 0102030405", attemptsCount: 3, status: "EN_ATTENTE", lastOtpSentAt: "04/08/2026 11:05" },
  ];

  const columns: ColumnConfig<VerificationRow>[] = [
    { header: "Utilisateur", key: "name", render: (_, row) => <span className="text-xs font-semibold text-slate-900">{row.name}</span> },
    { header: "Numéro de Tél", key: "phone", render: (_, row) => <span className="text-xs font-mono text-slate-600">{row.phone}</span> },
    { header: "Essais OTP", key: "attemptsCount", render: (_, row) => <span className="text-xs text-slate-500">{row.attemptsCount} envoi(s)</span> },
    {
      header: "Statut OTP",
      key: "status",
      render: (_, row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          row.status === "VERIFIE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
        }`}>
          {row.status === "VERIFIE" ? <CheckCircle2 size={10} className="mr-1" /> : <Clock size={10} className="mr-1" />}
          {row.status}
        </span>
      ),
    },
    { header: "Dernier Envoi", key: "lastOtpSentAt", render: (_, row) => <span className="text-xs text-slate-400">{row.lastOtpSentAt}</span> },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Suivi de la Vérification Téléphonique OTP"
        subtitle="Journal d'envoi et de validation des codes SMS de sécurité."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <DataTable columns={columns} data={mockVerifs} />
      </div>
    </div>
  );
}