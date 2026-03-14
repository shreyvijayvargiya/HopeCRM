"use client";

import { useState } from "react";
import { Card, Pill, Avatar, Btn, Modal, Field, Input, Select } from "./Shared";
import { useCRM } from "./Layout";
import { GRANTS, STAFF_COLOR, GRANT_STAGE_META } from "./data";

export default function GrantsPage() {
	const { t } = useCRM();
	const [selected, setSelected] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const pipeline = GRANTS.filter(
		(g) => !["Awarded", "Rejected"].includes(g.stage),
	).reduce((s, g) => s + g.amount, 0);

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
						Awarded YTD
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.green }}>
						$270K
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+$60K · 2 grants
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						In Pipeline
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.purple }}>
						${(pipeline / 1000).toFixed(0)}K
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						{
							GRANTS.filter((g) => !["Awarded", "Rejected"].includes(g.stage))
								.length
						}{" "}
						grants
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Win Rate
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.accent }}>
						67%
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						+8% last 12 months
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Next Deadline
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.amber }}>
						Mar 28
					</div>
					<div style={{ fontSize: 12, color: t.textMuted }}>
						Local Comm. Found.
					</div>
				</Card>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 16,
				}}
			>
				<div style={{ display: "flex", gap: 6 }}>
					{["All", ...Object.keys(GRANT_STAGE_META)].map((s) => (
						<div
							key={s}
							style={{
								padding: "6px 13px",
								borderRadius: 10,
								fontSize: 11,
								fontWeight: 700,
								cursor: "pointer",
								background: GRANT_STAGE_META[s]
									? GRANT_STAGE_META[s].dim
									: t.surfaceAlt,
								color: GRANT_STAGE_META[s]?.color || t.textMuted,
								border: `1px solid ${GRANT_STAGE_META[s]?.color || t.border}30`,
							}}
						>
							{s}
						</div>
					))}
				</div>
				<Btn t={t} primary onClick={() => setShowForm(true)}>
					+ Add Grant
				</Btn>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				{GRANTS.map((g) => {
					const sm = GRANT_STAGE_META[g.stage] || {
						color: t.accent,
						dim: t.accentDim,
					};
					return (
						<Card
							key={g.id}
							t={t}
							p={20}
							onClick={() => setSelected(selected?.id === g.id ? null : g)}
							style={{
								border: `1.5px solid ${selected?.id === g.id ? t.accent : t.border}`,
								cursor: "pointer",
								transition: "all 0.15s",
							}}
						>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1.2fr 1fr",
									alignItems: "center",
									gap: 12,
								}}
							>
								<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
									<div
										style={{
											width: 42,
											height: 42,
											borderRadius: 14,
											background: sm.dim,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: 20,
											flexShrink: 0,
										}}
									>
										📋
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
											{g.funder}
										</div>
										<div style={{ fontSize: 11, color: t.textSub }}>
											{g.program}
										</div>
									</div>
								</div>
								<div style={{ fontWeight: 800, fontSize: 15, color: t.accent }}>
									${(g.amount / 1000).toFixed(0)}K
								</div>
								<Pill color={sm.color} dim={sm.dim}>
									{g.stage}
								</Pill>
								<span style={{ fontSize: 12, color: t.textSub }}>
									Due {g.deadline}
								</span>
								<span
									style={{
										fontSize: 12,
										color: g.reportDue !== "—" ? t.amber : t.textMuted,
									}}
								>
									{g.reportDue !== "—" ? `Report: ${g.reportDue}` : "No report"}
								</span>
								<Avatar code={g.staff} color={STAFF_COLOR[g.staff]} size={30} />
							</div>
							{selected?.id === g.id && (
								<div
									style={{
										marginTop: 16,
										paddingTop: 16,
										borderTop: `1px solid ${t.border}`,
									}}
								>
									<div
										style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}
									>
										{g.notes}
									</div>
									<div style={{ display: "flex", gap: 8, marginTop: 12 }}>
										<Btn t={t} primary small>
											Edit Grant
										</Btn>
										<Btn t={t} small>
											Add Note
										</Btn>
										<Btn t={t} small>
											Upload Doc
										</Btn>
									</div>
								</div>
							)}
						</Card>
					);
				})}
			</div>

			{showForm && (
				<Modal t={t} title="Add New Grant" onClose={() => setShowForm(false)}>
					<Field t={t} label="FUNDER NAME">
						<Input t={t} placeholder="Foundation or org name" />
					</Field>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="AMOUNT">
							<Input t={t} placeholder="$75,000" />
						</Field>
						<Field t={t} label="DEADLINE">
							<Input t={t} placeholder="Apr 15, 2026" type="text" />
						</Field>
					</div>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="STAGE">
							<Select t={t} options={Object.keys(GRANT_STAGE_META)} />
						</Field>
						<Field t={t} label="PROGRAM AREA">
							<Select
								t={t}
								options={[
									"Education",
									"Housing",
									"Health",
									"Youth Dev.",
									"Arts",
									"Technology",
									"Environment",
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
							]}
						/>
					</Field>
					<Field t={t} label="NOTES">
						<textarea
							rows={3}
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
							Save Grant
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
