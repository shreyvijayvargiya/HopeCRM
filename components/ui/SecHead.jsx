export function SecHead({ t, children, action, sub }) {
	return (
		<div style={{ marginBottom: 18 }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h2 style={{ fontSize: 15, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>{children}</h2>
				{action && <span style={{ fontSize: 12, color: t.accent, cursor: "pointer", fontWeight: 700 }}>{action}</span>}
			</div>
			{sub && <p style={{ fontSize: 12, color: t.textSub, marginTop: 3 }}>{sub}</p>}
		</div>
	);
}
