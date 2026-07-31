"use client";

import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InfinityGlyph } from "@/components/ui/InfinityGlyph";

const SUGGESTIONS = [
  { label: "Annonces", href: "/annonces" },
  { label: "Emploi", href: "/emploi" },
  { label: "Services", href: "/services" },
  { label: "Fidélis", href: "/fidelis" },
];

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-20">
      {/* Blobs de couleur ambiants, pulsent doucement */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-gold-glow)" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Le glyphe infini se "trace" en boucle : on a fait le tour, sans la trouver */}
        <div className="relative mb-2">
          <InfinityGlyph variant="trace" size={220} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[image:var(--gradient-brand)] bg-clip-text font-display text-7xl font-bold tracking-tight text-transparent sm:text-8xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl"
        >
          On a fait le tour, sans la trouver.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-3 max-w-md text-sm text-ink-soft sm:text-base"
        >
          Cette page a peut-être été déplacée, vendue, ou n'a jamais existé. Repartons de
          l'accueil, ou lancez une nouvelle recherche.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-400/30 sm:w-auto"
            >
              <Home className="size-4" /> Retour à l'accueil
            </Button>
          </Link>
          <Button
            variant="glass"
            size="lg"
            className="w-full transition-all duration-200 hover:border-brand-500/30 hover:shadow-md hover:shadow-brand-500/10 sm:w-auto"
          >
            <Search className="size-4" /> Lancer une recherche
          </Button>
        </motion.div>

        {/* Suggestions rapides, flottent légèrement pour rester vivantes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {SUGGESTIONS.map((s, i) => (
            <motion.div
              key={s.href}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut" }}
            >
              <Link
                href={s.href}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-gold-400/30 hover:bg-gradient-to-r hover:from-brand-500/15 hover:to-gold-400/10 hover:text-ink"
              >
                {s.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}