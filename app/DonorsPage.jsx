"use client";

import { useState } from "react";
import { Card, Pill, Avatar, Btn, Modal, Field, Input, Select } from "./Shared";
import { useCRM } from "./Layout";
import { DONORS, STAFF_COLOR, STAGE_META, TIER_META, TYPE_META } from "./data";

export default function DonorsPage() {
	const { t } = useCRM();
	const [view, setView] = useState("list");
	const [stageF, setStageF] = useState("All");
	const [tierF, setTierF] = useState("All");
	const [selected, setSelected] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const filtered = DONORS.filter(
		(d) =>
			(stageF === "All" || d.stage === stageF) &&
			(tierF === "All" || d.tier === tierF),
	);

	return (
		<div style={{ display: "flex", gap: 20 }}>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div
					style={{
						display: "flex",
						gap: 10,
						marginBottom: 18,
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<div
						style={{
							display: "flex",
							background: t.surfaceAlt,
							borderRadius: 12,
							padding: 3,
							gap: 2,
						}}
					>
						{["list", "kanban"].map((v) => (
							<button
								key={v}
								onClick={() => setView(v)}
								style={{
									padding: "7px 16px",
									borderRadius: 10,
									border: "none",
									background: v === view ? t.surface : "transparent",
									color: v === view ? t.text : t.textMuted,
									fontSize: 12,
									fontWeight: 700,
									cursor: "pointer",
									fontFamily: "inherit",
									boxShadow: v === view ? t.shadow : "none",
								}}
							>
								{v === "list" ? "≡ List" : "⊞ Board"}
							</button>
						))}
					</div>
					<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
						{["All", "Major", "Mid-Level", "General", "Lapsed"].map((tier) => (
							<div
								key={tier}
								onClick={() => setTierF(tier)}
								style={{
									padding: "6px 14px",
									borderRadius: 10,
									fontSize: 12,
									fontWeight: 700,
									cursor: "pointer",
									background:
										tierF === tier
											? TIER_META[tier]?.color || t.accent
											: t.surfaceAlt,
									color: tierF === tier ? "#fff" : t.textMuted,
									transition: "all 0.15s",
								}}
							>
								{tier}
							</div>
						))}
					</div>
					<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
						{["All", ...Object.keys(STAGE_META)].map((s) => (
							<div
								key={s}
								onClick={() => setStageF(s)}
								style={{
									padding: "5px 11px",
									borderRadius: 10,
									fontSize: 11,
									fontWeight: 700,
									cursor: "pointer",
									background:
										stageF === s
											? STAGE_META[s]?.color || t.accent
											: t.surfaceAlt,
									color: stageF === s ? "#fff" : t.textMuted,
									transition: "all 0.15s",
								}}
							>
								{s}
							</div>
						))}
					</div>
					<Btn
						t={t}
						primary
						onClick={() => setShowForm(true)}
						style={{ marginLeft: "auto" }}
					>
						+ Add Donor
					</Btn>
				</div>

				{view === "list" ? (
					<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
						{filtered.map((d) => (
							<Card
								key={d.id}
								t={t}
								p={16}
								onClick={() => setSelected(selected?.id === d.id ? null : d)}
								style={{
									border: `1.5px solid ${selected?.id === d.id ? t.accent : t.border}`,
									cursor: "pointer",
									transition: "all 0.15s",
								}}
							>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "2.2fr 0.9fr 1fr 1fr 1fr 1fr",
										alignItems: "center",
										gap: 10,
									}}
								>
									<div
										style={{ display: "flex", gap: 12, alignItems: "center" }}
									>
										<Avatar
											code={d.staff}
											color={STAFF_COLOR[d.staff]}
											size={38}
										/>
										<div>
											<div
												style={{
													fontSize: 14,
													fontWeight: 700,
													color: t.text,
													marginBottom: 2,
												}}
											>
												{d.name}
											</div>
											<div style={{ fontSize: 11, color: t.textSub }}>
												{d.email}
											</div>
										</div>
									</div>
									<Pill
										color={TYPE_META[d.type]?.color || t.accent}
										dim={TYPE_META[d.type]?.dim || t.accentDim}
										small
									>
										{d.type}
									</Pill>
									<Pill
										color={TIER_META[d.tier]?.color || t.accent}
										dim={TIER_META[d.tier]?.dim || t.accentDim}
										small
									>
										{d.tier}
									</Pill>
									<span
										style={{ fontWeight: 800, fontSize: 14, color: t.text }}
									>
										${(d.ltv / 1000).toFixed(0)}K
									</span>
									<Pill
										color={STAGE_META[d.stage]?.color || t.accent}
										dim={STAGE_META[d.stage]?.dim || t.accentDim}
										small
									>
										{d.stage}
									</Pill>
									<span
										style={{
											fontSize: 12,
											color: d.lastDate === "—" ? t.textMuted : t.textSub,
										}}
									>
										{d.lastDate === "—" ? "No gift yet" : d.lastDate}
									</span>
								</div>
							</Card>
						))}
					</div>
				) : (
					<div
						style={{
							display: "flex",
							gap: 12,
							overflowX: "auto",
							paddingBottom: 8,
						}}
					>
						{Object.keys(STAGE_META).map((stage) => {
							const col = filtered.filter((d) => d.stage === stage);
							const sm = STAGE_META[stage];
							return (
								<div
									key={stage}
									style={{
										minWidth: 210,
										background: t.surfaceAlt,
										borderRadius: 20,
										padding: 14,
										flexShrink: 0,
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginBottom: 12,
										}}
									>
										<span
											style={{ fontSize: 12, fontWeight: 800, color: sm.color }}
										>
											{stage}
										</span>
										<span
											style={{
												fontSize: 11,
												background: t.surface,
												borderRadius: 20,
												padding: "2px 8px",
												color: t.textMuted,
												fontWeight: 700,
											}}
										>
											{col.length}
										</span>
									</div>
									{col.map((d) => (
										<Card
											key={d.id}
											t={t}
											p={14}
											onClick={() =>
												setSelected(selected?.id === d.id ? null : d)
											}
											style={{
												marginBottom: 10,
												border: `1.5px solid ${selected?.id === d.id ? t.accent : t.border}`,
												cursor: "pointer",
											}}
										>
											<div
												style={{
													fontSize: 13,
													fontWeight: 700,
													color: t.text,
													marginBottom: 6,
													lineHeight: 1.3,
												}}
											>
												{d.name}
											</div>
											<Pill
												color={TIER_META[d.tier]?.color || t.accent}
												dim={TIER_META[d.tier]?.dim || t.accentDim}
												small
											>
												{d.tier}
											</Pill>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													marginTop: 10,
												}}
											>
												<span
													style={{
														fontSize: 13,
														fontWeight: 800,
														color: t.accent,
													}}
												>
													${(d.ltv / 1000).toFixed(0)}K LTV
												</span>
												<Avatar
													code={d.staff}
													color={STAFF_COLOR[d.staff]}
													size={22}
												/>
											</div>
										</Card>
									))}
								</div>
							);
						})}
					</div>
				)}
			</div>

			{selected && (
				<div style={{ width: 300, flexShrink: 0 }}>
					<Card
						t={t}
						p={20}
						style={{
							position: "sticky",
							top: 0,
							maxHeight: "calc(100vh - 160px)",
							overflowY: "auto",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 18,
							}}
						>
							<span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>
								Donor Profile
							</span>
							<button
								onClick={() => setSelected(null)}
								style={{
									width: 28,
									height: 28,
									borderRadius: 9,
									border: `1px solid ${t.border}`,
									background: t.surfaceAlt,
									color: t.textSub,
									cursor: "pointer",
									fontSize: 14,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								×
							</button>
						</div>
						<div
							style={{
								background: t.surfaceAlt,
								borderRadius: 18,
								padding: 16,
								marginBottom: 16,
								textAlign: "center",
							}}
						>
							<Avatar
								code={selected.staff}
								color={STAFF_COLOR[selected.staff]}
								size={48}
							/>
							<div
								style={{
									fontSize: 15,
									fontWeight: 800,
									color: t.text,
									marginTop: 10,
									marginBottom: 6,
								}}
							>
								{selected.name}
							</div>
							<div
								style={{
									display: "flex",
									gap: 6,
									justifyContent: "center",
									flexWrap: "wrap",
								}}
							>
								<Pill
									color={TYPE_META[selected.type]?.color || t.accent}
									dim={TYPE_META[selected.type]?.dim || t.accentDim}
								>
									{selected.type}
								</Pill>
								<Pill
									color={TIER_META[selected.tier]?.color || t.accent}
									dim={TIER_META[selected.tier]?.dim || t.accentDim}
								>
									{selected.tier}
								</Pill>
							</div>
						</div>
						{[
							["Lifetime Value", `$${selected.ltv.toLocaleString()}`],
							[
								"Last Gift",
								selected.lastGift > 0
									? `$${selected.lastGift.toLocaleString()}`
									: "None",
							],
							["Last Date", selected.lastDate],
							["Stage", selected.stage],
							["Source", selected.source],
							["Phone", selected.phone],
						].map(([k, v]) => (
							<div
								key={k}
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "9px 0",
									borderBottom: `1px solid ${t.border}`,
									fontSize: 12,
								}}
							>
								<span style={{ color: t.textSub }}>{k}</span>
								<span style={{ fontWeight: 700, color: t.text }}>{v}</span>
							</div>
						))}
						<div style={{ marginTop: 14, marginBottom: 14 }}>
							<div
								style={{
									fontSize: 12,
									fontWeight: 700,
									color: t.textSub,
									marginBottom: 6,
								}}
							>
								Notes
							</div>
							<div
								style={{
									fontSize: 12,
									color: t.text,
									lineHeight: 1.6,
									background: t.surfaceAlt,
									borderRadius: 12,
									padding: 12,
								}}
							>
								{selected.notes}
							</div>
						</div>
						<div style={{ marginBottom: 16 }}>
							<div
								style={{
									fontSize: 12,
									fontWeight: 700,
									color: t.textSub,
									marginBottom: 8,
								}}
							>
								Tags
							</div>
							<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
								{selected.tags.map((tag) => (
									<Pill key={tag} color={t.accent} dim={t.accentDim} small>
										{tag}
									</Pill>
								))}
							</div>
						</div>
						<div style={{ display: "flex", gap: 8 }}>
							<Btn t={t} primary style={{ flex: 1 }}>
								📞 Call
							</Btn>
							<Btn t={t} style={{ flex: 1 }}>
								✉️ Email
							</Btn>
						</div>
					</Card>
				</div>
			)}

			{showForm && (
				<Modal t={t} title="Add New Donor" onClose={() => setShowForm(false)}>
					<Field t={t} label="FULL NAME / ORG">
						<Input t={t} placeholder="The Ellison Family" />
					</Field>
					<Field t={t} label="EMAIL">
						<Input t={t} placeholder="contact@email.com" type="email" />
					</Field>
					<Field t={t} label="PHONE">
						<Input t={t} placeholder="+1 (415) 555-0000" type="tel" />
					</Field>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="TYPE">
							<Select
								t={t}
								options={[
									"Individual",
									"Foundation",
									"Corporate",
									"Government",
								]}
							/>
						</Field>
						<Field t={t} label="TIER">
							<Select t={t} options={["Major", "Mid-Level", "General"]} />
						</Field>
					</div>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="STAGE">
							<Select t={t} options={Object.keys(STAGE_META)} />
						</Field>
						<Field t={t} label="SOURCE">
							<Select
								t={t}
								options={[
									"Board Referral",
									"Grant Portal",
									"Gala Event",
									"Website",
									"Cold Outreach",
									"Direct Mail",
								]}
							/>
						</Field>
					</div>
					<Field t={t} label="ASSIGN TO STAFF">
						<Select
							t={t}
							options={[
								"AM — Alex Martinez",
								"JT — Jamie Torres",
								"RK — Rachel Kim",
								"NP — Nina Patel",
								"LW — Leo Walsh",
							]}
						/>
					</Field>
					<Field t={t} label="NOTES">
						<textarea
							rows={3}
							placeholder="Initial notes..."
							style={{
								width: "100%",
								padding: "10px 14px",
								borderRadius: 12,
								border: `1.5px solid ${t.border}`,
								background: t.surfaceAlt,
								color: t.text,
								fontSize: 13,
								outline: "none",
								resize: "vertical",
								fontFamily: "inherit",
							}}
						/>
					</Field>
					<div style={{ display: "flex", gap: 8, marginTop: 6 }}>
						<Btn t={t} primary style={{ flex: 1 }}>
							Save Donor
						</Btn>
						<Btn t={t} onClick={() => setShowForm(false)}>
							Cancel
						</Btn>
					</div>
				</Modal>
			)}
		</div>
	);
}
