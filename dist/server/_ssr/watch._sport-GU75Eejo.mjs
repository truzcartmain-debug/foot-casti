import { n as __toESM } from "../_runtime.mjs";
import { r as SPORTS } from "./site-config-w4GE-b40.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./watch._sport-DN984hP5.mjs";
import { a as Signal, c as Play, n as Tv } from "../_libs/lucide-react.mjs";
import { n as SiteShell, r as sportIcon, t as LiveDot } from "./SiteShell-DwTvSP4B.mjs";
import { n as featured } from "./schedule-Djo4j6H2.mjs";
import { n as useSettings } from "./settings-BiJCF1Qf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._sport-GU75Eejo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WatchPage() {
	const { sportKey } = Route.useLoaderData();
	const sport = SPORTS[sportKey];
	const [settings] = useSettings();
	const [serverIndex, setServerIndex] = (0, import_react.useState)(null);
	const [started, setStarted] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		setServerIndex(null);
	}, [sportKey]);
	const activeServer = serverIndex ?? Math.min(settings.defaultServer, sport.streamServers.length - 1);
	const server = sport.streamServers[activeServer] ?? sport.streamServers[0];
	const match = now ? featured(sport.matches, sport.defaultDurationMinutes, now) : null;
	const Icon = sportIcon(sport.key);
	const isLive = match?.status === "live";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-5 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/25",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-5 w-5 text-primary",
						strokeWidth: 2.1
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight sm:text-2xl",
					children: match ? `${match.home} vs ${match.away}` : `${sport.label} Live`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: match?.group ?? sport.tagline
				})] }),
				isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveDot, {}), " Live now"]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: sport.streamServers.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setServerIndex(i),
						className: `inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all ${i === activeServer ? "border-primary/50 bg-primary/15 text-primary shadow-glow" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
							className: "h-4 w-4",
							strokeWidth: 2.1
						}), s.label]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl border border-border bg-card shadow-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video w-full bg-black",
						children: !settings.autoplay && !started ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStarted(true),
							className: "grid h-full w-full place-items-center text-muted-foreground transition-colors hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-col items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-16 w-16 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "h-7 w-7 text-primary",
										strokeWidth: 2
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Tap to load the stream"
								})]
							})
						}) : server?.embedCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full w-full [&>iframe]:h-full [&>iframe]:w-full",
							dangerouslySetInnerHTML: { __html: server.embedCode }
						}, activeServer) : server?.embedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							src: server.embedUrl,
							title: `${sport.label} stream`,
							className: "h-full w-full",
							allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
							allowFullScreen: true
						}, activeServer) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-full place-items-center text-sm text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-4 w-4" }), " No stream configured"]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "If a server buffers or is unavailable in your region, switch to another one above."
				})
			]
		})]
	}) });
}
//#endregion
export { WatchPage as component };
