"use client";

// ============================================================================
// Connexion réservée aux administrateurs.
// ============================================================================

import { KeyRound, Lock, Mail, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ConnexionAdminPage() {
  const [chargement, setChargement] = useState(false);
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [codeAcces, setCodeAcces] = useState("");

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    
    // TODO: await authService.connexionAdmin({ email, motDePasse, codeAcces })
    await new Promise((r) => setTimeout(r, 900));
    setChargement(false);
    toast.success("Accès autorisé", { description: "Redirection vers le tableau de bord…" });
  };

  return (
    <div data-theme="light" className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-slate-200/80 bg-surface p-6 shadow-sm">
        {/* En-tête sobre */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
            <ShieldAlert className="size-5" />
          </div>
          <h1 className="text-base font-semibold tracking-tight text-ink">Espace administrateur</h1>
          <p className="mt-1 text-xs text-ink-soft">Accès réservé au personnel autorisé de Dealtoo.</p>
        </div>

        {/* Formulaire utilisant les composants UI du projet */}
        <form onSubmit={soumettre} className="space-y-4">
          <Input 
            label="Email administrateur" 
            icon={Mail} 
            type="email" 
            placeholder="admin@dealtoo.co" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <Input 
            label="Mot de passe" 
            icon={Lock} 
            type="password" 
            placeholder="••••••••" 
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required 
          />

          <Input
            label="Code d'accès (2FA)"
            icon={KeyRound}
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            hint="Généré par votre application d'authentification."
            value={codeAcces}
            onChange={(e) => setCodeAcces(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              variant="brand" 
              size="lg" 
              className="w-full justify-center text-xs font-semibold" 
              loading={chargement}
            >
              Accéder au back-office
            </Button>
          </div>
        </form>

        {/* Footer légal */}
        <p className="mt-6 border-t border-slate-100 pt-4 text-center text-[11px] text-ink-faint">
          Toute tentative non autorisée est enregistrée et signalée.
        </p>
      </div>
    </div>
  );
}