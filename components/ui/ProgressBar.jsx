export function ProgressBar({ value, max, color, t, height = 8 }) {
	const pct = Math.min((value / max) * 100, 100);
	return (
		<div style={{ height, borderRadius: height, background: t.surfaceB, overflow: "hidden" }}>
			<div style={{ height: "100%", width: `${pct}%`, borderRadius: height, background: color, transition: "width 0.6s ease" }} />
		</div>
	);
}
