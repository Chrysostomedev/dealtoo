"use client";

import { ReactNode } from "react";

interface AdminCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Carte conteneur standardisée pour le Backoffice DEALTOO
 */
export default function AdminCard({ title, subtitle, action, children, className = "" }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 ${className}`}>
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            {title && <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}