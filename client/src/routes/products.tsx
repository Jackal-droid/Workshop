import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, type Category } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — BuildWise" },
      { name: "description", content: "Browse the full BuildWise catalogue of laptops, monitors, cameras and more." },
    ],
  }),
  component: ProductsPage,
});

const CATEGORIES: (Category | "all")[] = ["all", "laptop", "monitor", "keyboard", "mouse", "headphones", "chair", "desk", "console", "camera", "lens", "tripod", "backpack", "notebook", "webcam"];

function ProductsPage() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [filter, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">All products</h1>
        <p className="mt-3 text-muted-foreground">Everything you can add to a kit, in one place.</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products or brands..."
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition-shadow focus:ring-2 sm:max-w-xs"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
