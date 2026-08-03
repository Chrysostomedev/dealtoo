"use client";

import React from "react";
import Sidebar, { 
  SidebarProvider, 
  useSidebar, 
  SIDEBAR_WIDTH_EXPANDED, 
  SIDEBAR_WIDTH_COLLAPSED, 
  NAVBAR_HEIGHT 
} from "@/components/annonces/sidebar";
import Navbar from "@/components/annonces/navbar";
import Topbar from "@/components/annonces/topbar";

function ShellMainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const sidebarOffset = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* 1. Topbar Responsive Mobile (Visible uniquement sur mobile) */}
      <Topbar />

      {/* 2. Navbar Desktop (Masquée sur mobile) */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* 3. Sidebar Générale */}
      <Sidebar />

      {/* 4. Zone de Contenu Principal */}
      <main
        style={{
          ["--sidebar-offset" as string]: `${sidebarOffset}px`,
        }}
        className="w-full transition-[margin,width] duration-300 px-4 sm:px-6 lg:px-8 pb-12 pt-4 md:pt-[calc(var(--navbar-height,64px)+24px)] md:w-[calc(100%-var(--sidebar-offset))] md:ml-[var(--sidebar-offset)]"
      >
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AnnonceurShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellMainContent>{children}</ShellMainContent>
    </SidebarProvider>
  );
}