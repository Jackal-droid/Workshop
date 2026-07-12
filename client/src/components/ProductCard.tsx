import { Link } from "@tanstack/react-router";
import { inr, type Product } from "@/lib/mock-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="card-soft card-hover group flex flex-col overflow-hidden"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </div>
        <div className="mt-1 font-display text-base font-semibold leading-tight">{product.name}</div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="text-sm font-semibold">{inr(product.price)}</div>
          <span className="rounded-lg bg-muted px-2 py-1 text-[11px] font-medium capitalize text-muted-foreground">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
