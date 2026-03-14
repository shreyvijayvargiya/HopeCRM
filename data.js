/**
 * HopeCRM — Nonprofit / Charity CRM — Master Data File
 *
 * Edit this file to customize all charts, lists, donors, grants, campaigns,
 * events, volunteers, tasks, and settings. No store or Redux — each page
 * imports this data directly.
 */

const THEMES = {
  dark: {
    bg: "#0c1117",
    bgSubtle: "#0f141a",
    surface: "#151c24",
    surfaceAlt: "#1c2530",
    surfaceB: "#22303d",
    border: "#1e2d3a",
    text: "#e8f0f5",
    textMuted: "#3a5060",
    textSub: "#6a8fa0",
    accent: "#2dd4bf",
    accentDim: "#2dd4bf14",
    accentDeep: "#14b8a6",
    green: "#4ade80",
    greenDim: "#4ade8016",
    red: "#fb7185",
    redDim: "#fb718516",
    amber: "#fbbf24",
    amberDim: "#fbbf2416",
    blue: "#60a5fa",
    blueDim: "#60a5fa16",
    purple: "#c084fc",
    purpleDim: "#c084fc16",
    pink: "#f472b6",
    pinkDim: "#f472b616",
    shadow: "0 4px 24px rgba(0,0,0,0.35)",
    shadowMd: "0 8px 32px rgba(0,0,0,0.45)",
    shadowLg: "0 16px 48px rgba(0,0,0,0.6)",
  },
  light: {
    bg: "#f0f7f6",
    bgSubtle: "#e8f5f3",
    surface: "#ffffff",
    surfaceAlt: "#f5faf9",
    surfaceB: "#eaf4f2",
    border: "#d4ebe7",
    text: "#0d2a26",
    textMuted: "#a8ccc7",
    textSub: "#4a8a82",
    accent: "#0d9488",
    accentDim: "#0d948812",
    accentDeep: "#0f766e",
    green: "#16a34a",
    greenDim: "#16a34a12",
    red: "#e11d48",
    redDim: "#e11d4812",
    amber: "#d97706",
    amberDim: "#d9770612",
    blue: "#2563eb",
    blueDim: "#2563eb12",
    purple: "#9333ea",
    purpleDim: "#9333ea12",
    pink: "#db2777",
    pinkDim: "#db277712",
    shadow: "0 4px 24px rgba(13,42,38,0.07)",
    shadowMd: "0 8px 32px rgba(13,42,38,0.10)",
    shadowLg: "0 16px 48px rgba(13,42,38,0.14)",
  },
  ocean: {
    bg: "#0a1628",
    bgSubtle: "#0d1f35",
    surface: "#132742",
    surfaceAlt: "#1a3254",
    surfaceB: "#1e3a5f",
    border: "#1e3a5f",
    text: "#e0f2fe",
    textMuted: "#7dd3fc",
    textSub: "#38bdf8",
    accent: "#0ea5e9",
    accentDim: "#0ea5e914",
    accentDeep: "#0284c7",
    green: "#2dd4bf",
    greenDim: "#2dd4bf16",
    red: "#f87171",
    redDim: "#f8717116",
    amber: "#fbbf24",
    amberDim: "#fbbf2416",
    blue: "#38bdf8",
    blueDim: "#38bdf816",
    purple: "#a78bfa",
    purpleDim: "#a78bfa16",
    pink: "#f472b6",
    pinkDim: "#f472b616",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
    shadowMd: "0 8px 32px rgba(0,0,0,0.5)",
    shadowLg: "0 16px 48px rgba(0,0,0,0.6)",
  },
  sunset: {
    bg: "#1c1917",
    bgSubtle: "#292524",
    surface: "#44403c",
    surfaceAlt: "#57534e",
    surfaceB: "#78716c",
    border: "#57534e",
    text: "#fef3c7",
    textMuted: "#d6d3d1",
    textSub: "#fcd34d",
    accent: "#f97316",
    accentDim: "#f9731614",
    accentDeep: "#ea580c",
    green: "#4ade80",
    greenDim: "#4ade8016",
    red: "#fb7185",
    redDim: "#fb718516",
    amber: "#fbbf24",
    amberDim: "#fbbf2416",
    blue: "#60a5fa",
    blueDim: "#60a5fa16",
    purple: "#c084fc",
    purpleDim: "#c084fc16",
    pink: "#fb7185",
    pinkDim: "#fb718516",
    shadow: "0 4px 24px rgba(0,0,0,0.35)",
    shadowMd: "0 8px 32px rgba(0,0,0,0.45)",
    shadowLg: "0 16px 48px rgba(0,0,0,0.6)",
  },
};

const STAFF_COLOR = { AM: "#2dd4bf", JT: "#f472b6", RK: "#fbbf24", NP: "#c084fc", LW: "#60a5fa" };

const DONORS = [
  { id: 1, name: "The Ellison Family", type: "Individual", tier: "Major", stage: "Stewardship", ltv: 85000, lastGift: 25000, lastDate: "Mar 1", source: "Board Referral", staff: "AM", email: "ellison@family.org", phone: "+1 (415) 555-0112", notes: "Multi-year major donor. Interested in education programs.", tags: ["Recurring", "Board-Connected", "Education"] },
  { id: 2, name: "Sunrise Foundation", type: "Foundation", tier: "Major", stage: "Cultivation", ltv: 240000, lastGift: 75000, lastDate: "Jan 15", source: "Grant Portal", staff: "JT", email: "grants@sunrise.org", phone: "+1 (212) 555-0234", notes: "Prefers program-specific grants. Annual cycle due April.", tags: ["Multi-year", "Grant", "April Deadline"] },
  { id: 3, name: "Marcus & Ruth Chen", type: "Individual", tier: "Mid-Level", stage: "Solicitation", ltv: 18500, lastGift: 5000, lastDate: "Dec 20", source: "Gala Event", staff: "AM", email: "mchen@gmail.com", phone: "+1 (312) 555-0345", notes: "Met at annual gala. Open to naming opportunity.", tags: ["Event-Connected"] },
  { id: 4, name: "Northgate Community Bank", type: "Corporate", tier: "Mid-Level", stage: "Stewardship", ltv: 32000, lastGift: 10000, lastDate: "Feb 10", source: "Cold Outreach", staff: "RK", email: "csr@northgate.bank", phone: "+1 (713) 555-0456", notes: "CSR budget renewed annually in February.", tags: ["Corporate", "Annual"] },
  { id: 5, name: "City of Springfield", type: "Government", tier: "Major", stage: "Awarded", ltv: 180000, lastGift: 60000, lastDate: "Mar 5", source: "RFP Response", staff: "JT", email: "grants@springfield.gov", phone: "+1 (217) 555-0567", notes: "CDBG funding. Reporting due June 30.", tags: ["Government", "Reporting-Due"] },
  { id: 6, name: "Patricia Osei-Mensah", type: "Individual", tier: "General", stage: "Prospect", ltv: 0, lastGift: 0, lastDate: "—", source: "Website", staff: "NP", email: "patricia@email.com", phone: "+1 (404) 555-0678", notes: "Downloaded impact report. Sent welcome email.", tags: ["New", "Digital"] },
  { id: 7, name: "Meridian Tech Corp", type: "Corporate", tier: "Major", stage: "Cultivation", ltv: 55000, lastGift: 0, lastDate: "—", source: "Board Referral", staff: "AM", email: "giving@meridian.com", phone: "+1 (206) 555-0789", notes: "CEO is board member's colleague. First meeting scheduled.", tags: ["High-Potential", "Tech"] },
  { id: 8, name: "James & Anita Holbrook", type: "Individual", tier: "Mid-Level", stage: "Lapsed", ltv: 22000, lastGift: 3500, lastDate: "Aug 12", source: "Direct Mail", staff: "NP", email: "jholbrook@email.com", phone: "+1 (602) 555-0890", notes: "No contact in 7 months. Re-engagement sequence started.", tags: ["Lapsed", "Re-engagement"] },
];

const GRANTS = [
  { id: 1, funder: "Sunrise Foundation", amount: 75000, deadline: "Apr 15", stage: "Full Proposal", program: "Education", staff: "JT", reportDue: "Dec 31", submitted: "Mar 1", notes: "LOI approved. Full proposal due April 15." },
  { id: 2, funder: "City of Springfield", amount: 60000, deadline: "Awarded", stage: "Awarded", program: "Housing", staff: "JT", reportDue: "Jun 30", submitted: "Jan 10", notes: "CDBG grant awarded. Mid-year report due June 30." },
  { id: 3, funder: "W.K. Kellogg Found.", amount: 120000, deadline: "May 1", stage: "LOI Submitted", program: "Youth Dev.", staff: "AM", reportDue: "—", submitted: "Feb 28", notes: "LOI submitted. Decision expected April 1." },
  { id: 4, funder: "Robert Wood Johnson", amount: 200000, deadline: "Jun 15", stage: "Prospect", program: "Health", staff: "JT", reportDue: "—", submitted: "—", notes: "Identified as strong fit. Research phase." },
  { id: 5, funder: "Local Community Found.", amount: 25000, deadline: "Mar 28", stage: "Under Review", program: "Arts", staff: "RK", reportDue: "—", submitted: "Feb 15", notes: "Application submitted. Site visit scheduled." },
  { id: 6, funder: "Tech for Good", amount: 30000, deadline: "Closed", stage: "Rejected", program: "Technology", staff: "NP", reportDue: "—", submitted: "Oct 5", notes: "Declined — out of geographic scope." },
];

const CAMPAIGNS = [
  { id: 1, name: "Annual Fund 2026", type: "Annual Fund", goal: 250000, raised: 168000, donors: 142, startDate: "Jan 1", endDate: "Dec 31", status: "Active", color: "#2dd4bf" },
  { id: 2, name: "Spring Gala 2026", type: "Event-Based", goal: 80000, raised: 62000, donors: 88, startDate: "Mar 1", endDate: "Apr 20", status: "Active", color: "#f472b6" },
  { id: 3, name: "Giving Tuesday 2025", type: "Giving Tuesday", goal: 50000, raised: 58400, donors: 310, startDate: "Nov 28", endDate: "Nov 30", status: "Completed", color: "#4ade80" },
  { id: 4, name: "Capital Campaign", type: "Capital Campaign", goal: 1000000, raised: 420000, donors: 34, startDate: "Jan 1", endDate: "Dec 31", status: "Active", color: "#fbbf24" },
  { id: 5, name: "Emergency Relief Fund", type: "Emergency Appeal", goal: 30000, raised: 30000, donors: 204, startDate: "Feb 10", endDate: "Feb 28", status: "Completed", color: "#60a5fa" },
];

const EVENTS = [
  { id: 1, name: "Spring Gala 2026", type: "Gala", date: "Apr 19, 2026", venue: "Grand Ballroom, Hilton", capacity: 300, registered: 224, revenueGoal: 80000, revenue: 62000, status: "Upcoming" },
  { id: 2, name: "Volunteer Appreciation", type: "Community Day", date: "Mar 22, 2026", venue: "Community Center", capacity: 80, registered: 67, revenueGoal: 0, revenue: 0, status: "Upcoming" },
  { id: 3, name: "Board Meeting Q1", type: "Board Meeting", date: "Mar 18, 2026", venue: "HQ Conference Room", capacity: 15, registered: 12, revenueGoal: 0, revenue: 0, status: "Upcoming" },
  { id: 4, name: "Giving Tuesday Webinar", type: "Webinar", date: "Nov 28, 2025", venue: "Zoom", capacity: 500, registered: 312, revenueGoal: 50000, revenue: 58400, status: "Completed" },
  { id: 5, name: "Fall Donor Tour", type: "Donor Tour", date: "Oct 14, 2025", venue: "Program Sites", capacity: 20, registered: 18, revenueGoal: 0, revenue: 0, status: "Completed" },
];

const VOLUNTEERS = [
  { id: 1, name: "Sandra Kowalski", skills: ["Fundraising", "Communications"], hours: 142, availability: "Weekends", status: "Active", lastActive: "Mar 10", events: 8, email: "sandra@email.com" },
  { id: 2, name: "David Okonkwo", skills: ["IT", "Logistics"], hours: 98, availability: "Evenings", status: "Active", lastActive: "Mar 8", events: 6, email: "david@email.com" },
  { id: 3, name: "Maria Castellano", skills: ["Teaching", "Community Outreach"], hours: 210, availability: "Weekdays", status: "Active", lastActive: "Mar 11", events: 14, email: "maria@email.com" },
  { id: 4, name: "Tom Reeves", skills: ["Legal", "Admin"], hours: 44, availability: "Weekends", status: "Active", lastActive: "Feb 28", events: 3, email: "tom@email.com" },
  { id: 5, name: "Priya Sharma", skills: ["Medical", "Logistics"], hours: 76, availability: "Weekdays", status: "Inactive", lastActive: "Jan 15", events: 5, email: "priya@email.com" },
  { id: 6, name: "James Whitfield", skills: ["Communications", "Fundraising"], hours: 189, availability: "Weekends", status: "Active", lastActive: "Mar 9", events: 11, email: "james@email.com" },
];

const TASKS_DATA = [
  { id: 1, text: "Call Ellison Family — Q1 stewardship update", due: "Today", staff: "AM", priority: "high", done: false, category: "Follow-up", linked: "Donor" },
  { id: 2, text: "Finish Sunrise Foundation full proposal draft", due: "Today", staff: "JT", priority: "high", done: false, category: "Grant Writing", linked: "Grant" },
  { id: 3, text: "Send Spring Gala save-the-date to donor list", due: "Tomorrow", staff: "RK", priority: "medium", done: false, category: "Event", linked: "Event" },
  { id: 4, text: "Re-engagement email — James & Anita Holbrook", due: "Tomorrow", staff: "NP", priority: "medium", done: false, category: "Follow-up", linked: "Donor" },
  { id: 5, text: "Submit Local Community Foundation application", due: "Mar 28", staff: "RK", priority: "high", done: false, category: "Grant Writing", linked: "Grant" },
  { id: 6, text: "Prepare Q1 board report — financials", due: "Mar 18", staff: "AM", priority: "medium", done: true, category: "Reporting", linked: "Board" },
  { id: 7, text: "Confirm catering for Volunteer Appreciation Day", due: "Mar 15", staff: "LW", priority: "low", done: false, category: "Event", linked: "Event" },
  { id: 8, text: "Update Capital Campaign donor wall list", due: "Mar 20", staff: "NP", priority: "low", done: false, category: "Admin", linked: "Campaign" },
];

const EMAIL_TEMPLATES = [
  { id: 1, name: "New Donor Welcome", category: "Welcome", opens: 88, sent: 420, subject: "Welcome to our community, {name}!" },
  { id: 2, name: "Gift Acknowledgement", category: "Thank You", opens: 96, sent: 680, subject: "Thank you for your generous gift, {name}" },
  { id: 3, name: "Annual Appeal Letter", category: "Appeal", opens: 64, sent: 1240, subject: "{name}, your support changes everything" },
  { id: 4, name: "Event Invitation", category: "Event", opens: 78, sent: 380, subject: "You're invited — {event_name}" },
  { id: 5, name: "Lapsed Donor Re-engage", category: "Re-engagement", opens: 52, sent: 210, subject: "We miss you, {name}" },
  { id: 6, name: "Impact Report", category: "Stewardship", opens: 84, sent: 540, subject: "See what your gift accomplished this year" },
  { id: 7, name: "Grant Acknowledgement", category: "Grant", opens: 91, sent: 86, subject: "Confirming receipt of your grant — {org}" },
];

const SEQUENCES = [
  { id: 1, name: "New Donor Welcome Series", status: "Active", contacts: 48, emails: 5, openRate: 82, nextStep: "Day 7 — impact story" },
  { id: 2, name: "Annual Appeal Sequence", status: "Active", contacts: 312, emails: 4, openRate: 61, nextStep: "Day 5 — urgency close" },
  { id: 3, name: "Lapsed Donor Win-Back", status: "Active", contacts: 67, emails: 4, openRate: 54, nextStep: "Day 3 — personal note" },
  { id: 4, name: "Post-Event Thank You", status: "Paused", contacts: 88, emails: 3, openRate: 89, nextStep: "Paused" },
];

const raisedOverTime = [
  { month: "Sep", raised: 48, donors: 38 }, { month: "Oct", raised: 62, donors: 51 },
  { month: "Nov", raised: 58, donors: 44 }, { month: "Dec", raised: 142, donors: 189 },
  { month: "Jan", raised: 54, donors: 42 }, { month: "Feb", raised: 71, donors: 58 },
  { month: "Mar", raised: 84, donors: 67 },
];

const retentionData = [
  { year: "2022", rate: 58 }, { year: "2023", rate: 63 }, { year: "2024", rate: 69 }, { year: "2025", rate: 74 }, { year: "2026", rate: 78 },
];

const sourceData = [
  { source: "Events", amount: 142000, color: "#f472b6" },
  { source: "Online", amount: 98000, color: "#2dd4bf" },
  { source: "Direct Mail", amount: 76000, color: "#fbbf24" },
  { source: "Major Gifts", amount: 185000, color: "#c084fc" },
  { source: "Grants", amount: 270000, color: "#60a5fa" },
  { source: "Corporate", amount: 54000, color: "#4ade80" },
];

const volunteerHours = [
  { month: "Sep", hours: 280 }, { month: "Oct", hours: 340 }, { month: "Nov", hours: 620 },
  { month: "Dec", hours: 480 }, { month: "Jan", hours: 310 }, { month: "Feb", hours: 390 }, { month: "Mar", hours: 420 },
];

const STAGE_META = {
  Prospect: { color: "#6a8fa0", dim: "#6a8fa016" },
  Cultivation: { color: "#60a5fa", dim: "#60a5fa16" },
  Solicitation: { color: "#fbbf24", dim: "#fbbf2416" },
  Stewardship: { color: "#2dd4bf", dim: "#2dd4bf16" },
  Awarded: { color: "#4ade80", dim: "#4ade8016" },
  Lapsed: { color: "#fb7185", dim: "#fb718516" },
};

const TIER_META = {
  Major: { color: "#c084fc", dim: "#c084fc16" },
  "Mid-Level": { color: "#2dd4bf", dim: "#2dd4bf16" },
  General: { color: "#60a5fa", dim: "#60a5fa16" },
  Lapsed: { color: "#fb7185", dim: "#fb718516" },
};

const TYPE_META = {
  Individual: { color: "#2dd4bf", dim: "#2dd4bf16" },
  Foundation: { color: "#c084fc", dim: "#c084fc16" },
  Corporate: { color: "#fbbf24", dim: "#fbbf2416" },
  Government: { color: "#60a5fa", dim: "#60a5fa16" },
};

const PRIORITY_META = {
  high: { color: "#fb7185", dim: "#fb718516" },
  medium: { color: "#fbbf24", dim: "#fbbf2416" },
  low: { color: "#60a5fa", dim: "#60a5fa16" },
};

const GRANT_STAGE_META = {
  Prospect: { color: "#6a8fa0", dim: "#6a8fa016" },
  "LOI Submitted": { color: "#60a5fa", dim: "#60a5fa16" },
  "Full Proposal": { color: "#fbbf24", dim: "#fbbf2416" },
  "Under Review": { color: "#c084fc", dim: "#c084fc16" },
  Awarded: { color: "#4ade80", dim: "#4ade8016" },
  Rejected: { color: "#fb7185", dim: "#fb718516" },
};

const EVENT_TYPE_COLOR = {
  Gala: "#f472b6",
  "Community Day": "#2dd4bf",
  "Board Meeting": "#6a8fa0",
  Webinar: "#60a5fa",
  "Donor Tour": "#fbbf24",
};

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "donors", label: "Donors", icon: "◉", badge: 3 },
  { id: "grants", label: "Grants", icon: "◈" },
  { id: "campaigns", label: "Campaigns", icon: "◎" },
  { id: "events", label: "Events", icon: "▤" },
  { id: "volunteers", label: "Volunteers", icon: "⊞" },
  { id: "tasks", label: "Tasks", icon: "◻", badge: 5 },
  { id: "reports", label: "Reports", icon: "▲" },
  { id: "communications", label: "Comms", icon: "◫" },
  { id: "settings", label: "Settings", icon: "◎" },
];

const PAGE_TITLES = {
  dashboard: "Good morning, Alex 👋",
  donors: "Donors & Contacts",
  grants: "Grant Tracking",
  campaigns: "Campaigns",
  events: "Events",
  volunteers: "Volunteers",
  tasks: "Tasks",
  reports: "Reports",
  communications: "Communications",
  settings: "Settings",
};

const PAGE_SUB = {
  dashboard: "Here's your organization's impact at a glance today.",
  donors: "Your full donor database — relationships that fund your mission.",
  grants: "Track every grant from prospect to award and reporting.",
  campaigns: "Monitor fundraising campaigns and progress to goal.",
  events: "Galas, community days, webinars, and donor tours.",
  volunteers: "Your volunteer roster, hours, and assignments.",
  tasks: "Everything on the team's plate, organised by due date.",
  reports: "Board-ready analytics and year-end fundraising data.",
  communications: "Email templates and automated donor sequences.",
  settings: "Organization profile, staff, integrations, and billing.",
};

const STAFF_LIST = [
  { code: "AM", name: "Alex Martinez", role: "Executive Director", email: "alex@hope.org" },
  { code: "JT", name: "Jamie Torres", role: "Development Director", email: "jamie@hope.org" },
  { code: "RK", name: "Rachel Kim", role: "Program Manager", email: "rachel@hope.org" },
  { code: "NP", name: "Nina Patel", role: "Communications", email: "nina@hope.org" },
  { code: "LW", name: "Leo Walsh", role: "Volunteer Coordinator", email: "leo@hope.org" },
];

const INTEGRATIONS = [
  { name: "Mailchimp", icon: "📧", status: "Connected", colorKey: "green" },
  { name: "QuickBooks", icon: "📊", status: "Connected", colorKey: "green" },
  { name: "Stripe Donations", icon: "💳", status: "Not Connected", colorKey: "muted" },
  { name: "Salesforce NPSP", icon: "☁️", status: "Not Connected", colorKey: "muted" },
  { name: "Google Workspace", icon: "🔷", status: "Connected", colorKey: "green" },
  { name: "Bloomerang", icon: "🌸", status: "Not Connected", colorKey: "muted" },
];

const STAFF_PERF = [
  { code: "AM", donors: 142, raised: "$284K", grants: 2, ret: "81%" },
  { code: "JT", donors: 98, raised: "$310K", grants: 3, ret: "76%" },
  { code: "RK", donors: 67, raised: "$142K", grants: 1, ret: "69%" },
  { code: "NP", donors: 54, raised: "$58K", grants: 0, ret: "64%" },
  { code: "LW", donors: 51, raised: "$31K", grants: 0, ret: "72%" },
];

const UPCOMING_DEADLINES = [
  { label: "Sunrise Foundation", date: "Apr 15", type: "Grant", colorKey: "purple" },
  { label: "Spring Gala", date: "Apr 19", type: "Event", colorKey: "pink" },
  { label: "W.K. Kellogg LOI", date: "Apr 1", type: "Grant", colorKey: "purple" },
  { label: "Local Comm. Found.", date: "Mar 28", type: "Grant", colorKey: "amber" },
  { label: "Board Meeting Q1", date: "Mar 18", type: "Event", colorKey: "blue" },
];

const NOTIFICATIONS = [
  { text: "Sunrise Foundation proposal due in 4 days", time: "Now", dotKey: "red" },
  { text: "Spring Gala — 76 spots remaining", time: "2h ago", dotKey: "amber" },
  { text: "New major donor prospect added", time: "Today", dotKey: "green" },
];

const THEME_OPTIONS = [
  { id: "dark", label: "Dark", icon: "🌙" },
  { id: "light", label: "Light", icon: "☀️" },
  { id: "ocean", label: "Ocean", icon: "🌊" },
  { id: "sunset", label: "Sunset", icon: "🌅" },
];

module.exports = {
  THEMES,
  THEME_OPTIONS,
  STAFF_COLOR,
  DONORS,
  GRANTS,
  CAMPAIGNS,
  EVENTS,
  VOLUNTEERS,
  TASKS_DATA,
  EMAIL_TEMPLATES,
  SEQUENCES,
  raisedOverTime,
  retentionData,
  sourceData,
  volunteerHours,
  STAGE_META,
  TIER_META,
  TYPE_META,
  PRIORITY_META,
  GRANT_STAGE_META,
  EVENT_TYPE_COLOR,
  NAV,
  PAGE_TITLES,
  PAGE_SUB,
  STAFF_LIST,
  INTEGRATIONS,
  STAFF_PERF,
  UPCOMING_DEADLINES,
  NOTIFICATIONS,
};
