"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPrix } from "@/lib/utils";
import { Button } from "./Button";

export function PanierTrigger() {
  const { count } = useCart();
  const [ouvert, setOuvert] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOuvert(true)}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.04 }}
        className="relative flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-2xs transition-colors hover:border-[#FF6600]/40 hover:text-[#FF6600]"
        aria-label="Ouvrir le panier"
      >
        <ShoppingBag className="size-5" strokeWidth={1.75} />

        <AnimatePresence>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#FF6600] text-[11px] font-bold text-white ring-2 ring-white shadow-xs"
            >
              {count > 9 ? "9+" : count}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <PanierDrawer ouvert={ouvert} onClose={() => setOuvert(false)} />
    </>
  );
}

function PanierDrawer({
  ouvert,
  onClose,
}: {
  ouvert: boolean;
  onClose: () => void;
}) {
  const { items, total, retirer, changerQuantite } = useCart();

  return (
    <AnimatePresence>
      {ouvert && (
        <>
          {/* Overlay d'arrière-plan avec z-[998] */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[998] bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Drawer fixe avec fond blanc pur et z-[999] */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[999] flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-[#FF6600]">
                  <ShoppingBag className="size-4.5" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Mon panier
                  </h2>
                  <p className="text-xs font-medium text-slate-400">
                    {items.length} article{items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                    <ShoppingBag className="size-7 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Votre panier est vide</p>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      Ajoutez des articles pour les retrouver ici
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.li
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="group flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:border-slate-200"
                      >
                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.titre}
                          className="size-16 shrink-0 rounded-xl object-cover border border-slate-200/60"
                        />

                        {/* Infos */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <p className="line-clamp-1 text-xs font-bold text-slate-800">
                              {item.titre}
                            </p>
                            <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                              {item.vendeur}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            {/* Sélecteur de Quantité */}
                            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
                              <button
                                onClick={() =>
                                  changerQuantite(item.id, item.quantite - 1)
                                }
                                className="flex size-6 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-5 text-center font-semibold text-xs text-slate-800">
                                {item.quantite}
                              </span>
                              <button
                                onClick={() =>
                                  changerQuantite(item.id, item.quantite + 1)
                                }
                                className="flex size-6 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>

                            <span className="text-xs font-extrabold text-[#FF6600]">
                              {formatPrix(item.prix * item.quantite)}
                            </span>
                          </div>
                        </div>

                        {/* Supprimer */}
                        <button
                          onClick={() => retirer(item.id)}
                          className="self-start rounded-lg p-1 text-slate-300 transition-all hover:bg-rose-50 hover:text-rose-500"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Total</span>
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    {formatPrix(total)}
                  </span>
                </div>

                <Button
                  className="w-full h-11 justify-center rounded-xl bg-[#FF6600] hover:bg-[#e05a00] text-white font-bold text-xs shadow-md shadow-[#FF6600]/20 transition-all"
                >
                  Passer la commande
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}