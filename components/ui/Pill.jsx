export function Pill({ children, color, dim, small = false }) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: small ? "2px 8px" : "3px 11px",
				borderRadius: 20,
				fontSize: small ? 10 : 11,
				fontWeight: 700,
				background: dim,
				color,
				whiteSpace: "nowrap",
				letterSpacing: 0.2,
			}}
		>
			{children}
		</span>
	);
}
