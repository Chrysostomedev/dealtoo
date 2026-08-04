import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // Redirection par défaut vers le dashboard administrateur
  redirect("/admin/administrateur/dashboard");
}