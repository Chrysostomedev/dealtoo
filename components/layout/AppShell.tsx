"use client";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TapBar } from "./TapBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
       <CartProvider>
      <Header />
      
      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      <Footer />
      <TapBar />
      </CartProvider>
    </div>
  );
}