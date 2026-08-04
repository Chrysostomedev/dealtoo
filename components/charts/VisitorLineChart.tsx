"use client";

import React, { useState } from "react";

export interface DataPoint {
  label: string;
  value: number;
}

interface VisitorLineChartProps {
  title: string;
  data: DataPoint[];
  year?: string;
}

export default function VisitorLineChart({ title, data, year = "2026" }: VisitorLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(3); // Fév sélectionné par défaut

  const maxValue = Math.max(...data.map((d) => d.value), 100);
  const chartHeight = 220;
  const chartWidth = 800;
  const padding = 40;

  const points = data.map((d, i) => {
    const x = padding + (i * (chartWidth - 2 * padding)) / (data.length - 1);
    const y = chartHeight - padding - (d.value / maxValue) * (chartHeight - 2 * padding);
    return { x, y, ...d };
  });

  // Génération du tracé SVG lissé (Bezier)
  const pathD = points.reduce((acc, pt, i, a) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = a[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
  }, "");

  const fillD = `${pathD} L ${points[points.length - 1].x},${chartHeight - padding} L ${points[0].x},${chartHeight - padding} Z`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span className="text-xs font-semibold text-slate-600">{year}</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {/* Lignes de grille horizontales */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = chartHeight - padding - ratio * (chartHeight - 2 * padding);
            const val = Math.round(ratio * maxValue);
            return (
              <g key={i}>
                <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#F1F5F9" strokeDasharray="4 4" />
                <text x={padding - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-medium">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Remplissage en dégradé Orange Dealtoo */}
          <defs>
            <linearGradient id="dealtooGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={fillD} fill="url(#dealtooGradient)" />

          {/* Ligne principale */}
          <path d={pathD} fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />

          {/* Points interactifs */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)}>
                {isHovered && (
                  <line x1={pt.x} y1={padding} x2={pt.x} y2={chartHeight - padding} stroke="#CBD5E1" strokeDasharray="3 3" />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  className={`${isHovered ? "fill-orange-600 stroke-white stroke-2" : "fill-orange-500"}`}
                />
                <text x={pt.x} y={chartHeight - 12} textAnchor="middle" className={`text-[11px] ${isHovered ? "fill-orange-600 font-bold" : "fill-slate-400 font-medium"}`}>
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip style Dealtoo */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-slate-900 text-white p-2.5 rounded-2xl shadow-xl text-xs space-y-0.5 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(points[hoveredIndex].x / chartWidth) * 100}%`,
              top: `${(points[hoveredIndex].y / chartHeight) * 100 - 10}%`,
            }}
          >
            <p className="text-[10px] text-slate-400 font-medium">{points[hoveredIndex].label}</p>
            <p className="font-bold text-orange-400">{year}: {points[hoveredIndex].value} visiteur(s)</p>
          </div>
        )}
      </div>
    </div>
  );
}