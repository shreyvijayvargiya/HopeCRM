"use client";

import { useState } from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	BarChart,
	Bar,
	Cell,
} from "recharts";
import { Card, SecHead, ChartTip, StatCard, Pill, Avatar } from "./Shared";
import { useCRM } from "./Layout";
import {
	raisedOverTime,
	retentionData,
	sourceData,
	volunteerHours,
	STAFF_COLOR,
	STAFF_PERF,
} from "./data";

export default function ReportsPage() {
	const { t } = useCRM();
	const [period, setPeriod] = useState("YTD");

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
			<div style={{ display: "flex", gap: 6, alignItems: "center" }}>
				{["1M", "3M", "6M", "YTD", "1Y"].map((p) => (
					<div
						key={p}
						onClick={() => setPeriod(p)}
						style={{
							padding: "7px 16px",
							borderRadius: 10,
							fontSize: 12,
							fontWeight: 700,
							cursor: "pointer",
							background: period === p ? t.accent : t.surfaceAlt,
							color: period === p ? t.bg : t.textMuted,
							transition: "all 0.15s",
						}}
					>
						{p}
					</div>
				))}
				<button
					style={{
						marginLeft: "auto",
						padding: "10px 20px",
						borderRadius: 12,
						border: `1px solid ${t.border}`,
						background: "transparent",
						color: t.textSub,
						fontSize: 13,
						fontWeight: 700,
						cursor: "pointer",
						fontFamily: "inherit",
					}}
				>
					Export Report
				</button>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gap: 16,
				}}
			>
				<StatCard
					t={t}
					label="Total Raised"
					value="$825K"
					change="+28%"
					up={true}
					sub="all sources"
					icon="💚"
					color={t.accent}
				/>
				<StatCard
					t={t}
					label="Unique Donors"
					value="412"
					change="+38"
					up={true}
					sub="this period"
					icon="👥"
					color={t.blue}
				/>
				<StatCard
					t={t}
					label="Grants Awarded"
					value="$270K"
					change="+60K"
					up={true}
					sub="2 grants"
					icon="🏆"
					color={t.purple}
				/>
				<StatCard
					t={t}
					label="Volunteer Hours"
					value="2,840"
					change="+420"
					up={true}
					sub="total logged"
					icon="⏱️"
					color={t.green}
				/>
			</div>
			<div
				style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}
			>
				<Card t={t}>
					<SecHead t={t} sub="Monthly donation totals">
						Fundraising Over Time
					</SecHead>
					<ResponsiveContainer width="100%" height={220}>
						<AreaChart
							data={raisedOverTime}
							margin={{ top: 0, right: 0, bottom: 0, left: -15 }}
						>
							<defs>
								<linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={t.accent} stopOpacity={0.3} />
									<stop offset="95%" stopColor={t.accent} stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis
								dataKey="month"
								tick={{ fill: t.textMuted, fontSize: 11 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: t.textMuted, fontSize: 10 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<ChartTip t={t} />} />
							<Area
								type="monotone"
								dataKey="raised"
								stroke={t.accent}
								strokeWidth={2.5}
								fill="url(#ag)"
								dot={false}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t} sub="Year over year trend">
						Donor Retention Rate
					</SecHead>
					<ResponsiveContainer width="100%" height={220}>
						<LineChart
							data={retentionData}
							margin={{ top: 0, right: 0, bottom: 0, left: -15 }}
						>
							<XAxis
								dataKey="year"
								tick={{ fill: t.textMuted, fontSize: 11 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								domain={[50, 90]}
								tick={{ fill: t.textMuted, fontSize: 10 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<ChartTip t={t} />} />
							<Line
								type="monotone"
								dataKey="rate"
								stroke={t.green}
								strokeWidth={2.5}
								dot={{ fill: t.green, r: 4 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</Card>
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
				<Card t={t}>
					<SecHead t={t} sub="Revenue by source">
						Source Attribution
					</SecHead>
					<ResponsiveContainer width="100%" height={200}>
						<BarChart
							data={sourceData}
							layout="vertical"
							margin={{ top: 0, right: 0, bottom: 0, left: 60 }}
						>
							<XAxis
								type="number"
								tick={{ fill: t.textMuted, fontSize: 10 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								type="category"
								dataKey="source"
								tick={{ fill: t.textSub, fontSize: 11 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<ChartTip t={t} />} />
							<Bar dataKey="amount" radius={[0, 6, 6, 0]}>
								{sourceData.map((e, i) => (
									<Cell key={i} fill={e.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t} sub="Volunteer hours per month">
						Volunteer Hours
					</SecHead>
					<ResponsiveContainer width="100%" height={200}>
						<BarChart
							data={volunteerHours}
							margin={{ top: 0, right: 0, bottom: 0, left: -15 }}
						>
							<XAxis
								dataKey="month"
								tick={{ fill: t.textMuted, fontSize: 11 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: t.textMuted, fontSize: 10 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<ChartTip t={t} />} />
							<Bar dataKey="hours" fill={t.purple} radius={[6, 6, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</Card>
			</div>
			<Card t={t} p={0} style={{ overflow: "hidden" }}>
				<div
					style={{
						padding: "18px 22px",
						borderBottom: `1px solid ${t.border}`,
					}}
				>
					<h2 style={{ fontSize: 14, fontWeight: 800, color: t.text }}>
						Staff Performance
					</h2>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
						padding: "11px 22px",
						fontSize: 11,
						fontWeight: 700,
						color: t.textMuted,
						letterSpacing: 0.5,
						borderBottom: `1px solid ${t.border}`,
					}}
				>
					<span>STAFF</span>
					<span>DONORS</span>
					<span>RAISED</span>
					<span>GRANTS</span>
					<span>RETENTION</span>
				</div>
				{STAFF_PERF.map((s, i) => (
					<div
						key={s.code}
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
							padding: "14px 22px",
							borderBottom:
								i < STAFF_PERF.length - 1 ? `1px solid ${t.border}` : "none",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
							<Avatar code={s.code} color={STAFF_COLOR[s.code]} size={34} />
							<span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
								{
									[
										"Alex Martinez",
										"Jamie Torres",
										"Rachel Kim",
										"Nina Patel",
										"Leo Walsh",
									][i]
								}
							</span>
						</div>
						<span style={{ color: t.text, fontWeight: 600 }}>{s.donors}</span>
						<span style={{ color: t.accent, fontWeight: 800 }}>{s.raised}</span>
						<span style={{ color: t.text }}>{s.grants} grants</span>
						<Pill color={t.green} dim={t.greenDim} small>
							{s.ret}
						</Pill>
					</div>
				))}
			</Card>
		</div>
	);
}
