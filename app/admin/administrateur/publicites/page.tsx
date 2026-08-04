"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import AdminCard from "@/components/admin/ui/AdminCard";
import { Sliders, ToggleLeft, ToggleRight, DollarSign, ExternalLink, Image as ImageIcon } from "lucide-react";

type AdSlot = {
  id: string;
  locationName: string;
  dimensions: string;
  pricePerDayFcfa: number;
  activeCampaigns: number;
  isAvailable: boolean;
};

export default function PublicitesPage() {
  const [slots, setSlots] = useState<AdSlot[]>([
    { id: "slot_home_hero", locationName: "Bannière Principale Accueil", dimensions: "1200x300 px", pricePerDayFcfa: 10000, activeCampaigns: 2, isAvailable: true },
    { id: "slot_category_top", locationName: "Encart Haut de Catégorie", dimensions: "800x200 px", pricePerDayFcfa: 5000, activeCampaigns: 1, isAvailable: true },
    { id: "slot_sidebar_detail", locationName: "Sidebar Fiche Annonce", dimensions: "300x600 px", pricePerDayFcfa: 3500, activeCampaigns: 0, isAvailable: false },
  ]);

  const toggleSlotStatus = (id: string) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, isAvailable: !s.isAvailable } : s)));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Configuration des Publicités & Bannières"
        subtitle="Paramétrage des emplacements sponsorisés, des dimensions et de la grille tarifaire publicitaire."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <AdminCard key={slot.id} className="relative">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <ImageIcon size={18} />
              </span>
              <button onClick={() => toggleSlotStatus(slot.id)} className="text-slate-400 hover:text-slate-800 transition-colors">
                {slot.isAvailable ? <ToggleRight size={28} className="text-emerald-500" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-extrabold text-slate-900">{slot.locationName}</h4>
              <p className="text-[10px] font-mono text-slate-400">Dimensions : {slot.dimensions}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-[11px] font-medium">Prix / Jour</span>
                <span className="font-black text-slate-900">{slot.priceFcfa?.toLocaleString("fr-FR") ?? slot.pricePerDayFcfa.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-[11px] font-medium">Campagnes actives</span>
                <span className="font-bold text-orange-600">{slot.activeCampaigns}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${slot.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {slot.isAvailable ? "Ouvert aux réservations" : "Masqué"}
              </span>
              <button className="p-1 text-slate-400 hover:text-slate-800 transition-colors">
                <Sliders size={15} />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}