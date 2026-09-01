import { useEffect, useMemo, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";
import { sports, sportList } from "@/config/site";
import { getFeatured } from "@/lib/schedule";

export const Route = createFileRoute("/watch/$sport")({
  loader: ({ params }) => {
    const sport = sports[params.sport];
    if (!sport) throw notFound();
    return { key: sport.key, label: sport.label, tagline: sport.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Stream unavailable — Foot Casti" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.label} Live Stream — Foot Casti`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.tagline}. Multiple servers, live status.` },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.tagline },
      ],
    };
  },
  component: WatchPage,
  notFoundComponent: WatchNotFound,
});

function WatchNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Stream not found</h1>
      <p className="mt-3 text-muted-foreground">That sport isn’t part of the lineup.</p>
      <div className="mt-6 flex justify-center">
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}

function WatchPage() {
  const { sport: sportKey } = Route.useParams();
  const sport = sports[sportKey]!;
  const [serverIndex, setServerIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setServerIndex(0);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, [sportKey]);

  const featured = useMemo(
    () => (now ? getFeatured(sport.matches, sport.defaultDurationMinutes, now) : null),
    [sport, now],
  );

  const server = sport.streamServers[serverIndex];
  const statusLabel =
    featured?.status === "live" ? "Live Now" : featured?.status === "upcoming" ? "Up Next" : "Replay";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {sport.icon} {sport.label} · {statusLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {sportList
            .filter((s) => s.key !== sport.key)
            .map((s) => (
              <Button key={s.key} asChild variant="ghost" size="sm">
                <Link to="/watch/$sport" params={{ sport: s.key }}>
                  {s.icon} {s.label}
                </Link>
              </Button>
            ))}
        </div>
      </div>

      <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
        {featured ? (
          <>
            {featured.home} <span className="text-muted-foreground">vs</span> {featured.away}
          </>
        ) : (
          `${sport.label} Live`
        )}
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="flex flex-wrap gap-2">
            {sport.streamServers.map((s, i) => (
              <Button
                key={s.label}
                variant={i === serverIndex ? "default" : "secondary"}
                size="sm"
                aria-pressed={i === serverIndex}
                onClick={() => setServerIndex(i)}
              >
                {s.label}
              </Button>
            ))}
          </div>

          <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[var(--shadow-elevated)] [&_iframe]:h-full [&_iframe]:w-full">
            {server?.embedCode ? (
              <div
                className="h-full w-full"
                // Stream embeds come from the site's own config file.
                dangerouslySetInnerHTML={{ __html: server.embedCode }}
              />
            ) : (
              <iframe
                key={server?.embedUrl}
                src={server?.embedUrl || ""}
                title={`${sport.label} stream`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <AdSlot name="watchBelowPlayer" className="mt-6" />
        </div>

        <aside className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Match info
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Competition</dt>
              <dd className="text-right font-semibold">{featured?.group ?? "—"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Venue</dt>
              <dd className="text-right font-semibold">{featured?.venue ?? "—"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Kickoff</dt>
              <dd className="text-right font-semibold">
                {featured ? new Date(featured.kickoff).toLocaleString() : "—"}
              </dd>
            </div>
          </dl>
          <AdSlot name="watchSidebar" className="mt-5" />
        </aside>
      </div>
    </div>
  );
}
