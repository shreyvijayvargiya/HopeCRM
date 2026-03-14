export function Btn({ children, t, primary, small, danger, onClick, style = {} }) {
	return (
		<button
			onClick={onClick}
			style={{
				padding: small ? "7px 14px" : "10px 20px",
				borderRadius: 12,
				background: primary ? t.accent : danger ? t.redDim : "transparent",
				color: primary ? t.bg : danger ? t.red : t.textSub,
				border: primary ? "none" : danger ? `1px solid ${t.red}30` : `1px solid ${t.border}`,
				fontSize: small ? 12 : 13,
				fontWeight: 700,
				cursor: "pointer",
				fontFamily: "inherit",
				transition: "all 0.15s",
				whiteSpace: "nowrap",
				...style,
			}}
		>
			{children}
		</button>
	);
}
