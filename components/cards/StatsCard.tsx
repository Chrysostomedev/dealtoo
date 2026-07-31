"use client";

import { TrendingUp, TrendingDown, HelpCircle } from "lucide-react";
import Link from "next/link";

interface StatsCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down";
  isCurrency?: boolean;
  href?: string;
  tooltip?: string;
}

function formatMontant(val: number): string {
  return new Intl.NumberFormat("fr-FR").format(val);
}

export default function StatsCard({
  label,
  value,
  delta,
  trend = "up",
  isCurrency = false,
  href,
  tooltip,
}: StatsCardProps) {
  const isUp = trend === "up";

  let displayValue: string;
  if (typeof value === "number") {
    displayValue = isCurrency ? formatMontant(value) : value.toLocaleString("fr-FR");
  } else {
    displayValue = value;
  }

  const content = (
    <div className="relative p-5 rounded-3xl bg-white border border-[#163A2C]/[0.08] shadow-[0_10px_30px_-15px_rgba(22,58,44,0.05)] hover:border-[#F0A93E]/50 transition-all duration-300 group">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#163A2C]/50">{label}</span>
        {tooltip && (
          <div className="relative group/tip cursor-help">
            <HelpCircle size={14} className="text-slate-300 group-hover/tip:text-[#163A2C] transition-colors" />
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover/tip:block w-48 p-2 bg-[#163A2C] text-white text-[10px] font-medium rounded-lg shadow-xl z-50">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <h3 className="text-2xl font-black text-[#163A2C] tracking-tight truncate">{displayValue}</h3>
          {isCurrency && <span className="text-[11px] font-black text-[#F0A93E] tracking-widest shrink-0">FCFA</span>}
        </div>

        {delta && (
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-extrabold shrink-0 ${
            isUp ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
          }`}>
            {isUp ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
            <span>{delta}</span>
          </div>
        )}
      </div>

      <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${isUp ? "bg-[#163A2C]" : "bg-[#F0A93E]"}`} style={{ width: "70%" }} />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block transition-transform hover:-translate-y-1">{content}</Link>;
  }

  return content;
}