import type { Match, Sport } from "@/config/site";

export type MatchStatus = "upcoming" | "live" | "finished";

export interface AnnotatedMatch extends Match {
  status: MatchStatus;
  endsAt: Date;
  sportKey?: string;
  sportLabel?: string;
  sportIcon?: string;
}

export function getEnd(match: Match, defaultDuration = 120): Date {
  const duration = match.durationMinutes || defaultDuration;
  return new Date(new Date(match.kickoff).getTime() + duration * 60000);
}

export function getStatus(match: Match, defaultDuration = 120, now = new Date()): MatchStatus {
  const kickoff = new Date(match.kickoff);
  const end = getEnd(match, defaultDuration);
  if (now < kickoff) return "upcoming";
  if (now <= end) return "live";
  return "finished";
}

export function annotate(
  matches: Match[],
  defaultDuration = 120,
  now = new Date(),
): AnnotatedMatch[] {
  return (matches || []).map((m) => ({
    ...m,
    status: getStatus(m, defaultDuration, now),
    endsAt: getEnd(m, defaultDuration),
  }));
}

const rank: Record<MatchStatus, number> = { live: 0, upcoming: 1, finished: 2 };

export function sortForDisplay(matches: AnnotatedMatch[]): AnnotatedMatch[] {
  return matches.slice().sort((a, b) => {
    if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
    const ak = new Date(a.kickoff).getTime();
    const bk = new Date(b.kickoff).getTime();
    return a.status === "finished" ? bk - ak : ak - bk;
  });
}

/** The single "best" match to headline: live > soonest upcoming > latest finished. */
export function getFeatured(
  matches: Match[],
  defaultDuration = 120,
  now = new Date(),
): AnnotatedMatch | null {
  const sorted = sortForDisplay(annotate(matches, defaultDuration, now));
  return sorted[0] ?? null;
}

/** Every match across every sport, tagged with which sport it belongs to. */
export function getAllMatches(sportsList: Sport[], now = new Date()): AnnotatedMatch[] {
  return sportsList.flatMap((sport) =>
    annotate(sport.matches, sport.defaultDurationMinutes, now).map((m) => ({
      ...m,
      sportKey: sport.key,
      sportLabel: sport.label,
      sportIcon: sport.icon,
    })),
  );
}

export function formatWhen(date: Date): string {
  const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let dayLabel: string;
  if (date.toDateString() === today.toDateString()) dayLabel = "Today";
  else if (date.toDateString() === tomorrow.toDateString()) dayLabel = "Tomorrow";
  else dayLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${dayLabel} · ${time}`;
}
