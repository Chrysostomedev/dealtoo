import { 
  Calendar, 
  GraduationCap, 
  MapPin, 
  Star, 
  Wrench, 
  Clock, 
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ServiceType = "service" | "formation" | "evenement";

export interface ServiceCardProps {
  id: string;
  titre: string;
  prestataire: string;
  categorie?: string;
  type?: ServiceType;
  prix: string;
  note?: number;
  avisCount?: number;
  localisation: string;
  dateOuDuree?: string;
  image?: string;
  certifie?: boolean;
}

const TYPE_CONFIG = {
  service: {
    label: "Service",
    icon: Wrench,
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
  },
  formation: {
    label: "Formation",
    icon: GraduationCap,
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200/80",
  },
  evenement: {
    label: "Événement",
    icon: Calendar,
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
  },
};

export function ServiceCard({
  id,
  titre,
  prestataire,
  type = "service",
  prix,
  note = 4.8,
  avisCount = 12,
  localisation,
  dateOuDuree,
  image,
  certifie = false,
}: ServiceCardProps) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.service;
  const TypeIcon = config.icon;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">
      {/* Lien overlay global rendant TOUTE la carte cliquable vers /services/id */}
      <Link href={`/services/${id}`} className="absolute inset-0 z-20 focus:outline-none">
        <span className="sr-only">Voir {titre}</span>
      </Link>

      <div>
        {/* Visuel d'en-tête si présent */}
        {image && (
          <div className="relative mb-3.5 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={titre}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        {/* En-tête : Badge Type & Note */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold tracking-wide shadow-2xs",
              config.badgeClass
            )}
          >
            <TypeIcon className="size-3.5" />
            {config.label}
          </span>

          <div className="flex items-center gap-1 rounded-xl bg-amber-50/80 px-2.5 py-1 border border-amber-200/60 text-xs font-semibold text-slate-800 backdrop-blur-xs">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{note}</span>
            <span className="text-[10px] text-slate-400">({avisCount})</span>
          </div>
        </div>

        {/* Titre avec bouton flèche sur survol */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-[#FF6600]">
            {titre}
          </h3>
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all group-hover:bg-[#FF6600] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Prestataire */}
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <span>{prestataire}</span>
          {certifie && <CheckCircle2 className="size-3.5 text-[#FF6600]" />}
        </p>
      </div>

      {/* Pied de carte : Localisation, Durée & Tarif */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 truncate font-medium">
            <MapPin className="size-3.5 shrink-0 text-slate-400" />
            {localisation}
          </span>
          {dateOuDuree && (
            <span className="flex items-center gap-1 shrink-0 text-slate-400 font-medium">
              <Clock className="size-3.5" />
              {dateOuDuree}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400 font-medium">Tarif estimé</span>
          <span className="text-base font-black text-slate-900 font-mono">
            {prix}
          </span>
        </div>
      </div>
    </div>
  );
}