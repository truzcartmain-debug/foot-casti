import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { siteConfig, sportList } from "@/config/site";
import { cn } from "@/lib/utils";

const activeCls = "text-primary";
const baseCls =
  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-lg ring-1 ring-primary/30">
            ⚽
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Foot <span className="text-primary">Casti</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/" className={baseCls} activeOptions={{ exact: true }} activeProps={{ className: cn(baseCls, activeCls) }}>
            Home
          </Link>
          {sportList.map((sport) => (
            <Link
              key={sport.key}
              to="/watch/$sport"
              params={{ sport: sport.key }}
              className={baseCls}
              activeProps={{ className: cn(baseCls, activeCls) }}
            >
              {sport.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "block rounded-lg px-3 py-3 text-sm font-medium text-primary" }}
          >
            Home
          </Link>
          {sportList.map((sport) => (
            <Link
              key={sport.key}
              to="/watch/$sport"
              params={{ sport: sport.key }}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{
                className: "block rounded-lg px-3 py-3 text-sm font-medium text-primary",
              }}
            >
              <span className="mr-2">{sport.icon}</span>
              {sport.label}
            </Link>
          ))}
        </nav>
      )}

      <span className="sr-only">{siteConfig.siteName}</span>
    </header>
  );
}
