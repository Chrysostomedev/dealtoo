"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, CreditCard, Trash2, Plus, Minus, CheckCircle, Printer, Scan } from "lucide-react";
import { formatPrix } from "@/lib/utils";

const posArticles = [
  { id: "p1", name: "iPhone 15 Pro Max 256GB", price: 780000, stock: 4, category: "Téléphones" },
  { id: "p2", name: "Écouteurs AirPods Pro 2", price: 165000, stock: 12, category: "Accessoires" },
  { id: "p3", name: "Chargeur Rapide Apple 20W", price: 18000, stock: 30, category: "Accessoires" },
  { id: "p4", name: "Samsung S24 Ultra", price: 690000, stock: 3, category: "Téléphones" },
  { id: "p5", name: "MacBook Pro M3 14''", price: 1450000, stock: 2, category: "Informatique" },
];

export default function POSCaissePage() {
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("espece");

  const addToCart = (product: typeof posArticles[0]) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="h-[calc(100vh-100px)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Catalogue Produit (2 colonnes) */}
      <div className="lg:col-span-2 space-y-4 flex flex-col">
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par produit ou code-barres..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-slate-50 pl-10 pr-4 py-2 text-xs border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold">
            <Scan size={16} /> Code-barres
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto pr-1">
          {posArticles
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#FF6600] transition-all group"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{p.category}</span>
                  <h3 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">{p.name}</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-black text-[#FF6600]">{formatPrix(p.price)}</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    Stock: {p.stock}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Ticket / Panier (1 colonne) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShoppingCart size={18} className="text-[#FF6600]" /> Ticket de Caisse
            </h2>
            <button onClick={() => setCart([])} className="text-xs text-rose-500 hover:underline">Vider</button>
          </div>

          <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100 space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-slate-900 truncate">{item.name}</p>
                  <span className="text-[10px] text-slate-400">{formatPrix(item.price)} x {item.qty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded bg-slate-100 text-slate-600"><Minus size={12} /></button>
                  <span className="font-bold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded bg-slate-100 text-slate-600"><Plus size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Sous-total</span>
              <span>{formatPrix(total)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
              <span>TOTAL À PAYER</span>
              <span className="text-[#FF6600]">{formatPrix(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["espece", "wave", "om"].map((m) => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`py-2 text-xs font-bold rounded-xl border uppercase ${
                  paymentMethod === m ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button className="w-full bg-[#163A2C] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-emerald-950 transition-all">
            <Printer size={16} /> Encaisser & Imprimer le Reçu
          </button>
        </div>
      </div>
    </div>
  );
}