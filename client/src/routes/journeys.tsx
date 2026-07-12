import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { journeys } from "@/lib/mock-data";

export const Route = createFileRoute("/journeys")({
  head: () => ({
    meta: [
      { title: "Journeys — BuildWise" },
      { name: "description", content: "Pick a shopping journey — coding, gaming, home office, photography or student — and get a personalized kit." },
    ],
  }),
  component: JourneysPage,
});

function JourneysPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Choose your journey</h1>
        <p className="mt-3 text-muted-foreground">
          Every journey asks a few short questions and returns a complete, budget-aware kit
          you can customize in one click.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="text-xs font-medium uppercase tracking-wide text-primary">{j.tagline}</div>
            <p className="mt-2 text-sm text-muted-foreground">{j.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Build now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
