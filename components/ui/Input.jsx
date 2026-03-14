export function Input({ t, placeholder, type = "text", defaultValue }) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			defaultValue={defaultValue}
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
				transition: "border-color 0.15s",
			}}
		/>
	);
}
