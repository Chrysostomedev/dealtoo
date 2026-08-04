"use client";

import React, { useState } from "react";
import { useSidebar } from "@/components/admin/layout/AdminSidebar";
import { 
  NAVBAR_HEIGHT, 
  SIDEBAR_WIDTH_EXPANDED, 
  SIDEBAR_WIDTH_COLLAPSED 
} from "@/components/admin/layout/constants";
import { Menu, Bell, Shield, User, LogOut, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminNavbar() {
  const { collapsed, setCollapsed, setMobileOpen } = useSidebar();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const sidebarOffset = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <header
      style={{
        height: `${NAVBAR_HEIGHT}px`,
        ["--sidebar-offset" as string]: `${sidebarOffset}px`,
      }}
      className="fixed top-0 right-0 left-0 md:left-[var(--sidebar-offset)] z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-[left] duration-300 px-4 sm:px-6 flex items-center justify-between"
    >
      {/* Côté Gauche : Hamburger pour Mobile + Toggle pour Desktop */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Basculer le sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-bold text-orange-700 tracking-wide uppercase">
            Espace Administration
          </span>
        </div>
      </div>

      {/* Côté Droit : Actions & Profil */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2.5 rounded-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-xl border border-slate-100 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  2 Nouvelles
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer">
                  <p className="font-semibold text-slate-800">Alerte Antifraude #ALT-101</p>
                  <p className="text-[11px] text-slate-500">Clics répétés détectés sur un compte vendeur.</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer">
                  <p className="font-semibold text-slate-800">Nouvelle Réclamation #REC-401</p>
                  <p className="text-[11px] text-slate-500">Kouassi Electronics a ouvert un ticket.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Séparateur */}
        <div className="h-6 w-[1px] bg-slate-200" />

        {/* Menu Profil Utilisateur */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-none">Admin System</p>
              <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">superadmin@dealtoo.ci</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-slate-100 p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 border-b border-slate-100 mb-1 lg:hidden">
                <p className="text-xs font-bold text-slate-900">Admin System</p>
                <p className="text-[10px] text-slate-400">superadmin@dealtoo.ci</p>
              </div>

              <Link
                href="/admin/administrateur/parametres"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-2xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Shield size={15} className="text-slate-400" />
                <span>Paramètres système</span>
              </Link>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-2xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut size={15} />
                <span>Se déconnecter</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}