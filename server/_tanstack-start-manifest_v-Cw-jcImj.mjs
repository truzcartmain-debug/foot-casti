//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Cw-jcImj.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/dev-server/src/routes/__root.tsx",
		children: [
			"/",
			"/settings",
			"/watch/$sport"
		],
		preloads: ["/assets/index-K4KI5Z7U.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-K4KI5Z7U.js"
		} }]
	},
	"/": {
		filePath: "/dev-server/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-C6AeroNQ.js",
			"/assets/SiteShell-DRl3M47I.js",
			"/assets/schedule-D9Qstn3t.js"
		]
	},
	"/settings": {
		filePath: "/dev-server/src/routes/settings.tsx",
		children: void 0,
		preloads: [
			"/assets/settings-BtzcYP1K.js",
			"/assets/SiteShell-DRl3M47I.js",
			"/assets/settings-BNQilemV.js"
		]
	},
	"/watch/$sport": {
		filePath: "/dev-server/src/routes/watch.$sport.tsx",
		children: void 0,
		preloads: [
			"/assets/watch._sport-Rdnqu3qN.js",
			"/assets/SiteShell-DRl3M47I.js",
			"/assets/schedule-D9Qstn3t.js",
			"/assets/settings-BNQilemV.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
