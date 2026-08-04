"use client";

import React from "react";

export interface CountryStat {
  code: string;
  country: string;
  flag: string;
  visits: number;
  percentage: number;
}

interface BandChartCardProps {
  title: string;
  data: CountryStat[];
}

export default function BandChartCard({ title, data }: BandChartCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
          Top Localisations
        </span>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.code} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="text-base">{item.flag}</span>
                <span className="font-semibold text-slate-800">{item.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900">{item.visits.toLocaleString()} visits</span>
                <span className="text-[11px] font-medium text-slate-400">({item.percentage}%)</span>
              </div>
            </div>

            {/* Barre de bande horizontale */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}