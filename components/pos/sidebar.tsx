"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Megaphone, Clock, Archive, Heart, MessageSquare, Bell, 
  Store, ShieldCheck, UserCheck, CreditCard, LogOut, 
  ChevronLeft, ChevronRight, AlertTriangle, X,
  Settings,
  UserCheckIcon,
  FolderOutput,
  StoreIcon
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

const SECTION_ANNONCES = [
  { label: "Ma caisse", icon: Megaphone, href: "/pos/caisse" },
  { label: "Mes gérants", icon: UserCheckIcon, href: "/pos/gerants" },
  { label: "Mes prévsions", icon: FolderOutput, href: "/pos/previsions" },
  { label: "Mes enregistrements", icon: StoreIcon, href: "/pos/enregistrements" },
  { label: "Paramètres", icon: Settings, href: "/pos/parametres"},
];

const SECTION_BUSINESS = [
  { label: "Espace Dealtoo ", icon: Store, href: "/annonceur/dashboard" },
];

const SECTION_COMPTE = [
  { label: "Mon compte", icon: UserCheck, href: "/pos/compte" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const getItemClasses = (active: boolean) =>
    active
      ? "bg-brand-500 text-white shadow-md shadow-brand-500/40"
      : "text-slate-600 hover:bg-brand-500/10 hover:text-brand-500";

  const renderNavGroup = (title: string, items: typeof SECTION_ANNONCES) => (
    <div className="space-y-1">
      {!collapsed && (
        <p className="px-3.5 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
          {title}
        </p>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-xs font-bold ${getItemClasses(active)} ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate flex-1">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${active ? "bg-gold-500 text-slate-900" : "bg-slate-100 text-slate-600"}`}>
                {item.badge}
              </span>
            )}
            {!collapsed && (item as Record<string, unknown>).isPremium && (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase bg-gold-500/20 text-yellow-700 border border-gold-500/50">
                PRO
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header logo */}
      <div className="flex items-center justify-between h-[76px] px-5 border-b border-slate-100 shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="relative size-10 rounded-2xl bg-white border border-brand-500/10 flex items-center justify-center shrink-0 shadow-xs p-1 hover:border-brand-500/30 transition-all">
              <Image src="/img/logo-dealtoo.png" alt="Dealtoo" width={32} height={32} className="object-contain" />
            </Link>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-slate-900 tracking-tight">DEALTOO</span>
              <span className="text-[9px] font-black text-brand-500 uppercase tracking-wider">
                Espace POS
              </span>
            </div>
          </div>
        ) : (
          <Link href="/" className="mx-auto size-10 rounded-2xl bg-white border border-brand-500/10 flex items-center justify-center shadow-xs p-1 hover:border-brand-500/30 transition-all">
            <Image src="/img/logo-dealtoo.png" alt="Dealtoo" width={26} height={26} className="object-contain" />
          </Link>
        )}
        <div className="flex items-center shrink-0">
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex p-1.5 hover:bg-brand-500/10 rounded-xl text-slate-400 hover:text-brand-500 transition cursor-pointer"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
        {renderNavGroup("Mes Annonces", SECTION_ANNONCES)}
        {renderNavGroup("Solutions Pro", SECTION_BUSINESS)}
        {renderNavGroup("Mon Compte", SECTION_COMPTE)}
      </nav>

      {/* Déconnexion */}
      <div className="px-3 py-4 border-t border-slate-100 shrink-0">
        <button
          onClick={() => setShowLogout(true)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        style={{ width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-40 transition-[width] duration-300"
      >
        <SidebarContent />
      </aside>
      
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-[280px] bg-white z-50 md:hidden flex flex-col shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}

      {showLogout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center space-y-4 border border-slate-100 shadow-2xl">
            <div className="size-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto text-brand-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Se déconnecter ?</h3>
              <p className="text-xs text-slate-500 mt-1">Vous devrez re-saisir vos identifiants pour accéder à votre espace.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowLogout(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 cursor-pointer">Annuler</button>
              <button onClick={() => window.location.href = "/login"} className="flex-1 py-2.5 rounded-xl bg-brand-500 font-bold text-xs text-white cursor-pointer hover:bg-brand-600 transition">Déconnexion</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}