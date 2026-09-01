import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";
import { sportList } from "@/config/site";
import { formatWhen, getAllMatches, sortForDisplay } from "@/lib/schedule";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foot Casti — Watch Live Football & Sports Streams" },
      {
        name: "description",
        content:
          "Watch live sports from around the world — football, UEFA, baseball and UFC — with multiple streaming servers and real-time match status.",
      },
      { property: "og:title", content: "Foot Casti — Watch Live Football & Sports Streams" },
      {
        property: "og:description",
        content:
          "Live football, UEFA, baseball and UFC streams with multiple servers and real-time match status.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const featured = useMemo(() => {
    if (!now) return null;
    return sortForDisplay(getAllMatches(sportList, now))[0] ?? null;
  }, [now]);

  let badge = "Live sports, all week";
  if (featured) {
    if (featured.status === "live") {
      badge = `Live Now · ${featured.sportIcon} ${featured.home} vs ${featured.away}`;
    } else if (featured.status === "upcoming") {
      badge = `Next: ${featured.sportIcon} ${featured.home} vs ${featured.away} — ${formatWhen(new Date(featured.kickoff))}`;
    } else {
      badge = `Last match: ${featured.home} vs ${featured.away} (Finished)`;
    }
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="line-clamp-1">{badge}</span>
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Every Match.
            <br />
            <span className="text-primary">Every Moment.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Watch live sports from around the world — football, UEFA, baseball and more. Real-time
            status, multiple servers, no delays.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/watch/$sport" params={{ sport: "football" }}>
                ⚽ Watch Live
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <a href="#sports">Browse sports</a>
            </Button>
          </div>
        </div>
      </section>

      <AdSlot name="homeHero" className="mb-10" />

      <section id="sports" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-4">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse by Sport</h2>
          <span className="text-sm text-muted-foreground">Pick a sport to watch live</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sportList.map((sport) => (
            <Link
              key={sport.key}
              to="/watch/$sport"
              params={{ sport: sport.key }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-elevated"
            >
              <div className="text-3xl">{sport.icon}</div>
              <div className="mt-4">
                <div className="text-lg font-semibold">{sport.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{sport.tagline}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Watch
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
