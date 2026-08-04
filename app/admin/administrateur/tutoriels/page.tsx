"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import AdminCard from "@/components/admin/ui/AdminCard";
import { UploadCloud, Film, Image as ImageIcon, Plus, Trash2, Eye, PlayCircle } from "lucide-react";

type TutorialItem = {
  id: string;
  title: string;
  type: "video" | "photo";
  url: string;
  category: string;
  views: number;
};

export default function TutorielsPage() {
  const [tutorials, setTutorials] = useState<TutorialItem[]>([
    { id: "1", title: "Comment publier une Vente Flash en 30s", type: "video", url: "#", category: "Publication", views: 1420 },
    { id: "2", title: "Optimiser les photos de ses annonces", type: "photo", url: "#", category: "Conseils", views: 890 },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Publication");
  const [mediaType, setMediaType] = useState<"video" | "photo">("video");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setTutorials([
      ...tutorials,
      {
        id: Date.now().toString(),
        title,
        type: mediaType,
        url: "#",
        category,
        views: 0,
      },
    ]);
    setTitle("");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Centre de Tutoriels & Médias"
        subtitle="Mise en ligne des guides d'aide photos et vidéos destinés aux vendeurs Dealtoo."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire de téléversement */}
        <AdminCard title="Nouveau Tutoriel" subtitle="Importez une vidéo MP4 ou une image illustrative.">
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Titre du Tutoriel</label>
              <input
                type="text"
                placeholder="ex: Réussir sa première Capsule Vidéo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500 bg-white"
              >
                <option value="Publication">Publication & Quotas</option>
                <option value="Conseils">Conseils Ventes & Visibilité</option>
                <option value="Compte">Gestion de compte Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Type de Média</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 text-xs text-slate-600 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    checked={mediaType === "video"}
                    onChange={() => setMediaType("video")}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>Vidéo (MP4)</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-slate-600 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    checked={mediaType === "photo"}
                    onChange={() => setMediaType("photo")}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>Image / Infographie</span>
                </label>
              </div>
            </div>

            {/* Zone Drag and Drop */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-orange-400 transition-colors cursor-pointer bg-slate-50/50">
              <UploadCloud size={28} className="mx-auto text-orange-500 mb-2" />
              <p className="text-xs font-semibold text-slate-700">Déposez votre fichier ici</p>
              <p className="text-[10px] text-slate-400 mt-1">MP4, WEBM, PNG ou JPG (Max 50Mo)</p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors shadow-xs flex items-center justify-center space-x-2"
            >
              <Plus size={16} />
              <span>Publier le Tutoriel</span>
            </button>
          </form>
        </AdminCard>

        {/* Liste des médias publiés */}
        <div className="lg:col-span-2">
          <AdminCard title="Tutoriels Actifs" subtitle="Gérez la visibilité des ressources d'accompagnement.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tutorials.map((item) => (
                <div key={item.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/30 flex flex-col justify-between space-y-4 hover:border-slate-200 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100 text-orange-600">
                      {item.type === "video" ? <Film size={18} /> : <ImageIcon size={18} />}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-1">
                      <span className="flex items-center space-x-1">
                        <Eye size={12} /> <span>{item.views} vues</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button className="text-[11px] font-semibold text-orange-600 hover:underline flex items-center space-x-1">
                      <PlayCircle size={13} />
                      <span>Prévisualiser</span>
                    </button>
                    <button
                      onClick={() => setTutorials(tutorials.filter((t) => t.id !== item.id))}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}