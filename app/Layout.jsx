"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NAV, THEMES, THEME_OPTIONS, TASKS_DATA, PAGE_TITLES, PAGE_SUB, NOTIFICATIONS } from "./data";


const CRMContext = createContext(null);
export function useCRM() {
	const ctx = useContext(CRMContext);
	if (!ctx) throw new Error("useCRM must be used within Layout");
	return ctx;
}

function ProgressBar({ value, max, color, t, height = 7 }) {
	const pct = Math.min((value / max) * 100, 100);
	return (
		<div style={{ height, borderRadius: height, background: t.surfaceB, overflow: "hidden" }}>
			<div style={{ height: "100%", width: `${pct}%`, borderRadius: height, background: color, transition: "width 0.6s ease" }} />
		</div>
	);
}

export default function Layout({ children }) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState("dark");
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [taskList, setTaskList] = useState(TASKS_DATA);

	const path = router.asPath || "";
	const activePage = (path.split("?")[0].replace(/^\//, "") || "dashboard").trim();
	const title = PAGE_TITLES[activePage] || activePage;
	const sub = PAGE_SUB[activePage] || "";
	const t = THEMES[theme] || THEMES.dark;
	const contextValue = { t, theme, setTheme, taskList, setTaskList };

	useEffect(() => {
		setMounted(true);
		const stored = typeof window !== "undefined" && localStorage.getItem("crm-theme");
		if (stored && THEMES[stored]) setTheme(stored);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("crm-theme", theme);
	}, [theme]);

	useEffect(() => {
		const mq = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)");
		if (!mq) return;
		const handler = () => {
			setIsMobile(mq.matches);
			if (mq.matches) setSidebarOpen(false);
		};
		handler();
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const handleNavClick = (id) => {
		router.push(id === "dashboard" ? "/" : `/${id}`);
		if (isMobile) setSidebarOpen(false);
	};

	const isActive = (id) => activePage === id || (id === "dashboard" && (activePage === "" || activePage === "index"));

	if (!mounted) {
		return (
			<CRMContext.Provider value={contextValue}>
				<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: t.bg, color: t.text, fontFamily: "'Nunito', sans-serif" }}>
					Loading…
				</div>
			</CRMContext.Provider>
		);
	}

	return (
		<CRMContext.Provider value={contextValue}>
			<div className="crm-app" style={{ fontFamily: "'Nunito','Helvetica Neue',sans-serif", background: t.bg, color: t.text, minHeight: "100vh", height: "100vh", display: "flex", flexDirection: "row", overflow: "hidden", transition: "background 0.3s, color 0.3s" }} suppressHydrationWarning>
				<style>{`
					@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap');
					*{box-sizing:border-box;margin:0;padding:0;}
					::-webkit-scrollbar{width:5px;height:5px;}
					::-webkit-scrollbar-thumb{background:${t.surfaceB};border-radius:6px;}
					.crm-ni{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:14px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;white-space:nowrap;overflow:hidden;color:${t.textSub};user-select:none;}
					.crm-ni:hover{background:${t.surfaceAlt};color:${t.text};}
					.crm-ni.act{background:${t.accentDim};color:${t.accent};font-weight:800;}
					.crm-tbtn{width:36px;height:36px;border-radius:12px;background:transparent;border:1.5px solid ${t.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${t.textSub};font-size:15px;transition:all 0.15s;}
					.crm-tbtn:hover{background:${t.surfaceAlt};color:${t.text};}
					.crm-srch{background:${t.surfaceAlt};border:1.5px solid ${t.border};border-radius:14px;padding:8px 14px 8px 36px;font-size:13px;color:${t.text};outline:none;width:230px;transition:all 0.2s;font-family:inherit;font-weight:600;}
					.crm-srch:focus{border-color:${t.accent};width:270px;}
					.crm-srch::placeholder{color:${t.textMuted};}
					.crm-badge{min-width:20px;height:20px;border-radius:10px;background:${t.red};color:#fff;font-size:10px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;padding:0 6px;margin-left:auto;}
					.crm-pe{animation:crmFu 0.22s ease both;}
					@keyframes crmFu{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
					select option{background:${t.surface};color:${t.text};}
					input:focus,select:focus{border-color:${t.accent}!important;}
					@media (max-width: 768px) {
						.crm-sidebar{position:fixed;top:0;left:0;bottom:0;z-index:100;transform:translateX(-100%);transition:transform 0.25s ease, box-shadow 0.25s ease;}
						.crm-sidebar.crm-sidebar-open{transform:translateX(0);box-shadow:8px 0 24px rgba(0,0,0,0.3);}
						.crm-sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;opacity:0;pointer-events:none;transition:opacity 0.2s ease;}
						.crm-sidebar-overlay.crm-sidebar-overlay-visible{opacity:1;pointer-events:auto;}
						.crm-sidebar{width:240px!important;min-width:240px!important;}
					}
				`}</style>

				{isMobile && (
					<div className={`crm-sidebar-overlay ${sidebarOpen ? "crm-sidebar-overlay-visible" : ""}`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
				)}

				<aside
					className={`crm-sidebar ${sidebarOpen ? "crm-sidebar-open" : ""}`}
					style={{
						width: isMobile ? 240 : sidebarCollapsed ? 70 : 240,
						minWidth: isMobile ? 240 : sidebarCollapsed ? 70 : 240,
						background: t.surface,
						borderRight: `1px solid ${t.border}`,
						display: "flex",
						flexDirection: "column",
						padding: "20px 12px",
						flexShrink: 0,
						transition: "width 0.25s ease",
						overflow: "hidden",
						boxShadow: t.shadowMd,
					}}
				>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: sidebarCollapsed ? 0 : 4, marginBottom: 28 }}>
						{!sidebarCollapsed && !isMobile && (
							<div style={{ display: "flex", alignItems: "center", gap: 11 }}>
								<div style={{ width: 38, height: 38, borderRadius: 14, background: `linear-gradient(135deg,${t.accent},${t.accentDeep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, boxShadow: `0 4px 14px ${t.accent}40` }}>💚</div>
								<div>
									<div style={{ fontSize: 16, fontWeight: 900, letterSpacing: -0.4, color: t.text, lineHeight: 1.2 }}>HopeCRM</div>
									<div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>Nonprofit Suite</div>
								</div>
							</div>
						)}
						{(sidebarCollapsed || isMobile) && (
							<div style={{ width: 38, height: 38, borderRadius: 14, background: `linear-gradient(135deg,${t.accent},${t.accentDeep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: isMobile ? "0 auto" : "0", boxShadow: `0 4px 14px ${t.accent}40` }}>💚</div>
						)}
						{!sidebarCollapsed && !isMobile && (
							<button onClick={() => setSidebarCollapsed(true)} style={{ width: 26, height: 26, borderRadius: 8, background: t.surfaceAlt, border: `1px solid ${t.border}`, cursor: "pointer", color: t.textSub, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>‹</button>
						)}
					</div>
					{sidebarCollapsed && !isMobile && (
						<button onClick={() => setSidebarCollapsed(false)} style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, border: `1px solid ${t.border}`, cursor: "pointer", color: t.textSub, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>›</button>
					)}

					{(!sidebarCollapsed || isMobile) && (
						<>
							<div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: 1.3, paddingLeft: 6, marginBottom: 8 }}>MAIN</div>
							{NAV.map((item) => (
								<div
									key={item.id}
									className={`crm-ni ${isActive(item.id) ? " act" : ""}`}
									onClick={() => handleNavClick(item.id)}
									title={sidebarCollapsed && !isMobile ? item.label : undefined}
									style={{ justifyContent: sidebarCollapsed && !isMobile ? "center" : "flex-start", padding: sidebarCollapsed && !isMobile ? "11px" : "10px 14px" }}
								>
									<span style={{ fontSize: 15, width: 22, textAlign: "center", flexShrink: 0, fontFamily: "monospace" }}>{item.icon}</span>
									{(!sidebarCollapsed || isMobile) && (
										<>
											<span style={{ flex: 1 }}>{item.label}</span>
											{item.badge && <span className="crm-badge">{item.badge}</span>}
										</>
									)}
								</div>
							))}
						</>
					)}

					<div style={{ marginTop: "auto" }}>
						{(!sidebarCollapsed || isMobile) && (
							<div style={{ background: t.surfaceAlt, borderRadius: 18, padding: "14px 16px", marginBottom: 12, border: `1px solid ${t.border}` }}>
								<div style={{ fontSize: 11, color: t.accent, fontWeight: 800, marginBottom: 5, letterSpacing: 0.3 }}>2026 ANNUAL GOAL</div>
								<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
									<span style={{ fontSize: 18, fontWeight: 900, color: t.text }}>69%</span>
									<span style={{ fontSize: 11, color: t.textSub, marginTop: 3 }}>$519K / $750K</span>
								</div>
								<ProgressBar value={519} max={750} color={t.accent} t={t} height={7} />
							</div>
						)}
						<div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: 1.2, paddingLeft: 4, marginBottom: 6 }}>THEME</div>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
							{THEME_OPTIONS.map((opt) => (
								<button
									key={opt.id}
									onClick={() => setTheme(opt.id)}
									title={opt.label}
									style={{
										flex: "1 1 " + (sidebarCollapsed && !isMobile ? "0" : "45%"),
										minWidth: sidebarCollapsed && !isMobile ? 36 : undefined,
										width: sidebarCollapsed && !isMobile ? 36 : undefined,
										height: 36,
										borderRadius: 10,
										border: `1.5px solid ${theme === opt.id ? t.accent : t.border}`,
										background: theme === opt.id ? t.accentDim : "transparent",
										color: theme === opt.id ? t.accent : t.textSub,
										fontSize: sidebarCollapsed && !isMobile ? 16 : 12,
										fontWeight: 700,
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 6,
										transition: "all 0.15s",
										fontFamily: "inherit",
									}}
								>
									<span style={{ fontSize: 15 }}>{opt.icon}</span>
									{(!sidebarCollapsed || isMobile) && <span>{opt.label}</span>}
								</button>
							))}
						</div>
					</div>
				</aside>

				<div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
					<header
						style={{
							height: 62,
							background: t.surface,
							borderBottom: `1px solid ${t.border}`,
							display: "flex",
							alignItems: "center",
							padding: "0 28px",
							gap: 14,
							flexShrink: 0,
							boxShadow: `0 1px 8px ${t.border}`,
						}}
					>
						{isMobile && (
							<button onClick={() => setSidebarOpen(true)} className="crm-tbtn" style={{ flexShrink: 0 }} aria-label="Open menu">≡</button>
						)}
						<div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
							<span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>HopeCRM</span>
							<span style={{ color: t.textMuted, fontSize: 12 }}>›</span>
							<span style={{ fontSize: 13, fontWeight: 800, color: t.text, textTransform: "capitalize" }}>{activePage}</span>
						</div>
						<div style={{ position: "relative" }}>
							<span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: t.textMuted }}>🔍</span>
							<input className="crm-srch" placeholder="Search donors, grants..." />
						</div>
						<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
							<div style={{ position: "relative" }}>
								<div className="crm-tbtn" onClick={() => setNotifOpen(!notifOpen)}>🔔</div>
								<div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: t.red, border: `2px solid ${t.surface}` }} />
								{notifOpen && (
									<div style={{ position: "absolute", right: 0, top: 44, width: 300, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: 18, zIndex: 200, boxShadow: t.shadowLg }}>
										<div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}>Notifications</div>
										{NOTIFICATIONS.map((n, i) => (
											<div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < NOTIFICATIONS.length - 1 ? `1px solid ${t.border}` : "none", alignItems: "flex-start" }}>
												<div style={{ width: 9, height: 9, borderRadius: "50%", background: t[n.dotKey] || t.red, flexShrink: 0, marginTop: 4 }} />
												<div style={{ flex: 1 }}>
													<div style={{ fontSize: 12, color: t.text, fontWeight: 600, lineHeight: 1.4 }}>{n.text}</div>
													<div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{n.time}</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
							<div className="crm-tbtn">⚙</div>
							<div style={{ width: 36, height: 36, borderRadius: 12, background: t.accentDim, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, cursor: "pointer", border: `1.5px solid ${t.accent}30` }}>AM</div>
						</div>
					</header>

					<main style={{ flex: 1, overflow: "auto", padding: "28px 32px", background: t.bgSubtle }} onClick={() => notifOpen && setNotifOpen(false)}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
							<div>
								<h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.5, color: t.text, marginBottom: 4 }}>{title}</h1>
								<p style={{ fontSize: 13, color: t.textSub, fontWeight: 500 }}>{sub}</p>
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								{activePage === "dashboard" && (
									<>
										<button style={{ padding: "10px 20px", borderRadius: 12, background: "transparent", border: `1px solid ${t.border}`, color: t.textSub, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Export Report</button>
										<button style={{ padding: "10px 20px", borderRadius: 12, background: t.accent, color: t.bg, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Add Donor</button>
									</>
								)}
								{activePage === "reports" && <button style={{ padding: "10px 20px", borderRadius: 12, background: t.accent, color: t.bg, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Export PDF</button>}
							</div>
						</div>
						<div className="crm-pe" key={activePage}>
							{children}
						</div>
					</main>
				</div>
			</div>
		</CRMContext.Provider>
	);
}
