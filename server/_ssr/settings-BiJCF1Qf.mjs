import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BiJCF1Qf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "footcasti-settings";
var ACCENTS = [
	{
		name: "Amber",
		value: "oklch(0.8 0.17 72)"
	},
	{
		name: "Emerald",
		value: "oklch(0.79 0.19 155)"
	},
	{
		name: "Sky",
		value: "oklch(0.75 0.14 230)"
	},
	{
		name: "Rose",
		value: "oklch(0.7 0.2 15)"
	},
	{
		name: "Violet",
		value: "oklch(0.7 0.18 300)"
	}
];
var DEFAULTS = {
	accent: ACCENTS[0].value,
	autoplay: true,
	defaultServer: 0
};
function loadSettings() {
	if (typeof window === "undefined") return DEFAULTS;
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? {
			...DEFAULTS,
			...JSON.parse(raw)
		} : DEFAULTS;
	} catch {
		return DEFAULTS;
	}
}
function saveSettings(s) {
	window.localStorage.setItem(KEY, JSON.stringify(s));
	applySettings(s);
	window.dispatchEvent(new Event("footcasti-settings"));
}
function applySettings(s) {
	document.documentElement.style.setProperty("--primary", s.accent);
	document.documentElement.style.setProperty("--ring", s.accent);
}
function useSettings() {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULTS);
	(0, import_react.useEffect)(() => {
		const loaded = loadSettings();
		setSettings(loaded);
		applySettings(loaded);
		const onChange = () => setSettings(loadSettings());
		window.addEventListener("footcasti-settings", onChange);
		return () => window.removeEventListener("footcasti-settings", onChange);
	}, []);
	return [settings, saveSettings];
}
//#endregion
export { useSettings as n, ACCENTS as t };
