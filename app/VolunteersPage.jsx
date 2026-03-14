"use client";

import { useState } from "react";
import { Card, Pill, Btn } from "./Shared";
import { useCRM } from "./Layout";
import { VOLUNTEERS } from "./data";

export default function VolunteersPage() {
	const { t } = useCRM();
	const [selected, setSelected] = useState(null);
	const totalHours = VOLUNTEERS.reduce((s, v) => s + v.hours, 0);

	return (
		<div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gap: 16,
					marginBottom: 22,
				}}
			>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Total Volunteers
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.accent }}>
						{VOLUNTEERS.length}
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+4 active roster
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Hours Logged YTD
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.blue }}>
						{totalHours}
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>+18% this year</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Avg Hours/Volunteer
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.purple }}>
						{Math.round(totalHours / VOLUNTEERS.length)}
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>per person</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Events Staffed
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.green }}>
						14
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>+3 this year</div>
				</Card>
			</div>

			<div style={{ display: "flex", gap: 20 }}>
				<div style={{ flex: 1 }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
							gap: 14,
						}}
					>
						{[...VOLUNTEERS]
							.sort((a, b) => b.hours - a.hours)
							.map((v, i) => (
								<Card
									key={v.id}
									t={t}
									p={20}
									onClick={() => setSelected(selected?.id === v.id ? null : v)}
									style={{
										border: `1.5px solid ${selected?.id === v.id ? t.accent : t.border}`,
										cursor: "pointer",
										transition: "all 0.15s",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: 12,
											marginBottom: 14,
										}}
									>
										<div style={{ position: "relative" }}>
											<div
												style={{
													width: 44,
													height: 44,
													borderRadius: "50%",
													background: t.accent + "18",
													color: t.accent,
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: 16,
													fontWeight: 800,
													border: `2px solid ${t.accent}30`,
												}}
											>
												{v.name
													.split(" ")
													.map((n) => n[0])
													.join("")
													.slice(0, 2)}
											</div>
											{i < 3 && (
												<div
													style={{
														position: "absolute",
														top: -4,
														right: -4,
														width: 18,
														height: 18,
														borderRadius: "50%",
														background: t.amber,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 10,
														fontWeight: 800,
														color: "#000",
													}}
												>
													#{i + 1}
												</div>
											)}
										</div>
										<div style={{ flex: 1 }}>
											<div
												style={{
													fontSize: 14,
													fontWeight: 700,
													color: t.text,
													marginBottom: 3,
												}}
											>
												{v.name}
											</div>
											<Pill
												color={v.status === "Active" ? t.green : t.red}
												dim={v.status === "Active" ? t.greenDim : t.redDim}
												small
											>
												{v.status}
											</Pill>
										</div>
										<div style={{ textAlign: "right" }}>
											<div
												style={{
													fontSize: 22,
													fontWeight: 800,
													color: t.accent,
												}}
											>
												{v.hours}
											</div>
											<div style={{ fontSize: 10, color: t.textSub }}>
												hours
											</div>
										</div>
									</div>
									<div
										style={{
											display: "flex",
											gap: 4,
											flexWrap: "wrap",
											marginBottom: 12,
										}}
									>
										{v.skills.map((s) => (
											<Pill key={s} color={t.accent} dim={t.accentDim} small>
												{s}
											</Pill>
										))}
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											fontSize: 12,
											color: t.textSub,
										}}
									>
										<span>🗓️ {v.availability}</span>
										<span>{v.events} events</span>
										<span>Last: {v.lastActive}</span>
									</div>
								</Card>
							))}
					</div>
				</div>

				{selected && (
					<div style={{ width: 280, flexShrink: 0 }}>
						<Card t={t} p={20} style={{ position: "sticky", top: 0 }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 16,
								}}
							>
								<span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>
									Volunteer Detail
								</span>
								<button
									onClick={() => setSelected(null)}
									style={{
										background: "none",
										border: "none",
										color: t.textSub,
										fontSize: 16,
										cursor: "pointer",
									}}
								>
									×
								</button>
							</div>
							<div style={{ textAlign: "center", marginBottom: 16 }}>
								<div
									style={{
										width: 56,
										height: 56,
										borderRadius: "50%",
										background: t.accent + "18",
										color: t.accent,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 20,
										fontWeight: 800,
										border: `2px solid ${t.accent}30`,
										margin: "0 auto 10px",
									}}
								>
									{selected.name
										.split(" ")
										.map((n) => n[0])
										.join("")
										.slice(0, 2)}
								</div>
								<div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>
									{selected.name}
								</div>
								<div style={{ fontSize: 12, color: t.textSub, marginTop: 2 }}>
									{selected.email}
								</div>
							</div>
							{[
								["Hours Logged", selected.hours],
								["Events", `${selected.events} events`],
								["Availability", selected.availability],
								["Last Active", selected.lastActive],
							].map(([k, v]) => (
								<div
									key={k}
									style={{
										display: "flex",
										justifyContent: "space-between",
										padding: "8px 0",
										borderBottom: `1px solid ${t.border}`,
										fontSize: 12,
									}}
								>
									<span style={{ color: t.textSub }}>{k}</span>
									<span style={{ fontWeight: 700, color: t.text }}>{v}</span>
								</div>
							))}
							<div style={{ marginTop: 12 }}>
								<div
									style={{
										fontSize: 12,
										fontWeight: 700,
										color: t.textSub,
										marginBottom: 6,
									}}
								>
									Skills
								</div>
								<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
									{selected.skills.map((s) => (
										<Pill key={s} color={t.accent} dim={t.accentDim} small>
											{s}
										</Pill>
									))}
								</div>
							</div>
							<div style={{ marginTop: 14, display: "flex", gap: 8 }}>
								<Btn t={t} primary small style={{ flex: 1 }}>
									✉️ Email
								</Btn>
								<Btn t={t} small>
									Edit
								</Btn>
							</div>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}
