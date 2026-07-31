import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// npm i clsx tailwind-merge (si pas déjà présents)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrix(valeur: number, devise = "FCFA") {
  return `${new Intl.NumberFormat("fr-FR").format(valeur)} ${devise}`;
}

export function formatVues(valeur: number) {
  if (valeur >= 1_000_000) return `${(valeur / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (valeur >= 1_000) return `${(valeur / 1_000).toFixed(1).replace(".0", "")}k`;
  return String(valeur);
}

export function formatDateRelative(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  const heures = Math.floor(minutes / 60);
  const jours = Math.floor(heures / 24);

  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  if (heures < 24) return `il y a ${heures} h`;
  if (jours < 7) return `il y a ${jours} j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}