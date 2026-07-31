"use client";

// ============================================================================
// AdminSidebar — navigation latérale fixe de l'espace admin.
//
// Bonnes pratiques appliquées :
// - Espace admin en LIGHT MODE par défaut (cf. README § Design System) :
//   ce composant ne force pas ses propres couleurs, il utilise les tokens
//   `bg-surface`/`text-ink` qui basculent automatiquement via
//   `data-theme="light"` posé sur le layout admin (voir AdminLayout).
// - `usePathname` + `startsWith` : un lien reste actif sur ses sous-routes
//   (ex: /admin/annonces/signalees reste sous "Annonces").
// ============================================================================

import { LayoutDashboard, ShieldCheck, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { label: "Annonces", href: "/admin/annonces", icon: ShoppingBag },
  { label: "Rôles & permissions", href: "/admin/roles", icon: ShieldCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink-faint/10 bg-surface p-4 lg:block">
      <Link href="/admin/dashboard" className="mb-6 flex items-center gap-2 px-2 font-display text-xl font-bold text-ink">
        Deal<span className="text-brand-500">too</span>
        <span className="rounded-sm bg-ink-faint/10 px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">ADMIN</span>
      </Link>

      <nav className="space-y-1">
        {NAV.map((item) => {
          const actif = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                actif ? "bg-brand-500/10 text-brand-500" : "text-ink-soft hover:bg-ink-faint/5 hover:text-ink"
              )}
            >
              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}