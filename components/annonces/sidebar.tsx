"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Megaphone, Clock, Archive, Heart, MessageSquare, 
  Store, ShieldCheck, UserCheck, CreditCard, LogOut, 
  ChevronLeft, ChevronRight, AlertTriangle, X, Sparkles
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
  { label: "Mes annonces", icon: Megaphone, href: "/annonceur/annonces" },
  { label: "En attente", icon: Clock, href: "/annonceur/en-attente", badge: "2" },
  { label: "Mes archives", icon: Archive, href: "/annonceur/archives" },
  { label: "Mes favoris", icon: Heart, href: "/annonceur/favoris" },
  { label: "Messages", icon: MessageSquare, href: "/annonceur/messages", badge: "5" },
];

const SECTION_BUSINESS = [
  { label: "Gestion miniPOS", icon: Store, href: "/pos/caisse", isPremium: true },
];

const SECTION_COMPTE = [
  { label: "Certification", icon: ShieldCheck, href: "/annonceur/certification" },
  { label: "Mon compte", icon: UserCheck, href: "/annonceur/profil" },
  { label: "Abonnements", icon: CreditCard, href: "/annonceur/abonnements" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const getItemClasses = (active: boolean) =>
    active
      ? "bg-brand-500 text-white shadow-md shadow-brand-500/25 font-extrabold"
      : "text-slate-500 hover:bg-brand-500/8 hover:text-brand-500 font-semibold";

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
            className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 text-xs ${getItemClasses(active)} ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <Icon size={18} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate flex-1 tracking-tight">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight ${active ? "bg-white text-brand-500 shadow-xs" : "bg-brand-500/10 text-brand-500"}`}>
                {item.badge}
              </span>
            )}
            {!collapsed && (item as Record<string, unknown>).isPremium && (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase bg-amber-500/15 text-amber-600 border border-amber-500/30 flex items-center gap-1">
                <Sparkles size={10} /> PRO
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white select-none border-r border-slate-100">
      {/* Header logo */}
      <div className="flex items-center justify-between h-[76px] px-5 border-b border-slate-100/80 shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="relative w-50 h-9  rflex items-center justify-center shrink-0 p-1 hover:border-brand-500/30 transition-all">
               <Image
                              src="https://dealtoo.co/img/Dealtoo.gif?v=1751539804"
                              alt="Dealtoo"
                              width={135}
                              height={40}
                              unoptimized
                            />
                     </Link>
        
          </div>
        ) : (
          <Link href="/" className="mx-auto size-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs p-1 hover:border-brand-500/30 transition-all">
 <Image
                              src="https://dealtoo.co/img/Dealtoo.gif?v=1751539804"
                              alt="Dealtoo"
                              width={135}
                              height={40}
                              unoptimized
                            />          </Link>
        )}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden md:flex p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button type="button" onClick={() => setMobileOpen(false)} className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100">
        {renderNavGroup("Mes Annonces", SECTION_ANNONCES)}
        {renderNavGroup("Solutions Pro", SECTION_BUSINESS)}
        {renderNavGroup("Mon Compte", SECTION_COMPTE)}

        {/* Bloc d'animation GIF Soft (Optionnel / Banner)
        {!collapsed && (
          <div className="mt-6 p-3.5 rounded-3xl text-center space-y-2 relative overflow-hidden">
            <div className="relative w-70 h-5 overflow-hidden  flex items-center justify-center">
            <Image
                              src="https://dealtoo.co/img/Dealtoo.gif?v=1751539804"
                              alt="Dealtoo"
                              width={135}
                              height={40}
                              unoptimized
                            />
            </div>
            <p className="text-[11px] font-extrabold text-slate-800 tracking-tight">Passez au niveau Pro 🚀</p>
            <p className="text-[10px] text-slate-400">Multipliez la visibilité de vos annonces par 5.</p>
          </div>
        )} */}
      </nav>

      {/* Déconnexion */}
      <div className="px-3 py-4 border-t border-slate-100 shrink-0">
        <button
          type="button"
          onClick={() => setShowLogout(true)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition duration-200 cursor-pointer ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : ""}`}
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
        className="hidden md:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-40 transition-[width] duration-300 ease-in-out"
      >
        <SidebarContent />
      </aside>
      
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 md:hidden transition-opacity" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-[280px] bg-white z-50 md:hidden flex flex-col shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}

      {showLogout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center space-y-4 border border-slate-100 shadow-2xl">
            <div className="size-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">Se déconnecter ?</h3>
              <p className="text-xs text-slate-500 mt-1">Vous devrez re-saisir vos identifiants pour accéder à votre espace.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowLogout(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 hover:bg-slate-200 transition cursor-pointer">Annuler</button>
              <button type="button" onClick={() => window.location.href = "/login"} className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 font-bold text-xs text-white transition shadow-sm cursor-pointer">Déconnexion</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}