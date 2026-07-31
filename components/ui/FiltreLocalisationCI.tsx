"use client";

// ============================================================================
// FiltreLocalisationCI — sélecteur de zone géographique (Abidjan / Intérieur)
// avec carte réelle de la Côte d'Ivoire.
// ============================================================================

import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

interface FiltreLocalisationCIProps {
  onSelectLocalisation?: (zone: string) => void;
}

const COMMUNES_ABIDJAN = [
  "Cocody",
  "Yopougon",
  "Marcory",
  "Abobo",
  "Koumassi",
  "Adjamé",
  "Port-Bouët",
  "Attécoubé",
  "Plateau",
  "Treichville",
];

const VILLES_INTERIEUR = [
  "Bouaké",
  "Yamoussoukro",
  "San-Pédro",
  "Korhogo",
  "Daloa",
  "Man",
  "Gagnoa",
];

// Coordonnées SVG des grandes villes, projetées à partir de leurs vraies
// coordonnées GPS (même projection/échelle que le tracé du pays ci-dessous).
const VILLES_SUR_CARTE = [
  { nom: "Abidjan", x: 293.8, y: 327.8, majeure: true },
  { nom: "Yamoussoukro", x: 217.5, y: 240.3, majeure: true },
  { nom: "Bouaké", x: 232.9, y: 188.9 },
  { nom: "San-Pédro", x: 137.2, y: 364.2 },
  { nom: "Korhogo", x: 197.2, y: 83.5 },
  { nom: "Daloa", x: 148.3, y: 237.3 },
  { nom: "Man", x: 82.5, y: 205.4 },
];

// Tracé réel de la Côte d'Ivoire
const TRACE_PAYS =
  "M 362.5,349.5 C 357.5,353.6 346.8,352.0 335.4,350.1 C 323.9,348.3 307.1,340.3 293.8,338.5 C 280.5,336.7 273.7,337.3 255.6,339.2 C 237.4,341.0 203.6,345.0 185.0,349.6 C 166.3,354.2 160.3,360.3 143.6,366.8 C 126.9,373.3 96.4,385.3 84.6,388.6 C 72.8,392.0 74.2,395.5 73.1,387.1 C 71.9,378.6 75.9,347.4 77.7,338.0 C 79.4,328.6 82.7,335.7 83.4,330.5 C 84.0,325.4 86.1,315.1 81.5,307.1 C 77.0,299.0 63.7,286.9 56.3,282.1 C 48.9,277.3 43.4,281.5 37.4,278.1 C 31.3,274.7 20.7,268.9 20.0,261.8 C 19.3,254.6 31.8,244.5 33.0,235.3 C 34.1,226.1 27.5,214.2 27.0,206.5 C 26.5,198.8 27.7,192.0 29.7,189.1 C 31.8,186.2 37.0,193.4 39.2,189.1 C 41.4,184.7 42.9,169.3 42.7,163.1 C 42.5,156.8 37.9,154.9 38.1,151.6 C 38.3,148.3 39.2,145.9 43.8,143.3 C 48.4,140.7 64.7,145.3 65.9,136.1 C 67.2,127.0 56.0,100.5 51.2,88.4 C 46.5,76.3 39.0,71.3 37.5,63.8 C 36.0,56.3 39.5,47.7 42.3,43.5 C 45.0,39.4 50.9,40.6 54.1,38.9 C 57.4,37.3 57.9,32.9 61.9,33.5 C 66.0,34.1 68.0,40.9 78.4,42.5 C 88.8,44.0 114.9,45.8 124.4,42.9 C 133.9,40.1 131.9,28.3 135.4,25.6 C 138.9,22.9 141.1,27.6 145.7,26.7 C 150.3,25.8 158.5,16.9 162.9,20.0 C 167.3,23.1 168.3,42.5 172.1,45.5 C 176.0,48.5 179.6,40.7 186.0,38.0 C 192.4,35.2 202.1,28.4 210.6,29.1 C 219.2,29.8 231.2,36.7 237.4,42.1 C 243.6,47.6 241.6,56.5 247.8,61.8 C 254.0,67.2 266.7,74.8 274.6,74.4 C 282.6,74.0 287.3,62.3 295.5,59.4 C 303.6,56.6 311.9,55.0 323.4,57.2 C 334.9,59.4 354.8,55.8 364.2,72.5 C 373.6,89.2 381.6,134.9 380.0,157.3 C 378.4,179.8 361.7,187.8 354.9,207.4 C 348.1,226.9 337.6,254.9 339.3,274.7 C 341.1,294.5 361.3,313.5 365.2,326.0 C 369.0,338.5 367.5,345.5 362.5,349.5 Z";

const VIEWBOX = { w: 400, h: 460 };
const TOUTE_LA_CI = "Toute la Côte d'Ivoire";

const ONGLETS = [
  { value: "abidjan", label: "Abidjan (communes)" },
  { value: "interieur", label: "Intérieur du pays" },
];

export function FiltreLocalisationCI({ onSelectLocalisation }: FiltreLocalisationCIProps) {
  const [selection, setSelection] = useState(TOUTE_LA_CI);
  const [recherche, setRecherche] = useState("");
  const [onglet, setOnglet] = useState<"abidjan" | "interieur">("abidjan");
  const [villeSurvolee, setVilleSurvolee] = useState<string | null>(null);

  const listeActive = onglet === "abidjan" ? COMMUNES_ABIDJAN : VILLES_INTERIEUR;
  const listeFiltree = useMemo(
    () => listeActive.filter((v) => v.toLowerCase().includes(recherche.toLowerCase())),
    [listeActive, recherche]
  );

  const choisir = (zone: string) => {
    setSelection(zone);
    onSelectLocalisation?.(zone);
  };

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-surface p-6 shadow-lg sm:p-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* ---------------------------------------------------------------- */}
        {/* Colonne gauche : recherche + sélection par badges                */}
        {/* ---------------------------------------------------------------- */}
        <div className="lg:col-span-7">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-500/15 text-brand-500 shadow-sm">
              <MapPin className="size-4.5" />
            </span>
            <h2 className="font-display text-xl font-semibold text-ink">
              Où cherchez-vous ?
            </h2>
          </div>

          <Tabs
            items={ONGLETS}
            value={onglet}
            onChange={(v) => setOnglet(v as "abidjan" | "interieur")}
            className="mb-4"
          />

          {/* Badges de zones — plus opaques + contraste couleur */}
          <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1">
            <BadgeZone
              label={TOUTE_LA_CI}
              actif={selection === TOUTE_LA_CI}
              onClick={() => choisir(TOUTE_LA_CI)}
            />
            {listeFiltree.map((ville) => (
              <BadgeZone
                key={ville}
                label={ville}
                actif={selection === ville}
                onClick={() => choisir(ville)}
              />
            ))}
            {listeFiltree.length === 0 && (
              <p className="py-2 text-sm text-ink-faint">
                Aucun résultat pour « {recherche} ».
              </p>
            )}
          </div>

          {/* Zone active */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
            <span className="text-ink-faint">Zone active</span>
            <span className="rounded-md bg-brand-500/15 px-3 py-1.5 font-medium text-brand-500 shadow-sm">
              {selection}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Colonne droite : carte réelle de la Côte d'Ivoire                 */}
        {/* ---------------------------------------------------------------- */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[400/460] w-full max-w-[280px] rounded-xl bg-white/[0.03] p-3 shadow-md">
            <svg
              viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
              className="size-full drop-shadow-sm"
            >
              {/* Fond léger + contour orange */}
              <path
                d={TRACE_PAYS}
                className="fill-brand-500/[0.08] stroke-orange-500 transition-colors duration-300"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {VILLES_SUR_CARTE.map((ville) => {
                const actif = selection === ville.nom;
                return (
                  <g
                    key={ville.nom}
                    className="cursor-pointer"
                    onClick={() => choisir(ville.nom)}
                    onMouseEnter={() => setVilleSurvolee(ville.nom)}
                    onMouseLeave={() => setVilleSurvolee(null)}
                  >
                    {/* Halo pulsé sur la ville sélectionnée */}
                    {actif && (
                      <motion.circle
                        cx={ville.x}
                        cy={ville.y}
                        r={ville.majeure ? 14 : 10}
                        className="fill-brand-500/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <circle
                      cx={ville.x}
                      cy={ville.y}
                      r={ville.majeure ? 6.5 : 5}
                      className={cn(
                        "stroke-surface transition-colors",
                        actif
                          ? "fill-brand-500"
                          : "fill-ink-faint hover:fill-orange-400"
                      )}
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Infobulle HTML flottante */}
            {villeSurvolee && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-white/15 bg-canvas/95 px-2.5 py-1 text-xs font-medium text-ink shadow-lg backdrop-blur-md"
                style={{
                  left: `${
                    (VILLES_SUR_CARTE.find((v) => v.nom === villeSurvolee)!.x /
                      VIEWBOX.w) *
                    100
                  }%`,
                  top: `${
                    (VILLES_SUR_CARTE.find((v) => v.nom === villeSurvolee)!.y /
                      VIEWBOX.h) *
                    100
                  }%`,
                }}
              >
                {villeSurvolee}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Badge de zone cliquable — contraste renforcé + ombre légère
function BadgeZone({
  label,
  actif,
  onClick,
}: {
  label: string;
  actif: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-sm transition-colors",
        actif
          ? "border-brand-500 bg-brand-500 text-white shadow-brand-500/25"
          : "border-white/15 bg-white/[0.06] text-ink-soft hover:border-orange-400/60 hover:bg-orange-500/10 hover:text-ink"
      )}
    >
      {actif && <Check className="size-3" />}
      {label}
    </motion.button>
  );
}