// ============================================================================
// Skeleton — placeholders de chargement.
//
// Bonnes pratiques appliquées :
// - Un bloc générique `Skeleton` + des presets (`AnnonceCardSkeleton`...) qui
//   reproduisent EXACTEMENT les dimensions des vraies cartes, pour éviter
//   tout layout shift (CLS) quand les vraies données arrivent.
// - Composant serveur par défaut (aucune interactivité) → pas de "use client".
// ============================================================================

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-sm bg-white/8", className)} />;
}

/** Reproduit la structure exacte de <AnnonceCard /> pour un chargement sans saut visuel */
export function AnnonceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md bg-surface ring-1 ring-white/5">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

/** Reproduit la structure exacte de <EmploiCard /> */
export function EmploiCardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-md border border-white/5 bg-surface p-4">
      <Skeleton className="size-12 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

/** Grille de skeletons — pratique pendant le `loading.tsx` d'une route */
export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        // Index utilisé comme clé : acceptable ici car la liste est statique
        // et ne sera jamais réordonnée (pur placeholder de chargement).
        <AnnonceCardSkeleton key={i} />
      ))}
    </div>
  );
}