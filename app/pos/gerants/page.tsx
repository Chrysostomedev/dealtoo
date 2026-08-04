"use client";

import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Store, 
  ShieldCheck, 
  MoreVertical, 
  Phone, 
  Mail, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  X
} from "lucide-react";

// Imports corrigés avec les vrais noms exportés par FormInput.tsx
import { 
  FormField,
  Input, 
  Select, 
  PhoneInput, 
  Checkbox 
} from "@/components/form/FormInput";

// Interface Gérant POS
interface Gerant {
  id: string;
  name: string;
  email: string;
  phone: string;
  posName: string;
  status: "Actif" | "Inactif";
  createdAt: string;
}

const INITIAL_GERANTS: Gerant[] = [
  {
    id: "GER-001",
    name: "Kouassi Jean-Marc",
    email: "j.kouassi@example.ci",
    phone: "+225 0708091011",
    posName: "Agence Cocody Angré",
    status: "Actif",
    createdAt: "12/01/2026",
  },
  {
    id: "GER-002",
    name: "Awa Touré",
    email: "a.toure@example.ci",
    phone: "+225 0504030201",
    posName: "Kiosque Zone 4",
    status: "Actif",
    createdAt: "03/02/2026",
  },
  {
    id: "GER-003",
    name: "Konan Yao Thierry",
    email: "t.konan@example.ci",
    phone: "+225 0102030405",
    posName: "Point de Vente Plateau",
    status: "Inactif",
    createdAt: "20/05/2026",
  },
];

export default function GerantsPOSPage() {
  const [gerants, setGerants] = useState<Gerant[]>(INITIAL_GERANTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+225",
    posName: "",
    status: "Actif" as "Actif" | "Inactif",
    isNotifier: true,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateGerant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newGerant: Gerant = {
      id: `GER-00${gerants.length + 1}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      posName: formData.posName,
      status: formData.status,
      createdAt: new Date().toLocaleDateString("fr-FR"),
    };

    setGerants([newGerant, ...gerants]);
    setIsSubmitting(false);
    setIsModalOpen(false);

    // Reset du formulaire
    setFormData({ 
      name: "", 
      email: "", 
      phone: "+225", 
      posName: "", 
      status: "Actif",
      isNotifier: true 
    });
  };

  const filteredGerants = gerants.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.posName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 space-y-8">
      
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Gestion des Gérants POS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez la liste et l'accès des gérants affectés à vos points de vente.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold shadow-lg shadow-slate-900/10 transition-all active:scale-95"
        >
          <Plus size={16} />
          Nouveau Gérant
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Gérants</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{gerants.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Gérants Actifs</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {gerants.filter((g) => g.status === "Actif").length}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Taux de couverture POS</p>
            <p className="text-2xl font-black text-slate-900 mt-1">100%</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {/* Barre de Recherche */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher par nom, POS, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          {filteredGerants.length} gérant(s) affiché(s)
        </div>
      </div>

      {/* Tableau des Gérants */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Gérant</th>
                <th className="py-4 px-6">Point de Vente (POS)</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6">Date de création</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredGerants.length > 0 ? (
                filteredGerants.map((gerant) => (
                  <tr key={gerant.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {gerant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{gerant.name}</p>
                          <p className="text-[10px] text-slate-400">{gerant.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <Store size={14} className="text-slate-400" />
                        {gerant.posName}
                      </div>
                    </td>

                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Mail size={12} />
                        {gerant.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Phone size={12} />
                        {gerant.phone}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          gerant.status === "Actif"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {gerant.status === "Actif" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {gerant.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-400 text-[11px]">
                      {gerant.createdAt}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                    Aucun gérant trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal d'ajout utilisant FormField + Input/Select/PhoneInput/Checkbox */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Nouveau Gérant POS</h3>
                <p className="text-xs text-slate-400 mt-0.5">Renseignez les détails du gérant de point de vente.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleCreateGerant} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <FormField label="Nom & Prénom(s)" required>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={(e: any) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Kouassi Jean-Marc"
                  required
                />
              </FormField>

              <FormField label="Adresse Email" required>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e: any) => handleInputChange("email", e.target.value)}
                  placeholder="Ex: j.kouassi@entreprise.ci"
                  required
                />
              </FormField>

              <FormField label="Numéro de Téléphone" required>
                <PhoneInput
                  name="phone"
                  defaultValue={formData.phone}
                  onChange={(val: string) => handleInputChange("phone", val)}
                  required
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Point de Vente (POS)" required>
                  <Select
                    name="posName"
                    value={formData.posName}
                    onChange={(e: any) => handleInputChange("posName", e.target.value)}
                    required
                  >
                    <option value="" hidden>Sélectionner un POS</option>
                    <option value="Agence Cocody Angré">Agence Cocody Angré</option>
                    <option value="Kiosque Zone 4">Kiosque Zone 4</option>
                    <option value="Point de Vente Plateau">Point de Vente Plateau</option>
                    <option value="Magasin Yopougon">Magasin Yopougon</option>
                  </Select>
                </FormField>

                <FormField label="Statut" required>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={(e: any) => handleInputChange("status", e.target.value)}
                    required
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </Select>
                </FormField>
              </div>

              <div className="pt-2">
                <Checkbox
                  name="isNotifier"
                  label="Envoyer un email avec les accès temporaires au gérant"
                  defaultChecked={formData.isNotifier}
                  onChange={(checked: boolean) => handleInputChange("isNotifier", checked)}
                />
              </div>

              {/* Footer Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Création..." : "Créer le gérant"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}