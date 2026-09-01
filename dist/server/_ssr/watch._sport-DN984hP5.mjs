import { r as SPORTS } from "./site-config-w4GE-b40.mjs";
import { A as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._sport-DN984hP5.js
var $$splitComponentImporter = () => import("./watch._sport-GU75Eejo.mjs");
var Route = createFileRoute("/watch/$sport")({
	loader: ({ params }) => {
		const sport = SPORTS[params.sport];
		if (!sport) throw notFound();
		return {
			sportKey: sport.key,
			label: sport.label,
			tagline: sport.tagline
		};
	},
	head: ({ loaderData }) => {
		const title = `${loaderData?.label ?? "Live"} Live Stream — Foot Casti`;
		const description = loaderData?.tagline ?? "Watch live sport with multiple streaming servers on Foot Casti.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "video.other"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
