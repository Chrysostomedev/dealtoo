"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, MapPin } from "lucide-react";
import { UserStatusBadge } from "../ui/UserStatusBadge";

export interface UserChatProps {
  id: string;
  nom: string;
  avatar: string;
  role: "annonceur" | "utilisateur";
  isOnline: boolean;
  isFidelis: boolean; // Badge Fidélité / VIP
  ville?: string;
  note?: number;
  derniereActivite?: string;
  onSelectUser: (id: string) => void;
  isSelected?: boolean;
}

export function UserChatCard({
  id,
  nom,
  avatar,
  role,
  isOnline,
  isFidelis,
  ville,
  note,
  derniereActivite,
  onSelectUser,
  isSelected,
}: UserChatProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelectUser(id)}
      className={`relative flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border ${
        isSelected
          ? "bg-white border-[#FF6600]/40 shadow-[0_8px_20px_-6px_rgba(255,102,0,0.12)]"
          : "bg-white/60 hover:bg-white border-slate-100 hover:border-slate-200/80 shadow-2xs"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar avec contour Soft Glow si Fidélis */}
        <div className="relative shrink-0">
          <img
            src={avatar}
            alt={nom}
            className={`size-11 rounded-2xl object-cover border ${
              isFidelis ? "ring-2 ring-amber-400/80 border-white" : "border-slate-100"
            }`}
          />
          {/* Badge Fidélis Icon */}
          {isFidelis && (
            <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow-xs">
              <Star className="size-2.5 fill-white" />
            </div>
          )}
        </div>

        {/* Détails Utilisateur */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="text-xs font-bold text-slate-800 truncate">{nom}</h4>
          </div>

          <div className="flex items-center gap-2">
            <UserStatusBadge isOnline={isOnline} role={role} />
            {ville && (
              <span className="text-[11px] text-slate-400 flex items-center gap-0.5 truncate">
                <MapPin className="size-3 shrink-0" />
                {ville}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action rapide Chat */}
      <div className="flex items-center gap-2 shrink-0">
        {note && (
          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200/40">
            ★ {note.toFixed(1)}
          </span>
        )}
        <button
          type="button"
          className="size-8 rounded-xl bg-slate-50 hover:bg-[#FF6600]/10 hover:text-[#FF6600] text-slate-400 flex items-center justify-center transition-colors"
        >
          <MessageSquare className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}