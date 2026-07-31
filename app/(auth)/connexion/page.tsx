"use client";

// ============================================================================
// app/(auth)/connexion/page.tsx — Connexion utilisateur (client/annonceur).
//
// Bonnes pratiques appliquées :
// - Séparation nette : la logique d'auth réelle (appel Supabase/NextAuth)
//   est isolée dans `soumettre`/`connexionGoogle`, à brancher plus tard —
//   le JSX ne contient aucune supposition sur le provider utilisé.
// - Un seul état `chargement` désactive TOUT le formulaire pendant la requête
//   (boutons + inputs), évitant les doubles soumissions.
// - Lien direct vers /otp pour le cas "connexion sans mot de passe" (flow
//   OTP par téléphone), courant en Côte d'Ivoire (Mobile Money / SMS).
// ============================================================================

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialButton } from "@/components/auth/SocialButton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ConnexionPage() {
  const [chargement, setChargement] = useState(false);
  const [chargementGoogle, setChargementGoogle] = useState(false);

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    // TODO: appel réel — ex. await authService.connexion({ email, motDePasse })
    await new Promise((r) => setTimeout(r, 900));
    setChargement(false);
    toast.success("Connexion réussie", { description: "Bienvenue de retour sur Dealtoo !" });
  };

  const connexionGoogle = async () => {
    setChargementGoogle(true);
    // TODO: signIn("google") — redirection OAuth gérée par le provider d'auth
    await new Promise((r) => setTimeout(r, 900));
    setChargementGoogle(false);
  };

  return (
    <AuthCard
      titre="Content de vous revoir 👋"
      sousTitre="Connectez-vous pour accéder à votre compte Dealtoo."
      pied={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-brand-500 hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <SocialButton provider="google" onClick={connexionGoogle} loading={chargementGoogle} />

      {/* Séparateur visuel entre auth sociale et formulaire classique */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-ink-faint">ou avec votre email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={soumettre} className="space-y-4">
        <Input label="Adresse email" icon={Mail} type="email" placeholder="vous@exemple.com" required />
        <Input label="Mot de passe" icon={Lock} type="password" placeholder="••••••••" required />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-soft">
            <input type="checkbox" className="rounded border-white/20 bg-transparent accent-brand-500" />
            Se souvenir de moi
          </label>
          <Link href="/otp" className="text-brand-500 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" variant="brand" size="lg" className="w-full justify-center" loading={chargement}>
          Se connecter
        </Button>
      </form>

      <p className="mt-5 text-center text-xs text-ink-faint">
        Vous préférez un code par SMS ?{" "}
        <Link href="/otp" className="text-brand-500 hover:underline">
          Connexion par OTP
        </Link>
      </p>
    </AuthCard>
  );
}