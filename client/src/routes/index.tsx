import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Wand2, SlidersHorizontal } from "lucide-react";
import { journeys, products, inr } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const featured = [products[0], products[3], products[11], products[16]];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(60%_50%_at_50%_0%,theme(colors.indigo.100)_0%,transparent_70%),radial-gradient(40%_40%_at_80%_20%,theme(colors.blue.100)_0%,transparent_70%)]"
        />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              A smarter way to shop
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Build Your Perfect Setup,
              <br />
              <span className="text-gradient-brand">Not Just a Shopping Cart.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Choose your goal, answer a few short questions, and receive a personalized
              shopping kit in minutes — tuned to your budget and taste.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/journeys"
                className="inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Start Building <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Pick a journey</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Five hand-crafted paths. One perfect kit at the end.
            </p>
          </div>
          <Link to="/journeys" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {journeys.map((j) => (
            <Link
              key={j.id}
              to="/journey/$id"
              params={{ id: j.id }}
              className="card-soft card-hover group flex flex-col overflow-hidden p-6"
            >
              <div className={`inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-2xl ${j.gradient}`}>
                <span>{j.emoji}</span>
              </div>
              <div className="mt-5 font-display text-lg font-semibold">{j.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{j.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Build now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why BuildWise */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Why BuildWise</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Three simple ideas that make shopping feel less like scrolling and more like designing.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Wand2, title: "Goal-based shopping", body: "Start from what you want to do — coding, gaming, shooting. We map the gear." },
              { icon: Sparkles, title: "Smart recommendations", body: "Curated picks matched to your budget and experience level." },
              { icon: SlidersHorizontal, title: "Easy customization", body: "Swap any item in one click. The budget tracker updates instantly." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-background p-6">
                <div className="inline-grid h-11 w-11 place-items-center rounded-xl gradient-brand text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg font-semibold">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Featured products</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Reader favourites across categories. Starting at {inr(featured[0].price)}.
            </p>
          </div>
          <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
