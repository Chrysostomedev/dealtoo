"use client";

import Sidebar, {
  SidebarProvider,
  useSidebar,
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
  NAVBAR_HEIGHT,
} from "@/components/annonces/sidebar";
import Navbar from "@/components/annonces/navbar";

function AdvertiserLayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const sidebarOffset = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
      {/* Appels directs des composants autonomes */}
      <Sidebar />
      <Navbar />

      {/* Main Content avec décalage dynamique */}
      <main
        style={{
          ["--sidebar-offset" as string]: `${sidebarOffset}px`,
          paddingTop: `${NAVBAR_HEIGHT + 24}px`,
        }}
        className="flex-1 md:ml-[var(--sidebar-offset)] px-4 sm:px-6 lg:px-8 transition-[margin] duration-300"
      >
        <div className="max-w-7xl mx-auto pb-12">{children}</div>
      </main>
    </div>
  );
}

export default function AdvertiserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdvertiserLayoutContent>{children}</AdvertiserLayoutContent>
    </SidebarProvider>
  );
}