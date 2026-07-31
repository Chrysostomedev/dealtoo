// ============================================================================
// app/(marketplace)/annonce/[id]/page.tsx — Détail d'une annonce.
//
// Bonnes pratiques appliquées :
// - Server Component async : le fetch des données se fait côté serveur
//   (ici mock, demain `await servicesAnnonces.getById(id)`), donc zéro
//   spinner de chargement initial et un bon SEO (contenu déjà dans le HTML).
// - `notFound()` de Next.js plutôt qu'un `if (!annonce) return <p>...</p>` :
//   déclenche le vrai `not-found.tsx` de la route (statut HTTP 404 correct).
// - Params typés comme une Promise : convention Next.js 15 (les `params`
//   d'une page sont désormais asynchrones).
// ============================================================================

import { BadgeCheck, MessageCircle, Phone, Share2, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ANNONCES } from "@/lib/mock-data";
import { formatPrix, formatVues } from "@/lib/utils";

const CONSIGNES = [
  "Les annonceurs/acheteurs ne sont pas partenaires de Dealtoo.",
  "Rencontrez le vendeur dans un lieu public pour plus de sécurité.",
  "Vérifiez toujours l'article avant de l'acheter.",
  "Payez uniquement après avoir récupéré l'article.",
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnnonceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const annonce = ANNONCES.find((a) => a.id === id);

  if (!annonce) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Colonne principale : galerie + description */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-surface sm:aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={annonce.image} alt={annonce.titre} className="size-full object-cover" />
            <span className="absolute bottom-4 left-4 rounded-md bg-black/60 px-3 py-1.5 font-mono text-xl font-semibold text-white backdrop-blur-md">
              {formatPrix(annonce.prix)}
            </span>
          </div>

          <h1 className="mt-6 font-display text-2xl font-bold text-ink">{annonce.titre}</h1>
          <p className="mt-1 text-sm text-ink-faint">
            {annonce.localisation} · {formatVues(annonce.vues)} vues
          </p>

          <div className="mt-6 rounded-md border border-white/5 bg-surface p-4">
            <h2 className="mb-2 font-medium text-ink">Description</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Article en excellent état, vendu avec accessoires d&apos;origine. Contactez le
              vendeur pour plus de détails ou pour convenir d&apos;un rendez-vous.
            </p>
          </div>
        </div>

        {/* Colonne latérale : vendeur + actions + sécurité */}
        <aside className="space-y-4">
          <div className="rounded-md border border-white/5 bg-surface p-4">
            <div className="flex items-center gap-3">
              <Avatar nom={annonce.vendeur} taille="md" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-sm font-medium text-ink">
                  {annonce.vendeur}
                  {annonce.certifie && <BadgeCheck className="size-4 text-brand-500" />}
                </p>
                <p className="text-xs text-ink-faint">Membre depuis 1 an</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button variant="brand" size="sm" className="col-span-3 justify-center">
                <MessageCircle className="size-4" /> Contacter
              </Button>
              <Button variant="glass" size="icon" aria-label="Appeler">
                <Phone className="size-4" />
              </Button>
              <Button variant="glass" size="icon" aria-label="Partager">
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-white/5 bg-surface p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-ruby-500">
              <ShieldCheck className="size-4" /> Consignes de sécurité
            </h2>
            <ul className="space-y-2">
              {CONSIGNES.map((consigne) => (
                <li key={consigne} className="flex gap-2 text-xs text-ink-soft">
                  <span className="text-emerald-500">✓</span>
                  {consigne}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}