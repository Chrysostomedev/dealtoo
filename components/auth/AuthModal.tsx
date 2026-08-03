"use client";

import { useState, useRef, useEffect } from "react";
import { 
  X, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  RefreshCw
} from "lucide-react";

type AuthMode = "login" | "register" | "forgot" | "otp";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [previousMode, setPreviousMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  
  // Gestion du code OTP à 4 chiffres
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Réinitialiser les états à l'ouverture / fermeture
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setOtp(["", "", "", ""]);
      setIsSuccess(false);
      setIsVerifying(false);
    }
  }, [isOpen, initialMode]);

  // Focus automatique sur le premier champ OTP
  useEffect(() => {
    if (mode === "otp") {
      setTimeout(() => otpRefs[0].current?.focus(), 150);
    }
  }, [mode]);

  if (!isOpen) return null;

  // Gestion de la saisie OTP à 4 chiffres
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus sur le champ suivant
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      const newOtp = ["", "", "", ""];
      digits.forEach((digit, i) => {
        if (i < 4) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 3);
      otpRefs[nextIndex].current?.focus();
    }
  };

  // Soumission Login / Register -> Passe à l'OTP
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviousMode(mode);
    setMode("otp");
  };

  // Soumission Mot de Passe Oublié -> Passe à l'OTP
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviousMode("forgot");
    setMode("otp");
  };

  // Validation du Code OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulation de validation API
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);

      // Fermeture automatique de la modale après 1.2 secondes
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300">
      {/* Backdrop Flouté Dynamique */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-slate-900/5 transition-all z-10 max-h-[92vh] overflow-y-auto">
        
        {/* Glow FX d'arrière-plan */}
        <div className="absolute -top-24 -left-24 size-48 rounded-full bg-gradient-to-tr from-orange-400/20 to-amber-300/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-gradient-to-br from-orange-500/15 to-[#FF6600]/10 blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            {mode !== "login" && !isSuccess && (
              <button 
                onClick={() => {
                  if (mode === "otp") setMode(previousMode);
                  else setMode("login");
                }}
                className="group flex size-8 items-center justify-center rounded-xl bg-slate-100/80 text-slate-500 hover:bg-slate-200/80 hover:text-slate-900 transition-all"
              >
                <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                {mode === "login" && "Bon retour !"}
                {mode === "register" && "Créer un compte"}
                {mode === "forgot" && "Mot de passe"}
                {mode === "otp" && "Vérification OTP"}
              </h2>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                {mode === "login" && "Connectez-vous à votre espace"}
                {mode === "register" && "Rejoignez notre plateforme"}
                {mode === "forgot" && "Récupérez l'accès à votre compte"}
                {mode === "otp" && `Code envoyé à ${emailInput || "votre email"}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full bg-slate-100/80 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="relative pt-3">
          
          {/* --- MODE CONNEXION --- */}
          {mode === "login" && (
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Adresse Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Mot de passe</label>
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs font-bold text-[#FF6600] hover:text-[#e05a00] hover:underline transition-all"
                  >
                    Oublié ?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-10 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="size-4 rounded-md border-slate-300 text-[#FF6600] focus:ring-[#FF6600]/20 transition-all" 
                  />
                  <span className="text-xs text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Se rappeler de moi</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-[#FF6600] to-[#FF8533] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6600]/25 hover:shadow-xl hover:shadow-[#FF6600]/35 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Continuer</span>
                <ChevronRight className="size-4" />
              </button>

              {/* Séparateur Google */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <span className="relative bg-white px-3 text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">Ou</span>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.99]"
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.09-6.68-4.91H1.36v3.08C3.35 21.3 7.37 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.32 14.34c-.24-.72-.38-1.49-.38-2.34s.14-1.62.38-2.34V6.58H1.36C.49 8.31 0 10.1 0 12s.49 3.69 1.36 5.42l3.96-3.08z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.35 2.7 1.36 6.58l3.96 3.08c.94-2.82 3.58-4.91 6.68-4.91z"/>
                </svg>
                <span>Google</span>
              </button>

              <p className="text-center text-xs font-semibold text-slate-500 pt-3">
                Pas encore de compte ?{" "}
                <button type="button" onClick={() => setMode("register")} className="font-extrabold text-[#FF6600] hover:underline">
                  S'inscrire
                </button>
              </p>
            </form>
          )}

          {/* --- MODE INSCRIPTION --- */}
          {mode === "register" && (
            <form onSubmit={handleInitialSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Je suis un...</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center justify-center p-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 cursor-pointer has-[:checked]:border-[#FF6600] has-[:checked]:bg-[#FF6600]/5 has-[:checked]:text-[#FF6600] transition-all">
                    <input type="radio" name="role" value="particulier" defaultChecked className="sr-only" />
                    <span>Acheteur</span>
                  </label>
                  <label className="flex items-center justify-center p-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 cursor-pointer has-[:checked]:border-[#FF6600] has-[:checked]:bg-[#FF6600]/5 has-[:checked]:text-[#FF6600] transition-all">
                    <input type="radio" name="role" value="vendeur" className="sr-only" />
                    <span>Vendeur / Pro</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nom & Prénoms</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Kouassi Jean"
                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="exemple@mail.com"
                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" />
                    <input
                      type="tel"
                      required
                      placeholder="0700000000"
                      className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 pl-8 pr-3 py-2.5 text-sm font-medium text-slate-900 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  required
                  placeholder="Min. 8 caractères"
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-[#FF6600] to-[#FF8533] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6600]/25 hover:shadow-xl hover:shadow-[#FF6600]/35 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
              >
                Créer mon compte
              </button>

              <p className="text-center text-xs font-semibold text-slate-500 pt-1">
                Déjà un compte ?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-extrabold text-[#FF6600] hover:underline">
                  Se connecter
                </button>
              </p>
            </form>
          )}

          {/* --- MODE MOT DE PASSE OUBLIÉ --- */}
          {mode === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
                <KeyRound className="size-5 text-[#FF6600] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Saisissez votre email. Nous vous enverrons un code OTP à 4 chiffres pour réinitialiser votre mot de passe.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Adresse Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 focus:border-[#FF6600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-[#FF6600] to-[#FF8533] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6600]/25 hover:shadow-xl hover:shadow-[#FF6600]/35 transition-all"
              >
                Envoyer le code OTP
              </button>
            </form>
          )}

          {/* --- MODE VALIDATION OTP (4 DIGITS) --- */}
          {mode === "otp" && (
            <div>
              {!isSuccess ? (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="flex justify-center my-2">
                    <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[#FF6600]/10 text-[#FF6600] ring-8 ring-[#FF6600]/5">
                      <ShieldCheck className="size-7" />
                    </div>
                  </div>

                  {/* Saisie OTP à 4 Chiffres */}
                  <div className="flex items-center justify-center gap-3 py-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="size-14 rounded-2xl border-2 border-slate-200 bg-slate-50/80 text-center text-2xl font-black text-slate-900 focus:border-[#FF6600] focus:bg-white focus:ring-4 focus:ring-[#FF6600]/15 focus:outline-none transition-all"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={otp.some((d) => d === "") || isVerifying}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#FF6600] to-[#FF8533] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6600]/25 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-[#FF6600]/35 transition-all flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="size-4 animate-spin" />
                        <span>Vérification en cours...</span>
                      </>
                    ) : (
                      <span>Valider & Continuer</span>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Code non reçu ?</span>
                    <button 
                      type="button" 
                      onClick={() => setOtp(["", "", "", ""])}
                      className="font-bold text-[#FF6600] hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="size-3" />
                      <span>Renvoyer le code</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Succès de la validation */
                <div className="py-6 text-center space-y-3">
                  <div className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50 animate-bounce">
                    <Sparkles className="size-8" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Vérification réussie !</h3>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                    Votre identité a été confirmée avec succès. Redirection...
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}