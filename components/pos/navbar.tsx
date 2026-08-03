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
      className="fixed top-0 left-0 w-full md:w-[calc(100%-var(--sidebar-offset))] md:ml-[var(--sidebar-offset)] flex items-center justify-between px-4 sm:px-8 bg-white/95 backdrop-blur-md border-b border-[#163A2C]/[0.06] z-30 transition-[width,margin] duration-300"
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 text-[#163A2C] cursor-pointer">
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-[#163A2C] text-[#F0A93E] font-black flex items-center justify-center text-sm shadow-md ring-2 ring-[#F0A93E]/20">
            <User size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[#163A2C] font-extrabold text-sm tracking-tight truncate max-w-[160px] sm:max-w-none">
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
        <Link
          href="/annonceur/notifications"
          className="relative p-2.5 rounded-2xl bg-orange-50 border border-orange-200/80 hover:bg-orange-100 text-orange-600 transition"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 size-2 bg-[#F0A93E] rounded-full ring-2 ring-white" />
        </Link>

        <Link 
          href="/annonceur/publier" 
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-600] text-slate-950 font-black text-xs transition shadow-md shadow-[#F0A93E]/20 cursor-pointer"
        >
          <Plus size={16} />
          <span>Enregistrer</span>
        </Link>
      </div>
    </header>
  );
}