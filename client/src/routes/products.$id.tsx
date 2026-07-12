import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { inr, productsById, productsByCategory } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const p = productsById[params.id];
    return {
      meta: [
        { title: p ? `${p.name} — BuildWise` : "Product — BuildWise" },
        { name: "description", content: p?.description ?? "Product details on BuildWise." },
        ...(p ? [{ property: "og:image" as const, content: p.image }] : []),
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const product = productsById[id];
  if (!product) throw notFound();
  const { addToCart } = useStore();

  const alternatives = productsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="card-soft overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-primary">{product.brand}</div>
          <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-display text-3xl font-bold">{inr(product.price)}</div>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
              <Check className="h-3 w-3" /> In stock
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Specifications</div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {product.specs.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 text-accent" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              addToCart(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </div>

      {alternatives.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold">Alternatives</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {alternatives.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
