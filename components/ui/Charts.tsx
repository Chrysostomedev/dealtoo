"use client";

import React from "react";

// ── 1. COMPOSANT DONUT CHART ──
interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  data: DonutSegment[];
  totalLabel?: string;
}

export function DonutChart({ title, data, totalLabel = "Total" }: DonutChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let accumulatedAngle = 0;

  // Conversion des segments en gradient conique SVG/CSS
  const gradientStops = data.map((segment) => {
    const percentage = (segment.value / total) * 100;
    const start = accumulatedAngle;
    accumulatedAngle += percentage;
    return `${segment.color} ${start}% ${accumulatedAngle}%`;
  }).join(", ");

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_-15px_rgba(22,58,44,0.05)] flex flex-col justify-between">
      <h3 className="text-base font-bold text-[#163A2C] mb-4">{title}</h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-6 my-auto">
        {/* Cercles imbriqués pour créer le Donut */}
        <div className="relative w-40 h-40 shrink-0 rounded-full flex items-center justify-center transition-transform hover:scale-105 duration-300"
             style={{ background: `conic-gradient(${gradientStops})` }}>
          <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-2xl font-black text-[#163A2C]">{total.toLocaleString("fr-FR")}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{totalLabel}</span>
          </div>
        </div>

        {/* Légende détaillée */}
        <div className="w-full space-y-2.5">
          {data.map((item, i) => {
            const pct = Math.round((item.value / total) * 100);
            return (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-600">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#163A2C]">{item.value.toLocaleString("fr-FR")}</span>
                  <span className="text-[10px] text-slate-400 font-medium">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 2. COMPOSANT LINE CHART (COURBE SMOOTH SVG) ──
interface LinePoint {
  label: string;
  value: number;
}

interface LineChartProps {
  title: string;
  subtitle?: string;
  data: LinePoint[];
  isCurrency?: boolean;
}

export function AreaLineChart({ title, subtitle, data, isCurrency = true }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * 500;
    const y = 180 - (d.value / maxValue) * 140;
    return `${x},${y}`;
  }).join(" ");

  const fillPoints = `0,180 ${points} 500,180`;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_-15px_rgba(22,58,44,0.05)] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-base font-bold text-[#163A2C]">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
        </div>
        <span className="text-xs font-bold text-[#F0A93E] bg-[#F0A93E]/10 px-3 py-1 rounded-full">
          2026
        </span>
      </div>

      {/* Rendu Vectoriel SVG de la courbe */}
      <div className="relative w-full h-48">
        <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#163A2C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#163A2C" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Lignes de grille en arrière-plan */}
          <line x1="0" y1="40" x2="500" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1="110" x2="500" y2="110" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1="180" x2="500" y2="180" stroke="#E2E8F0" strokeWidth="1" />

          {/* Remplissage dégradé sous la courbe */}
          <polygon points={fillPoints} fill="url(#areaGradient)" />

          {/* Ligne principale */}
          <polyline fill="none" stroke="#163A2C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={points} />

          {/* Points interactifs */}
          {data.map((d, index) => {
            const x = (index / (data.length - 1)) * 500;
            const y = 180 - (d.value / maxValue) * 140;
            return (
              <g key={index} className="group cursor-pointer">
                <circle cx={x} cy={y} r="6" className="fill-[#F0A93E] stroke-white stroke-2 group-hover:r-8 transition-all" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Axes X (Labels) */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400">
        {data.map((item, idx) => (
          <span key={idx}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}