# Résumé du Cahier des Charges : Refonte de la Tarification

## 1. Objectif Principal
Passer d'un modèle d'abonnement mensuel à un modèle de **facturation à l'usage (Pay-As-You-Go)**.
- **Suppression** de la formule "Gratuit" permanente et des prélèvements mensuels.
- **Attribution automatique** de la formule "Starter" à l'inscription (après vérification OTP du numéro).

## 2. Nouveau Modèle Commercial
- **3 Formules** : Starter, Business, Business Pro.
- **Portefeuille (Wallet)** : Le vendeur recharge un solde. Les interactions des visiteurs (clic sur numéro, message, etc.) débitent ce solde.
- **Validité** : Pas de limite de temps (30 jours supprimés). La formule est valide jusqu'à épuisement des quotas ou du crédit. En cas de solde insuffisant, les annonces sont suspendues (pas supprimées).

## 3. Tarification des interactions (Grille)
- Consultation détaillée : 2 F
- Ajout aux favoris : 5 F
- Clic numéro / WhatsApp / Message : 20 F

## 4. Gestion des Annonces & Fonctionnalités
- Fin de l'archivage automatique à 6 mois.
- Possibilité d'actions en lot (archiver/désarchiver/suspendre plusieurs annonces).
- Sécurité renforcée (validation OTP, antifraude sur les clics répétitifs).

---

# Plan d'Action : Uniformisation des Couleurs au Logo Dealtoo

Actuellement, le code mélange plusieurs nuances d'orange/jaune (ex: `#FF6600` en dur dans les composants, `brand-500` à `#ff5a1f` dans les tokens, des classes comme `orange-400` ou `amber-500`). 

**Objectif** : Tout aligner sur l'identité visuelle de Dealtoo via les Design Tokens de Tailwind v4.

### Étape 1 : Consolider les Tokens CSS (`app/tokens.css`)
Nous allons définir l'orange exact du logo comme la couleur `brand` principale et supprimer les couleurs en dur.
- `brand-500` : La couleur exacte du logo (ex: `#FF5A1F` ou `#FF6600` selon le logo officiel).
- `gold-500` : Le jaune/or pour les éléments secondaires et la gamification.
- Suppression des variables inutiles dans `globals.css` et transfert vers `tokens.css`.

### Étape 2 : Nettoyage des composants (Remplacement des HEX en dur)
Rechercher et remplacer les couleurs codées en dur par nos classes utilitaires :
- `text-[#FF6600]` ➔ `text-brand-500`
- `bg-[#FF6600]` ➔ `bg-brand-500`
- `border-[#FF6600]/30` ➔ `border-brand-500/30`
- Remplacer les classes génériques Tailwind (`text-orange-400`, `bg-amber-500`) par nos tokens sémantiques (`text-brand-400`, `bg-gold-500`) là où c'est pertinent.

### Étape 3 : Application aux composants clés
- **Header / TapBar** : Uniformiser les boutons "Publier" et "Connexion", ainsi que le soulignement du menu actif.
- **AnnonceCard / Cartes** : Uniformiser les badges (Certifié, Négociable) et les survols (hover).
- **UI Primitives (Button, Badge)** : S'assurer que les variantes utilisent les gradients de marque (`--gradient-brand`).

*Note : Les données mockées (`lib/mock-data.ts`) resteront intactes pendant ce processus.*
