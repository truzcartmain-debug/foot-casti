import { i as SPORT_LIST, n as SITE_NAME, t as FOOTER_LINKS } from "./site-config-w4GE-b40.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Goal, i as Swords, o as Settings, r as Trophy, s as Radio, t as Volleyball } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteShell-DwTvSP4B.js
var import_jsx_runtime = require_jsx_runtime();
var SPORT_ICONS = {
	football: Goal,
	uefa: Trophy,
	baseball: Volleyball,
	ufc: Swords
};
function sportIcon(key) {
	return SPORT_ICONS[key] ?? Goal;
}
function LiveDot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "relative flex h-2 w-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-primary" })]
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
								className: "h-4.5 w-4.5 text-primary",
								strokeWidth: 2.25
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-lg font-semibold tracking-tight",
							children: ["Foot ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Casti"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "ml-auto flex items-center gap-1 overflow-x-auto",
						children: [SPORT_LIST.map((sport) => {
							const Icon = sportIcon(sport.key);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/watch/$sport",
								params: { sport: sport.key },
								className: "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-secondary [&.active]:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-4 w-4",
									strokeWidth: 2
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: sport.label
								})]
							}, sport.key);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/settings",
							"aria-label": "Settings",
							className: "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-secondary [&.active]:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
								className: "h-4 w-4",
								strokeWidth: 2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Settings"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-6",
						children: FOOTER_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: link.url,
							className: "transition-colors hover:text-primary",
							children: link.label
						}, link.label))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						SITE_NAME,
						" • Real-time sports updates"
					] })]
				})
			})
		]
	});
}
//#endregion
export { SiteShell as n, sportIcon as r, LiveDot as t };
