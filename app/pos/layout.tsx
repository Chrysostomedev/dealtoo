import PosShell from "@/components/layout/PosShell";

export const metadata = {
  title: "Espace Pos Boutique - Dealtoo",
  description: "Gestion des ventes et operations sur Dealtoo pour les abonnés premium ",
};

export default function PosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PosShell>{children}</PosShell>;
}