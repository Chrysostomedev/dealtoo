"use client";

import React from "react";
import BandChartCard from "@/components/charts/BandChartCard";

const DETAILED_COUNTRY = [
  { code: "CI", country: "Côte d'Ivoire (Abidjan, Bouaké, San-Pédro)", flag: "🇨🇮", visits: 18450, percentage: 65 },
  { code: "SN", country: "Sénégal (Dakar, Thies)", flag: "🇸🇳", visits: 4200, percentage: 15 },
  { code: "BF", country: "Burkina Faso (Ouagadougou)", flag: "🇧🇫", visits: 2800, percentage: 10 },
  { code: "FR", country: "France (Paris, Lyon)", flag: "🇫🇷", visits: 1950, percentage: 7 },
  { code: "CM", country: "Cameroun (Douala)", flag: "🇨🇲", visits: 500, percentage: 2 },
  { code: "TG", country: "Togo (Lomé)", flag: "🇹🇬", visits: 350, percentage: 1 },
];

export default function PaysVisiteursPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-extrabold text-slate-900">Analytique géographique détaillée</h1>
      <BandChartCard title="Origine précise des acheteurs & visiteurs" data={DETAILED_COUNTRY} />
    </div>
  );
}