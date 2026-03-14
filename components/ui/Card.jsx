export function Card({ children, t, p = 24, style = {}, onClick }) {
	return (
		<div
			onClick={onClick}
			style={{
				background: t.surface,
				borderRadius: 24,
				boxShadow: t.shadow,
				padding: p,
				border: `1px solid ${t.border}`,
				transition: "box-shadow 0.2s",
				cursor: onClick ? "pointer" : "default",
				...style,
			}}
		>
			{children}
		</div>
	);
}
