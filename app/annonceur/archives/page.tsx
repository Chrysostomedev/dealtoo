import AdminShell from "@/components/layout/AnnonceurShell";
import { Archive, Search, Trash2 } from "lucide-react";

export default function ArchivesPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Archive className="size-6 text-[#163A2C]" />
              Mes archives
            </h1>
            <p className="text-xs text-slate-500 mt-1">Consultez ou réactivez vos anciennes annonces archivées.</p>
          </div>
        </div>

        {/* Barre de recherche et actions */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher dans mes archives..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A2C]"
            />
          </div>
          <button className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer">
            <Trash2 size={16} />
            <span>Supprimer la sélection</span>
          </button>
        </div>

        {/* Tableau Responsive / Zone Vide */}
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden p-12 text-center space-y-3">
          <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Archive size={24} />
          </div>
          <p className="text-sm font-bold text-slate-700">Aucune annonce archivée pour l'instant.</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Les annonces que vous désactivez ou expirez apparaîtront dans cet espace.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}