"use client";

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import {
	Card,
	SecHead,
	ChartTip,
	ProgressBar,
	StatCard,
	Pill,
	Avatar,
} from "./Shared";
import { useCRM } from "./Layout";
import {
	DONORS,
	CAMPAIGNS,
	raisedOverTime,
	sourceData,
	STAFF_COLOR,
	TYPE_META,
	PRIORITY_META,
	UPCOMING_DEADLINES,
} from "./data";

export default function DashboardPage() {
	const { t, taskList, setTaskList } = useCRM();
	const annualGoal = 750000;
	const raised = 519400;
	const pct = Math.round((raised / annualGoal) * 100);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
			<Card
				t={t}
				style={{
					background: `linear-gradient(135deg,${t.accent}18 0%,${t.surface} 60%)`,
					border: `1px solid ${t.accent}30`,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						flexWrap: "wrap",
						gap: 16,
					}}
				>
					<div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 700,
								color: t.accent,
								marginBottom: 6,
								letterSpacing: 0.3,
							}}
						>
							2026 ANNUAL FUND
						</div>
						<div
							style={{
								fontSize: 36,
								fontWeight: 800,
								color: t.text,
								letterSpacing: -1,
								marginBottom: 4,
							}}
						>
							$519,400{" "}
							<span style={{ fontSize: 18, color: t.textSub, fontWeight: 500 }}>
								raised of $750,000
							</span>
						</div>
						<div style={{ fontSize: 13, color: t.textSub, marginBottom: 16 }}>
							142 donors · 290 days remaining
						</div>
						<ProgressBar
							value={raised}
							max={annualGoal}
							color={t.accent}
							t={t}
							height={10}
						/>
					</div>
					<div style={{ textAlign: "right" }}>
						<div
							style={{
								fontSize: 48,
								fontWeight: 800,
								color: t.accent,
								lineHeight: 1,
							}}
						>
							{pct}%
						</div>
						<div style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>
							to goal
						</div>
					</div>
				</div>
			</Card>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gap: 16,
				}}
			>
				<StatCard
					t={t}
					label="Raised YTD"
					value="$519K"
					change="+28%"
					up={true}
					sub="vs last year"
					icon="💚"
					color={t.accent}
				/>
				<StatCard
					t={t}
					label="Active Donors"
					value="342"
					change="+24"
					up={true}
					sub="since Jan"
					icon="👥"
					color={t.blue}
				/>
				<StatCard
					t={t}
					label="Open Grants"
					value="4"
					change="-1"
					up={false}
					sub="vs last month"
					icon="📋"
					color={t.purple}
				/>
				<StatCard
					t={t}
					label="Donor Retention"
					value="74%"
					change="+3%"
					up={true}
					sub="vs 71% last yr"
					icon="🔄"
					color={t.green}
				/>
			</div>

			<div
				style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}
			>
				<Card t={t}>
					<SecHead
						t={t}
						action="Full report →"
						sub="Monthly donations and donor count"
					>
						Fundraising Over Time
					</SecHead>
					<ResponsiveContainer width="100%" height={200}>
						<AreaChart
							data={raisedOverTime}
							margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
						>
							<defs>
								<linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
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
								fill="url(#rg)"
								dot={false}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Card>
				<Card t={t}>
					<SecHead t={t} sub="Where donations come from">
						Revenue by Source
					</SecHead>
					<ResponsiveContainer width="100%" height={180}>
						<PieChart>
							<Pie
								data={sourceData}
								dataKey="amount"
								cx="50%"
								cy="50%"
								outerRadius={70}
								paddingAngle={3}
								innerRadius={30}
							>
								{sourceData.map((e, i) => (
									<Cell key={i} fill={e.color} />
								))}
							</Pie>
							<Tooltip content={<ChartTip t={t} />} />
						</PieChart>
					</ResponsiveContainer>
					<div
						style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}
					>
						{sourceData.map((s) => (
							<div
								key={s.source}
								style={{ display: "flex", alignItems: "center", gap: 4 }}
							>
								<div
									style={{
										width: 8,
										height: 8,
										borderRadius: 2,
										background: s.color,
									}}
								/>
								<span style={{ fontSize: 10, color: t.textSub }}>
									{s.source}
								</span>
							</div>
						))}
					</div>
				</Card>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1.3fr 1fr 0.9fr",
					gap: 16,
				}}
			>
				<Card t={t}>
					<SecHead
						t={t}
						action="All campaigns →"
						sub="Progress toward each goal"
					>
						Active Campaigns
					</SecHead>
					{CAMPAIGNS.filter((c) => c.status === "Active").map((c) => (
						<div key={c.id} style={{ marginBottom: 18 }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									marginBottom: 8,
								}}
							>
								<div>
									<div
										style={{
											fontSize: 13,
											fontWeight: 700,
											color: t.text,
											marginBottom: 2,
										}}
									>
										{c.name}
									</div>
									<Pill color={c.color} dim={c.color + "16"} small>
										{c.type}
									</Pill>
								</div>
								<div style={{ textAlign: "right" }}>
									<div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>
										${(c.raised / 1000).toFixed(0)}K
									</div>
									<div style={{ fontSize: 11, color: t.textSub }}>
										of ${(c.goal / 1000).toFixed(0)}K
									</div>
								</div>
							</div>
							<ProgressBar
								value={c.raised}
								max={c.goal}
								color={c.color}
								t={t}
							/>
							<div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>
								{Math.round((c.raised / c.goal) * 100)}% · {c.donors} donors
							</div>
						</div>
					))}
				</Card>

				<Card t={t}>
					<SecHead t={t} action="All tasks →" sub="What needs attention today">
						Due Today
					</SecHead>
					{taskList
						.filter((x) => x.due === "Today")
						.map((task) => {
							const gi = taskList.findIndex((x) => x.id === task.id);
							return (
								<div
									key={task.id}
									style={{
										display: "flex",
										gap: 10,
										padding: "10px 12px",
										background: t.surfaceAlt,
										borderRadius: 14,
										marginBottom: 8,
										opacity: task.done ? 0.4 : 1,
									}}
								>
									<div
										onClick={() =>
											setTaskList((tl) =>
												tl.map((x, j) =>
													j === gi ? { ...x, done: !x.done } : x,
												),
											)
										}
										style={{
											width: 20,
											height: 20,
											borderRadius: 6,
											border: `2px solid ${task.done ? t.accent : t.border}`,
											background: task.done ? t.accent + "22" : "transparent",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											cursor: "pointer",
											flexShrink: 0,
											marginTop: 1,
										}}
									>
										{task.done && (
											<span
												style={{
													fontSize: 11,
													color: t.accent,
													fontWeight: 900,
												}}
											>
												✓
											</span>
										)}
									</div>
									<div style={{ flex: 1 }}>
										<div
											style={{
												fontSize: 12,
												fontWeight: 600,
												color: t.text,
												textDecoration: task.done ? "line-through" : "none",
												lineHeight: 1.4,
												marginBottom: 4,
											}}
										>
											{task.text}
										</div>
										<div style={{ display: "flex", gap: 5 }}>
											<Pill
												color={PRIORITY_META[task.priority].color}
												dim={PRIORITY_META[task.priority].dim}
												small
											>
												{task.priority}
											</Pill>
											<Pill color={t.textSub} dim={t.surfaceB} small>
												{task.category}
											</Pill>
										</div>
									</div>
								</div>
							);
						})}
				</Card>

				<Card t={t}>
					<SecHead t={t} sub="Grants and events">
						Upcoming Deadlines
					</SecHead>
					{UPCOMING_DEADLINES.map((d, i) => {
						const color = t[d.colorKey] || t.purple;
						return (
							<div
								key={i}
								style={{
									display: "flex",
									gap: 12,
									padding: "9px 0",
									borderBottom: i < 4 ? `1px solid ${t.border}` : "none",
									alignItems: "center",
								}}
							>
								<div
									style={{
										width: 36,
										height: 36,
										borderRadius: 12,
										background: color + "18",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 11,
										fontWeight: 800,
										color,
										flexShrink: 0,
										lineHeight: 1.2,
										textAlign: "center",
									}}
								>
									{d.date.split(" ")[1]}
									<br />
									<span style={{ fontSize: 9 }}>{d.date.split(" ")[0]}</span>
								</div>
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 12, fontWeight: 700, color: t.text }}>
										{d.label}
									</div>
									<Pill color={color} dim={color + "16"} small>
										{d.type}
									</Pill>
								</div>
							</div>
						);
					})}
				</Card>
			</div>

			<Card t={t}>
				<SecHead
					t={t}
					action="All donors →"
					sub="Highest lifetime value this year"
				>
					Top Donors
				</SecHead>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4,1fr)",
						gap: 12,
					}}
				>
					{DONORS.filter((d) => d.ltv > 0)
						.sort((a, b) => b.ltv - a.ltv)
						.slice(0, 4)
						.map((d, i) => (
							<div
								key={d.id}
								style={{
									background: t.surfaceAlt,
									borderRadius: 18,
									padding: 16,
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: 10,
										marginBottom: 12,
									}}
								>
									<div
										style={{
											fontSize: 14,
											fontWeight: 800,
											color: t.textMuted,
											width: 20,
										}}
									>
										#{i + 1}
									</div>
									<Avatar
										code={d.staff}
										color={STAFF_COLOR[d.staff]}
										size={32}
									/>
								</div>
								<div
									style={{
										fontSize: 13,
										fontWeight: 700,
										color: t.text,
										marginBottom: 4,
										lineHeight: 1.3,
									}}
								>
									{d.name}
								</div>
								<Pill
									color={TYPE_META[d.type]?.color || t.accent}
									dim={TYPE_META[d.type]?.dim || t.accentDim}
									small
								>
									{d.type}
								</Pill>
								<div
									style={{
										fontSize: 20,
										fontWeight: 800,
										color: t.accent,
										marginTop: 10,
									}}
								>
									${(d.ltv / 1000).toFixed(0)}K
								</div>
								<div style={{ fontSize: 11, color: t.textSub }}>
									lifetime value
								</div>
							</div>
						))}
				</div>
			</Card>
		</div>
	);
}
