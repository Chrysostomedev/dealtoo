"use client";

import React from "react";

interface StatusBadgeProps {
  isOnline: boolean;
  role: "annonceur" | "utilisateur";
}

export function UserStatusBadge({ isOnline, role }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      {/* Badge Rôle */}
      <span
        className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
          role === "annonceur"
            ? "bg-amber-100/80 text-amber-800 border border-amber-200/50"
            : "bg-slate-100 text-slate-600 border border-slate-200/60"
        }`}
      >
        {role === "annonceur" ? "★ Annonceur" : "Membre"}
      </span>

      {/* Pastille En Ligne */}
      {isOnline && (
        <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
          </span>
          En ligne
        </span>
      )}
    </div>
  );
}