"use client";

import React, { useState } from "react";
import { Search, Sparkles, Wifi, Users, ShieldCheck } from "lucide-react";
import { UserChatCard, UserChatProps } from "@/components/cards/UserChatCard";

// Mock Data
const MEMBRES_MOCK: Omit<UserChatProps, "onSelectUser">[] = [
  {
    id: "1",
    nom: "Kouassi Tech Store",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150",
    role: "annonceur",
    isOnline: true,
    isFidelis: true,
    ville: "Cocody",
    note: 4.9,
  },
  {
    id: "2",
    nom: "Awa Immobilier",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150",
    role: "annonceur",
    isOnline: true,
    isFidelis: true,
    ville: "Marcory",
    note: 4.8,
  },
  {
    id: "3",
    nom: "Jean-Marc Koffi",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150",
    role: "utilisateur",
    isOnline: true,
    isFidelis: false,
    ville: "Yopougon",
  },
  {
    id: "4",
    nom: "Auto-Exclusive Abidjan",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=150",
    role: "annonceur",
    isOnline: false,
    isFidelis: true,
    ville: "Riviera 3",
    note: 5.0,
  },
  {
    id: "5",
    nom: "Sarah Bamba",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=150",
    role: "utilisateur",
    isOnline: true,
    isFidelis: false,
    ville: "Plateau",
  },
];

export default function EnLigne() {
  const [filterTab, setFilterTab] = useState<"tous" | "en_ligne" | "fidelis">("fidelis");
  const [roleTab, setRoleTab] = useState<"tous" | "annonceur" | "utilisateur">("tous");
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("1");

  // Filtrage dynamique
  const listFiltered = MEMBRES_MOCK.filter((user) => {
    const matchSearch = user.nom.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleTab === "tous" || user.role === roleTab;
    
    if (filterTab === "en_ligne") return matchSearch && matchRole && user.isOnline;
    if (filterTab === "fidelis") return matchSearch && matchRole && user.isFidelis;
    return matchSearch && matchRole;
  });

  const selectedUser = MEMBRES_MOCK.find((u) => u.id === selectedUserId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[80vh]">
        
        {/* PANNEAU GAUCHE : Liste & Filtres */}
        <div className="lg:col-span-5 flex flex-col bg-slate-50/80 rounded-3xl p-4 border border-slate-200/70 shadow-xs backdrop-blur-md">
          
          {/* Header & Tabs Principaux */}
          <div className="mb-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Users className="size-5 text-[#FF6600]" />
                Membres & Chat
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-full text-slate-500 border border-slate-200/60">
                {listFiltered.length} membres
              </span>
            </div>

            {/* Filtres Fidélis / En ligne */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/50 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setFilterTab("fidelis")}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  filterTab === "fidelis"
                    ? "bg-white text-amber-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles className="size-3.5 text-amber-500" />
                Fidélis (Top)
              </button>
              <button
                onClick={() => setFilterTab("en_ligne")}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  filterTab === "en_ligne"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Wifi className="size-3.5 text-emerald-500" />
                En ligne
              </button>
              <button
                onClick={() => setFilterTab("tous")}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  filterTab === "tous"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Tous
              </button>
            </div>

            {/* Barre de Recherche Soft */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un membre ou un annonceur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#FF6600]"
              />
            </div>
          </div>

          {/* Liste des cartes */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {listFiltered.map((user) => (
              <UserChatCard
                key={user.id}
                {...user}
                isSelected={user.id === selectedUserId}
                onSelectUser={(id) => setSelectedUserId(id)}
              />
            ))}
          </div>
        </div>

        {/* PANNEAU DROIT : Fenêtre de Chat Soft */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs">
          {selectedUser ? (
            <>
              {/* Header du Chat */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.nom}
                    className="size-12 rounded-2xl object-cover border border-slate-100"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedUser.nom}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{selectedUser.ville}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-emerald-600 font-medium">Direct Message</span>
                    </div>
                  </div>
                </div>

                {selectedUser.isFidelis && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold">
                    <ShieldCheck className="size-4 text-amber-600" />
                    Annonceur Fidélis Vérifié
                  </div>
                )}
              </div>

              {/* Zone de Messages (Placeholder Soft UI) */}
              <div className="flex-1 my-6 overflow-y-auto space-y-4 flex flex-col justify-center items-center text-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <div className="size-14 rounded-full bg-orange-50 text-[#FF6600] flex items-center justify-center mb-2">
                  <Sparkles className="size-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  Démarrez la conversation avec {selectedUser.nom}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Posez vos questions sur ses annonces ou négociez directement en toute sécurité.
                </p>
              </div>

              {/* Champ d'envoi */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder={`Écrire un message à ${selectedUser.nom}...`}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#FF6600] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  className="px-5 py-3 rounded-2xl bg-[#FF6600] hover:bg-[#e05900] text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20"
                >
                  Envoyer
                </button>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Sélectionnez un membre pour démarrer un échange.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}