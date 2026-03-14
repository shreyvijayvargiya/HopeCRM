export function ChartTip({ active, payload, label, t }) {
	if (!active || !payload?.length) return null;
	return (
		<div style={{ background: t.surfaceB, border: `1px solid ${t.border}`, borderRadius: 14, padding: "10px 14px", boxShadow: t.shadow }}>
			<div style={{ fontSize: 11, color: t.textSub, marginBottom: 5 }}>{label}</div>
			{payload.map((p, i) => (
				<div key={i} style={{ fontSize: 13, fontWeight: 800, color: p.color || t.accent }}>{p.value}</div>
			))}
		</div>
	);
}
