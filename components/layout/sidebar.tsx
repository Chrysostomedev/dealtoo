"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Megaphone, BarChart3, Wallet, FileText, Settings,
  LogOut, ChevronLeft, ChevronRight, AlertTriangle, X, Radio
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const SIDEBAR_WIDTH_EXPANDED = 280;
export const SIDEBAR_WIDTH_COLLAPSED = 88;
export const NAVBAR_HEIGHT = 76;

interface SidebarContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

export function useSidebar() { return useContext(SidebarContext); }

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), []);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

const NAV_ITEMS = [
  { label: "Vue d'ensemble", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Annonces", icon: Megaphone, href: "/publier" },
  { label: "Rapports & Audience", icon: BarChart3, href: "/annonceur/rapports" },
  { label: "Budget & Factures", icon: Wallet, href: "#" },
];

const BOTTOM_ITEMS = [
  { label: "Directives & Grille", icon: FileText, href: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const getItemClasses = (active: boolean) =>
    active
      ? "bg-[#163A2C] text-white shadow-[0_8px_20px_-6px_rgba(22,58,44,0.4)]"
      : "text-[#163A2C]/65 hover:bg-[#FBF6EA] hover:text-[#163A2C]";

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header logo */}
      <div className="flex items-center justify-between h-[76px] px-5 border-b border-[#163A2C]/[0.06] shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 rounded-2xl bg-white border border-[#163A2C]/10 flex items-center justify-center shrink-0 shadow-sm p-1.5">
              <Image src="/img/logo-dealtoo.png" alt="logo" width={36} height={36} className="object-contain" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-[#F0A93E] uppercase tracking-widest mt-0.5">
                Espace Annonceur
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-10 h-10 rounded-2xl bg-white border border-[#163A2C]/10 flex items-center justify-center shadow-sm p-1.5">
            <Image src="/img/logo.png" alt="RGE" width={28} height={28} className="object-contain" />
          </div>
        )}
        <div className="flex items-center shrink-0">
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex p-1.5 hover:bg-[#FBF6EA] rounded-xl text-[#163A2C]/40 hover:text-[#163A2C] transition"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="md:hidden p-1.5 text-[#163A2C]/50">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {!collapsed && <p className="px-3.5 pb-2 text-[10px] font-black uppercase tracking-wider text-[#163A2C]/35">Gestion Publicitaire</p>}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all text-[13px] font-bold ${getItemClasses(active)} ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F0A93E]" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Quitter */}
      <div className="px-3 py-4 border-t border-[#163A2C]/[0.06] space-y-1 shrink-0">
        {!collapsed && <p className="px-3.5 pb-2 text-[10px] font-black uppercase tracking-wider text-[#163A2C]/35">Compte</p>}
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-[13px] font-bold ${getItemClasses(active)} ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button
          onClick={() => setShowLogout(true)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-[#163A2C]/60 hover:bg-rose-50 hover:text-rose-600 transition ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>

        {!collapsed && (
          <div className="mt-4 p-4 rounded-2xl bg-[#163A2C] text-white relative overflow-hidden">
            <Radio size={64} className="absolute -right-2 -bottom-3 text-[#F0A93E]/10 rotate-12" />
            <p className="text-[12px] font-extrabold text-[#F0A93E] uppercase tracking-wider">Passerelle Radio</p>
            <p className="text-[11px] text-white/70 mt-0.5 leading-snug">Couverture FM & Streaming Côte d'Ivoire</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside
        style={{ width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-[#163A2C]/[0.06] z-40 transition-[width] duration-300"
      >
        <SidebarContent />
      </aside>
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-[#0E241C]/50 backdrop-blur-xs z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-[280px] bg-white z-50 md:hidden flex flex-col shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}
      {showLogout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0E241C]/60 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center space-y-4 border border-[#163A2C]/10 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#F0A93E]/15 border border-[#F0A93E]/30 flex items-center justify-center mx-auto text-[#9A6A1E]">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#163A2C]">Se déconnecter ?</h3>
              <p className="text-xs text-[#163A2C]/60 mt-1">Vous devrez re-saisir vos identifiants de régie publicitaire.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowLogout(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700">Annuler</button>
              <button onClick={() => window.location.href = "/login"} className="flex-1 py-2.5 rounded-xl bg-[#163A2C] font-bold text-xs text-white">Déconnexion</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}