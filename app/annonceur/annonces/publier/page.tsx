"use client";

import React, { useState } from "react";
import { 
  Tag, 
  AlignLeft, 
  DollarSign, 
  Image as ImageIcon, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Info
} from "lucide-react";
import { 
  FormField, 
  Input, 
  Select, 
  PhoneInput, 
  RichTextEditor, 
  ImageUpload,
  Checkbox
} from "@/components/form/FormInput";

const STEPS = [
  { id: 1, name: "Général", icon: Tag, desc: "Titre & Catégorie" },
  { id: 2, name: "Détails", icon: AlignLeft, desc: "Description & Prix" },
  { id: 3, name: "Visuels", icon: ImageIcon, desc: "Photos de l'annonce" },
  { id: 4, name: "Contact", icon: MapPin, desc: "Localisation & Téléphone" },
];

export default function PublierAnnoncePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État global du formulaire
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    negotiable: false,
    description: "",
    phone: "+225",
    location: "Abidjan",
    district: "Cocody",
    images: { files: [] as File[], existingIds: [] as any[] },
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("category", formData.category);
      payload.append("price", formData.price);
      payload.append("description", formData.description);
      payload.append("phone", formData.phone);
      payload.append("location", formData.location);
      payload.append("district", formData.district);
      payload.append("negotiable", String(formData.negotiable));

      formData.images.files.forEach((file) => {
        payload.append("photos", file);
      });

      console.log("Envoi du formulaire :", formData);
      // Simulation d'un envoi réseau
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Votre annonce a été publiée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la publication :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* En-tête */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide">
            <Sparkles size={13} className="text-amber-400" />
            Espace Annonceur
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Publier une nouvelle annonce
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Remplissez les informations ci-dessous pour donner une visibilité maximale à votre bien ou service.
          </p>
        </div>

        {/* Stepper Pro */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => isDone && setCurrentStep(step.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                      : isDone
                      ? "bg-slate-100 text-slate-800 cursor-pointer hover:bg-slate-200/60"
                      : "bg-transparent text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : isDone
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="hidden sm:block overflow-hidden">
                    <p className="text-xs font-bold truncate">{step.name}</p>
                    <p
                      className={`text-[10px] truncate ${
                        isActive ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carte Formulaire Principale */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
          <form onSubmit={currentStep === STEPS.length ? handleSubmit : handleNext} className="space-y-8">
            
            {/* ÉTAPE 1 : GÉNÉRAL */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Informations générales</h2>
                  <p className="text-xs text-slate-400">Définissez le titre et la catégorie principale de votre annonce.</p>
                </div>

                <FormField label="Titre de l'annonce" required>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={(e: any) => handleInputChange("title", e.target.value)}
                    placeholder="Ex: Toyota Land Cruiser Prado 2023 - État Neuf"
                    required
                  />
                </FormField>

                <FormField label="Catégorie" required>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={(e: any) => handleInputChange("category", e.target.value)}
                    placeholder="Sélectionnez une catégorie"
                    required
                  >
                    <option value="" hidden>Sélectionnez une catégorie</option>
                    <option value="vehicules">Véhicules & Automobile</option>
                    <option value="immobilier">Immobilier & Terrains</option>
                    <option value="electronique">Électronique & Informatique</option>
                    <option value="mode">Mode & Habillements</option>
                    <option value="services">Services & Prestations</option>
                  </Select>
                </FormField>
              </div>
            )}

            {/* ÉTAPE 2 : DÉTAILS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Prix & Description</h2>
                  <p className="text-xs text-slate-400">Fixez votre prix et détaillez les caractéristiques de votre offre.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  <FormField label="Prix (FCFA)" required>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={(e: any) => handleInputChange("price", e.target.value)}
                      placeholder="Ex: 15000000"
                      required
                    />
                  </FormField>

                  <div className="pt-8">
                    <Checkbox
                      name="negotiable"
                      label="Prix négociable dans la limite du raisonnable"
                      defaultChecked={formData.negotiable}
                      onChange={(checked: boolean) => handleInputChange("negotiable", checked)}
                    />
                  </div>
                </div>

                <FormField label="Description détaillée" required>
                  <RichTextEditor
                    name="description"
                    defaultValue={formData.description}
                    placeholder="Décrivez précisément votre produit ou service..."
                  />
                </FormField>
              </div>
            )}

            {/* ÉTAPE 3 : VISUELS (Upload d'images) */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Galerie photos</h2>
                  <p className="text-xs text-slate-400">Ajoutez jusqu'à 5 photos claires pour attirer plus d'acheteurs.</p>
                </div>

                <FormField label="Photos de l'annonce" required>
                  <ImageUpload
                    name="photos"
                    maxImages={5}
                    maxSizeMB={5}
                    defaultValue={formData.images.existingIds}
                    onChange={(data) => handleInputChange("images", data)}
                  />
                </FormField>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
                  <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Conseil pro :</strong> Les annonces disposant de plus de 3 photos reçoivent en moyenne 4x plus d'appels et de messages.
                  </p>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 : CONTACT */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Coordonnées & Localisation</h2>
                  <p className="text-xs text-slate-400">Où se trouve le bien et comment les acheteurs peuvent-ils vous joindre ?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Ville" required>
                    <Select
                      name="location"
                      value={formData.location}
                      onChange={(e: any) => handleInputChange("location", e.target.value)}
                      required
                    >
                      <option value="Abidjan">Abidjan</option>
                      <option value="Yamoussoukro">Yamoussoukro</option>
                      <option value="Bouaké">Bouaké</option>
                      <option value="San-Pédro">San-Pédro</option>
                      <option value="Korhogo">Korhogo</option>
                    </Select>
                  </FormField>

                  <FormField label="Commune / Quartier" required>
                    <Input
                      name="district"
                      value={formData.district}
                      onChange={(e: any) => handleInputChange("district", e.target.value)}
                      placeholder="Ex: Cocody Angré 8ème Tranche"
                      required
                    />
                  </FormField>
                </div>

                <FormField label="Numéro de téléphone principal" required>
                  <PhoneInput
                    name="phone"
                    defaultValue={formData.phone}
                    onChange={(val) => handleInputChange("phone", val)}
                    required
                  />
                </FormField>

                <div className="pt-4 border-t border-slate-100">
                  <Checkbox
                    name="acceptTerms"
                    label="J'atteste l'exactitude des informations fournies et accepte les conditions de publication."
                    required
                    onChange={(checked: boolean) => handleInputChange("acceptTerms", checked)}
                  />
                </div>
              </div>
            )}

            {/* Navigation du Formulaire */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all ${
                  currentStep === 1
                    ? "opacity-0 pointer-events-none"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <ArrowLeft size={16} />
                Précédent
              </button>

              {currentStep < STEPS.length ? (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95"
                >
                  Suivant
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.acceptTerms}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                    isSubmitting || !formData.acceptTerms
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 active:scale-95"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publication en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      Publier l'annonce
                    </span>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}