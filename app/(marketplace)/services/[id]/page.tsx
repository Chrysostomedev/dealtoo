import { 
  BadgeCheck, 
  MessageCircle, 
  Phone, 
  Share2, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ANNONCES } from "@/lib/mock-data";
import { formatPrix, formatVues } from "@/lib/utils";

const CONSIGNES = [
  "Rencontrez le prestataire dans un lieu sûr ou convenez des modalités du service à l'avance.",
  "Évitez les versements d'acomptes avant le début des travaux ou prestations.",
  "Exigez un devis ou une preuve écrite des termes convenus.",
  "Signalez tout comportement suspect au support de la plateforme.",
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Recherche dynamique (fallback sur première entrée mock si non trouvé)
  const annonce = ANNONCES.find((a) => a.id === id) || ANNONCES[0];

  if (!annonce && id !== "1") notFound();

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* En-tête Navigation */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-4 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="size-4" /> Retour aux services
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
          
          {/* Colonne Principale */}
          <div className="space-y-6">
            {/* Galerie / Image Principale */}
            <div className="relative aspect-video sm:aspect-[16/9] overflow-hidden rounded-3xl bg-slate-900 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={annonce.image || "https://images.unsplash.com/photo-1581092921461-eab62e97a780"}
                alt={annonce.titre}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <span className="rounded-2xl bg-white/95 backdrop-blur-md px-5 py-2.5 font-mono text-2xl font-black text-slate-900 shadow-lg">
                  {formatPrix(annonce.prix)}
                </span>
                <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
                  {formatVues(annonce.vues || 142)} vues
                </span>
              </div>
            </div>

            {/* Titre & Métadonnées */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-xl bg-orange-50 px-3 py-1 text-xs font-bold text-[#FF6600]">
                  Service Certifié
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (24 avis)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {annonce.titre}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-slate-400" />
                  {annonce.localisation}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4 text-slate-400" />
                  Disponible immédiatement
                </span>
              </div>
            </div>

            {/* Description détaillée */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Description du service</h2>
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                Prestataire qualifié proposant des interventions sur-mesure et garanties.
                Équipement professionnel adapté aux normes en vigueur. Prise de rendez-vous rapide 
                et devis personnalisé sur demande. N&apos;hésitez pas à contacter pour toute information complémentaire.
              </p>
            </div>
          </div>

          {/* Colonne Latérale (Vendeur + Actions) */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            
            {/* Carte Prestataire */}
            <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center gap-4">
                <Avatar nom={annonce.vendeur} taille="md" className="size-14 text-base font-bold" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-base font-bold text-slate-900">
                    {annonce.vendeur}
                    <BadgeCheck className="size-5 text-[#FF6600]" />
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Membre vérifié · Actif</p>
                </div>
              </div>

              {/* Actions de contact direct */}
              <div className="space-y-2.5">
                <Button className="w-full h-12 bg-[#FF6600] hover:bg-[#E55C00] text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer">
                  <MessageCircle className="size-5" /> Contacter sur WhatsApp
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-11 rounded-2xl font-bold border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="size-4" /> Appeler
                  </Button>
                  <Button variant="outline" className="h-11 rounded-2xl font-bold border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer">
                    <Share2 className="size-4" /> Partager
                  </Button>
                </div>
              </div>
            </div>

            {/* Consignes de sécurité */}
            <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldCheck className="size-5 text-emerald-600" />
                Conseils de sécurité
              </h3>
              <ul className="space-y-2.5">
                {CONSIGNES.map((consigne, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium leading-normal">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>{consigne}</span>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}