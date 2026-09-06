import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const STREAM_URL = "https://footcastihome.vercel.app/";

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fc-lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#fc-lg)" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="#04140a" strokeWidth="4" />
      <path d="M28 25 L40 32 L28 39 Z" fill="#04140a" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FootCasti — Watch Live Sports" },
      {
        name: "description",
        content:
          "Watch live sports streams on FootCasti. One click to open the live stream player.",
      },
      { property: "og:title", content: "FootCasti — Watch Live Sports" },
      {
        property: "og:description",
        content:
          "Watch live sports streams on FootCasti. One click to open the live stream player.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-foreground">
            <Logo className="h-9 w-9 drop-shadow-[0_0_8px_rgba(34,197,94,0.55)]" />
            Foot<span className="bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">Casti</span>
          </a>
          <Button asChild className="gap-2">
            <a href={STREAM_URL}>
              <Play className="h-4 w-4" />
              Watch
            </a>
          </Button>
        </div>
      </header>

      {/* Hero with single watch button */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Watch Live Sports
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground sm:text-lg">
            One click takes you straight to the live streams.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2 px-10 text-lg">
            <a href={STREAM_URL}>
              <Play className="h-5 w-5" />
              Watch
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
