"use client";

import React, { useState } from "react";
import { 
  MessageSquare, Search, Send, Phone, MoreVertical, Image, 
  CheckCheck, Clock, UserCheck, ShieldCheck, Tag
} from "lucide-react";
import { formatPrix } from "@/lib/utils";

const conversationsMock = [
  {
    id: "conv-1",
    clientName: "Jean-Marc Koffi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    annonceTitre: "iPhone 15 Pro Max 256GB",
    annoncePrix: 780000,
    dernierMessage: "Est-ce que le prix est négociable à 750.000 FCFA si je viens aujourd'hui ?",
    time: "14:32",
    unread: 2,
    online: true,
  },
  {
    id: "conv-2",
    clientName: "Awa Diallo",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    annonceTitre: "MacBook Pro M3 Max",
    annoncePrix: 1950000,
    dernierMessage: "Merci pour les détails, la livraison à Cocody Angré est possible ?",
    time: "Hier",
    unread: 0,
    online: false,
  },
];

export default function MessagerieAnnonceurPage() {
  const [activeConv, setActiveConv] = useState(conversationsMock[0]);
  const [inputText, setInputText] = useState("");

  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex flex-col md:flex-row rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Liste des conversations (Gauche) */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 space-y-3">
          <h1 className="text-xl font-black text-slate-900">Messages & Contacts</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une discussion..."
              className="w-full rounded-xl bg-white pl-9 pr-4 py-2 text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversationsMock.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveConv(c)}
              className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                activeConv.id === c.id ? "bg-white shadow-xs border-l-4 border-l-[#FF6600]" : "hover:bg-slate-100/60"
              }`}
            >
              <div className="relative shrink-0">
                <img src={c.avatar} alt="" className="size-10 rounded-full object-cover" />
                {c.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-white"></span>}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{c.clientName}</h3>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#FF6600] truncate block">
                  {c.annonceTitre}
                </span>
                <p className="text-xs text-slate-500 line-clamp-1">{c.dernierMessage}</p>
              </div>

              {c.unread > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#FF6600] text-[10px] font-bold text-white">
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Zone de Chat (Droite) */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Chat Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src={activeConv.avatar} alt="" className="size-10 rounded-full object-cover" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">{activeConv.clientName}</h2>
              <span className="text-xs text-emerald-600 font-semibold">● En ligne sur WhatsApp</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/2250700000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
            >
              <Phone size={14} /> WhatsApp Direct
            </a>
          </div>
        </div>

        {/* Produit Concerné (Mini Banner) */}
        <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-xs">
            <Tag className="size-4 text-[#FF6600]" />
            <span className="font-semibold text-slate-600">Discussion à propos de :</span>
            <span className="font-bold text-slate-900">{activeConv.annonceTitre}</span>
          </div>
          <span className="text-xs font-black text-slate-900">{formatPrix(activeConv.annoncePrix)}</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
          <div className="flex justify-start">
            <div className="max-w-md rounded-2xl bg-white p-3.5 border border-slate-200 shadow-2xs space-y-1">
              <p className="text-xs text-slate-800 leading-relaxed">
                Bonjour, est-ce que cet article est toujours disponible dans votre magasin à Marcory ?
              </p>
              <span className="text-[10px] text-slate-400 block text-right">14:28</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-md rounded-2xl bg-[#163A2C] text-white p-3.5 shadow-2xs space-y-1">
              <p className="text-xs leading-relaxed">
                Bonjour ! Oui parfait, le produit est scellé en magasin. Vous pouvez passer le récupérer aujourd'hui.
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-300">
                <span>14:30</span>
                <CheckCheck size={12} />
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-md rounded-2xl bg-white p-3.5 border border-slate-200 shadow-2xs space-y-1">
              <p className="text-xs text-slate-800 leading-relaxed">{activeConv.dernierMessage}</p>
              <span className="text-[10px] text-slate-400 block text-right">{activeConv.time}</span>
            </div>
          </div>
        </div>

        {/* Zone de Saisie */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
              <Image size={20} />
            </button>
            <input
              type="text"
              placeholder="Écrivez votre message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 rounded-xl bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
            />
            <button className="flex size-10 items-center justify-center rounded-xl bg-[#FF6600] text-white shadow-md hover:bg-orange-600 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}