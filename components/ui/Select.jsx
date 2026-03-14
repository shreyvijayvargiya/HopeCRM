export function Select({ t, options }) {
	return (
		<select
			style={{
				width: "100%",
				padding: "10px 14px",
				borderRadius: 12,
				border: `1.5px solid ${t.border}`,
				background: t.surfaceAlt,
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
			}}
		>
			{options.map((o) => (
				<option key={o}>{o}</option>
			))}
		</select>
	);
}
