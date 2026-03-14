"use client";

import { Card, Pill, ProgressBar } from "./Shared";
import { useCRM } from "./Layout";
import { EVENTS, EVENT_TYPE_COLOR } from "./data";

export default function EventsPage() {
	const { t } = useCRM();

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
						Events This Year
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.accent }}>
						5
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>2 upcoming</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Total Attendees
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.blue }}>
						633
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+18% registered
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Revenue from Events
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.green }}>
						$120K
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+22% gala + webinar
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Next Event
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.amber }}>
						Mar 18
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>Board Meeting</div>
				</Card>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
				{EVENTS.map((e) => {
					const capacity_pct = Math.round((e.registered / e.capacity) * 100);
					const ec = EVENT_TYPE_COLOR[e.type] || t.accent;
					return (
						<Card
							key={e.id}
							t={t}
							p={20}
							style={{ borderLeft: `4px solid ${ec}` }}
						>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
									alignItems: "center",
									gap: 12,
								}}
							>
								<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
									<div
										style={{
											width: 44,
											height: 44,
											borderRadius: 14,
											background: ec + "18",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: 22,
											flexShrink: 0,
										}}
									>
										{e.type === "Gala"
											? "🎉"
											: e.type === "Webinar"
												? "💻"
												: e.type === "Board Meeting"
													? "🏛️"
													: e.type === "Donor Tour"
														? "🗺️"
														: "🌱"}
									</div>
									<div>
										<div
											style={{
												fontSize: 14,
												fontWeight: 700,
												color: t.text,
												marginBottom: 2,
											}}
										>
											{e.name}
										</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{e.venue}
										</div>
									</div>
								</div>
								<Pill color={ec} dim={ec + "18"} small>
									{e.type}
								</Pill>
								<span style={{ fontSize: 13, color: t.textSub }}>{e.date}</span>
								<div>
									<div
										style={{
											fontSize: 13,
											fontWeight: 700,
											color: t.text,
											marginBottom: 4,
										}}
									>
										{e.registered}/{e.capacity}
									</div>
									<ProgressBar
										value={e.registered}
										max={e.capacity}
										color={ec}
										t={t}
										height={4}
									/>
								</div>
								{e.revenueGoal > 0 ? (
									<span
										style={{ fontSize: 13, fontWeight: 700, color: t.green }}
									>
										${(e.revenue / 1000).toFixed(0)}K
									</span>
								) : (
									<span style={{ fontSize: 12, color: t.textMuted }}>
										Free event
									</span>
								)}
								<Pill
									color={e.status === "Upcoming" ? t.accent : t.textSub}
									dim={e.status === "Upcoming" ? t.accentDim : t.surfaceB}
									small
								>
									{e.status}
								</Pill>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
