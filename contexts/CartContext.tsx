"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  titre: string;
  prix: number;
  image: string;
  quantite: number;
  vendeur: string;
}

interface CartContextValue {
  items: CartItem[];
  total: number;
  count: number;
  ajouter: (item: Omit<CartItem, "quantite">) => void;
  retirer: (id: string) => void;
  changerQuantite: (id: string, quantite: number) => void;
  vider: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const ajouter = (item: Omit<CartItem, "quantite">) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === item.id);
      if (existe) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantite: i.quantite + 1 } : i));
      }
      return [...prev, { ...item, quantite: 1 }];
    });
    toast.success(`${item.titre} ajouté au panier`, {
      description: "Retrouvez-le dans votre panier en haut à droite.",
    });
  };

  const retirer = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const changerQuantite = (id: string, quantite: number) => {
    if (quantite <= 0) return retirer(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantite } : i)));
  };

  const vider = () => setItems([]);

  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.prix * i.quantite, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((acc, i) => acc + i.quantite, 0), [items]);

  return (
    <CartContext.Provider value={{ items, total, count, ajouter, retirer, changerQuantite, vider }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>");
  return ctx;
}