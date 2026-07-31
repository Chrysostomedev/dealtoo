"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

type Listing = {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  tag?: string;
};

const ROW_1: Listing[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    price: "450 000 F",
    location: "Cocody",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Populaire",
  },
  {
    id: "2",
    title: "Villa 4 pièces",
    price: "85 000 000 F",
    location: "Riviera",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    title: "Toyota RAV4 2021",
    price: "12 500 000 F",
    location: "Marcory",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Neuf",
  },
  {
    id: "4",
    title: "Développeur Front-end",
    price: "600 000 F/mois",
    location: "Plateau",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "5",
    title: "Sneakers Jordan 4",
    price: "95 000 F",
    location: "Yopougon",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const ROW_2: Listing[] = [
  {
    id: "6",
    title: "MacBook Pro M3",
    price: "980 000 F",
    location: "Angré",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    tag: "Populaire",
  },
  {
    id: "7",
    title: "Studio meublé",
    price: "250 000 F/mois",
    location: "II Plateaux",
    image: "https://picsum.photos/seed/dealtoo7/400/300",
  },
  {
    id: "8",
    title: "Traiteur événementiel",
    price: "Sur devis",
    location: "Abidjan",
    image: "https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "9",
    title: "Moto Yamaha",
    price: "1 300 000 F",
    location: "Bingerville",
    image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "10",
    title: "Community Manager",
    price: "350 000 F/mois",
    location: "Cocody",
    image: "https://picsum.photos/seed/dealtoo10/400/300",
  },
];

function Row({ items, direction, duration }: { items: Listing[]; direction: "left" | "right"; duration: number }) {
  const doubled = [...items, ...items];

  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover:[animation-play-state:paused] motion-reduce:!animate-none`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <Link
            key={`${item.id}-${i}`}
            href={`/annonces/${item.id}`}
            className="relative block h-40 w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/40 transition-transform duration-300 hover:-translate-y-1 hover:border-gold-400/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            {item.tag && (
              <span className="absolute left-2.5 top-2.5 rounded-full bg-gradient-to-r from-brand-500 to-gold-400 px-2 py-0.5 text-[10px] font-semibold text-black shadow">
                {item.tag}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="truncate text-sm font-semibold text-orange-400">{item.title}</p>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <span className="text-xs font-medium font-bold text-white">{item.price}</span>
                <span className="flex shrink-0 items-center gap-0.5 text-[11px] text-white/60">
                  <MapPin className="size-3" /> {item.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Bandeau "annonces tendances" en défilement infini, deux rangées qui
 * filent en sens opposés. S'arrête au survol, respecte prefers-reduced-motion.
 * Remplacez les `image` par vos vraies photos d'annonces.
 */
export function MarqueeListings() {
  return (
    <div className="relative mt-14 flex flex-col gap-4">
      <style jsx global>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-left { animation: marquee-left linear infinite; }
        .animate-marquee-right { animation: marquee-right linear infinite; }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-32" />

      <Row items={ROW_1} direction="left" duration={32} />
      <Row items={ROW_2} direction="right" duration={38} />
    </div>
  );
}