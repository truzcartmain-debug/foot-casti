//#region node_modules/.nitro/vite/services/ssr/assets/schedule-Djo4j6H2.js
function endOf(match, defaultDuration) {
	const duration = match.durationMinutes || defaultDuration || 120;
	return new Date(new Date(match.kickoff).getTime() + duration * 6e4);
}
function statusOf(match, defaultDuration, now = /* @__PURE__ */ new Date()) {
	if (now < new Date(match.kickoff)) return "upcoming";
	if (now <= endOf(match, defaultDuration)) return "live";
	return "finished";
}
function annotate(matches, defaultDuration, now = /* @__PURE__ */ new Date()) {
	return matches.map((m) => ({
		...m,
		status: statusOf(m, defaultDuration, now),
		endsAt: endOf(m, defaultDuration)
	}));
}
function sortForDisplay(matches) {
	const rank = {
		live: 0,
		upcoming: 1,
		finished: 2
	};
	return [...matches].sort((a, b) => {
		if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
		const ak = new Date(a.kickoff).getTime();
		const bk = new Date(b.kickoff).getTime();
		return a.status === "finished" ? bk - ak : ak - bk;
	});
}
function featured(matches, defaultDuration, now = /* @__PURE__ */ new Date()) {
	return sortForDisplay(annotate(matches, defaultDuration, now))[0] ?? null;
}
//#endregion
export { featured as n, sortForDisplay as r, annotate as t };
