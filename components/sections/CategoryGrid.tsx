"use client";

import { CategoryCard, type Category } from "@/components/cards/CategoryCard";

export function CategoryGrid({ categories }: { categories: readonly Category[] }) {
  return (
    <section className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}