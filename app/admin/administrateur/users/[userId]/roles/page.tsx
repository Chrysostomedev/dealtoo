"use client";

import { use, useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { Shield, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserRolePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("CLIENT");

  const roles = [
    { id: "CLIENT", name: "Client / Vendeur", desc: "Accès standard au marketplace, publication d'annonces et achat de crédits." },
    { id: "COMMERCIAL", name: "Commercial / Support", desc: "Accès à la gestion des réclamations et consultation en lecture seule des portefeuilles." },
    { id: "ADMINISTRATEUR", name: "Administrateur Global", desc: "Accès complet : contrôle financier, modération, tarification et paramètres." },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader
        title={`Attribution du Rôle — #${userId}`}
        subtitle="Sélectionnez les privilèges d'accès pour ce compte."
      />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
        {roles.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelectedRole(r.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedRole === r.id ? "border-orange-500 bg-orange-50/30 ring-2 ring-orange-500/10" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">{r.name}</p>
              <p className="text-[11px] text-slate-500">{r.desc}</p>
            </div>
            {selectedRole === r.id && (
              <div className="p-1 rounded-full bg-orange-600 text-white">
                <Check size={14} />
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 flex justify-end space-x-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => router.push(`/admin/users/${userId}`)}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-sm"
          >
            Enregistrer le rôle
          </button>
        </div>
      </div>
    </div>
  );
}