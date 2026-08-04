    // ============================================================================
// AdminTopbar — barre supérieure fixe de l'espace admin.
// Server Component : purement présentationnel, aucune interactivité propre.
// ============================================================================

import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export function AdminTopbar({ nomAdmin = "Admin Dealtoo" }: { nomAdmin?: string }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-ink-faint/10 bg-surface px-4 lg:px-6">
      <div className="flex flex-1 items-center gap-2 rounded-md border border-ink-faint/15 bg-canvas px-3 py-2">
        <Search className="size-4 text-ink-faint" />
        <input
          type="text"
          placeholder="Rechercher un utilisateur, une annonce…"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
        />
      </div>

      <button className="relative flex size-10 items-center justify-center rounded-full text-ink-soft hover:bg-ink-faint/5">
        <Bell className="size-5" />
        <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-ruby-500" />
      </button>

      <div className="flex items-center gap-2">
        <Avatar nom={nomAdmin} taille="sm" />
        <span className="hidden text-sm font-medium text-ink sm:inline">{nomAdmin}</span>
      </div>
    </header>
  );
}