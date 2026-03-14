"use client";

import { Card, Pill, ProgressBar, Btn } from "./Shared";
import { useCRM } from "./Layout";
import { CAMPAIGNS } from "./data";

export default function CampaignsPage() {
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
						Total Raised
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.accent }}>
						$738K
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+34% all campaigns
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Active Campaigns
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.green }}>3</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>running now</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Total Donors
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.blue }}>
						778
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+142 unique this year
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Avg Gift
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.purple }}>
						$949
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+12% across all camps
					</div>
				</Card>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
					gap: 18,
				}}
			>
				{CAMPAIGNS.map((c) => {
					const pct = Math.round((c.raised / c.goal) * 100);
					return (
						<Card key={c.id} t={t} p={22}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									marginBottom: 16,
								}}
							>
								<div>
									<div
										style={{
											fontSize: 16,
											fontWeight: 800,
											color: t.text,
											marginBottom: 6,
										}}
									>
										{c.name}
									</div>
									<Pill color={c.color} dim={c.color + "16"}>
										{c.type}
									</Pill>
								</div>
								<Pill
									color={c.status === "Active" ? t.green : t.textSub}
									dim={c.status === "Active" ? t.greenDim : t.surfaceB}
								>
									{c.status}
								</Pill>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 10,
								}}
							>
								<div>
									<div
										style={{ fontSize: 24, fontWeight: 800, color: c.color }}
									>
										${(c.raised / 1000).toFixed(0)}K
									</div>
									<div style={{ fontSize: 12, color: t.textSub }}>
										of ${(c.goal / 1000).toFixed(0)}K goal
									</div>
								</div>
								<div style={{ textAlign: "right" }}>
									<div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>
										{pct}%
									</div>
									<div style={{ fontSize: 12, color: t.textSub }}>
										{c.donors} donors
									</div>
								</div>
							</div>
							<ProgressBar
								value={c.raised}
								max={c.goal}
								color={c.color}
								t={t}
								height={10}
							/>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: 12,
									fontSize: 12,
									color: t.textMuted,
								}}
							>
								<span>{c.startDate}</span>
								<span>→</span>
								<span>{c.endDate}</span>
							</div>
							<div style={{ display: "flex", gap: 8, marginTop: 14 }}>
								<Btn t={t} primary small style={{ flex: 1 }}>
									View Details
								</Btn>
								<Btn t={t} small>
									Edit
								</Btn>
							</div>
						</Card>
					);
				})}
				<Card
					t={t}
					p={22}
					style={{
						border: `2px dashed ${t.border}`,
						boxShadow: "none",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						gap: 10,
						minHeight: 220,
						cursor: "pointer",
					}}
				>
					<span style={{ fontSize: 32, opacity: 0.3 }}>+</span>
					<span style={{ fontSize: 14, color: t.textMuted, fontWeight: 700 }}>
						New Campaign
					</span>
				</Card>
			</div>
		</div>
	);
}
