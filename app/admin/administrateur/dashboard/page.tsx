"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ShieldAlert, CheckCircle2, XCircle, Clock } from "lucide-react";

// Composants de mise en page et UI
import PageHeader from "@/components/admin/ui/PageHeader";
import StatsCard from "@/components/admin/cards/StatsCard";
import ListCard from "@/components/admin/cards/ListCard";
import DonutChartCard from "@/components/admin/cards/DonutChartCard";
import BarChartCard from "@/components/admin/cards/BarChartCard";
import DataTable, { ColumnConfig } from "@/components/admin/ui/DataTable";
import SideDetailsPanel from "@/components/admin/ui/SideDetailsPanel";

// Contextes & Hooks
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { formatDateRelative } from "@/lib/utils";

// ── Mappings & Constantes Thématiques DEALTOO ──────────────────────────────

const MOIS_LABELS = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc",
];

// Palette d'accents DEALTOO : Orange, Ambre, Indigo, Émeraude, Ardoise
const DONUT_COLORS = ["#f97316", "#eab308", "#6366f1", "#10b981", "#64748b"];

// Nuancier de barres adapté à la DA DEALTOO
const BAR_COLORS = [
  "#f97316", "#ea580c", "#c2410c", "#9a3412",
  "#eab308", "#ca8a04", "#a16207", "#713f12",
  "#6366f1", "#4f46e5", "#4338ca", "#3730a3",
];

// Statuts de modération et transactions
const AD_STATUS_LABELS: Record<string, string> = {
  EN_ATTENTE: "En attente",
  VALIDE: "Validée",
  REJETE: "Rejetée",
  SUSPENDU: "Suspendue",
  FLAGGED: "Alerte Fraude",
};

const AD_STATUS_STYLES: Record<string, string> = {
  EN_ATTENTE: "border-amber-300 text-amber-700 bg-amber-50",
  VALIDE: "border-emerald-300 text-emerald-700 bg-emerald-50",
  REJETE: "border-rose-300 text-rose-700 bg-rose-50",
  SUSPENDU: "border-slate-300 text-slate-700 bg-slate-100",
  FLAGGED: "border-orange-500 text-orange-800 bg-orange-100 animate-pulse",
};

// ── Types pour la table des annonces récentes ─────────────────────────────

type RecentAdRow = {
  id: string;
  reference: string;
  title: string;
  sellerName: string;
  category: string;
  price: number;
  status: "EN_ATTENTE" | "VALIDE" | "REJETE" | "SUSPENDU" | "FLAGGED";
  createdAt: string;
};

// ── Composant Principal Dashboard ──────────────────────────────────────────

export default function Dashboard() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // ── Builders de données pour les graphiques ──────────────────────────────

  const buildBarData = () => {
    return MOIS_LABELS.map((label, i) => ({
      label,
      value: [12, 19, 15, 22, 30, 28, 35, 42, 38, 45, 50, 60][i] * 100000,
      color: BAR_COLORS[i % BAR_COLORS.length],
    }));
  };

  const buildDonutData = () => {
    return [
      { label: "Starter (Gratuit)", value: 65, color: DONUT_COLORS[0] },
      { label: "Business", value: 20, color: DONUT_COLORS[1] },
      { label: "Business Pro", value: 10, color: DONUT_COLORS[2] },
      { label: "Capsules & Flash", value: 5, color: DONUT_COLORS[3] },
    ];
  };

  const buildListItems = () => {
    return [
      { id: "v1", name: "IvoirTech Store", subText: "48 annonces • 120,000 FCFA d'achats" },
      { id: "v2", name: "Auto Abidjan", subText: "32 annonces • 350,000 FCFA d'achats" },
      { id: "v3", name: "Immo Riviera", subText: "29 annonces • 500,000 FCFA d'achats" },
      { id: "v4", name: "Mode & Design Marcory", subText: "19 annonces • 45,000 FCFA d'achats" },
    ];
  };

  // ── Modale latérale de détail ───────────────────────────────────────────

  const handleOpenDetails = (ad: RecentAdRow) => {
    setSelectedAd({
      id: ad.id,
      title: ad.title,
      reference: ad.reference,
      description: "Annonce soumise pour validation sur le réseau DEALTOO Côte d'Ivoire.",
      fields: [
        { label: "Vendeur", value: ad.sellerName },
        { label: "Catégorie", value: ad.category },
        { label: "Prix affiché", value: `${ad.price.toLocaleString("fr-FR")} FCFA` },
        { label: "Date de création", value: formatDateRelative(ad.createdAt) },
        {
          label: "Statut",
          value: AD_STATUS_LABELS[ad.status] ?? ad.status,
          isStatus: true,
          statusColor:
            ad.status === "VALIDE" ? "#10b981" :
            ad.status === "EN_ATTENTE" ? "#eab308" :
            ad.status === "FLAGGED" ? "#f97316" : "#f43f5e",
        },
      ],
    });
    setIsDetailsOpen(true);
  };

  // ── Structure du Tableau ──────────────────────────────────────────────────

  const columns: ColumnConfig<RecentAdRow>[] = [
    {
      header: "Réf / Annonce",
      key: "title",
      render: (_, row) => (
        <div>
          <span className="text-[11px] font-mono font-semibold text-orange-600 block">
            #{row.reference}
          </span>
          <span className="font-semibold text-slate-800 text-xs line-clamp-1">
            {row.title}
          </span>
        </div>
      ),
    },
    {
      header: "Vendeur",
      key: "sellerName",
      render: (_, row) => <span className="text-xs text-slate-600">{row.sellerName}</span>,
    },
    {
      header: "Catégorie",
      key: "category",
      render: (_, row) => (
        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[11px] text-slate-600 font-medium">
          {row.category}
        </span>
      ),
    },
    {
      header: "Prix (FCFA)",
      key: "price",
      render: (_, row) => (
        <span className="font-semibold text-slate-900 text-xs">
          {row.price.toLocaleString("fr-FR")} FCFA
        </span>
      ),
    },
    {
      header: "Statut",
      key: "status",
      render: (_, row) => {
        const s = row.status;
        return (
          <span
            className={`inline-flex items-center justify-center px-2.5 py-1 rounded-xl border text-[11px] font-bold ${
              AD_STATUS_STYLES[s] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {AD_STATUS_LABELS[s] ?? s}
          </span>
        );
      },
    },
    {
      header: "Actions",
      key: "actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenDetails(row)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-orange-600 hover:border-orange-200 transition-colors"
            title="Aperçu rapide"
          >
            <Eye size={15} />
          </button>
          <Link
            href={`/admin/adminstrateur/moderation/annonces/${row.id}`}
            className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium hover:bg-orange-600 transition-colors"
          >
            Modérer
          </Link>
        </div>
      ),
    },
  ];

  // Données de démonstration du tableau
  const mockRecentAds: RecentAdRow[] = [
    { id: "1", reference: "DLT-8941", title: "iPhone 15 Pro Max 256Go Scellé", sellerName: "Kouassi Electronics", category: "High-Tech", price: 750000, status: "EN_ATTENTE", createdAt: "2026-08-04" },
    { id: "2", reference: "DLT-8940", title: "Villa 5 Pièces avec Piscine - Riviera 3", sellerName: "ImmoIvoire SARL", category: "Immobilier", price: 185000000, status: "VALIDE", createdAt: "2026-08-04" },
    { id: "3", reference: "DLT-8939", title: "Toyota RAV4 Année 2022 Neuf", sellerName: "Akwaba Auto", category: "Véhicules", price: 16500000, status: "FLAGGED", createdAt: "2026-08-03" },
    { id: "4", reference: "DLT-8938", title: "Sac à main Luxe Marque", sellerName: "Boutique Trend", category: "Mode", price: 25000, status: "REJETE", createdAt: "2026-08-03" },
  ];

  return (
    <div className="space-y-8">
      {/* ── En-tête de la page ── */}
      <PageHeader
        title="Tableau de Bord Global"
        subtitle="Supervision du chiffre d'affaires, de la modération et de l'activité commerciale DEALTOO."
      />

      {/* ── Section 1 : KPIs Financiers & Recharges ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          label="CA Recharges (Mois)"
          value={`${(4850000).toLocaleString("fr-FR")} FCFA`}
          delta="+18.4%"
          trend="up"
          href="/admin/administrateur/finance/portefeuilles"
        />
        <StatsCard
          label="Crédits Dépensés"
          value={(124500).toLocaleString("fr-FR")}
          delta="+12.1%"
          trend="up"
          href="/admin/administrateur/finance/portefeuilles"
        />
        <StatsCard
          label="Souscriptions Forfaits"
          value={342}
          delta="+5.3%"
          trend="up"
          href="/admin/forfaits"
        />
        <StatsCard
          label="Volume Interactions"
          value={(18920).toLocaleString("fr-FR")}
          delta="-2.1%"
          trend="down"
          href="/admin/administrateur/tarification/interactions"
        />
      </div>

      {/* ── Section 2 : KPIs Modération & Utilisateurs ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard
          label="Annonces en Attente"
          value={28}  
          delta="À traiter"
          trend="neutral"
          href="/admin/administrateur/moderateur/annonces"
        />
        <StatsCard
          label="Alertes Antifraude Actives"
          value={4}
          delta="Haute priorité"
          trend="down"
          href="/admin/administrateur/antifraude"
        />
        <StatsCard
          label="Vendeurs Vérifiés (Tel)"
          value="89%"
          delta="+4.0%"
          trend="up"
          href="/admin/administrateur/users"
        />
      </div>

      {/* ── Section 3 : Graphiques analytiques ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 flex">
          <div className="w-full">
            <BarChartCard
              title="Évolution des Recharges (FCFA)"
              data={buildBarData()}
              onYearChange={(year) => setSelectedYear(Number(year))}
            />
          </div>
        </div>
        <div className="lg:col-span-4 flex">
          <div className="w-full">
            <DonutChartCard
              title="Répartition par Formule / Forfait"
              data={buildDonutData()}
            />
          </div>
        </div>
        <div className="lg:col-span-3 flex">
          <div className="w-full">
            <ListCard
              title="Top Vendeurs (Consommation)"
              items={buildListItems()}
              viewAllHref="/admin/finance/portefeuilles"
              viewAllText="Voir tous les vendeurs"
            />
          </div>
        </div>
      </section>

      {/* ── Section 4 : File d'Annonces à Modérer ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Annonces récentes & File de Modération
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Dernières annonces publiées nécessitant une validation ou une surveillance.
            </p>
          </div>
          <Link
            href="/admin/moderation/annonces"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Accéder à la file complète →
          </Link>
        </div>
        <div className="p-6">
          <DataTable
            title=""
            columns={columns}
            data={mockRecentAds}
            onViewAll={() => (window.location.href = "/admin/moderation/annonces")}
          />
        </div>
      </div>

      {/* ── Modale de Détails d'Annonce (Panneau Latéral) ── */}
      <SideDetailsPanel
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={selectedAd?.title ?? ""}
        reference={selectedAd?.reference}
        fields={selectedAd?.fields ?? []}
        descriptionContent={selectedAd?.description}
        redirectHref={
          selectedAd?.id ? `/admin/moderation/annonces/${selectedAd.id}` : "/admin/moderation/annonces"
        }
        redirectLabel="Accéder à la fiche de modération"
      />
    </div>
  );
}