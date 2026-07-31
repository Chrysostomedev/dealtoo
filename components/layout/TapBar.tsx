"use client";

import { motion } from "framer-motion";
import { Heart, Home, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Recherche", href: "/recherche", icon: Search },
  { label: "publier", href: "/publier", icon: Plus }, // bouton central spécial
  { label: "Favoris", href: "/favoris", icon: Heart },
  { label: "Profil", href: "/profil", icon: User },
] as const;

export function TapBar() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-canvas/80 backdrop-blur-2xl md:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-between px-2">
        {ITEMS.map((item) => {
          const actif = pathname === item.href;

          if (item.href === "/publier") {
            return (
              <li key={item.href} className="-mt-6">
                <Link href={item.href} className="flex flex-col items-center gap-1">
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className="flex size-14 items-center justify-center rounded-full bg-gold-500 text-canvas shadow-[0_8px_24px_rgba(255,201,60,0.45)]"
                  >
                    <item.icon className="size-6" strokeWidth={2.5} />
                  </motion.span>
                </Link>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-3 text-[11px] transition-colors",
                  actif ? "text-brand-500" : "text-ink-faint"
                )}
              >
                <span className="relative">
                  <item.icon className="size-5" strokeWidth={actif ? 2.5 : 2} />
                  {actif && (
                    <motion.span
                      layoutId="tapbar-dot"
                      className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand-500"
                    />
                  )}
                </span>
                <span className="capitalize">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}