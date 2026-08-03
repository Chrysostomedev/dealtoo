import AnnonceurShell from "@/components/layout/AnnonceurShell";

export const metadata = {
  title: "Espace Annonceur - Dealtoo",
  description: "Gestion des annonces et ventes sur Dealtoo",
};

export default function AnnonceurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnnonceurShell>{children}</AnnonceurShell>;
}