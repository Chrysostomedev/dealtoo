"use client";

import { Bell, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PanierTrigger } from "@/components/ui/Panier";
import { NotificationPanel } from "@/components/modals/NotificationPanel";
import { SearchPalette } from "@/components/ui/SearchPalette";

const NAV = [
  { label: "Annonces", href: "/annonces" },
  { label: "Emploi", href: "/emploi" },
  { label: "Services", href: "/services" },
];

export function Header() {
  const pathname = usePathname();
  const [paletteOuverte, setPaletteOuverte] = useState(false);
  const [notifOuverte, setNotifOuverte] = useState(false);

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
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:px-8">
          
          {/* Logo Élargi & Redimensionné */}
          <Link href="/" className="group relative shrink-0 flex items-center">
            <Image
              src="/img/logo-dealtoo.png"
              alt="Dealtoo"
              width={135}
              height={40}
              priority
              className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Navigation avec slider orange dynamique */}
          <nav className="relative hidden items-center gap-1 lg:flex">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-1 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/30 shadow-2xs transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
            />
            {NAV.map((item, i) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  ref={(el) => {
                    navRefs.current[i] = el;
                  }}
                  href={item.href}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    active ? "text-[#FF6600]" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Barre de Recherche Contrastée */}
          <div className="hidden flex-1 items-center lg:flex">
            <button
              onClick={() => setPaletteOuverte(true)}
              className="ml-2 flex w-full max-w-md items-center gap-3 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-left shadow-2xs transition-all duration-200 hover:border-[#FF6600]/50 hover:bg-white hover:shadow-xs focus-visible:outline-none"
            >
              <Search className="size-4 text-slate-400" />
              <span className="w-full truncate text-sm font-medium text-slate-500">Que recherchez-vous ?</span>
              <span className="hidden items-center gap-1 text-xs font-semibold text-slate-400 xl:flex">
                <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 shadow-2xs">⌘K</kbd>
              </span>
            </button>
          </div>

          {/* Actions Droite avec Pep's */}
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setPaletteOuverte(true)}
              className="flex size-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Rechercher"
            >
              <Search className="size-5" />
            </button>

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

            <PanierTrigger />

            {/* Selecteur de Mode Pro & Bien Lisible */}
            <select
              onChange={(e) => {
                if (e.target.value === "admin") {
                  window.location.href = "/admin";
                } else if (e.target.value === "annonceur") {
                  window.location.href = "/dashboard";
                }
              }}
              defaultValue=""
              className="hidden md:inline-flex h-10 appearance-none rounded-full border border-amber-300 bg-amber-50/80 px-4 pr-9 text-xs font-bold text-amber-900 hover:border-amber-400 hover:bg-amber-100/80 focus:outline-none cursor-pointer transition-all shadow-2xs"
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
            <Button
              className="hidden md:inline-flex items-center gap-2 bg-[#FF6600] text-white font-bold hover:bg-[#e05a00] shadow-md shadow-[#FF6600]/20 rounded-full px-5 h-10 transition-all hover:scale-105"
            >
              <Plus className="size-4 stroke-[2.5]" /> Publier
            </Button>
          </div>

        </div>
      </header>

      <SearchPalette isOpen={paletteOuverte} onClose={() => setPaletteOuverte(false)} />
      <NotificationPanel isOpen={notifOuverte} onClose={() => setNotifOuverte(false)} />
    </>
  );
}