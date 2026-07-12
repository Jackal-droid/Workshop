import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/journeys", label: "Journeys" },
  { to: "/products", label: "Products" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl gradient-brand text-primary-foreground">
            <span className="text-sm">B</span>
          </span>
          <span>
            Build<span className="text-gradient-brand">Wise</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname.startsWith(l.to) && "bg-muted text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-colors hover:bg-muted"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full gradient-brand px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/journeys"
            className="hidden rounded-xl gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Start Building
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/journeys"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex justify-center rounded-xl gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Start Building
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
