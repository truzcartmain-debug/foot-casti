import { n as __toESM } from "../_runtime.mjs";
import { i as SPORT_LIST } from "./site-config-w4GE-b40.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Play, f as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as SiteShell, r as sportIcon, t as LiveDot } from "./SiteShell-DwTvSP4B.mjs";
import { r as sortForDisplay, t as annotate } from "./schedule-Djo4j6H2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BAv7xZ9b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const now = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const allMatches = (0, import_react.useMemo)(() => sortForDisplay(SPORT_LIST.flatMap((sport) => annotate(sport.matches, sport.defaultDurationMinutes, now).map((m) => ({
		...m,
		sportKey: sport.key,
		sportLabel: sport.label
	})))), [now]);
	const liveCount = allMatches.filter((m) => m.status === "live").length;
	const hero = allMatches[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden border-b border-border/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-hero-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-6xl px-5 py-20 text-center sm:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveDot, {}),
							" ",
							liveCount > 0 ? `${liveCount} live now` : "Streaming daily"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl",
						children: [
							"Every match.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Every moment."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg",
						children: "Live sport from around the world — football, UEFA, baseball and UFC. Real-time schedules in your own timezone, multiple servers, zero clutter."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-9 flex flex-wrap items-center justify-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/watch/$sport",
							params: { sport: hero?.sportKey ?? "football" },
							className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								className: "h-4 w-4 fill-current",
								strokeWidth: 2
							}), "Watch live"]
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Browse by sport"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-sm text-muted-foreground sm:block",
					children: "Pick a sport to watch live"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: SPORT_LIST.map((sport) => {
					const Icon = sportIcon(sport.key);
					const live = annotate(sport.matches, sport.defaultDurationMinutes, now).some((m) => m.status === "live");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/watch/$sport",
						params: { sport: sport.key },
						className: "group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/12 ring-1 ring-primary/25 transition-colors group-hover:bg-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-5 w-5 text-primary",
										strokeWidth: 2.1
									})
								}), live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveDot, {}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold",
								children: sport.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: sport.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary",
								children: ["Watch", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
							})
						]
					}, sport.key);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pb-10" })
	] });
}
//#endregion
export { Index as component };
