"use client";

import { Bell, Check, Info, Sparkles, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";

export type Notification = {
  id: string;
  type: "info" | "success" | "warning";
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Annonce publiée",
    description: "Votre annonce « iPhone 13 Pro » est maintenant visible par tous.",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: "2",
    type: "info",
    title: "Nouveau message",
    description: "Aya vous a envoyé un message à propos de votre annonce.",
    time: "Il y a 2 h",
    unread: true,
  },
  {
    id: "3",
    type: "warning",
    title: "Annonce expire bientôt",
    description: "« Appartement 3 pièces, Cocody » expire dans 24 h.",
    time: "Hier",
  },
];

const ICONS = { info: Info, success: Check, warning: TriangleAlert } as const;

const ACCENTS = {
  info: "text-blue-600 bg-blue-50 ring-blue-100",
  success: "text-emerald-600 bg-emerald-50 ring-emerald-100",
  warning: "text-[#FF6600] bg-orange-50 ring-orange-100",
} as const;

type NotificationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
};

export function NotificationPanel({
  isOpen,
  onClose,
  notifications = DEFAULT_NOTIFICATIONS,
}: NotificationPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    document.body.style.overflow = "";
    const timeout = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop sombre */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panneau latéral Blanc 100% Opaque */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-orange-500 to-amber-400" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-bold text-[#FF6600]">
                {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100">
                <Bell className="size-6 text-slate-300" />
              </div>
              <p className="text-xs font-bold text-slate-700">Aucune notification pour le moment.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {notifications.map((n) => {
                const Icon = ICONS[n.type];
                return (
                  <li key={n.id}>
                    <button
                      className={`group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors duration-200 hover:bg-slate-100/80 ${
                        n.unread ? "bg-orange-50/40" : "bg-white border border-slate-100"
                      }`}
                    >
                      <span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl ring-1 ${ACCENTS[n.type]}`}>
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-xs font-bold text-slate-900">{n.title}</span>
                          {n.unread && <span className="size-2 shrink-0 rounded-full bg-[#FF6600]" />}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-xs font-medium text-slate-500">{n.description}</span>
                        <span className="mt-1 block text-[10px] font-medium text-slate-400">{n.time}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
          <button className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-[#FF6600] transition-colors hover:text-[#e05a00]">
            <Sparkles className="size-3.5" />
            Voir toutes les notifications
          </button>
        </div>
      </aside>
    </div>
  );
}