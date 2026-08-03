"use client";

import React from "react";
import Sidebar, { 
  SidebarProvider, 
  useSidebar, 
  SIDEBAR_WIDTH_EXPANDED, 
  SIDEBAR_WIDTH_COLLAPSED, 
  NAVBAR_HEIGHT 
} from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

function ShellMainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const sidebarOffset = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Sidebar />
      <main
        style={{
          paddingTop: `${NAVBAR_HEIGHT + 24}px`,
          ["--sidebar-offset" as string]: `${sidebarOffset}px`,
        }}
        className="w-full md:w-[calc(100%-var(--sidebar-offset))] md:ml-[var(--sidebar-offset)] transition-[margin,width] duration-300 px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellMainContent>{children}</ShellMainContent>
    </SidebarProvider>
  );
}