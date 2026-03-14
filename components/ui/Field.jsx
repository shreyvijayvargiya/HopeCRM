export function Field({ t, label, children }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<div style={{ fontSize: 12, fontWeight: 700, color: t.textSub, marginBottom: 6, letterSpacing: 0.3 }}>{label}</div>
			{children}
		</div>
	);
}
