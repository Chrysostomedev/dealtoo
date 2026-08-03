// ============================================================================
// app/(marketplace)/annonce/[id]/page.tsx — Détail d'une annonce (Redesign UX/UI)
// ============================================================================

import {
  BadgeCheck,
  Eye,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Clock,
  ThumbsUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ANNONCES } from "@/lib/mock-data";
import { formatPrix, formatVues, cn } from "@/lib/utils";
import { AnnonceGallery } from "@/components/sections/AnnonceGallery";

const CONSIGNES = [
  "Rencontrez toujours le vendeur dans un lieu public et fréquenté.",
  "Vérifiez méticuleusement l'état du produit avant toute transaction.",
  "Effectuez le paiement uniquement après réception et vérification.",
  "Évitez les virements anticipés si vous n'avez pas vu l'article.",
];

// Mock d'images supplémentaires pour le slider
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop",
];

// Mock des avis reçus par le vendeur
const MOCK_AVIS = [
  {
    id: "1",
    auteur: "Kouassi Jean",
    date: "Il y a 2 jours",
    note: 5,
    commentaire:
      "Vendeur réactif et produit conforme à la description. Transaction fluide à Cocody.",
  },
  {
    id: "2",
    auteur: "Awa Koné",
    date: "Il y a 1 semaine",
    note: 4,
    commentaire:
      "Article en très bon état. Petit retard au rendez-vous mais très poli.",
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnnonceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const annonce = ANNONCES.find((a) => a.id === id);

  if (!annonce) notFound();

  // Combinaison des images (image principale + mock galerie)
  const galerieImages = [annonce.image, ...MOCK_IMAGES];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <div className="mb-6">
  <Link
    href="/annonces"
    className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
    aria-label="Retourner aux annonces"
  >
    <ArrowLeft className="size-5" />
  </Link>
</div>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
       {/* Bouton Retour en haut de page */}

        {/* Colonne principale : Galerie + Description + Avis */}
        <div className="space-y-6">
          {/* Composant Galerie d'images */}
          <AnnonceGallery
            images={galerieImages}
            titre={annonce.titre}
            prix={formatPrix(annonce.prix)}
            nombreFavoris={42}
          />

          {/* Informations sur l'Annonce */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <h1 className="text-2xl font-bold text-slate-900 leading-snug">
              {annonce.titre}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="size-4 text-slate-400" />
                {annonce.localisation}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-4 text-slate-400" />
                {formatVues(annonce.vues)} vues
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4 text-slate-400" />
                Publié il y a 3h
              </span>
            </div>

            {/* Séparateur */}
            <div className="my-5 h-px bg-slate-100" />

            {/* Description */}
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">
                Description de l'article
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                Article en parfait état de fonctionnement, vendu avec tous ses accessoires
                d&apos;origine. Aucune égratignure majeure. 
                \nPossibilité de tester sur place avant achat. Prix légèrement négociable dans la limite du raisonnable.
              </p>
            </div>
          </div>

          {/* Section Avis clients */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Avis sur le vendeur
                </h2>
                <p className="text-xs text-slate-500"> Basé sur 18 évaluations </p>
              </div>

              {/* Note Globale */}
              <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60">
                <Star className="size-5 fill-amber-400 text-amber-400" />
                <span className="text-base font-bold text-slate-900">4.8</span>
                <span className="text-xs text-slate-500">/ 5</span>
              </div>
            </div>

            {/* Liste des commentaires */}
            <div className="space-y-3 pt-2">
              {MOCK_AVIS.map((avis) => (
                <div
                  key={avis.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">
                      {avis.auteur}
                    </span>
                    <span className="text-[11px] text-slate-400">{avis.date}</span>
                  </div>

                  {/* Étoiles */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-3.5",
                          i < avis.note
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        )}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {avis.commentaire}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne latérale : Vendeur + Contact + Sécurité */}
        <aside className="space-y-6">
          {/* Carte Vendeur */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <Avatar nom={annonce.vendeur} taille="md" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900 truncate">
                  {annonce.vendeur}
                  {annonce.certifie && (
                    <BadgeCheck className="size-4 shrink-0 text-[#FF6600]" />
                  )}
                </p>
                <p className="text-xs text-slate-500">Membre actif · Rejoint en 2024</p>
              </div>
            </div>

            {/* Badge Abonnement Vendeur */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs">
              <span className="text-slate-600 font-medium">Statut compte</span>
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-600 border border-amber-200">
                Business Pro (B)
              </span>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-2 pt-1">
              <Button
                variant="brand"
                size="lg"
                className="w-full justify-center gap-2 bg-[#FF6600] hover:bg-[#e55c00] text-white font-semibold rounded-xl"
              >
                <MessageCircle className="size-5" /> Envoyer un message
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center gap-2 border-slate-200 hover:bg-slate-50 rounded-xl"
                >
                  <Phone className="size-4 text-emerald-600" /> Appeler
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center gap-2 border-slate-200 hover:bg-slate-50 rounded-xl"
                >
                  <Share2 className="size-4 text-slate-600" /> Partager
                </Button>
              </div>
            </div>
          </div>

          {/* Consignes de Sécurité */}
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-5 shadow-xs">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-900">
              <ShieldCheck className="size-5 text-amber-600" /> Consignes de sécurité
            </h3>
            <ul className="space-y-2.5">
              {CONSIGNES.map((consigne, i) => (
                <li key={i} className="flex gap-2 text-xs text-amber-950/80 leading-snug">
                  <ThumbsUp className="size-3.5 shrink-0 text-amber-600 mt-0.5" />
                  <span>{consigne}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}