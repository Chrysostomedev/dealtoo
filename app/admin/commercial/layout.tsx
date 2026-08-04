// app/admin/commercial/layout.tsx
import AdminShell from "@/components/admin/layout/AdminShell"; // Import par défaut

export default function CommercialLayout({ children }: { children: React.ReactNode }) {
  const currentRole = "COMMERCIAL";

  return <AdminShell role={currentRole}>{children}</AdminShell>;
}