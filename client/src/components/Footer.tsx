import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-xl gradient-brand text-primary-foreground text-sm">
              B
            </span>
            <span>
              Build<span className="text-gradient-brand">Wise</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Guided shopping journeys that build you a complete kit — not a cluttered cart.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Explore</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/journeys" className="hover:text-foreground">Journeys</Link></li>
            <li><Link to="/products" className="hover:text-foreground">All products</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BuildWise. A guided shopping demo.
      </div>
    </footer>
  );
}
