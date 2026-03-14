# HopeCRM — Nonprofit / Charity CRM Template

A modern CRM for nonprofits and charities built with Next.js. Manage donors, grants, campaigns, events, volunteers, tasks, reports, and communications from one dashboard. No database or backend required — customize everything by editing a single root data file.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the CRM.

## Customize Your CRM

All data lives in **`data.js`** at the project root. Edit this single file to create your own HopeCRM — no store, Redux, or API needed. Each page imports from this data via `app/admin/data.js`, which re-exports from `data.js` only.

### Data Structure

| Section | Description |
|--------|-------------|
| `THEMES` | Dark/light color palettes |
| `STAFF_COLOR` | Staff code → color for avatars |
| `DONORS` | Donor/contact records (type, tier, stage, LTV, etc.) |
| `GRANTS` | Grant pipeline (funder, amount, deadline, stage, program) |
| `CAMPAIGNS` | Fundraising campaigns (goal, raised, donors, status) |
| `EVENTS` | Events (galas, webinars, board meetings, etc.) |
| `VOLUNTEERS` | Volunteer roster, hours, skills, availability |
| `TASKS_DATA` | To-do items with due date, priority, staff, category |
| `EMAIL_TEMPLATES` | Email templates (category, opens, sent, subject) |
| `SEQUENCES` | Automated email sequences |
| `raisedOverTime` | Monthly fundraising chart data |
| `retentionData` | Donor retention by year |
| `sourceData` | Revenue by source (pie/bar charts) |
| `volunteerHours` | Volunteer hours by month |
| `STAGE_META` / `TIER_META` / `TYPE_META` | Donor stage/tier/type colors |
| `PRIORITY_META` / `GRANT_STAGE_META` / `EVENT_TYPE_COLOR` | UI metadata |
| `NAV` | Sidebar navigation items |
| `PAGE_TITLES` / `PAGE_SUB` | Page titles and subtitles |
| `STAFF_LIST` / `INTEGRATIONS` / `STAFF_PERF` | Settings and reports data |
| `UPCOMING_DEADLINES` / `NOTIFICATIONS` | Dashboard and header data |

### Example: Add a New Donor

```javascript
// In data.js, add to the DONORS array:
{
  id: 9,
  name: "New Foundation Inc",
  type: "Foundation",
  tier: "Major",
  stage: "Prospect",
  ltv: 0,
  lastGift: 0,
  lastDate: "—",
  source: "Website",
  staff: "AM",
  email: "contact@newfoundation.org",
  phone: "+1 (555) 000-0000",
  notes: "Initial inquiry.",
  tags: ["New", "Grant"],
}
```

### Example: Add a Grant

```javascript
// In data.js, add to the GRANTS array:
{
  id: 7,
  funder: "New Foundation",
  amount: 50000,
  deadline: "Jun 1",
  stage: "Prospect",
  program: "Education",
  staff: "JT",
  reportDue: "—",
  submitted: "—",
  notes: "Planning to submit LOI.",
}
```

## Pages

- **Dashboard** — Annual goal, KPIs, fundraising over time, revenue by source, active campaigns, due today tasks, upcoming deadlines, top donors
- **Donors** — List/kanban view, filters by tier and stage, donor profile panel, add donor modal
- **Grants** — Grant list with stage filters, expandable notes, add grant modal
- **Campaigns** — Campaign cards with progress bars, goal/raised/donors
- **Events** — Event list with type, date, capacity, revenue, status
- **Volunteers** — Volunteer cards with hours, skills, availability; detail panel
- **Tasks** — Tasks by due date (Today, Tomorrow, This Week), filters, new task modal
- **Reports** — Period selector, KPIs, fundraising over time, retention, source attribution, volunteer hours, staff performance table
- **Communications** — Email templates and sequences tabs; template preview panel
- **Settings** — Organization profile, staff & roles, integrations, notifications, billing

## AI Customize

Click the ✨ button in the header to open the AI Customize sidebar. Describe your organization, donors, and data in natural language. The AI can generate a custom `data.js` file. You can:

- **Download ZIP** — Get the full project as a zip with your custom data
- **Save to File** — Update `data.js` locally (requires write access; works in dev)

Set `OPENROUTER_API_KEY` in `.env.local` to use the AI feature.

## Layout

The app uses a single **Layout** (`app/admin/Layout.jsx`): sidebar on the left (HopeCRM branding, nav from `data.js`, annual goal widget, dark/light toggle), main content on the right with header (breadcrumb, search, notifications, AI button, settings, user avatar). The AI chatbot sidebar is included and unchanged.

## Tech Stack

- Next.js (Pages Router)
- React
- Recharts
- Root `data.js` (single source of truth); `app/admin/data.js` re-exports from it only

## License

MIT
