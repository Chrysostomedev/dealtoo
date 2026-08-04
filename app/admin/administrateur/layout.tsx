import AdminShell from "@/components/admin/layout/AdminShell";
import { ToastProvider } from "@/contexts/ToastContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}