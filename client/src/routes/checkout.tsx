import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Truck } from "lucide-react";
import { useState } from "react";
import { inr, productsById } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — BuildWise" },
      { name: "description", content: "Complete your BuildWise order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState("standard");

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Nothing to check out</h1>
        <p className="mt-2 text-muted-foreground">Your cart is empty.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Browse products
        </Link>
      </div>
    );
  }

  const handlePlace = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate({ to: "/order-confirmation" });
  };

  const shipping = delivery === "express" ? 499 : 0;
  const grand = cartTotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Checkout</h1>

      <form onSubmit={handlePlace} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold">Shipping address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Full name" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <input required placeholder="Phone" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <input required placeholder="Address line 1" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 sm:col-span-2" />
              <input placeholder="Address line 2 (optional)" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 sm:col-span-2" />
              <input required placeholder="City" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <input required placeholder="PIN code" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </section>

          <section className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold">Delivery method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { id: "standard", label: "Standard", sub: "4–6 business days", price: 0 },
                { id: "express", label: "Express", sub: "1–2 business days", price: 499 },
              ].map((d) => (
                <label
                  key={d.id}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${delivery === d.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">{d.label}</div>
                      <div className="text-xs text-muted-foreground">{d.sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{d.price === 0 ? "Free" : inr(d.price)}</span>
                    <input type="radio" name="delivery" checked={delivery === d.id} onChange={() => setDelivery(d.id)} />
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold">Payment</h2>
            <p className="mt-1 text-xs text-muted-foreground">Mock payment — no real charge will be made.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Card number" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 sm:col-span-2" />
              <input required placeholder="MM / YY" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <input required placeholder="CVV" className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card-soft p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Order summary</div>
            <ul className="mt-4 divide-y divide-border">
              {cart.map((c) => {
                const p = productsById[c.productId];
                if (!p) return null;
                return (
                  <li key={c.productId} className="flex gap-3 py-3">
                    <img src={p.image} alt={p.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1 text-sm">
                      <div className="truncate font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">Qty {c.qty}</div>
                    </div>
                    <div className="text-sm font-semibold">{inr(p.price * c.qty)}</div>
                  </li>
                );
              })}
            </ul>
            <div className="my-3 border-t border-border" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{inr(cartTotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : inr(shipping)}</span></div>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-2xl font-bold">{inr(grand)}</span>
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <CreditCard className="h-4 w-4" /> Place order
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
