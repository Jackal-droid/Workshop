import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { inr, productsById, type Product } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — BuildWise" },
      { name: "description", content: "Review the items in your BuildWise cart before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeFromCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start with a journey or browse products.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/journeys" className="rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Start a journey
          </Link>
          <Link to="/products" className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-muted">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-3">
          {cart.map((item) => {
            const p: Product | undefined = productsById[item.productId];
            if (!p) return null;
            return (
              <li key={item.productId} className="card-soft flex gap-4 p-4">
                <img src={p.image} alt={p.name} className="h-24 w-24 shrink-0 rounded-lg object-cover" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.brand}</div>
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm font-semibold">{inr(p.price)}</div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-lg border border-border">
                      <button
                        onClick={() => setQty(item.productId, item.qty - 1)}
                        className="grid h-8 w-8 place-items-center hover:bg-muted"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <div className="w-8 text-center text-sm font-semibold">{item.qty}</div>
                      <button
                        onClick={() => setQty(item.productId, item.qty + 1)}
                        className="grid h-8 w-8 place-items-center hover:bg-muted"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/5"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card-soft p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Order summary</div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{inr(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-accent">Free</span>
              </div>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-2xl font-bold">{inr(cartTotal)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Proceed to checkout
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
