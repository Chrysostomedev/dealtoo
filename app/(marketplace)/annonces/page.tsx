"use client";

import { useMemo, useState } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Check, 
  Sparkles 
} from "lucide-react";
import { AnnonceCard } from "@/components/cards/AnnonceCard";
import { CategoriesSlider } from "@/components/ui/CategoriesSlider";
import { ANNONCES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AnnoncesPage() {
  const [categorieActive, setCategorieActive] = useState("tous");
  const [recherche, setRecherche] = useState("");
  const [tri, setTri] = useState<"recent" | "prix-asc" | "prix-desc"  >("recent");
  const [passFiltre, setPassFiltre] = useState<"tous" | "business" | "starter">("tous");
  const [afficherFiltresMobile, setAfficherFiltresMobile] = useState(false);
  const [prixMax, setPrixMax] = useState<number | "">("");

  // Filtrage combiné : Catégorie + Recherche + Pass + Prix + Tri
  const annoncesFiltrees = useMemo(() => {
    return ANNONCES.filter((annonce) => {
      // 1. Filtrage par Categorie
      if (categorieActive !== "tous") {
        const motsClefs: Record<string, string[]> = {
          electronique: ["iphone", "tech", "macbook", "ecran"],
          mode: ["polo", "lacoste", "vetement"],
          immobilier: ["terrain", "titré", "maison", "appartement"],
          véhicules: ["voiture", "toyota", "moto"],
        };
        const mots = motsClefs[categorieActive] ?? [];
        const matchCat = mots.some((m) =>
          annonce.titre.toLowerCase().includes(m)
        );
        if (!matchCat) return false;
      }

      // 2. Recherche Textuelle
      if (recherche.trim()) {
        const query = recherche.toLowerCase();
        const matchQuery =
          annonce.titre.toLowerCase().includes(query) ||
          annonce.localisation.toLowerCase().includes(query);
        if (!matchQuery) return false;
      }

      // 3. Filtre par Pass Abonnement
      if (passFiltre !== "tous") {
        if (annonce.planAbonnement !== passFiltre) return false;
      }

      // 4. Filtre par Prix Max
      if (prixMax !== "" && annonce.prix > Number(prixMax)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (tri === "prix-asc") return a.prix - b.prix;
      if (tri === "prix-desc") return b.prix - a.prix;
      return 0; // Défaut : Plus récent
    });
  }, [categorieActive, recherche, passFiltre, prixMax, tri]);

  const reinitialiserFiltres = () => {
    setCategorieActive("tous");
    setRecherche("");
    setTri("recent");
    setPassFiltre("tous");
    setPrixMax("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8 space-y-6">
      
      {/* En-tête de la page */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Toutes les annonces
        </h1>
        <p className="text-sm text-slate-500">
          Explorez les offres vérifiées près de chez vous.
        </p>
      </div>

      {/* Slider des Catégories (Stories WhatsApp UI) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs">
        <CategoriesSlider
          categorieActive={categorieActive}
          onSelectCategory={setCategorieActive}
        />
      </div>

      {/* Barre de Recherche et Bouton de Filtres */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Input Recherche */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Que recherchez-vous aujourd'hui ?"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-2xs placeholder:text-slate-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
          />
          {recherche && (
            <button
              onClick={() => setRecherche("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Contrôles et Filtres Rapides */}
        <div className="flex items-center gap-2">
          {/* Selecteur de Tri */}
          <div className="relative flex-1 sm:w-48">
            <select
              value={tri}
              onChange={(e) => setTri(e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-700 shadow-2xs focus:border-[#FF6600] focus:outline-none"
            >
              <option value="recent">Plus récents</option>
              <option value="prix-asc">Prix : Croissant</option>
              <option value="prix-desc">Prix : Décroissant</option>
            </select>
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Bouton Toggle Panneau de Filtres */}
          <button
            onClick={() => setAfficherFiltresMobile((v) => !v)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold shadow-2xs transition",
              afficherFiltresMobile
                ? "border-[#FF6600] bg-[#FF6600]/10 text-[#FF6600]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}
          >
            <SlidersHorizontal className="size-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Panneau de Filtres Avancés (Extensible) */}
      {afficherFiltresMobile && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-[#FF6600]" /> Filtres avancés
            </h3>
            <button
              onClick={reinitialiserFiltres}
              className="text-xs font-semibold text-slate-500 hover:text-[#FF6600]"
            >
              Réinitialiser tout
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Filtre Pass Vendeur */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Type de vendeur (Badge)
              </label>
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => setPassFiltre("tous")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-semibold transition",
                    passFiltre === "tous" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
                  )}
                >
                  Tous
                </button>
                <button
                  onClick={() => setPassFiltre("business")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-semibold transition flex items-center justify-center gap-1",
                    passFiltre === "business" ? "bg-amber-500 text-white shadow-2xs" : "text-slate-600"
                  )}
                >
                  Pro (B)
                </button>
                <button
                  onClick={() => setPassFiltre("starter")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-semibold transition flex items-center justify-center gap-1",
                    passFiltre === "starter" ? "bg-[#FF6600] text-white shadow-2xs" : "text-slate-600"
                  )}
                >
                  Starter (S)
                </button>
              </div>
            </div>

            {/* Plage de prix max */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Prix Maximum (FCFA)
              </label>
              <input
                type="number"
                placeholder="Ex: 100000"
                value={prixMax}
                onChange={(e) => setPrixMax(e.target.value ? Number(e.target.value) : "")}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-[#FF6600] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Résumé des filtres actifs */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>{annoncesFiltrees.length} annonces trouvées</span>
        {categorieActive !== "tous" && (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#FF6600]/10 px-2 py-1 text-[#FF6600] font-semibold">
            Catégorie : {categorieActive}
          </span>
        )}
      </div>

      {/* Grille d'Annonces */}
      {annoncesFiltrees.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center space-y-3">
          <Sparkles className="size-8 text-slate-300" />
          <p className="text-sm font-semibold text-slate-700">Aucune annonce ne correspond à votre recherche.</p>
          <button
            onClick={reinitialiserFiltres}
            className="text-xs font-bold text-[#FF6600] underline"
          >
            Effacer tous les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {annoncesFiltrees.map((annonce) => (
            <AnnonceCard key={annonce.id} {...annonce} />
          ))}
        </div>
      )}
    </div>
  );
}