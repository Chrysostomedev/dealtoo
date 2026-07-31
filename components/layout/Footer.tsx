"use client";

// ============================================================================
// Footer — Pied de page global Dealtoo (Light Mode Premium)
// ============================================================================

import {
  Flag,
  InspectIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COLONNES = [
  {
    titre: "Marketplace",
    liens: [
      { label: "Toutes les annonces", href: "/annonces" },
      { label: "Boutiques certifiées", href: "/boutiques" },
      { label: "Offres d'emploi", href: "/emploi" },
      { label: "Services aux particuliers", href: "/services" },
    ],
  },
  {
    titre: "Annonceurs",
    liens: [
      { label: "Publier une annonce", href: "/publier" },
      { label: "Tarifs & abonnements", href: "/tarifs" },
      { label: "Espace vendeur", href: "/annonceur/dashboard" },
      { label: "Boosts & visibilité", href: "/boosts" },
    ],
  },
  {
    titre: "Aide & Support",
    liens: [
      { label: "Centre d'aide / FAQ", href: "/faq" },
      { label: "Consignes de sécurité", href: "/securite" },
      { label: "Signaler un abus", href: "/signalement" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#FAF9F6] text-slate-700">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 lg:px-8">
        
        {/* Section Principale en 5 Colonnes */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Bloc Marque & Contact (2 colonnes lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block transition-transform duration-200 hover:scale-105">
              <Image
                src="/img/logo-dealtoo.png"
                alt="Dealtoo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600 font-medium">
              La plateforme de référence en Côte d&apos;Ivoire : achetez, vendez et dénichez les meilleures opportunités en toute confiance.
            </p>

            {/* Coordonnées & Réassurance */}
            <div className="space-y-2.5 text-xs font-semibold text-slate-600">
              <p className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-white text-[#FF6600] shadow-2xs border border-slate-200/80">
                  <MapPin className="size-3.5" />
                </span>
                Abidjan, Côte d&apos;Ivoire
              </p>
              <p className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-white text-[#FF6600] shadow-2xs border border-slate-200/80">
                  <Phone className="size-3.5" />
                </span>
                +225 07 00 00 00 00
              </p>
              <p className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-white text-[#FF6600] shadow-2xs border border-slate-200/80">
                  <Mail className="size-3.5" />
                </span>
                contact@dealtoo.ci
              </p>
            </div>

            {/* Réseaux Sociaux Réels */}
            <div className="flex gap-2 pt-2">
              {[
                { label: "Facebook", href: "https://facebook.com", icon: Flag },
                { label: "Instagram", href: "https://instagram.com", icon: InspectIcon },
                { label: "WhatsApp", href: "https://wa.me/2250700000000", icon: MessageCircle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-2xs border border-slate-200/80 transition-all hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600] hover:shadow-xs"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigational Links */}
          {COLONNES.map((colonne) => (
            <div key={colonne.titre} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {colonne.titre}
              </h3>
              <ul className="space-y-2.5">
                {colonne.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="text-xs font-semibold text-slate-500 transition-colors hover:text-[#FF6600]"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Banner Newsletter / Dealtoo Club */}
        <div className="mt-12 rounded-2xl bg-white p-5 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-[#FFC700] border border-amber-200/60 shrink-0">
              <ShieldCheck className="size-5 text-[#FF6600]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Achetez et vendez en toute sérénité</p>
              <p className="text-[11px] font-medium text-slate-500">Toutes les annonces et boutiques sont vérifiées par nos équipes.</p>
            </div>
          </div>

          <div className="flex w-full md:w-auto items-center gap-2">
            <input
              type="email"
              placeholder="Votre email..."
              className="w-full md:w-56 h-9 rounded-full border border-slate-200 bg-slate-50 px-3.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#FF6600]"
            />
            <button className="h-9 px-4 rounded-full bg-[#FF6600] text-white text-xs font-bold hover:bg-[#e05a00] transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs">
              <Send className="size-3" /> S'abonner
            </button>
          </div>
        </div>

        {/* Bas de Page / Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs font-semibold text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Dealtoo. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/cgu" className="transition-colors hover:text-slate-700">
              CGU / CGV
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-slate-700">
              Politique de Confidentialité
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-slate-700">
              Gestion des Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}