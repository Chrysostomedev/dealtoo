"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { FormField, Input } from "@/components/form/FormInput";

export default function PublierAnnoncePage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Gestion des champs textuels
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ajout d'images multiples
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const updatedImages = [...images, ...selectedFiles];
    setImages(updatedImages);

    // Génération des URLs de prévisualisation
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Suppression d'une image
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]); // Libère la mémoire
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);

    images.forEach((image) => {
      data.append("images", image);
    });

    console.log("Données envoyées :", { ...formData, imagesCount: images.length });
    // Effectuer ici l'appel API (ex: await fetch('/api/annonces', { method: 'POST', body: data }))
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm rounded-lg border border-gray-100 my-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Publier une nouvelle annonce
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <FormField label="Titre de l'annonce" required>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: iPhone 15 Pro Max 256Go"
            required
          />
        </FormField>

        {/* Catégorie & Prix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Catégorie" required>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="electronique">Électronique</option>
              <option value="vehicules">Véhicules</option>
              <option value="immobilier">Immobilier</option>
              <option value="mode">Mode & Vetements</option>
            </select>
          </FormField>

          <FormField label="Prix (FCFA)" required>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ex: 450000"
              required
            />
          </FormField>
        </div>

        {/* Description */}
        <FormField label="Description détaillée" required>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez l'état de l'article, la disponibilité..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </FormField>

        {/* Zone Upload d'Images */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Photos de l'annonce <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Bouton Ajouter */}
            <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 font-medium">
                Ajouter des photos
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Aperçus d'images */}
            {previews.map((src, index) => (
              <div key={index} className="relative h-28 rounded-lg overflow-hidden border border-gray-200 group">
                <img
                  src={src}
                  alt={`Aperçu ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                  title="Supprimer la photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Formats acceptés : JPG, PNG. Vous pouvez sélectionner plusieurs images à la fois.
          </p>
        </div>

        {/* Bouton de Soumission */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition-colors shadow-sm"
          >
            Publier l'annonce
          </button>
        </div>
      </form>
    </div>
  );
}