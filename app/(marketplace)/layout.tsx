import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
// tes fonts, globals.css, providers, etc.

export const metadata: Metadata = {
  title: "Dealtoo",
  description: "Marketplace premium Côte d'Ivoire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-canvas text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}