"use client";

// ============================================================================
// app/(auth)/inscription/page.tsx — Création de compte.
//
// Bonnes pratiques appliquées :
// - Le choix "Compte client / Compte annonceur" est un vrai champ d'état
//   (`typeCompte`), envoyé au backend à l'inscription — PAS une page séparée
//   dupliquée, pour ne pas maintenir deux formulaires quasi identiques.
// - Réutilise <Tabs> du design system pour ce choix plutôt que des boutons
//   radio custom : cohérence visuelle + accessibilité déjà gérées par Tabs.
// - Validation minimale illustrée ici (required, type="email") — à renforcer
//   avec Zod + React Hook Form dans l'implémentation finale.
// ============================================================================

import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialButton } from "@/components/auth/SocialButton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";

const TYPES_COMPTE = [
  { value: "client", label: "Client" },
  { value: "annonceur", label: "Annonceur" },
];

export default function InscriptionPage() {
  const [typeCompte, setTypeCompte] = useState("client");
  const [chargement, setChargement] = useState(false);

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    // TODO: await authService.inscription({ ...donnees, typeCompte })
    await new Promise((r) => setTimeout(r, 900));
    setChargement(false);
    toast.success("Compte créé !", { description: "Un code de vérification vous a été envoyé." });
  };

  return (
    <AuthCard
      titre="Rejoignez Dealtoo 🚀"
      sousTitre="Créez votre compte en moins d'une minute."
      pied={
        <>
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-medium text-brand-500 hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      {/* Type de compte — détermine le parcours post-inscription (dashboard
          annonceur avec gamification vs. espace client simple) */}
      <Tabs items={TYPES_COMPTE} value={typeCompte} onChange={setTypeCompte} className="mb-5 w-full justify-center" />

      <SocialButton provider="google" />

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-ink-faint">ou avec votre email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={soumettre} className="space-y-4">
        <Input label="Nom complet" icon={User} placeholder="Ex : Aïcha Koné" required />
        <Input label="Adresse email" icon={Mail} type="email" placeholder="vous@exemple.com" required />
        <Input
          label="Mot de passe"
          icon={Lock}
          type="password"
          placeholder="8 caractères minimum"
          hint="Utilisez au moins une majuscule et un chiffre."
          required
        />

        <label className="flex items-start gap-2 text-xs text-ink-soft">
          <input type="checkbox" required className="mt-0.5 rounded border-white/20 bg-transparent accent-brand-500" />
          J&apos;accepte les{" "}
          <Link href="/cgu" className="text-brand-500 hover:underline">
            conditions générales d&apos;utilisation
          </Link>
        </label>

        <Button type="submit" variant="gold" size="lg" className="w-full justify-center" loading={chargement}>
          Créer mon compte {typeCompte === "annonceur" && "annonceur"}
        </Button>
      </form>
    </AuthCard>
  );
}