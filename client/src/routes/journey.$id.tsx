import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { journeysById, pickProduct, type JourneyId } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/journey/$id")({
  head: ({ params }) => {
    const j = journeysById[params.id as JourneyId];
    return {
      meta: [
        { title: j ? `${j.title} journey — BuildWise` : "Journey — BuildWise" },
        { name: "description", content: j?.description ?? "Answer a few questions and get a personalized kit." },
      ],
    };
  },
  component: JourneyPage,
});

function JourneyPage() {
  const { id } = Route.useParams();
  const journey = journeysById[id as JourneyId];
  if (!journey) throw notFound();

  const navigate = useNavigate();
  const { setKit } = useStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = journey.questions.length;
  const q = journey.questions[step];
  const progress = ((step + (answers[q.id] ? 1 : 0)) / total) * 100;
  const canNext = Boolean(answers[q.id]);
  const isLast = step === total - 1;

  const budgetLabel = useMemo(
    () => journey.questions[0].options.find((o) => o.value === answers[journey.questions[0].id])?.label ?? null,
    [answers, journey.questions],
  );

  const handleGenerate = () => {
    const budget = answers.budget ?? "mid";
    const cats = journey.buildKit(answers);
    const productIds = cats
      .map((c) => pickProduct(c, budget)?.id)
      .filter((x): x is string => Boolean(x));
    setKit({
      journeyId: journey.id,
      budgetLabel,
      answers,
      productIds,
    });
    navigate({ to: "/kit" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 flex items-center gap-3">
        <div className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-xl ${journey.gradient}`}>
          {journey.emoji}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Journey</div>
          <h1 className="truncate font-display text-2xl font-bold">{journey.title}</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Step {step + 1} of {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full gradient-brand transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card-soft p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">{q.label}</h2>
        <div className="mt-6 grid gap-3">
          {q.options.map((o) => {
            const active = answers[q.id] === o.value;
            return (
              <button
                key={o.value}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
                )}
              >
                <span className="text-sm font-medium">{o.label}</span>
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border",
                    active ? "border-primary bg-primary" : "border-border",
                  )}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>

        {isLast ? (
          <button
            onClick={handleGenerate}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:transform-none"
          >
            <Sparkles className="h-4 w-4" /> Generate Kit
          </button>
        ) : (
          <button
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
