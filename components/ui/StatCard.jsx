import { Card } from "./Card";

export function StatCard({ t, label, value, change, up, sub, icon, color }) {
	return (
		<Card t={t} style={{ position: "relative", overflow: "hidden" }}>
			<div style={{ position: "absolute", top: -10, right: -10, fontSize: 52, opacity: 0.06, lineHeight: 1 }}>{icon}</div>
			<div style={{ fontSize: 12, color: t.textSub, fontWeight: 600, marginBottom: 10 }}>{label}</div>
			<div style={{ fontSize: 30, fontWeight: 800, color: color || t.text, letterSpacing: -1, marginBottom: 8 }}>{value}</div>
			{change && (
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<span style={{ fontSize: 12, fontWeight: 700, color: up ? t.green : t.red }}>{change}</span>
					{sub && <span style={{ fontSize: 11, color: t.textMuted }}>{sub}</span>}
				</div>
			)}
		</Card>
	);
}
