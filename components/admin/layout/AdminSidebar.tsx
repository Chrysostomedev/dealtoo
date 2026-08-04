"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AdminRole, ADMIN_NAVIGATION, hasPermission } from "@/lib/admin/rbac";
import {
  LayoutDashboard, Users, Package, Sliders, ShieldAlert,
  Wallet, CheckSquare, Headphones, AlertCircle, TrendingUp, X, ChevronLeft, ChevronRight, LucideIcon,
} from "lucide-react";
import {
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "@/components/admin/layout/constants";

// ---------- Contexte (Provider + hook) ----------
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar doit être utilisé dans un SidebarProvider");
  return ctx;
}

// ---------- Composant Sidebar ----------
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, Users, Package, Sliders, ShieldAlert,
  Wallet, CheckSquare, Headphones, AlertCircle, TrendingUp,
};

interface AdminSidebarProps {
  currentRole?: AdminRole;
}

export default function AdminSidebar({ currentRole = "ADMINISTRATEUR" }: AdminSidebarProps) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();

  // Accentuation Orange Premium Dealtoo
  const activeClass = "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-500/20";

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Overlay Sombre pour le menu Mobile */}
      {mobileOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}

      <aside
        style={{ width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED }}
        className={`bg-white/90 backdrop-blur-xl border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 shadow-sm ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* En-tête du Sidebar avec Logo GIF */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100/80">
          <Link href="/admin/administrateur/dashboard" onClick={closeMobileMenu} className="flex items-center space-x-3 overflow-hidden">
            <div className="relative w-50 h-9 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden p-1">
              <Image
                src="https://dealtoo.co/img/Dealtoo.gif?v=1751539804"
                alt="Dealtoo"
                width={135}
                height={40}
                unoptimized
              />
            </div>
          </Link>

          {/* Bouton fermeture sur mobile */}
          <button
            onClick={closeMobileMenu}
            className="md:hidden p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation des liens */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {ADMIN_NAVIGATION.map((item) => {
            if (item.requiredPermission && !hasPermission(currentRole, item.requiredPermission)) {
              return null;
            }
            const Icon = ICON_MAP[item.iconName] || LayoutDashboard;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                title={collapsed ? item.title : undefined}
                className={`flex items-center ${
                  collapsed ? "justify-center px-0" : "justify-between px-3.5"
                } py-2.5 rounded-2xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? activeClass
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Toggle Collapse Desktop & Pied de page */}
        <div className="p-3 border-t border-slate-100/80 flex flex-col items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-full py-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            title={collapsed ? "Déplier" : "Replier"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {!collapsed && (
            <div className="text-[10px] text-slate-400 font-medium text-center">
              DEALTOO CI • v2.0
            </div>
          )}
        </div>
      </aside>
    </>
  );
}