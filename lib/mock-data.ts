// ============================================================================
// mock-data.ts — jeu de données factices pour développer l'UI sans backend.
//
// ⚠️ À SUPPRIMER / remplacer par de vrais appels `services/*.service.ts`
// une fois l'API branchée. Centraliser ici évite de disperser des données
// en dur dans chaque page.
// ============================================================================

import type { AnnonceCardProps } from "@/components/cards/AnnonceCard";
import type { EmploiCardProps } from "@/components/cards/EmploiCard";
import type { ServiceCardProps } from "@/components/cards/ServiceCard";
import type { BoutiqueCardProps } from "@/components/cards/BoutiqueCard";
import { Briefcase, Home, Shirt, Smartphone, Sofa, Wrench } from "lucide-react";
// lib/mock-data.ts

export const CATEGORIES = [
  { slug: "auto-moto",          label: "Auto & Moto",              icon: "Car" },
  { slug: "telephones",         label: "Téléphones Mobiles",       icon: "Smartphone" },
  { slug: "hi-tech",            label: "Hi-Tech",                  icon: "Monitor" },
  { slug: "meubles",            label: "Meubles & Électroménagers",icon: "Sofa" },
  { slug: "immobilier",         label: "Immobilier",               icon: "Home" },
  { slug: "animaux",            label: "Animaux",                  icon: "PawPrint" },
  { slug: "mode",               label: "Mode",                     icon: "Shirt" },
  { slug: "beaute",             label: "Beauté et bien être",      icon: "Sparkles" },
  { slug: "emploi",             label: "Offres d'emploi",          icon: "Briefcase" },
  { slug: "services",           label: "Services",                 icon: "Wrench" },
  { slug: "apprentissage",      label: "Apprentissage",            icon: "GraduationCap" },
  { slug: "evenements",         label: "Evénements",               icon: "Calendar" },
  { slug: "demande-emploi",     label: "Demande d'emploi",         icon: "UserSearch" },
  { slug: "dons",               label: "Dons",                     icon: "Gift" },
  { slug: "librairie",          label: "Librairie",                icon: "BookOpen" },
  { slug: "restaurant",         label: "Restaurant et Alimentation",icon: "UtensilsCrossed" },
  { slug: "autre",              label: "Autre",                    icon: "LayoutGrid" },
] as const;

export const ANNONCES: AnnonceCardProps[] = [
  {
    id: "a1",
    titre: "iPhone 14 Pro Max 256Go — comme neuf",
    prix: 485_000,
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=600",
    localisation: "Cocody, Abidjan",
    vues: 1240,
    vendeur: "TechStore CI",
    negociable: true,
    certifie: true,
  },
  {
    id: "a2",
    titre: "Canapé d'angle en cuir véritable, 6 places",
    prix: 320_000,
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600",
    localisation: "Marcory, Abidjan",
    vues: 356,
    vendeur: "Déco Ivoire",
    livraisonGratuite: true,
  },
  {
    id: "a3",
    titre: "Polo Lacoste édition croco spécial",
    prix: 30_000,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600",
    localisation: "Abidjan",
    vues: 56,
    vendeur: "Lang George",
    negociable: true,
  },
  {
    id: "a4",
    titre: "Terrain 600m² titré, proche autoroute",
    prix: 15_000_000,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    localisation: "Bingerville",
    vues: 892,
    vendeur: "Immo Plus CI",
    certifie: true,
  },
];

export const EMPLOIS: EmploiCardProps[] = [
  {
    poste: "Développeur Full-Stack Next.js",
    entreprise: "Chrysostomedev Studio",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=CD",
    localisation: "Abidjan (hybride)",
    typeContrat: "Freelance",
    salaireMin: 400_000,
    salaireMax: 700_000,
    tags: ["Next.js", "TypeScript", "Tailwind"],
    datePublication: new Date(Date.now() - 1000 * 60 * 60 * 5),
    urgent: true,
  },
  {
    poste: "Community Manager",
    entreprise: "Radio Grâce-Espoir",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=RG",
    localisation: "Abidjan",
    typeContrat: "CDD",
    tags: ["Réseaux sociaux", "Canva", "Montage"],
    datePublication: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];

export const SERVICES: ServiceCardProps[] = [
  {
    titre: "Création de logo & identité visuelle",
    prestataire: "Aïcha Koné",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aicha",
    note: 4.9,
    nombreAvis: 87,
    categorie: "Design",
    tarifDepart: 25_000,
    localisation: "Abidjan · à distance",
    disponible: true,
  },
  {
    titre: "Réparation plomberie à domicile",
    prestataire: "Yao Plomberie",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yao",
    note: 4.6,
    nombreAvis: 132,
    categorie: "Maison",
    tarifDepart: 10_000,
    localisation: "Yopougon",
  },
];

export const BOUTIQUES: BoutiqueCardProps[] = [
  {
    slug: "techstore-ci",
    nom: "TechStore CI",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
    couverture: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    niveau: 24,
    note: 4.8,
    nombreProduits: 156,
  },
  {
    slug: "deco-ivoire",
    nom: "Déco Ivoire",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DI",
    couverture: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
    niveau: 12,
    note: 4.5,
    nombreProduits: 43,
  },
];