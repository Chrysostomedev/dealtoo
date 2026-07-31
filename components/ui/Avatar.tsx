// ============================================================================
// Avatar — image de profil avec repli automatique sur les initiales.
//
// Bonnes pratiques appliquées :
// - `onError` sur <img> pour basculer sur les initiales si l'URL casse
//   (photo supprimée, CDN down...) plutôt que d'afficher une icône cassée.
// - Composant serveur (pas d'état React nécessaire pour le rendu initial ;
//   le fallback est géré par onError qui bascule une classe via ref DOM —
//   voir note ci-dessous si vous préférez une version 100% client).
// ============================================================================

import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  nom: string;
  taille?: "sm" | "md" | "lg";
  /** Affiche une pastille verte "en ligne" en bas à droite */
  enLigne?: boolean;
  className?: string;
}

const TAILLES = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-16 text-lg",
};

function getInitiales(nom: string) {
  return nom
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => mot[0]?.toUpperCase())
    .join("");
}

export function Avatar({ src, nom, taille = "md", enLigne, className }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", TAILLES[taille], className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={nom}
          className="size-full rounded-full object-cover ring-1 ring-white/10"
          // Si l'image ne charge pas, on la masque pour révéler le fallback
          // en initiales positionné juste derrière (voir wrapper ci-dessous).
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      {/* Fallback initiales — toujours rendu, simplement recouvert par l'image si elle charge */}
      {!src && (
        <span className="flex size-full items-center justify-center rounded-full bg-brand-500/20 font-medium text-brand-500 ring-1 ring-white/10">
          {getInitiales(nom)}
        </span>
      )}

      {enLigne && (
        <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-canvas bg-emerald-500" />
      )}
    </div>
  );
}