"use client";

import { useState } from "react";
import { Card, Pill, ProgressBar, Btn } from "./Shared";
import { useCRM } from "./Layout";
import { EMAIL_TEMPLATES, SEQUENCES } from "./data";

export default function CommsPage() {
	const { t } = useCRM();
	const [tab, setTab] = useState("templates");
	const [preview, setPreview] = useState(null);
	const catColor = {
		Welcome: t.green,
		"Thank You": t.accent,
		Appeal: t.amber,
		Event: t.pink,
		"Re-engagement": t.red,
		Stewardship: t.purple,
		Grant: t.blue,
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					background: t.surfaceAlt,
					borderRadius: 14,
					padding: 4,
					gap: 3,
					width: "fit-content",
					marginBottom: 22,
				}}
			>
				{["templates", "sequences"].map((tb) => (
					<button
						key={tb}
						onClick={() => setTab(tb)}
						style={{
							padding: "8px 20px",
							borderRadius: 11,
							border: "none",
							background: tab === tb ? t.surface : "transparent",
							color: tab === tb ? t.text : t.textMuted,
							fontSize: 13,
							fontWeight: 700,
							cursor: "pointer",
							fontFamily: "inherit",
							textTransform: "capitalize",
							boxShadow: tab === tb ? t.shadow : "none",
						}}
					>
						{tb}
					</button>
				))}
			</div>

			{tab === "templates" && (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: preview
							? "1fr 380px"
							: "repeat(auto-fill,minmax(300px,1fr))",
						gap: 18,
					}}
				>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
							gap: 14,
							alignContent: "start",
						}}
					>
						{EMAIL_TEMPLATES.map((tpl) => (
							<Card
								key={tpl.id}
								t={t}
								p={20}
								onClick={() => setPreview(preview?.id === tpl.id ? null : tpl)}
								style={{
									border: `1.5px solid ${preview?.id === tpl.id ? t.accent : t.border}`,
									cursor: "pointer",
									transition: "all 0.15s",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 12,
									}}
								>
									<Pill
										color={catColor[tpl.category] || t.accent}
										dim={(catColor[tpl.category] || t.accent) + "18"}
										small
									>
										{tpl.category}
									</Pill>
									<span style={{ fontSize: 11, color: t.textMuted }}>
										{tpl.sent} sent
									</span>
								</div>
								<div
									style={{
										fontSize: 14,
										fontWeight: 700,
										color: t.text,
										marginBottom: 8,
									}}
								>
									{tpl.name}
								</div>
								<div style={{ marginBottom: 10 }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: 4,
											fontSize: 11,
										}}
									>
										<span style={{ color: t.textSub }}>Open rate</span>
										<span style={{ fontWeight: 800, color: t.green }}>
											{tpl.opens}%
										</span>
									</div>
									<ProgressBar
										value={tpl.opens}
										max={100}
										color={t.green}
										t={t}
										height={5}
									/>
								</div>
							</Card>
						))}
						<Card
							t={t}
							p={20}
							style={{
								border: `2px dashed ${t.border}`,
								boxShadow: "none",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
								gap: 8,
								minHeight: 140,
								cursor: "pointer",
							}}
						>
							<span style={{ fontSize: 28, opacity: 0.3 }}>+</span>
							<span
								style={{ fontSize: 13, color: t.textMuted, fontWeight: 700 }}
							>
								New Template
							</span>
						</Card>
					</div>
					{preview && (
						<Card
							t={t}
							p={22}
							style={{
								position: "sticky",
								top: 0,
								maxHeight: "80vh",
								overflowY: "auto",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 16,
								}}
							>
								<span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>
									Preview
								</span>
								<button
									onClick={() => setPreview(null)}
									style={{
										background: "none",
										border: "none",
										color: t.textSub,
										fontSize: 18,
										cursor: "pointer",
									}}
								>
									×
								</button>
							</div>
							<div
								style={{
									background: t.surfaceAlt,
									borderRadius: 14,
									padding: 14,
									marginBottom: 14,
								}}
							>
								<div
									style={{
										fontSize: 11,
										color: t.textMuted,
										marginBottom: 4,
										fontWeight: 700,
									}}
								>
									SUBJECT
								</div>
								<div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
									{preview.subject}
								</div>
							</div>
							<div
								style={{
									background: t.surfaceAlt,
									borderRadius: 14,
									padding: 14,
									marginBottom: 14,
								}}
							>
								<div
									style={{
										fontSize: 11,
										color: t.textMuted,
										marginBottom: 6,
										fontWeight: 700,
									}}
								>
									BODY PREVIEW
								</div>
								<div
									style={{ fontSize: 13, color: t.textSub, lineHeight: 1.7 }}
								>
									Dear {"{name}"},<br />
									<br />
									Thank you for being part of our community. This message
									contains {"{dynamic_content}"} tailored to your giving
									history.
									<br />
									<br />
									With gratitude,
									<br />
									The Team
								</div>
							</div>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: 10,
									marginBottom: 16,
								}}
							>
								<div
									style={{
										background: t.surfaceAlt,
										borderRadius: 12,
										padding: "12px 14px",
									}}
								>
									<div
										style={{
											fontSize: 11,
											color: t.textMuted,
											marginBottom: 4,
										}}
									>
										Sent
									</div>
									<div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>
										{preview.sent}
									</div>
								</div>
								<div
									style={{
										background: t.surfaceAlt,
										borderRadius: 12,
										padding: "12px 14px",
									}}
								>
									<div
										style={{
											fontSize: 11,
											color: t.textMuted,
											marginBottom: 4,
										}}
									>
										Open Rate
									</div>
									<div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>
										{preview.opens}%
									</div>
								</div>
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								<Btn t={t} primary style={{ flex: 1 }}>
									Edit Template
								</Btn>
								<Btn t={t}>Duplicate</Btn>
							</div>
						</Card>
					)}
				</div>
			)}

			{tab === "sequences" && (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
						gap: 16,
					}}
				>
					{SEQUENCES.map((seq) => (
						<Card key={seq.id} t={t} p={22}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 14,
								}}
							>
								<div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>
									{seq.name}
								</div>
								<Pill
									color={seq.status === "Active" ? t.green : t.amber}
									dim={seq.status === "Active" ? t.greenDim : t.amberDim}
									small
								>
									{seq.status}
								</Pill>
							</div>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(3,1fr)",
									gap: 8,
									marginBottom: 14,
								}}
							>
								{[
									["Contacts", seq.contacts],
									["Emails", seq.emails],
									["Opens", `${seq.openRate}%`],
								].map(([k, v]) => (
									<div
										key={k}
										style={{
											background: t.surfaceAlt,
											borderRadius: 12,
											padding: "10px 12px",
											textAlign: "center",
										}}
									>
										<div
											style={{ fontSize: 18, fontWeight: 800, color: t.text }}
										>
											{v}
										</div>
										<div
											style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}
										>
											{k}
										</div>
									</div>
								))}
							</div>
							<div style={{ fontSize: 12, color: t.textSub, marginBottom: 14 }}>
								Next: <b style={{ color: t.text }}>{seq.nextStep}</b>
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								<Btn t={t} primary small style={{ flex: 1 }}>
									{seq.status === "Active" ? "Pause" : "Resume"}
								</Btn>
								<Btn t={t} small>
									Edit
								</Btn>
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
