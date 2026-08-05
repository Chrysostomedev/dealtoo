# Dealtoo — Refonte Premium

> La marketplace de référence en Côte d'Ivoire, repensée. Annonces + e-commerce + boutiques, dans une expérience immersive, rapide et gratifiante.

**Stack** : Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Clean Architecture

---

## Sommaire

1. [Vision & positionnement](#1-vision--positionnement)
2. [Stack technique](#2-stack-technique)
3. [Philosophie UX / Design](#3-philosophie-ux--design)
4. [Design System — Couleurs](#4-design-system--couleurs)
5. [Design System — Typographie](#5-design-system--typographie)
6. [Design System — Espacements, rayons, élévation](#6-design-system--espacements-rayons-élévation)
7. [Architecture (Clean Architecture)](#7-architecture-clean-architecture)
8. [Structure détaillée des dossiers](#8-structure-détaillée-des-dossiers)
9. [Les 3 espaces applicatifs](#9-les-3-espaces-applicatifs)
10. [Gamification](#10-gamification)
11. [Composants clés](#11-composants-clés)
12. [Conventions de code](#12-conventions-de-code)
13. [Installation & scripts](#13-installation--scripts)
14. [Roadmap](#14-roadmap)

---

## 1. Vision & positionnement

Dealtoo aujourd'hui est fonctionnel mais générique : orange plat, listes denses, peu de hiérarchie visuelle, aucune gratification pour l'utilisateur actif. La refonte vise un positionnement **"Jumia x Locanto"** — la densité et la confiance transactionnelle d'un marketplace e-commerce, croisées avec la liberté et la simplicité d'un site de petites annonces — avec un niveau de finition et de micro-interaction qu'aucun concurrent local n'a.

Trois piliers non négociables :

- **Premium** : glassmorphism maîtrisé, ombres douces, transitions physiques (spring), jamais de composant "flat/2015".
- **Intuitif** : zéro friction pour publier une annonce, zéro ambiguïté sur le statut d'une transaction.
- **Gratifiant** : chaque action utile (publier, vendre, répondre vite, rester actif) nourrit une boucle de progression visible (XP, niveaux, badges).

---

## 2. Stack technique

| Domaine | Choix | Raison |
|---|---|---|
| Framework | **Next.js 15** (App Router, Server Components, Server Actions) | Streaming, SEO natif pour les annonces, routing par groupes |
| Langage | **TypeScript** strict | Sécurité sur les entités du domaine |
| Style | **Tailwind CSS** + tokens CSS custom (`@theme`) | Vitesse + design system cohérent |
| Animation | **Framer Motion** | Micro-interactions, page transitions, reveal au scroll |
| État global léger | **React Context** + hooks dédiés | Auth, thème, panier, gamification |
| Formulaires | **React Hook Form** + **Zod** | Validation typée, formulaire multi-étapes (publication d'annonce) |
| Data fetching | **Server Actions** + **TanStack Query** (côté client) | Cache, mutations optimistes (favoris, like, XP) |
| Icônes | **lucide-react** | Cohérence, tree-shaking |
| Graphiques (admin) | **Recharts** | Stats back-office |

---

## 3. Philosophie UX / Design

- **Dark mode = mode par défaut** sur le marketplace public (immersif, met en valeur les photos produits) ; **light mode** privilégié sur l'espace admin (lisibilité de la donnée).
- **Glassmorphism localisé**, jamais généralisé : surfaces flottantes (barre de recherche, menu "Publier", modales, cartes de stats) en verre dépoli sur fond riche ; les cartes-produits restent sur fond plein pour ne pas fatiguer l'œil sur de longues listes.
- **Micro-interactions systématiques** : hover = légère élévation + scale 1.02, tap = compression 0.97, apparition des cartes en stagger léger (40–60ms de délai entre éléments), skeleton loaders plutôt que spinners.
- **Feedback immédiat de la gamification** : toute action qui rapporte de l'XP déclenche une notification flottante discrète ("+15 XP") — jamais un modal bloquant.
- **Mobile-first strict** : 70%+ du trafic annonces en Côte d'Ivoire est mobile ; la barre "Publier" devient un bouton flottant (FAB) sur mobile.

---

## 4. Design System — Couleurs

La palette part de l'identité existante (orange/jaune Dealtoo, reconnaissable) mais l'élève : l'orange devient un **dégradé de marque** plutôt qu'un aplat, le jaune CTA devient un **or plus sophistiqué**, et un fond sombre profond (jamais noir pur) porte tout le glassmorphism.

### Palette de marque

| Token | Hex | Usage |
|---|---|---|
| `brand-500` (Orange Dealtoo) | `#FF5A1F` | Couleur de marque principale, logo, liens actifs, focus |
| `brand-600` | `#E8470F` | Hover / états actifs sur `brand-500` |
| `brand-400` | `#FF7A45` | Dégradés, glow, accents secondaires |
| `gold-500` (CTA "Publier") | `#FFC93C` | Bouton d'action principal, éléments de gamification (XP, badges) |
| `gold-600` | `#F0AF12` | Hover sur les CTA gold |
| `emerald-500` (Succès / vérifié) | `#00C896` | Badges "Certifié", "Négociable", confirmations |
| `ruby-500` (Alerte / signaler) | `#F23557` | Erreurs, "Signaler", suppression |

### Mode sombre (par défaut — marketplace)

| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#0B0E14` | Fond de page (charcoal bleuté, jamais noir pur) |
| `bg-elevated` | `#12161F` | Cartes, panneaux |
| `bg-glass` | `rgba(18, 22, 31, 0.55)` + blur 20px | Header, menu Publier, modales |
| `border-glass` | `rgba(255, 255, 255, 0.08)` | Contours des surfaces en verre |
| `text-primary` | `#F5F6F8` | Titres, texte principal |
| `text-secondary` | `#9AA1AE` | Sous-titres, métadonnées (vues, date) |
| `text-muted` | `#5D6472` | Placeholders, texte désactivé |

### Mode clair (par défaut — admin / formulaires)

| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#FAFAF9` | Fond de page |
| `bg-elevated` | `#FFFFFF` | Cartes, panneaux |
| `bg-glass` | `rgba(255, 255, 255, 0.65)` + blur 20px | Surfaces flottantes |
| `border-glass` | `rgba(15, 15, 15, 0.06)` | Contours |
| `text-primary` | `#14151A` | Titres |
| `text-secondary` | `#5B5F6B` | Sous-titres |
| `text-muted` | `#9CA0AA` | Placeholders |

### Dégradé signature

```css
--gradient-brand: linear-gradient(135deg, #FF7A45 0%, #FF5A1F 55%, #E8470F 100%);
--gradient-gold-glow: radial-gradient(circle at 30% 30%, #FFC93C 0%, transparent 70%);
```
Utilisé sur : le bouton "Publier", le halo derrière l'avatar au niveau max, le fond du Hero.

---

## 5. Design System — Typographie

Association d'une display géométrique et affirmée (l'identité, la "voix" de Dealtoo) avec une humaniste très lisible pour tout le contenu produit, et une mono pour les données chiffrées (prix, XP, stats).

| Rôle | Police | Usage |
|---|---|---|
| **Display** | **Clash Display** (Fontshare, gratuite) | Titres H1/H2, Hero, montants mis en avant |
| **Corps de texte** | **General Sans** (Fontshare, gratuite) | Paragraphes, descriptions d'annonces, UI |
| **Utilitaire / data** | **IBM Plex Mono** | Prix, compteurs XP, référence d'annonce, timestamps |

### Échelle typographique

| Style | Taille / interligne | Poids | Police |
|---|---|---|---|
| Display XL (Hero) | 56px / 60px | 600 | Clash Display |
| Display L (H1 page) | 36px / 42px | 600 | Clash Display |
| Display M (H2 section) | 28px / 34px | 500 | Clash Display |
| Heading (H3, cartes) | 20px / 26px | 600 | General Sans |
| Body L | 16px / 24px | 400 | General Sans |
| Body M (défaut) | 14px / 21px | 400 | General Sans |
| Caption | 12px / 16px | 500 | General Sans |
| Data / Prix | 18px / 22px | 500 | IBM Plex Mono |
| Data XL (prix Hero) | 32px / 36px | 600 | IBM Plex Mono |

**Règles** : jamais plus de 2 poids par écran hors data ; les prix sont **toujours** en `IBM Plex Mono` pour un alignement chiffré impeccable dans les listes.

---

## 6. Design System — Espacements, rayons, élévation

| Token | Valeur |
|---|---|
| Grille d'espacement | `4px` base (4, 8, 12, 16, 24, 32, 48, 64) |
| Rayon `sm` (badges, inputs) | 8px |
| Rayon `md` (cartes) | 16px |
| Rayon `lg` (modales, hero) | 24px |
| Rayon `full` (avatars, FAB) | 9999px |
| Ombre `card` | `0 2px 8px rgba(0,0,0,0.25)` |
| Ombre `elevated` (hover) | `0 12px 32px rgba(0,0,0,0.35)` |
| Ombre `glow-gold` | `0 0 24px rgba(255,201,60,0.35)` |
| Blur glass | `backdrop-filter: blur(20px)` |
| Durée transition standard | `200ms` ease-out |
| Durée transition page | `350ms` spring (Framer Motion : `stiffness: 260, damping: 24`) |

---

## 7. Architecture (Clean Architecture)

Le principe : **le métier ne dépend jamais du framework**. `core/` ne connaît ni Next.js, ni Tailwind, ni fetch — il définit *ce qu'est* une annonce, un utilisateur, une transaction, et *ce qu'on peut en faire*. Tout le reste (UI, services HTTP, hooks React) est un détail d'implémentation remplaçable.

```
┌─────────────────────────────────────────────────────────┐
│  app/  (Next.js App Router — pages, layouts, routing)    │
│     ↓ appelle                                            │
│  components/  +  hooks/  +  contexts/  (couche UI)        │
│     ↓ appelle                                            │
│  services/  (implémentations concrètes : API, storage)   │
│     ↓ implémente les interfaces définies par             │
│  core/  (entités, cas d'usage, règles métier — pur TS)    │
│     ↑ utilisé par                                        │
│  lib/  (utilitaires transverses, sans dépendance métier)  │
└─────────────────────────────────────────────────────────┘
```

**Règle de dépendance** : une flèche ne remonte jamais vers `core/`. `core/` ne fait `import` d'aucun autre dossier applicatif.

---

## 8. Structure détaillée des dossiers

```
dealtoo/
├── app/                              # Next.js 15 App Router
│   ├── (marketplace)/                # Espace public — grande marketplace
│   │   ├── page.tsx                  # Accueil (Hero, catégories, tendances)
│   │   ├── recherche/page.tsx
│   │   ├── categorie/[slug]/page.tsx
│   │   ├── annonce/[id]/page.tsx
│   │   ├── boutique/[slug]/page.tsx
│   │   └── layout.tsx
│   ├── (annonceur)/                  # Espace annonceur (dashboard vendeur)
│   │   ├── dashboard/page.tsx
│   │   ├── mes-annonces/page.tsx
│   │   ├── publier/page.tsx          # Formulaire multi-étapes
│   │   ├── boutique/page.tsx         # Gestion boutique + XP/niveau
│   │   ├── statistiques/page.tsx
│   │   └── layout.tsx
│   ├── (admin)/                      # Back-office
│   │   ├── dashboard/page.tsx
│   │   ├── utilisateurs/page.tsx
│   │   ├── moderation/page.tsx       # Annonces signalées
│   │   ├── paiements/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   └── layout.tsx
│   ├── api/                          # Route handlers (webhooks paiement, etc.)
│   └── layout.tsx                    # Layout racine (providers globaux)
│
├── core/                             # ❤️ Cœur métier — pur TypeScript, zéro dépendance framework
│   ├── entities/                     # Annonce, Utilisateur, Boutique, Transaction, Badge
│   ├── use-cases/                    # PublierAnnonce, CalculerXP, BoosterAnnonce, SignalerAnnonce
│   ├── interfaces/                   # Contrats (AnnonceRepository, PaiementGateway...)
│   └── errors/                       # Erreurs métier typées
│
├── lib/                              # Utilitaires transverses (sans logique métier)
│   ├── formatters/                   # formatPrix, formatDate, formatVues
│   ├── validators/                   # Schémas Zod
│   ├── constants/                    # Catégories, villes CI, seuils XP
│   └── utils.ts                      # cn(), slugify, debounce...
│
├── contexts/                         # Contexts React (état global léger)
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx               # dark/light
│   ├── GamificationContext.tsx        # XP, niveau, streak en cours
│   └── FavorisContext.tsx
│
├── services/                         # Implémentations concrètes des interfaces core/
│   ├── annonces.service.ts
│   ├── auth.service.ts
│   ├── boutique.service.ts
│   ├── paiement.service.ts            # Mobile Money, CB
│   ├── gamification.service.ts
│   └── upload.service.ts              # Images annonces
│
├── hooks/                            # Hooks personnalisés
│   ├── useAuth.ts
│   ├── useAnnonces.ts
│   ├── useXP.ts
│   ├── useLeaderboard.ts
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
│
├── components/
│   ├── ui/                           # Primitives design system
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── cards/                        # Cartes de contenu
│   │   ├── AnnonceCard.tsx
│   │   ├── BoutiqueCard.tsx
│   │   ├── VendeurCard.tsx
│   │   └── StatCard.tsx
│   ├── sections/                     # Sections de page assemblées
│   │   ├── Hero.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── TrendingSection.tsx
│   │   └── LeaderboardSection.tsx
│   ├── form/                         # Formulaires
│   │   ├── PublierAnnonceForm.tsx    # Multi-étapes
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   └── ContactVendeurForm.tsx
│   ├── data/                         # Visualisation de données (admin)
│   │   ├── DataTable.tsx
│   │   ├── ChartRevenue.tsx
│   │   └── StatsGrid.tsx
│   ├── boutique/                     # Spécifique boutiques
│   │   ├── BoutiqueHeader.tsx
│   │   ├── BoutiqueGrid.tsx
│   │   └── BoutiqueReviews.tsx
│   └── stats/                        # Gamification visuelle
│       ├── XPBar.tsx
│       ├── LevelBadge.tsx
│       ├── StreakCounter.tsx
│       └── LeaderboardRow.tsx
│
├── styles/
│   └── tokens.css                    # Variables CSS (couleurs, spacing, radius)
│
├── types/                            # Types partagés (DTOs, réponses API)
└── config/                           # next.config, tailwind.config, site.config
```

---

## 9. Les 3 espaces applicatifs

### 🛍️ Marketplace (public)
Accueil immersif, recherche à facettes (catégorie + ville + prix), fiche annonce avec galerie, badges de confiance (Certifié, Négociable, Livraison), boutiques, favoris, messagerie intégrée (chat + WhatsApp + appel).

### 📊 Espace Annonceur
Dashboard avec vue d'ensemble (vues, messages, XP du mois), publication multi-étapes guidée, gestion de la boutique, statistiques de performance par annonce, boost/certification en un clic, progression de gamification visible en permanence.

### 🛠️ Admin (back-office)
Modération des annonces signalées, gestion des utilisateurs et boutiques, suivi des paiements (abonnements, boosts), vue globale du leaderboard, tableaux de bord analytiques (Recharts).

---

## 10. Gamification

| Mécanique | Détail |
|---|---|
| **XP** | Gagné par : publier une annonce (+15), répondre en <1h (+5), vendre (+30), compléter son profil (+10), obtenir un avis 5★ (+20) |
| **Niveaux** | Progression non linéaire (paliers croissants) — chaque niveau débloque un avantage (mise en avant, badge visuel, réduction sur boost) |
| **Badges** | Ex. "Vendeur Éclair" (réponse rapide), "Top Vendeur" (top 1% du mois), "Vérifié" (identité confirmée), "Fidèle" (compte 1 an+) |
| **Streaks** | Jours consécutifs d'activité (connexion + réponse à un message) ; rupture de streak = perte du multiplicateur XP |
| **Leaderboard** | Classement hebdo/mensuel par ville et national, visible publiquement sur le profil boutique (levier de confiance acheteur) |

Composants dédiés : `XPBar`, `LevelBadge`, `StreakCounter`, `LeaderboardRow` (dans `components/stats/`).

---

## 11. Composants clés

- **`ui/`** — Boutons (primary gold, secondary glass, ghost), inputs avec état focus `brand-500`, modales glass, toasts XP.
- **`cards/`** — `AnnonceCard` (image, prix en mono, badges, favoris), `BoutiqueCard` (logo, niveau vendeur, note).
- **`sections/`** — Blocs de page réutilisables entre marketplace et boutique.
- **`form/`** — `PublierAnnonceForm` en étapes (Catégorie → Détails → Photos → Prix/Localisation → Publication), avec barre de progression et sauvegarde de brouillon.
- **`data/`** — Tableaux et graphiques admin, triables/filtrables.
- **`boutique/`** — Vitrine vendeur, header avec niveau et badges.
- **`stats/`** — Toute la couche visuelle de gamification.

---

## 12. Conventions de code

- **1 composant = 1 responsabilité** ; pas de logique métier dans `components/` (elle vit dans `core/use-cases` et est appelée via `services/` ou un hook).
- **`core/` n'importe jamais** de `services/`, `components/`, `hooks/` ou `app/`.
- **Nommage** : `PascalCase` pour composants, `camelCase` pour fonctions/hooks, `kebab-case` pour dossiers de routes.
- **Server Components par défaut** ; `"use client"` uniquement là où l'interactivité l'exige (formulaires, animations Framer Motion, contexts).
- **Tailwind** : pas de valeurs magiques — toujours passer par les tokens définis dans `tailwind.config` (couleurs, spacing, radius du design system ci-dessus).

---

## 13. Installation & scripts

```bash
git clone <repo>
cd dealtoo
npm install

npm run dev        # démarrage local
npm run build      # build production
npm run lint       # ESLint
npm run type-check # tsc --noEmit
```

Variables d'environnement attendues (`.env.local`) : URL API, clés du gateway de paiement, clés d'upload d'images.

---

## 14. Roadmap

- [ ] Design tokens (`tailwind.config.ts` + `styles/tokens.css`)
- [ ] Composants `ui/` de base
- [ ] Layout marketplace (Hero, Header glass, CategoryGrid)
- [ ] `AnnonceCard` + page fiche annonce
- [ ] Formulaire de publication multi-étapes
- [ ] Système de gamification (XP, niveaux, badges)
- [ ] Dashboard annonceur
- [ ] Back-office admin
- [ ] Leaderboard public#   d e a l t o o  
 #   D e a l t o o W e b - 2 . 0  
 