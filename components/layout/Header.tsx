 "use client";

import { 
  Bell, 
  ChevronDown, 
  Plus, 
  Search, 
  LayoutGrid, 
  Users, 
  Sparkles, 
  Briefcase,
  Video
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PanierTrigger } from "@/components/ui/Panier";
import { NotificationPanel } from "@/components/modals/NotificationPanel";
import { SearchPalette } from "@/components/ui/SearchPalette";

// Liste des pays disponibles
const PAYS = [
  { code: "CI", nom: "Côte d'Ivoire", flagColors: ["#F77F00", "#FFFFFF", "#009E60"] },
  { code: "SN", nom: "Sénégal", flagColors: ["#00853F", "#FDEF42", "#E31B23"] },
  { code: "CM", nom: "Cameroun", flagColors: ["#007A5E", "#CE1126", "#FCD116"] },
  { code: "ML", nom: "Mali", flagColors: ["#14B53A", "#FCD116", "#CE1126"] },
  { code: "BF", nom: "Burkina Faso", flagColors: ["#EF2B2D", "#009E49", "#FCD116"] },
];

// Sous-menu pour "Annonces"
const ANNONCES_SUBMENU = [
  { label: "Parcourir", desc: "Toutes les annonces", href: "/annonces", icon: LayoutGrid },
  // { label: "Nos abonnés", desc: "Vendeurs certifiés", href: "/vendeurs", icon: Users },
  { label: "Top annonces", desc: "Offres populaires", href: "/annonces/top", icon: Sparkles },
  { label: "Annonces Business", desc: "Offres professionnelles", href: "/offres-pro", icon: Briefcase },
];

const NAV = [
  { label: "Annonces", href: "/annonces", hasDropdown: true },
  { label: "Emploi", href: "/emploi" },
  { label: "Tarifs", href: "/offres-pro" },
   { label: "Fidelis", href: "/vendeurs" },
    { label: "En ligne", href: "/ligne" },
];

export function Header() {
  const pathname = usePathname();
  const [paletteOuverte, setPaletteOuverte] = useState(false);
  const [notifOuverte, setNotifOuverte] = useState(false);

  // État pour le pays sélectionné
  const [paysSelectionne, setPaysSelectionne] = useState(PAYS[0]);
  const [paysMenuOuvert, setPaysMenuOuvert] = useState(false);
  const paysMenuRef = useRef<HTMLDivElement>(null);

  // --- Slider animé du menu actif -----------------------------------------
  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useLayoutEffect(() => {
    const index = NAV.findIndex((item) => pathname?.startsWith(item.href));
    const el = navRefs.current[index];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((s) => ({ ...s, opacity: 0 }));
    }
  }, [pathname]);

  // --- Fermer le menu pays au clic extérieur ------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paysMenuRef.current && !paysMenuRef.current.contains(e.target as Node)) {
        setPaysMenuOuvert(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Raccourci clavier ⌘K / Ctrl+K pour ouvrir la recherche -------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOuverte(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* HEADER LIGHT PREMIUM WITH PEPS */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-2xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 lg:gap-6 px-4 lg:px-8">
          
          {/* Logo & Cercle Pays */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="group relative shrink-0 flex items-center">
              <Image
                src="https://dealtoo.co/img/Dealtoo.gif?v=1751539804"
                alt="Dealtoo"
                width={135}
                height={40}
                unoptimized
              />
            </Link>

            {/* Menu Déroulant Sélection Pays avec Cercle Drapeau */}
            <div className="relative" ref={paysMenuRef}>
              <button
                onClick={() => setPaysMenuOuvert(!paysMenuOuvert)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
                title={`Pays actuel : ${paysSelectionne.nom}`}
                aria-label="Sélectionner le pays"
              >
                {/* Cercle Drapeau Tricolore */}
                <div className="relative size-7 overflow-hidden rounded-full border border-slate-300 shadow-xs flex shrink-0">
                  <div className="h-full flex-1" style={{ backgroundColor: paysSelectionne.flagColors[0] }} />
                  <div className="h-full flex-1" style={{ backgroundColor: paysSelectionne.flagColors[1] }} />
                  <div className="h-full flex-1" style={{ backgroundColor: paysSelectionne.flagColors[2] }} />
                </div>
                <ChevronDown className={`size-3.5 text-slate-500 transition-transform duration-200 ${paysMenuOuvert ? "rotate-180" : ""}`} />
              </button>

              {/* Popup Liste des Pays */}
              {paysMenuOuvert && (
                <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    Changer de pays
                  </div>
                  {PAYS.map((p) => (
                    <button
                      key={p.code}
                      onClick={() => {
                        setPaysSelectionne(p);
                        setPaysMenuOuvert(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                        paysSelectionne.code === p.code
                          ? "bg-[#FF6600]/10 text-[#FF6600]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="relative size-5 overflow-hidden rounded-full border border-slate-300 flex shrink-0">
                        <div className="h-full flex-1" style={{ backgroundColor: p.flagColors[0] }} />
                        <div className="h-full flex-1" style={{ backgroundColor: p.flagColors[1] }} />
                        <div className="h-full flex-1" style={{ backgroundColor: p.flagColors[2] }} />
                      </div>
                      <span className="truncate">{p.nom}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation avec slider orange dynamique et sous-menu Annonces */}
          <nav className="relative hidden items-center gap-1 lg:flex">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-1 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/30 shadow-2xs transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
            />
            {NAV.map((item, i) => {
              const active = pathname?.startsWith(item.href);

              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="relative group">
                    <Link
                      ref={(el) => {
                        navRefs.current[i] = el;
                      }}
                      href={item.href}
                      className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        active ? "text-[#FF6600]" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Menu Déroulant "Annonces" */}
                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50 min-w-[240px] animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl ring-1 ring-black/5">
                        {ANNONCES_SUBMENU.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50 group/sub"
                            >
                              <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover/sub:bg-[#FF6600]/10 group-hover/sub:text-[#FF6600]">
                                <Icon className="size-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 group-hover/sub:text-[#FF6600]">
                                  {sub.label}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {sub.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  ref={(el) => {
                    navRefs.current[i] = el;
                  }}
                  href={item.href}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    active ? "text-orange-400" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          

          {/* Actions Droite avec Pep's */}
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setPaletteOuverte(true)}
              className="flex items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Rechercher"
            >
              <Search className="size-5" />
            </button>
{/* Bouton de recherche */}
          <div className="hidden flex-1 items-center lg:flex">
            <button
              onClick={() => setPaletteOuverte(true)}
              className="ml-2 flex   max-w-md items-center gap-3 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-left shadow-2xs transition-all duration-200 hover:border-[#FF6600]/50 hover:bg-white hover:shadow-xs focus-visible:outline-none"
            >
              <Search className="size-4 text-slate-400" />
             
            </button>
          </div>
            <button
              onClick={() => setNotifOuverte(true)}
              className="relative hidden size-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:flex"
              aria-label="Notifications"
            >
              
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6600] opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[#FF6600]" />
              </span>
              
            </button>

            {/* <PanierTrigger /> */}

            {/* Selecteur de Mode Pro & Bien Lisible */}
            <select
              onChange={(e) => {
                if (e.target.value === "admin") {
                  window.location.href = "/admin/connexion";
                } else if (e.target.value === "annonceur") {
                  window.location.href = "/dashboard";
                }
              }}
              defaultValue=""
              className="hidden md:inline-flex h-10 appearance-none rounded-full border border-orange-300 bg-orange-50/80 px-4 pr-9 text-xs font-bold text-amber-900 hover:border-amber-400 hover:bg-amber-100/80 focus:outline-none cursor-pointer transition-all shadow-2xs"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b45309' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="" disabled>
                Mode
              </option>
              <option value="admin">Admin</option>
              <option value="annonceur">Annonceur</option>
            </select>

            {/* Bouton Publier Lumineux */}
            <Link href="/publier" 
              className="hidden md:inline-flex items-center gap-2 bg-orange-400 text-white font-bold hover:bg-orange-300 shadow-md shadow-[#FF6600]/20 rounded-full px-5 h-10 transition-all hover:scale-105"
            >
              <Plus className="size-4 stroke-[2.5]" /> Publier
            </Link>
          </div>

        </div>
      </header>

      <SearchPalette isOpen={paletteOuverte} onClose={() => setPaletteOuverte(false)} />
      <NotificationPanel isOpen={notifOuverte} onClose={() => setNotifOuverte(false)} />
    </>
  );
}