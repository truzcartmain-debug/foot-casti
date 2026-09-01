import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Signal, l as Palette, p as Check, u as MonitorPlay } from "../_libs/lucide-react.mjs";
import { n as SiteShell } from "./SiteShell-DwTvSP4B.mjs";
import { n as useSettings, t as ACCENTS } from "./settings-BiJCF1Qf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Pv-yhzE1.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const [settings, save] = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-2xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Preferences are saved on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-4 w-4" }), " Accent color"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-3",
							children: ACCENTS.map((a) => {
								const active = settings.accent === a.value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => save({
										...settings,
										accent: a.value
									}),
									className: `flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all ${active ? "border-primary/60 bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-5 w-5 place-items-center rounded-full",
										style: { backgroundColor: a.value },
										children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "h-3 w-3 text-background",
											strokeWidth: 3
										}) : null
									}), a.name]
								}, a.name);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorPlay, { className: "h-4 w-4" }), " Playback"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => save({
								...settings,
								autoplay: !settings.autoplay
							}),
							className: "mt-4 flex w-full items-center justify-between gap-4 rounded-xl border border-border px-4 py-3 text-left transition-colors hover:border-primary/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Autoplay streams"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Start the selected server automatically when the player loads."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `relative h-6 w-11 shrink-0 rounded-full transition-colors ${settings.autoplay ? "bg-primary" : "bg-secondary"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-primary-foreground transition-all ${settings.autoplay ? "left-[22px]" : "left-0.5"}` })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "h-4 w-4" }), " Default server"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Which server is selected first when you open a watch page."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-2",
								children: [
									0,
									1,
									2
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => save({
										...settings,
										defaultServer: i
									}),
									className: `rounded-xl border px-4 py-2 text-sm font-medium transition-all ${settings.defaultServer === i ? "border-primary/50 bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`,
									children: ["Server ", i + 1]
								}, i))
							})
						]
					})
				]
			})
		]
	}) });
}
//#endregion
export { SettingsPage as component };
