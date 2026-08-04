"use client";

import React from "react";
import { 
  User, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Briefcase 
} from "lucide-react";

export interface CommercialData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "COMMERCIAL" | "ADMINISTRATEUR";
  isAvailable: boolean;
  lastLoginDate: string;
  lastLoginTime: string;
  moderatedCount: number;
}

interface CommercialCardProps {
  commercial: CommercialData;
  onToggleRole: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

export default function CommercialCard({
  commercial,
  onToggleRole,
  onToggleAvailability,
}: CommercialCardProps) {
  const isAdmin = commercial.role === "ADMINISTRATEUR";

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
      {/* En-tête de la carte : Statut & Rôle */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onToggleAvailability(commercial.id)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
              commercial.isAvailable
                ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {commercial.isAvailable ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Disponible</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Occupé / Indisponible</span>
              </>
            )}
          </button>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              isAdmin
                ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                : "bg-amber-50 text-amber-700 border-amber-100"
            }`}
          >
            {commercial.role}
          </span>
        </div>

        {/* Profil de l'agent */}
        <div className="flex items-start space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
            {commercial.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {commercial.name}
            </h3>
            <p className="text-[11px] text-slate-400 truncate">{commercial.email}</p>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
              {commercial.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Métriques & Dernière connexion */}
      <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center space-x-1.5 text-[11px] text-slate-500">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>Annonces modérées</span>
          </span>
          <span className="font-bold text-slate-900">{commercial.moderatedCount}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/60">
          <span className="flex items-center space-x-1.5 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Dernière connexion</span>
          </span>
          <span className="font-medium text-[11px] text-slate-700">
            {commercial.lastLoginDate} à {commercial.lastLoginTime}
          </span>
        </div>
      </div>

      {/* Actions / Gestion du rôle */}
      <div className="pt-1">
        <button
          onClick={() => onToggleRole(commercial.id)}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
            isAdmin
              ? "bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100"
              : "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100"
          }`}
        >
          {isAdmin ? (
            <>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Retirer le rôle Admin</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Promouvoir Admin</span>
            </> 
          )}
        </button>
      </div>
    </div>
  );
}