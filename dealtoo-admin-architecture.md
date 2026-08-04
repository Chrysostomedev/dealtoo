# DEALTOO — Refonte Module Administration (Next.js App Router)

> Basé sur l'analyse de l'espace admin existant (`gestcomtesting.dealtoo.co/admin`) : dashboard avec KPIs (visites, abonnements, utilisateurs), graphes d'abonnement mensuel, répartition par type d'abonnement (donut), intentions commerciales, top pays, et la page Forfaits (Starter / Business / Gratuit / Business Pro) avec quotas annonces/photos/flash/capsules.

---

## 1. Rôles & périmètre fonctionnel

| Rôle | Mission | Accès |
|---|---|---|
| **Administrateur** | Configure l'offre (formules, tarifs, seuils, dotation Starter, règles antifraude), supervise les transactions, intervient sur comptes/annonces | Accès complet, écriture |
| **Commercial** | Analyse les incidents, explique les débits, traite les réclamations selon ses droits | Accès en lecture + actions limitées (réclamations) |
| **Support** (automatisé) | Notifications système, alertes | Backend only — pas d'UI dédiée, déclenche des events consommés par Admin/Commercial |

## 2. Features → mapping fonctionnel

1. Gestion comptes & rôles + statut vérification téléphonique → **Users**
2. Config dynamique tarifs/quotas par formule + dotation Starter (crédits, annonces, Flashs, Capsules) → **Forfaits / Config**
3. Recherche portefeuilles vendeurs + ajustement manuel (motif obligatoire + audit trail) + exports Finance → **Finance / Wallets**
4. Tarifs unitaires interactions + supervision antifraude + gel facturation → **Tarification & Antifraude**
5. Modération, suspension, rejet/validation annonces avec notification motif → **Modération**
6. Dashboard global (CA recharges, volumes interactions, conversion, anomalies) → **Dashboard**

---

## 3. Arborescence `app/admin`

Utilisation de **route groups** `(administrateur)` et `(commercial)` pour partager le layout admin tout en isolant les permissions par middleware/RBAC, sans polluer l'URL.

```
app/
└── admin/
    ├── layout.tsx                     # Shell admin (sidebar + topbar + providers)
    ├── loading.tsx
    ├── error.tsx
    ├── middleware-guards.ts           # helpers RBAC (server-side check du rôle)
    │
    ├── (administrateur)/
    │   ├── layout.tsx                 # Guard : role === 'administrateur'
    │   ├── dashboard/
    │   │   └── page.tsx               # KPIs globaux, CA, conversion, anomalies
    │   │
    │   ├── users/
    │   │   ├── page.tsx                # Liste + filtres (statut vérif. téléphone)
    │   │   ├── [userId]/
    │   │   │   ├── page.tsx            # Fiche compte détaillée
    │   │   │   └── roles/page.tsx      # Attribution rôle
    │   │   └── verification/page.tsx   # Vue dédiée statuts vérif. tel
    │   │
    │   ├── forfaits/
    │   │   ├── page.tsx                # Grille des formules (cf. capture 2)
    │   │   ├── [forfaitId]/edit/page.tsx
    │   │   └── dotation-starter/page.tsx  # Crédits virtuels / annonces / Flash / Capsules
    │   │
    │   ├── tarification/
    │   │   ├── interactions/page.tsx   # Tarifs unitaires (appel, SMS, message…)
    │   │   └── seuils/page.tsx         # Seuils & règles antifraude
    │   │
    │   ├── antifraude/
    │   │   ├── page.tsx                # Liste alertes
    │   │   └── [alerteId]/page.tsx     # Détail + action "geler facturation"
    │   │
    │   ├── finance/
    │   │   ├── portefeuilles/
    │   │   │   ├── page.tsx            # Recherche vendeurs
    │   │   │   └── [walletId]/page.tsx # Détail + ajustement manuel
    │   │   ├── ajustements/page.tsx    # Historique + audit trail
    │   │   └── exports/page.tsx        # Génération exports Finance
    │   │
    │   ├── moderation/
    │   │   ├── annonces/page.tsx       # File de modération
    │   │   └── annonces/[annonceId]/page.tsx  # Validation/rejet + motif
    │   │
    │   └── parametres/page.tsx         # Réglages globaux plateforme
    │
    ├── (commercial)/
    │   ├── layout.tsx                  # Guard : role === 'commercial'
    │   ├── dashboard/page.tsx          # Vue synthétique incidents/réclamations
    │   ├── reclamations/
    │   │   ├── page.tsx
    │   │   └── [reclamationId]/page.tsx
    │   ├── incidents/page.tsx          # Explication des débits
    │   └── portefeuilles/page.tsx      # Consultation lecture seule
    │
    └── api/
        └── admin/
            ├── users/route.ts
            ├── forfaits/route.ts
            ├── wallets/[id]/adjust/route.ts   # POST avec motif obligatoire
            ├── fraud-alerts/route.ts
            └── moderation/[id]/route.ts
```

---

## 4. Arborescence `components/admin`

```
components/
└── admin/
    ├── layout/
    │   ├── AdminShell.tsx           # wrapper layout (sidebar + topbar + content)
    │   ├── AdminSidebar.tsx         # nav rôle-aware (items conditionnés au rôle)
    │   ├── AdminTopbar.tsx          # search, notifications, avatar/menu
    │   ├── RoleGuard.tsx            # HOC/wrapper client pour masquer par rôle
    │   └── Breadcrumb.tsx
    │
    ├── dashboard/
    │   ├── KpiCard.tsx              # carte "0 Visites du site", etc.
    │   ├── RevenueAreaChart.tsx     # CA recharges
    │   ├── SubscriptionBarChart.tsx # nombre d'abonnements mensuel
    │   ├── SubscriptionDonut.tsx    # répartition par type
    │   ├── CommercialIntentionsList.tsx  # acheteurs/vendeurs/non renseignés
    │   ├── TopCountriesTable.tsx
    │   └── AnomalyBadgeList.tsx     # indicateurs d'anomalies

    ├── users/
    │   ├── UsersTable.tsx
    │   ├── UserFilters.tsx
    │   ├── PhoneVerificationBadge.tsx
    │   ├── UserDetailPanel.tsx
    │   └── RoleAssignSelect.tsx
    │
    ├── forfaits/
    │   ├── ForfaitCard.tsx          # carte type capture 2 (Starter/Business…)
    │   ├── ForfaitFeatureList.tsx
    │   ├── ForfaitEditForm.tsx
    │   └── DotationStarterForm.tsx  # crédits/annonces/flash/capsules
    │
    ├── tarification/
    │   ├── UnitPriceTable.tsx       # tarifs appel/SMS/message
    │   └── ThresholdForm.tsx
    │
    ├── antifraude/
    │   ├── FraudAlertList.tsx
    │   ├── FraudAlertCard.tsx
    │   └── FreezeBillingToggle.tsx  # gel temporaire facturation
    │
    ├── finance/
    │   ├── WalletSearchBar.tsx
    │   ├── WalletTable.tsx
    │   ├── WalletBalanceCard.tsx
    │   ├── AdjustmentModal.tsx      # motif obligatoire, form validé
    │   ├── AuditTrailTable.tsx
    │   └── ExportPanel.tsx
    │
    ├── moderation/
    │   ├── AnnonceReviewCard.tsx
    │   ├── AnnonceStatusBadge.tsx
    │   ├── RejectReasonModal.tsx    # notification motif obligatoire
    │   └── SuspendConfirmDialog.tsx
    │
    ├── commercial/
    │   ├── ReclamationTable.tsx
    │   ├── ReclamationThread.tsx
    │   └── IncidentExplainCard.tsx  # explication débit
    │
    └── shared/
        ├── DataTable.tsx            # table générique triable/paginée
        ├── StatCard.tsx
        ├── EmptyState.tsx
        ├── ConfirmDialog.tsx
        ├── NotificationBell.tsx
        ├── AuditReasonField.tsx     # champ motif réutilisable (finance/modération)
        └── StatusPill.tsx
```

**Fichiers transverses recommandés**

```
lib/admin/
  ├── rbac.ts             # définitions permissions par rôle
  ├── auditLog.ts         # helper d'écriture des traces d'audit
  └── schemas/            # Zod schemas (ajustement, forfait, modération…)

hooks/admin/
  ├── useRole.ts
  ├── useAuditTrail.ts
  └── useWallet.ts
```

---

## 5. Direction UI — "soft & épuré"

Pour rompre avec le style dense/saturé de l'existant (fonds violets vifs, dégradés forts) vers une interface plus respirée :

- **Palette** : fond neutre très clair (`#FAFAF9` / dark mode `#111113`), une seule couleur d'accent par rôle (ex. indigo doux `#5B6CFA` pour Administrateur, ambre doux `#E2A93B` pour Commercial), surfaces en cartes blanches avec ombre très légère (`shadow-sm`, `rounded-2xl`), pas de dégradés saturés.
- **Typo** : une display sobre pour les titres de section, une text face lisible pour les données denses (tableaux/chiffres), poids modérés (pas de bold agressif partout).
- **Densité** : privilégier l'espace blanc, cartes KPI aérées, tableaux avec padding généreux, actions secondaires en texte plutôt qu'en boutons pleins.
- **Micro-interactions** : hover discret, focus visible clavier, pas d'animation superflue.
- **Composants critiques à traiter avec un soin particulier** : `AdjustmentModal` (ajustement manuel) et `RejectReasonModal` — le motif obligatoire doit être visuellement mis en avant (champ requis clairement marqué, validation inline).

---

## 6. Le "super prompt" — à copier-coller (Claude Code / autre agent)

```
Contexte produit :
DEALTOO est une marketplace (Côte d'Ivoire) avec un module d'administration
séparé en deux profils : Administrateur (configuration de l'offre, supervision
financière et antifraude, modération) et Commercial (traitement des incidents/
réclamations, lecture des portefeuilles). Un système Support automatisé gère
les notifications côté backend uniquement (pas d'UI dédiée).

Stack : Next.js (App Router), TypeScript, RBAC par rôle, composants dans
components/admin, pages dans app/admin/(administrateur) et app/admin/(commercial).

Objectif de cette tâche :
Construire le layout partagé app/admin/layout.tsx + les layouts de garde
app/admin/(administrateur)/layout.tsx et app/admin/(commercial)/layout.tsx,
avec AdminShell, AdminSidebar (navigation conditionnée au rôle courant) et
AdminTopbar (recherche, notifications, menu profil).

Contraintes fonctionnelles à respecter :
1. Gestion comptes & rôles + statut de vérification téléphonique (Users)
2. Configuration dynamique tarifs/quotas par formule + dotation initiale
   Starter (crédits virtuels, annonces, Flashs, Capsules)
3. Recherche + consultation portefeuilles vendeurs, ajustement manuel
   (crédit/débit) avec motif OBLIGATOIRE et génération d'une trace d'audit,
   exports pour la Finance
4. Paramétrage tarifs unitaires des interactions, supervision alertes
   antifraude, gel temporaire de facturation sur annonce suspecte
5. Modération : suspension, rejet ou validation d'annonces avec notification
   du motif à l'utilisateur
6. Dashboard global : CA des recharges, volume d'interactions par type,
   indicateurs de conversion et d'anomalies

Direction UI :
Interface "soft & épurée" : fond neutre clair, cartes blanches à ombre légère
et coins arrondis généreux, une seule couleur d'accent par rôle, typographie
sobre, forte respiration/whitespace, pas de dégradés saturés ni d'animations
superflues. Les champs "motif obligatoire" (ajustement financier, rejet
d'annonce) doivent être visuellement mis en avant avec validation inline.

Livrables attendus pour cette itération :
- app/admin/layout.tsx, app/admin/(administrateur)/layout.tsx,
  app/admin/(commercial)/layout.tsx
- components/admin/layout/{AdminShell,AdminSidebar,AdminTopbar,RoleGuard,Breadcrumb}.tsx
- lib/admin/rbac.ts avec la matrice de permissions par rôle décrite ci-dessus
- Navigation sidebar reflétant l'arborescence de pages ci-dessus, avec les
  items masqués/affichés selon le rôle courant (via RoleGuard/useRole)

Ne pas casser les routes existantes, respecter les Server Components par
défaut et n'utiliser "use client" que là où l'interactivité l'exige
(modales, formulaires, dropdowns de la sidebar/topbar).
```

---

*Document généré pour servir de base à la refonte du module admin DEALTOO — à ajuster selon les entités réelles du back-end (formules, wallets, alertes antifraude) une fois les schémas de données confirmés.*
