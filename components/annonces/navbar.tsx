"use client";

import { Bell, Menu, Plus, User } from "lucide-react";
import Link from "next/link";
import { useSidebar, SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED, NAVBAR_HEIGHT } from "./sidebar";

export default function Navbar() {
  const { collapsed, setMobileOpen } = useSidebar();
  const sidebarOffset = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <header
      style={{ height: NAVBAR_HEIGHT, ["--sidebar-offset" as string]: `${sidebarOffset}px` }}
      className="fixed top-0 left-0 w-full md:w-[calc(100%-var(--sidebar-offset))] md:ml-[var(--sidebar-offset)] flex items-center justify-between px-4 sm:px-8 bg-white/95 backdrop-blur-md border-b border-slate-100 z-30 transition-[width,margin] duration-300"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-slate-700 hover:text-[#FF6B00] transition cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          {/* Avatar utilisateur aux couleurs Dealtoo (Orange + Anneau Jaune) */}
          <div className="size-10 rounded-2xl bg-[#FF6B00] text-white font-black flex items-center justify-center text-sm shadow-md ring-2 ring-[#FFC700]/40">
            <User size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-slate-900 font-extrabold text-sm tracking-tight truncate max-w-[160px] sm:max-w-none">
                Jean Baptiste M.
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 shrink-0">
                Vérifié
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Annonceur Particulier</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications avec dot Jaune Dealtoo */}
        <Link
          href="/annonceur/notifications"
          className="relative p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-[#FFF5ED] text-slate-700 hover:text-[#FF6B00] transition"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 size-2 bg-[#FFC700] rounded-full ring-2 ring-white" />
        </Link>

        {/* Bouton d'action Publier en Orange Dealtoo */}
        <Link 
          href="/publier" 
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-black text-xs transition shadow-md shadow-[#FF6B00]/20 cursor-pointer"
        >
          <Plus size={16} />
          <span>Publier</span>
        </Link>
      </div>
    </header>
  );
}