"use client";

import { Bell, Menu, Radio, Building2 } from "lucide-react";
import Link from "next/link";
import { useSidebar, SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED, NAVBAR_HEIGHT } from "./sidebar";

export default function Navbar() {
  const { collapsed, setMobileOpen } = useSidebar();
  const sidebarOffset = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <header
      style={{ height: NAVBAR_HEIGHT, ["--sidebar-offset" as string]: `${sidebarOffset}px` }}
      className="fixed top-0 left-0 w-full md:w-[calc(100%-var(--sidebar-offset))] md:ml-[var(--sidebar-offset)] flex items-center justify-between px-5 md:px-8 bg-white/95 backdrop-blur-md border-b border-[#163A2C]/[0.06] z-30 transition-[width,margin] duration-300"
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 text-[#163A2C]">
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#163A2C] text-[#F0A93E] font-black flex items-center justify-center text-sm shadow-md ring-2 ring-[#F0A93E]/20">
            <Building2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[#163A2C] font-black text-sm tracking-tight">SOCIÉTÉ IVOIRIENNE DE BANQUE</h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">Compte Vérifié</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
       
        <button className="relative p-2.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[#163A2C] transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F0A93E] rounded-full ring-2 ring-white" />
        </button>

        <Link href="/annonceur/campagnes/nouvelle" className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#163A2C] hover:bg-[#0E241C] text-white font-bold text-xs transition shadow-md shadow-[#163A2C]/20">
          + Lancer un Spot
        </Link>
      </div>
    </header>
  );
}