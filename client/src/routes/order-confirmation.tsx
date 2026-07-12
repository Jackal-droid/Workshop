import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order confirmed — BuildWise" },
      { name: "description", content: "Your BuildWise order has been placed." },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const orderId = "BW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-accent/10 text-accent">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-extrabold">Order placed</h1>
      <p className="mt-3 text-muted-foreground">
        Thanks for shopping with BuildWise. A confirmation is on its way.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
        <span className="text-muted-foreground">Order ID:</span>
        <span className="font-semibold">{orderId}</span>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Back to home
        </Link>
        <Link to="/journeys" className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-muted">
          Start another journey
        </Link>
      </div>
    </div>
  );
}
