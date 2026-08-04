"use client";

import React from "react";
import VisitorLineChart from "@/components/charts/VisitorLineChart";

const WEB_DATA = [
  { label: "Jan", value: 15 }, { label: "Fév", value: 66 }, { label: "Mar", value: 55 },
  { label: "Avr", value: 70 }, { label: "Mai", value: 180 }, { label: "Juin", value: 30 },
  { label: "Juil", value: 40 }, { label: "Août", value: 50 }, { label: "Sep", value: 90 },
  { label: "Oct", value: 110 }, { label: "Nov", value: 140 }, { label: "Déc", value: 210 },
];

const MOBILE_DATA = [
  { label: "Jan", value: 30 }, { label: "Fév", value: 200 }, { label: "Mar", value: 160 },
  { label: "Avr", value: 180 }, { label: "Mai", value: 560 }, { label: "Juin", value: 65 },
  { label: "Juil", value: 75 }, { label: "Août", value: 130 }, { label: "Sep", value: 220 },
  { label: "Oct", value: 310 }, { label: "Nov", value: 440 }, { label: "Déc", value: 680 },
];

export default function PlateformesVisiteursPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-extrabold text-slate-900">Comparatif des plateformes</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorLineChart title="Visites Mobile (Dealtoo mobile)" data={MOBILE_DATA} />
        <VisitorLineChart title="Visites Web (Dealto Web)" data={WEB_DATA} />
      </div>
    </div>
  );
}