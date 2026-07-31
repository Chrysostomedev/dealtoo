"use client";

import { useState } from "react";

const DATA = [
  { day: "Lun", impressions: 12000, ecoutes: 8500, passages: 14 },
  { day: "Mar", impressions: 19000, ecoutes: 14200, passages: 22 },
  { day: "Mer", impressions: 15000, ecoutes: 11000, passages: 18 },
  { day: "Jeu", impressions: 28000, ecoutes: 21000, passages: 30 },
  { day: "Ven", impressions: 32000, ecoutes: 24500, passages: 36 },
  { day: "Sam", impressions: 45000, ecoutes: 38000, passages: 48 },
  { day: "Dim", impressions: 38000, ecoutes: 29000, passages: 40 },
];

export default function AdvertiserPerformanceChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = 50000;
  const height = 220;
  const width = 600;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index: number) => paddingX + (index * (width - paddingX * 2)) / (DATA.length - 1);
  const getY = (val: number) => height - paddingY - (val / maxVal) * (height - paddingY * 2);

  const pointsImp = DATA.map((d, i) => `${getX(i)},${getY(d.impressions)}`).join(" ");
  const pointsEco = DATA.map((d, i) => `${getX(i)},${getY(d.ecoutes)}`).join(" ");

  const areaImp = `${getX(0)},${height - paddingY} ${pointsImp} ${getX(DATA.length - 1)},${height - paddingY}`;

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#163A2C]/[0.08] shadow-[0_10px_30px_-15px_rgba(22,58,44,0.05)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-black text-[#163A2C] text-base">Impact Radio & Streaming</h3>
          <p className="text-xs text-[#163A2C]/50 font-medium mt-0.5">Volume d'impressions vs Auditeurs uniques captés</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-[#163A2C]">
            <span className="w-3 h-3 rounded-full bg-[#163A2C]" /> Impressions
          </span>
          <span className="flex items-center gap-1.5 text-[#F0A93E]">
            <span className="w-3 h-3 rounded-full bg-[#F0A93E]" /> Écoutes
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
          {/* Lignes de grille horizontal */}
          {[0, 0.33, 0.66, 1].map((ratio, i) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);
            return (
              <g key={i}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#163A2C" strokeOpacity="0.06" strokeDasharray="4 4" />
                <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-[9px] fill-[#163A2C]/40 font-bold">
                  {Math.round((maxVal * ratio) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Surface dégradée */}
          <polygon points={areaImp} fill="url(#gradImp)" opacity="0.15" />

          {/* Courbe Écoutes Uniques */}
          <polyline points={pointsEco} fill="none" stroke="#F0A93E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Courbe Impressions */}
          <polyline points={pointsImp} fill="none" stroke="#163A2C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points interactifs */}
          {DATA.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.impressions);
            const isHovered = hoveredIdx === i;

            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <line x1={cx} y1={paddingY} x2={cx} y2={height - paddingY} stroke="#163A2C" strokeOpacity={isHovered ? "0.15" : "0"} strokeWidth="2" />
                <circle cx={cx} cy={cy} r={isHovered ? 6 : 4} fill="#163A2C" stroke="#ffffff" strokeWidth="2" />
                <text x={cx} y={height - 2} textAnchor="middle" className={`text-[10px] font-black ${isHovered ? "fill-[#163A2C]" : "fill-[#163A2C]/40"}`}>
                  {d.day}
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="gradImp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#163A2C" stopOpacity="1" />
              <stop offset="100%" stopColor="#163A2C" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Popover Hover */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 bg-[#163A2C] text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 pointer-events-none transition-all"
            style={{ left: `${(hoveredIdx / (DATA.length - 1)) * 80 + 10}%` }}
          >
            <p className="font-extrabold text-[#F0A93E]">{DATA[hoveredIdx].day} - Détails</p>
            <p className="text-[11px]">Impressions : <b>{DATA[hoveredIdx].impressions.toLocaleString()}</b></p>
            <p className="text-[11px]">Auditeurs : <b>{DATA[hoveredIdx].ecoutes.toLocaleString()}</b></p>
            <p className="text-[11px]">Passages FM : <b>{DATA[hoveredIdx].passages} spots</b></p>
          </div>
        )}
      </div>
    </div>
  );
}