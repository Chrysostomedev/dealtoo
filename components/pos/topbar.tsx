

"use client";

import React, { useState } from "react";
import { Menu, Bell, User, Calculator, ClipboardList, TrendingUp, Settings } from "lucide-react";
import { useSidebar } from "./sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NotificationPanel } from "@/components/modals/NotificationPanel";

const NAV_ITEMS = [
  { label: "Caisse", href: "/pos/caisse", icon: Calculator },
  { label: "Historique", href: "/pos/enregistrements", icon: ClipboardList },
  { label: "Prévisions", href: "/pos/previsions", icon: TrendingUp },
  { label: "Paramètres", href: "/pos/parametres", icon: Settings },
];

export default function Topbar() {
  const { setMobileOpen } = useSidebar();
  const pathname = usePathname();
  const [notifOuverte, setNotifOuverte] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:hidden">
        {/* Bouton Toggle Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="flex items-center">
            <Image src="/img/logo-dealtoo.png" alt="Dealtoo" width={90} height={26} className="h-6 w-auto object-contain" />
          </Link>
        </div>

        {/* Profil & Notifications */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setNotifOuverte(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Bell size={18} />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
            <User size={14} />
          </div>
        </div>
      </header>

      {/* Menu du bas Mobile (TapBar POS) */}
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <ul className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const actif = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-1 text-[10px] transition-colors",
                    actif ? "text-brand-500 font-bold" : "text-slate-500"
                  )}
                >
                  <item.icon className="size-5" strokeWidth={actif ? 2.5 : 2} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <NotificationPanel isOpen={notifOuverte} onClose={() => setNotifOuverte(false)} />
    </>
  );
}