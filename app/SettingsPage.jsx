"use client";

import { useState } from "react";
import { Card, SecHead, Field, Input, Btn, Pill } from "./Shared";
import { useCRM } from "./Layout";
import { STAFF_LIST, STAFF_COLOR, INTEGRATIONS } from "./data";

export default function SettingsPage() {
	const { t } = useCRM();
	const [section, setSection] = useState("org");
	const sections = [
		{ id: "org", label: "Organization" },
		{ id: "staff", label: "Staff & Roles" },
		{ id: "integrations", label: "Integrations" },
		{ id: "fiscal", label: "Fiscal Year" },
		{ id: "notifications", label: "Notifications" },
		{ id: "billing", label: "Billing" },
	];

	return (
		<div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
			<Card t={t} p={14}>
				{sections.map((s) => (
					<div
						key={s.id}
						onClick={() => setSection(s.id)}
						style={{
							padding: "10px 14px",
							borderRadius: 12,
							fontSize: 13,
							fontWeight: 600,
							cursor: "pointer",
							color: section === s.id ? t.accent : t.textSub,
							background: section === s.id ? t.accentDim : "transparent",
							marginBottom: 3,
							transition: "all 0.12s",
						}}
					>
						{s.label}
					</div>
				))}
			</Card>
			<div>
				{section === "org" && (
					<Card t={t}>
						<SecHead t={t} sub="Your organization's public profile">
							Organization Profile
						</SecHead>
						{[
							["Organization Name", "Hope Community Foundation"],
							["EIN / Tax ID", "47-1234567"],
							["Website", "www.hopecommunity.org"],
							["Phone", "+1 (312) 555-0100"],
							["Email", "hello@hopecommunity.org"],
						].map(([l, v]) => (
							<Field key={l} t={t} label={l}>
								<Input t={t} defaultValue={v} />
							</Field>
						))}
						<Field t={t} label="MISSION STATEMENT">
							<textarea
								defaultValue="We believe every person deserves access to opportunity. Since 2012, we've served 14,000 community members through education, housing, and economic development programs."
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
						<Btn t={t} primary>
							Save Changes
						</Btn>
					</Card>
				)}

				{section === "staff" && (
					<Card t={t}>
						<SecHead
							t={t}
							action="+ Add Staff"
							sub="Manage team members and permissions"
						>
							Staff & Roles
						</SecHead>
						{STAFF_LIST.map((s, i) => (
							<div
								key={s.code}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									padding: "14px 0",
									borderBottom:
										i < STAFF_LIST.length - 1
											? `1px solid ${t.border}`
											: "none",
								}}
							>
								<div
									style={{
										width: 42,
										height: 42,
										borderRadius: "50%",
										background: STAFF_COLOR[s.code] + "20",
										color: STAFF_COLOR[s.code],
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 14,
										fontWeight: 800,
										border: `2px solid ${STAFF_COLOR[s.code]}30`,
									}}
								>
									{s.code}
								</div>
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
										{s.name}
									</div>
									<div style={{ fontSize: 12, color: t.textSub }}>
										{s.role} · {s.email}
									</div>
								</div>
								<Pill color={t.green} dim={t.greenDim} small>
									Active
								</Pill>
								<Btn t={t} small>
									Edit
								</Btn>
							</div>
						))}
					</Card>
				)}

				{section === "integrations" && (
					<Card t={t}>
						<SecHead t={t} sub="Connect your existing tools">
							Integrations
						</SecHead>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 14,
							}}
						>
							{INTEGRATIONS.map((intg) => (
								<div
									key={intg.name}
									style={{
										background: t.surfaceAlt,
										borderRadius: 18,
										padding: 18,
										display: "flex",
										gap: 12,
										alignItems: "center",
									}}
								>
									<div style={{ fontSize: 28 }}>{intg.icon}</div>
									<div style={{ flex: 1 }}>
										<div
											style={{
												fontSize: 13,
												fontWeight: 700,
												color: t.text,
												marginBottom: 3,
											}}
										>
											{intg.name}
										</div>
										<div
											style={{
												fontSize: 11,
												color:
													intg.colorKey === "green" ? t.green : t.textMuted,
												fontWeight: 600,
											}}
										>
											{intg.status}
										</div>
									</div>
									<Btn t={t} small>
										{intg.status === "Connected" ? "Manage" : "Connect"}
									</Btn>
								</div>
							))}
						</div>
					</Card>
				)}

				{section === "notifications" && (
					<Card t={t}>
						<SecHead t={t} sub="Choose how you're notified">
							Notification Preferences
						</SecHead>
						{[
							["New donor added", "Email + Push"],
							["Gift received", "Email + Push + SMS"],
							["Grant deadline in 7 days", "Email + Push"],
							["Lapsed donor (90 days)", "Email"],
							["Task due today", "Push"],
							["Weekly fundraising summary", "Email"],
							["Board report due", "Email + Push"],
						].map(([label, def]) => (
							<div
								key={label}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "14px 0",
									borderBottom: `1px solid ${t.border}`,
								}}
							>
								<div>
									<div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>
										{label}
									</div>
									<div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>
										{def}
									</div>
								</div>
								<div
									style={{
										width: 42,
										height: 24,
										borderRadius: 12,
										background: t.accent,
										cursor: "pointer",
										position: "relative",
										flexShrink: 0,
									}}
								>
									<div
										style={{
											width: 18,
											height: 18,
											borderRadius: "50%",
											background: "#fff",
											position: "absolute",
											right: 3,
											top: 3,
											boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
										}}
									/>
								</div>
							</div>
						))}
					</Card>
				)}

				{section === "billing" && (
					<Card t={t}>
						<SecHead t={t} sub="Manage your subscription">
							Billing
						</SecHead>
						<div
							style={{
								background: `linear-gradient(135deg,${t.accent}18,${t.surfaceAlt})`,
								borderRadius: 20,
								padding: 22,
								marginBottom: 18,
								border: `1px solid ${t.accent}30`,
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									marginBottom: 10,
								}}
							>
								<div>
									<div
										style={{
											fontSize: 16,
											fontWeight: 800,
											color: t.text,
											marginBottom: 4,
										}}
									>
										Pro Nonprofit Plan
									</div>
									<div style={{ fontSize: 13, color: t.textSub }}>
										Up to 8 staff · Unlimited donors & grants
									</div>
								</div>
								<Pill color={t.green} dim={t.greenDim}>
									Active
								</Pill>
							</div>
							<div style={{ fontSize: 32, fontWeight: 800, color: t.accent }}>
								$99
								<span
									style={{ fontSize: 14, color: t.textSub, fontWeight: 400 }}
								>
									/mo
								</span>
							</div>
							<div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>
								Next billing: April 1, 2026
							</div>
						</div>
						<div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
							<Btn t={t}>Change Plan</Btn>
							<Btn t={t}>Update Payment</Btn>
							<Btn t={t} danger>
								Cancel Plan
							</Btn>
						</div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 700,
								color: t.text,
								marginBottom: 12,
							}}
						>
							Billing History
						</div>
						{[
							["Mar 1, 2026", "Pro Plan", "$99"],
							["Feb 1, 2026", "Pro Plan", "$99"],
							["Jan 1, 2026", "Pro Plan", "$99"],
						].map(([d, desc, amt]) => (
							<div
								key={d}
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "12px 0",
									borderBottom: `1px solid ${t.border}`,
									fontSize: 13,
									alignItems: "center",
								}}
							>
								<span style={{ color: t.textSub }}>{d}</span>
								<span style={{ color: t.text }}>{desc}</span>
								<span style={{ fontWeight: 800, color: t.text }}>{amt}</span>
								<Pill color={t.green} dim={t.greenDim} small>
									Paid
								</Pill>
							</div>
						))}
					</Card>
				)}
			</div>
		</div>
	);
}
