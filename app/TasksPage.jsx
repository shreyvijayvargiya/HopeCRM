"use client";

import { useState } from "react";
import { Card, Pill, Avatar, Btn, Modal, Field, Select } from "./Shared";
import { useCRM } from "./Layout";
import { STAFF_COLOR, PRIORITY_META } from "./data";

export default function TasksPage() {
	const { t, taskList, setTaskList } = useCRM();
	const [filter, setFilter] = useState("All");
	const [showForm, setShowForm] = useState(false);
	const done = taskList.filter((x) => x.done).length;

	const groups = [
		{ label: "Today", tasks: taskList.filter((x) => x.due === "Today") },
		{ label: "Tomorrow", tasks: taskList.filter((x) => x.due === "Tomorrow") },
		{
			label: "This Week",
			tasks: taskList.filter((x) => !["Today", "Tomorrow"].includes(x.due)),
		},
	];

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
						Total Tasks
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.text }}>
						{taskList.length}
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Completed
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.green }}>
						{done}
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						Due Today
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.amber }}>
						{taskList.filter((x) => x.due === "Today").length}
					</div>
				</Card>
				<Card t={t}>
					<div style={{ fontSize: 12, color: t.textSub, marginBottom: 8 }}>
						High Priority
					</div>
					<div style={{ fontSize: 28, fontWeight: 800, color: t.red }}>
						{taskList.filter((x) => x.priority === "high" && !x.done).length}
					</div>
				</Card>
			</div>

			<div
				style={{
					display: "flex",
					gap: 8,
					marginBottom: 20,
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				{["All", "High", "Medium", "Low", "AM", "JT", "RK", "NP", "LW"].map(
					(f) => (
						<div
							key={f}
							onClick={() => setFilter(f)}
							style={{
								padding: "6px 14px",
								borderRadius: 10,
								fontSize: 12,
								fontWeight: 700,
								cursor: "pointer",
								background: filter === f ? t.accent : t.surfaceAlt,
								color: filter === f ? t.bg : t.textMuted,
								transition: "all 0.15s",
							}}
						>
							{f}
						</div>
					),
				)}
				<Btn
					t={t}
					primary
					style={{ marginLeft: "auto" }}
					onClick={() => setShowForm(true)}
				>
					+ New Task
				</Btn>
			</div>

			{groups.map((group) => {
				const show =
					filter === "All"
						? group.tasks
						: group.tasks.filter(
								(x) =>
									x.priority === filter.toLowerCase() || x.staff === filter,
							);
				if (!show.length) return null;
				return (
					<div key={group.label} style={{ marginBottom: 24 }}>
						<div
							style={{
								fontSize: 11,
								fontWeight: 800,
								color: t.textMuted,
								letterSpacing: 1.2,
								marginBottom: 12,
							}}
						>
							{group.label.toUpperCase()} · {show.length}
						</div>
						{show.map((task) => {
							const gi = taskList.findIndex((x) => x.id === task.id);
							return (
								<Card
									key={task.id}
									t={t}
									p={16}
									style={{
										marginBottom: 10,
										opacity: task.done ? 0.45 : 1,
										transition: "opacity 0.2s",
									}}
								>
									<div
										style={{
											display: "flex",
											gap: 12,
											alignItems: "flex-start",
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
												width: 22,
												height: 22,
												borderRadius: 7,
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
														fontSize: 12,
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
													fontSize: 14,
													fontWeight: 600,
													color: t.text,
													textDecoration: task.done ? "line-through" : "none",
													marginBottom: 8,
													lineHeight: 1.4,
												}}
											>
												{task.text}
											</div>
											<div
												style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
											>
												<Pill
													color={PRIORITY_META[task.priority].color}
													dim={PRIORITY_META[task.priority].dim}
													small
												>
													{task.priority}
												</Pill>
												<Pill color={t.textSub} dim={t.surfaceAlt} small>
													{task.category}
												</Pill>
												<Pill color={t.textSub} dim={t.surfaceAlt} small>
													{task.linked}
												</Pill>
											</div>
										</div>
										<div
											style={{
												display: "flex",
												gap: 8,
												alignItems: "center",
												flexShrink: 0,
											}}
										>
											<span
												style={{
													fontSize: 12,
													color: task.due === "Today" ? t.amber : t.textMuted,
													fontWeight: 600,
												}}
											>
												{task.due}
											</span>
											<Avatar
												code={task.staff}
												color={STAFF_COLOR[task.staff]}
												size={30}
											/>
										</div>
									</div>
								</Card>
							);
						})}
					</div>
				);
			})}

			{showForm && (
				<Modal t={t} title="New Task" onClose={() => setShowForm(false)}>
					<Field t={t} label="TASK DESCRIPTION">
						<textarea
							rows={2}
							placeholder="What needs to be done?"
							style={{
								width: "100%",
								padding: "10px 14px",
								borderRadius: 12,
								border: `1.5px solid ${t.border}`,
								background: t.surfaceAlt,
								color: t.text,
								fontSize: 13,
								outline: "none",
								resize: "none",
								fontFamily: "inherit",
							}}
						/>
					</Field>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="PRIORITY">
							<Select t={t} options={["High", "Medium", "Low"]} />
						</Field>
						<Field t={t} label="DUE DATE">
							<Select
								t={t}
								options={["Today", "Tomorrow", "Mar 15", "Mar 20", "Mar 28"]}
							/>
						</Field>
					</div>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<Field t={t} label="ASSIGN TO">
							<Select
								t={t}
								options={[
									"AM — Alex",
									"JT — Jamie",
									"RK — Rachel",
									"NP — Nina",
									"LW — Leo",
								]}
							/>
						</Field>
						<Field t={t} label="CATEGORY">
							<Select
								t={t}
								options={[
									"Follow-up",
									"Grant Writing",
									"Event",
									"Reporting",
									"Admin",
									"Board",
								]}
							/>
						</Field>
					</div>
					<Field t={t} label="LINKED TO">
						<Select
							t={t}
							options={["Donor", "Grant", "Event", "Campaign", "Board"]}
						/>
					</Field>
					<div style={{ display: "flex", gap: 8, marginTop: 6 }}>
						<Btn
							t={t}
							primary
							style={{ flex: 1 }}
							onClick={() => setShowForm(false)}
						>
							Save Task
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
