export function Avatar({ code, color, size = 36 }) {
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: "50%",
				background: color + "20",
				color,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: size * 0.33,
				fontWeight: 800,
				flexShrink: 0,
				border: `2px solid ${color}30`,
			}}
		>
			{code}
		</div>
	);
}
