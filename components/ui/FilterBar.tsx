// components/sections/FilterBar.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const FILTERS = [
  { label: "Tout", slug: "" },
  { label: "Annonces", slug: "annonces" },
  { label: "Emploi", slug: "emploi" },
  { label: "Services", slug: "services" },
  { label: "Boutiques", slug: "boutiques" },
  { label: "Événements", slug: "evenements" },
];

export function FilterBar() {
  const searchParams = useSearchParams();
  const actif = searchParams.get("type") ?? "";

  return (
    <div className="sticky top-16 z-30 border-b border-black/[0.04] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 scrollbar-none lg:px-8">
        {FILTERS.map((f) => {
          const isActive = actif === f.slug;

          return (
            <Link
              key={f.slug}
              href={f.slug ? `/?type=${f.slug}` : "/"}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}