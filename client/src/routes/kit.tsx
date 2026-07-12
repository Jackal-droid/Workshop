import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bookmark, ShoppingBag, Trash2, Repeat, ExternalLink, PackageOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { inr, journeysById, productsById, productsByCategory, type JourneyId, type Product } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/kit")({
  head: () => ({
    meta: [
      { title: "Your Kit — BuildWise" },
      { name: "description", content: "Review, customize, and add your personalized shopping kit to cart." },
    ],
  }),
  component: KitPage,
});

const BUDGET_AMOUNTS: Record<string, number> = {
  low: 50000,
  mid: 150000,
  high: 300000,
  pro: 500000,
};

function KitPage() {
  const { kit, replaceInKit, removeFromKit, addKitToCart } = useStore();
  const navigate = useNavigate();
  const [replaceTarget, setReplaceTarget] = useState<Product | null>(null);

  const journey = kit.journeyId ? journeysById[kit.journeyId as JourneyId] : null;
  const products = useMemo(
    () => kit.productIds.map((id) => productsById[id]).filter(Boolean) as Product[],
    [kit.productIds],
  );

  const total = products.reduce((s, p) => s + p.price, 0);
  const budgetKey = kit.answers.budget;
  const budgetAmount = budgetKey ? BUDGET_AMOUNTS[budgetKey] : null;
  const remaining = budgetAmount != null ? budgetAmount - total : null;

  if (!journey || products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-muted">
          <PackageOpen className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold">No kit yet</h1>
        <p className="mt-2 text-muted-foreground">Pick a journey to generate your personalized shopping kit.</p>
        <Link
          to="/journeys"
          className="mt-6 inline-flex rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Start a journey
        </Link>
      </div>
    );
  }

  const alternatives = replaceTarget ? productsByCategory(replaceTarget.category).filter((p) => p.id !== replaceTarget.id) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wide text-primary">Your generated kit</div>
        <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">{journey.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Curated for your answers. Swap anything you like — the budget updates instantly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Sidebar summary */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="card-soft p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Journey summary</div>
            <div className="mt-3 flex items-center gap-3">
              <div className={`inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-lg ${journey.gradient}`}>
                {journey.emoji}
              </div>
              <div className="min-w-0">
                <div className="truncate font-semibold">{journey.title}</div>
                <div className="text-xs text-muted-foreground">{products.length} items</div>
              </div>
            </div>
            <dl className="mt-5 space-y-2 text-sm">
              {journey.questions.map((q) => {
                const val = kit.answers[q.id];
                const label = q.options.find((o) => o.value === val)?.label ?? "—";
                return (
                  <div key={q.id} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{q.label.replace(/\?$/, "")}</dt>
                    <dd className="max-w-[55%] truncate text-right font-medium">{label}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="card-soft p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Budget tracker</div>
            {budgetAmount != null ? (
              <>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="font-display text-lg font-bold">{inr(budgetAmount)}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className="text-sm font-semibold">{inr(total)}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full transition-all duration-500 ${total > budgetAmount ? "bg-destructive" : "gradient-brand"}`}
                    style={{ width: `${Math.min(100, (total / budgetAmount) * 100)}%` }}
                  />
                </div>
                <div className={`mt-2 text-xs font-medium ${remaining! < 0 ? "text-destructive" : "text-accent"}`}>
                  {remaining! < 0
                    ? `Over budget by ${inr(Math.abs(remaining!))}`
                    : `${inr(remaining!)} remaining`}
                </div>
              </>
            ) : (
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-lg font-bold">{inr(total)}</span>
              </div>
            )}

            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  addKitToCart();
                  toast.success("Kit added to cart");
                  navigate({ to: "/cart" });
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="h-4 w-4" /> Add entire kit to cart
              </button>
              <button
                onClick={() => toast.success("Kit saved for later")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                <Bookmark className="h-4 w-4" /> Save for later
              </button>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="card-soft flex flex-col overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.brand} · {p.category}</div>
                <div className="mt-1 font-display text-base font-semibold">{p.name}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 text-sm font-semibold">{inr(p.price)}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setReplaceTarget(p)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                  >
                    <Repeat className="h-3.5 w-3.5" /> Replace
                  </button>
                  <button
                    onClick={() => {
                      removeFromKit(p.id);
                      toast(`${p.name} removed`);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/5"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                  <Link
                    to="/products/$id"
                    params={{ id: p.id }}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Details <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Replacement Modal */}
      <Dialog open={Boolean(replaceTarget)} onOpenChange={(o) => !o && setReplaceTarget(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Replace {replaceTarget?.name}</DialogTitle>
            <DialogDescription>
              Alternatives in the {replaceTarget?.category} category. Selecting one updates your kit instantly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid max-h-[60vh] gap-3 overflow-y-auto sm:grid-cols-2">
            {alternatives.map((alt: Product) => (
              <button
                key={alt.id}
                onClick={() => {
                  if (!replaceTarget) return;
                  replaceInKit(replaceTarget.id, alt.id);
                  toast.success(`Swapped for ${alt.name}`);
                  setReplaceTarget(null);
                }}
                className="flex items-start gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                <img src={alt.image} alt={alt.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{alt.brand}</div>
                  <div className="truncate font-semibold">{alt.name}</div>
                  <div className="mt-1 text-sm font-semibold">{inr(alt.price)}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{alt.specs.slice(0, 2).join(" · ")}</div>
                </div>
              </button>
            ))}
            {alternatives.length === 0 && (
              <div className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No alternatives available for this category.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
