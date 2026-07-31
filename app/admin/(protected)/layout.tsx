// ============================================================================
// app/(admin)/layout.tsx — Layout partagé par toutes les pages /admin/*.
//
// Bonnes pratiques appliquées :
// - `data-theme="light"` posé ICI, au niveau du layout du groupe (admin) :
//   toutes les pages admin héritent du mode clair sans qu'aucune page n'ait
//   à s'en soucier individuellement (cf. README § Design System : "light
//   mode privilégié sur l'espace admin").
// - Layout de groupe de routes Next.js : ne s'applique qu'aux pages sous
//   `app/(admin)/`, jamais à la marketplace ou aux pages d'auth.
// ============================================================================

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="light" className="flex min-h-screen bg-canvas">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}