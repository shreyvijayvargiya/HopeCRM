export function Modal({ t, title, onClose, children, width = 480 }) {
	return (
		<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }} onClick={onClose}>
			<div style={{ background: t.surface, borderRadius: 24, padding: 28, width, maxHeight: "85vh", overflowY: "auto", boxShadow: t.shadowLg, border: `1px solid ${t.border}` }} onClick={(e) => e.stopPropagation()}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
					<span style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{title}</span>
					<button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textSub, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
				</div>
				{children}
			</div>
		</div>
	);
}
