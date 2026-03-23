"use client";

/**
 * ContentOS — Social Content Scheduler CRM
 * Stack: React + Framer Motion + Tailwind CSS
 * Drop into: app/page.jsx (Next.js 13+)
 * Install:   npm install framer-motion
 * Font:      Add to layout.jsx → import { Cabinet_Grotesk } from "next/font/google"
 *            or paste into globals.css:
 *            @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
 */

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const mkIcon =
	(d, s = 14) =>
	() => (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			width={s}
			height={s}
			className="shrink-0"
		>
			<path d={d} />
		</svg>
	);
const IgIcon = mkIcon(
	"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
);
const YtIcon = mkIcon(
	"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
);
const XIcon = mkIcon(
	"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.857L1.209 2.25H8.101l4.261 5.632 5.882-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z",
	13,
);
const LiIcon = mkIcon(
	"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
);
const TkIcon = mkIcon(
	"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z",
	13,
);
const ThIcon = mkIcon(
	"M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.378-.887h-.018c-.852 0-1.676.234-2.323.66L7.17 9.324c.86-.579 2.087-.899 3.458-.899h.023c3.024.019 4.842 1.979 4.842 5.207v.023c0 .069-.003.14-.005.21.857.345 1.57.861 2.094 1.533.81 1.038 1.235 2.403 1.132 3.801-.112 1.518-.752 2.914-1.8 3.93C15.606 23.293 14.015 24 12.186 24z",
	13,
);
const PiIcon = mkIcon(
	"M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.009 12.017.009z",
	13,
);
const FbIcon = mkIcon(
	"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
);
const EmojiIcon =
	(emoji, s = 13) =>
	() =>
		<span style={{ fontSize: s, lineHeight: 1 }}>{emoji}</span>;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PLATFORMS = {
	instagram: {
		label: "Instagram",
		hex: "#E1306C",
		bg: "#fdf0f5",
		Icon: IgIcon,
	},
	youtube: { label: "YouTube", hex: "#FF0000", bg: "#fff0f0", Icon: YtIcon },
	twitter: { label: "Twitter/X", hex: "#000000", bg: "#f3f3f3", Icon: XIcon },
	linkedin: { label: "LinkedIn", hex: "#0A66C2", bg: "#eef4fb", Icon: LiIcon },
	tiktok: { label: "TikTok", hex: "#010101", bg: "#f2f2f2", Icon: TkIcon },
	threads: { label: "Threads", hex: "#101010", bg: "#f5f5f5", Icon: ThIcon },
	pinterest: {
		label: "Pinterest",
		hex: "#E60023",
		bg: "#fff0f0",
		Icon: PiIcon,
	},
	facebook: { label: "Facebook", hex: "#1877F2", bg: "#eef4ff", Icon: FbIcon },
	reddit: { label: "Reddit", hex: "#FF4500", bg: "#fff4ef", Icon: EmojiIcon("👽") },
	discord: { label: "Discord", hex: "#5865F2", bg: "#eef0ff", Icon: EmojiIcon("💬") },
	telegram: { label: "Telegram", hex: "#229ED9", bg: "#eef8ff", Icon: EmojiIcon("✈️") },
	snapchat: { label: "Snapchat", hex: "#FFFC00", bg: "#fffef0", Icon: EmojiIcon("👻") },
	whatsapp: { label: "WhatsApp", hex: "#25D366", bg: "#eefdf4", Icon: EmojiIcon("🟢") },
	medium: { label: "Medium", hex: "#12100E", bg: "#f3f3f3", Icon: EmojiIcon("✍️") },
	substack: { label: "Substack", hex: "#FF6719", bg: "#fff4ed", Icon: EmojiIcon("📮") },
	quora: { label: "Quora", hex: "#B92B27", bg: "#fff1f1", Icon: EmojiIcon("❓") },
	twitch: { label: "Twitch", hex: "#9146FF", bg: "#f5efff", Icon: EmojiIcon("🎮") },
	kick: { label: "Kick", hex: "#53FC18", bg: "#f3ffec", Icon: EmojiIcon("🟩") },
	vimeo: { label: "Vimeo", hex: "#1AB7EA", bg: "#effbff", Icon: EmojiIcon("🎬") },
	dribbble: { label: "Dribbble", hex: "#EA4C89", bg: "#fff0f6", Icon: EmojiIcon("🏀") },
	behance: { label: "Behance", hex: "#1769FF", bg: "#eef4ff", Icon: EmojiIcon("🎨") },
	github: { label: "GitHub", hex: "#181717", bg: "#f3f3f3", Icon: EmojiIcon("🐙") },
	producthunt: { label: "Product Hunt", hex: "#DA552F", bg: "#fff3ef", Icon: EmojiIcon("🚀") },
	slack: { label: "Slack", hex: "#4A154B", bg: "#f9f0fa", Icon: EmojiIcon("💼") },
	wechat: { label: "WeChat", hex: "#07C160", bg: "#effdf5", Icon: EmojiIcon("💚") },
	line: { label: "LINE", hex: "#06C755", bg: "#effdf4", Icon: EmojiIcon("💬") },
	clubhouse: { label: "Clubhouse", hex: "#F1EFE4", bg: "#f7f6ef", Icon: EmojiIcon("🎙️") },
	mastodon: { label: "Mastodon", hex: "#6364FF", bg: "#efefff", Icon: EmojiIcon("🐘") },
};
const PL = Object.entries(PLATFORMS).map(([id, p]) => ({ id, ...p }));
const PLATFORM_INTEGRATION_INFO = {
	default: {
		method: "OAuth 2.0",
		time: "5-10 min",
		scopes: ["Read profile", "Publish content", "Read insights"],
		steps: [
			"Open platform developer settings",
			"Create an app and copy API keys",
			"Set callback URL from ContentOS",
			"Authorize and run test publish",
		],
	},
	instagram: {
		method: "Meta OAuth + Business Account",
		time: "10-15 min",
		scopes: ["instagram_basic", "instagram_content_publish", "pages_show_list"],
		steps: [
			"Connect Instagram to a Facebook Page",
			"Create app in Meta for Developers",
			"Enable Instagram Graph API permissions",
			"Authorize and verify with a test post",
		],
	},
	youtube: {
		method: "Google OAuth 2.0",
		time: "8-12 min",
		scopes: ["youtube.upload", "youtube.readonly"],
		steps: [
			"Create Google Cloud project",
			"Enable YouTube Data API v3",
			"Configure OAuth consent screen",
			"Add callback URL and authorize account",
		],
	},
	linkedin: {
		method: "LinkedIn OAuth 2.0",
		time: "8-12 min",
		scopes: ["w_member_social", "r_liteprofile"],
		steps: [
			"Create LinkedIn developer app",
			"Enable Sign In and Share products",
			"Configure redirect URL",
			"Authorize member profile",
		],
	},
	twitter: {
		method: "X API OAuth 2.0",
		time: "10-15 min",
		scopes: ["tweet.read", "tweet.write", "users.read"],
		steps: [
			"Create app in X developer portal",
			"Generate client id/secret",
			"Add callback URL",
			"Authorize and post test tweet",
		],
	},
	tiktok: {
		method: "TikTok Login Kit OAuth",
		time: "10-15 min",
		scopes: ["user.info.basic", "video.publish"],
		steps: [
			"Create app in TikTok for Developers",
			"Enable Login Kit and Content Posting",
			"Add redirect URI",
			"Authorize and validate publish access",
		],
	},
};

const STATUSES = {
	idea: { label: "Idea", color: "#7c3aed", bg: "#f5f3ff", dot: "#8b5cf6" },
	draft: { label: "Draft", color: "#d97706", bg: "#fffbeb", dot: "#f59e0b" },
	scheduled: {
		label: "Scheduled",
		color: "#2563eb",
		bg: "#eff6ff",
		dot: "#3b82f6",
	},
	published: {
		label: "Published",
		color: "#16a34a",
		bg: "#f0fdf4",
		dot: "#22c55e",
	},
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const PROJECTS = [
	{ id: 1, name: "ihatereading.in", emoji: "📖", color: "#e8590c" },
	{ id: 2, name: "scrapefast.dev", emoji: "🕷️", color: "#6366f1" },
	{ id: 3, name: "gettemplate.site", emoji: "🎨", color: "#0ea5e9" },
	{ id: 4, name: "buildsaas.dev", emoji: "🚀", color: "#22c55e" },
];

const ROLES = ["Owner", "Editor", "Writer", "Viewer"];
const ROLE_PERMS = {
	Owner: ["Full access", "Manage team", "Connect platforms", "Delete content"],
	Editor: ["Create & edit content", "Schedule posts", "View analytics"],
	Writer: ["Create drafts", "Edit own posts"],
	Viewer: ["View content only"],
};
const RBAC = [
	{ perm: "View content", roles: ["Owner", "Editor", "Writer", "Viewer"] },
	{ perm: "Create drafts", roles: ["Owner", "Editor", "Writer"] },
	{ perm: "Edit any post", roles: ["Owner", "Editor"] },
	{ perm: "Schedule posts", roles: ["Owner", "Editor"] },
	{ perm: "Delete content", roles: ["Owner"] },
	{ perm: "Connect platforms", roles: ["Owner"] },
	{ perm: "Manage team", roles: ["Owner"] },
	{ perm: "View analytics", roles: ["Owner", "Editor", "Writer"] },
];

const IDEAS_DB = {
	nextjs: [
		"5 Next.js 15 features nobody talks about",
		"Why I switched from CRA to Next.js",
		"App Router: a real-world guide",
		"Server vs Client Components explained",
		"Next.js + Supabase full stack in 30 mins",
		"Next.js performance secrets for 2026",
	],
	react: [
		"React hooks you didn't know existed",
		"Stop overusing useEffect — here's why",
		"React 19 new features breakdown",
		"Custom hooks I use in every project",
		"React performance tips for 2026",
		"State management in 2026: the honest guide",
	],
	saas: [
		"Validate your SaaS idea in 48 hours",
		"Pricing your SaaS: $0 to $10k MRR",
		"5 SaaS mistakes I made as indie founder",
		"Indian developer's guide to selling SaaS",
		"Building in public: does it actually work?",
		"From idea to paying customers in 30 days",
	],
	scraping: [
		"Web scraping in 2026: what still works",
		"Puppeteer vs Playwright vs Cheerio",
		"How I built a scraping API in one file",
		"Scraping without getting blocked",
		"5 use cases for web scraping as a dev",
		"Open source scraping tools for 2026",
	],
};

const SEED_CONTENT = [
	{
		id: 1,
		title: "Morning routine for devs",
		platform: "instagram",
		type: "reel",
		status: "scheduled",
		date: "2026-03-24",
		time: "09:00",
		tags: ["lifestyle", "dev"],
		caption: "5am club but make it productive ☕",
		thumb: "🌅",
		project: 1,
	},
	{
		id: 2,
		title: "Build a SaaS in 7 days",
		platform: "youtube",
		type: "short",
		status: "scheduled",
		date: "2026-03-24",
		time: "14:00",
		tags: ["tutorial", "saas"],
		caption: "Full breakdown from idea to launch",
		thumb: "🚀",
		project: 1,
	},
	{
		id: 3,
		title: "Hono.js vs Express benchmark",
		platform: "twitter",
		type: "post",
		status: "draft",
		date: "2026-03-25",
		time: "11:00",
		tags: ["nodejs", "perf"],
		caption: "The numbers don't lie 🔥",
		thumb: "⚡",
		project: 2,
	},
	{
		id: 4,
		title: "Indian dev tools roundup",
		platform: "youtube",
		type: "short",
		status: "published",
		date: "2026-03-20",
		time: "10:00",
		tags: ["india", "tools"],
		caption: "Made in India for Indian devs",
		thumb: "🏆",
		project: 1,
	},
	{
		id: 5,
		title: "Framer Motion crash course",
		platform: "instagram",
		type: "reel",
		status: "scheduled",
		date: "2026-03-26",
		time: "18:00",
		tags: ["animation", "react"],
		caption: "Animations that actually make sense",
		thumb: "🎨",
		project: 1,
	},
	{
		id: 6,
		title: "How I got 10k users — no ads",
		platform: "linkedin",
		type: "post",
		status: "draft",
		date: "2026-03-27",
		time: "09:00",
		tags: ["growth", "indie"],
		caption: "Organic only. Here's the breakdown",
		thumb: "📈",
		project: 1,
	},
	{
		id: 7,
		title: "Scrapefast — one Hono.js file",
		platform: "youtube",
		type: "short",
		status: "idea",
		date: "2026-03-29",
		time: "15:00",
		tags: ["scraping", "api"],
		caption: "Clone. Deploy. Scrape.",
		thumb: "🕷️",
		project: 2,
	},
	{
		id: 8,
		title: "RSC explained finally",
		platform: "threads",
		type: "post",
		status: "scheduled",
		date: "2026-03-30",
		time: "10:00",
		tags: ["react", "nextjs"],
		caption: "Finally making sense of RSC",
		thumb: "⚛️",
		project: 1,
	},
	{
		id: 9,
		title: "Firebase vs Supabase 2026",
		platform: "instagram",
		type: "post",
		status: "draft",
		date: "2026-04-02",
		time: "09:00",
		tags: ["database", "infra"],
		caption: "Pick the right one for your SaaS",
		thumb: "🗄️",
		project: 3,
	},
	{
		id: 10,
		title: "₹0 to ₹10k MRR playbook",
		platform: "linkedin",
		type: "post",
		status: "idea",
		date: "2026-04-01",
		time: "11:00",
		tags: ["money", "saas"],
		caption: "Real numbers, real steps",
		thumb: "💰",
		project: 4,
	},
	{
		id: 11,
		title: "Next.js 15 new features",
		platform: "youtube",
		type: "short",
		status: "scheduled",
		date: "2026-04-03",
		time: "14:00",
		tags: ["nextjs", "release"],
		caption: "Everything new in one short",
		thumb: "✨",
		project: 4,
	},
	{
		id: 12,
		title: "Tailwind tips nobody shows you",
		platform: "tiktok",
		type: "short",
		status: "scheduled",
		date: "2026-03-28",
		time: "12:00",
		tags: ["css", "tailwind"],
		caption: "15 utility patterns I use daily",
		thumb: "🎯",
		project: 3,
	},
];

const SEED_TEAM = [
	{
		id: 1,
		name: "Shrey",
		role: "Owner",
		avatar: "S",
		email: "shrey@ihatereading.in",
		active: true,
	},
	{
		id: 2,
		name: "Priya Sharma",
		role: "Editor",
		avatar: "P",
		email: "priya@ihatereading.in",
		active: true,
	},
	{
		id: 3,
		name: "Rahul Verma",
		role: "Writer",
		avatar: "R",
		email: "rahul@ihatereading.in",
		active: true,
	},
	{
		id: 4,
		name: "Anjali Singh",
		role: "Viewer",
		avatar: "A",
		email: "anjali@ihatereading.in",
		active: false,
	},
];

const CHAR_LIMITS = {
	instagram: 2200,
	youtube: 500,
	twitter: 280,
	linkedin: 3000,
	tiktok: 2200,
	threads: 500,
	pinterest: 500,
	facebook: 63206,
};
const uid = () => Date.now() + Math.floor(Math.random() * 9999);

// ─── MICRO COMPONENTS ─────────────────────────────────────────────────────────
function PBadge({ platform }) {
	const p = PLATFORMS[platform];
	if (!p) return null;
	return (
		<span
			className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded"
			style={{ background: p.bg, color: p.hex }}
		>
			<p.Icon />
			{p.label}
		</span>
	);
}

function SBadge({ status }) {
	const s = STATUSES[status];
	if (!s) return null;
	return (
		<span
			className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded"
			style={{ background: s.bg, color: s.color }}
		>
			<span
				className="w-1.5 h-1.5 rounded-full shrink-0"
				style={{ background: s.dot }}
			/>
			{s.label}
		</span>
	);
}

function Spinner({ color = "#e8590c" }) {
	return (
		<motion.div
			animate={{ rotate: 360 }}
			transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
			className="w-7 h-7 rounded-full border-2 border-gray-100 mx-auto"
			style={{ borderTopColor: color }}
		/>
	);
}

// ─── CONTENT CARD ─────────────────────────────────────────────────────────────
function ContentCard({ item, onClick, compact = false }) {
	const p = PLATFORMS[item.platform] || {};
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.97 }}
			whileHover={{ y: -2 }}
			onClick={() => onClick(item)}
			style={{ borderLeft: `3px solid ${p.hex || "#ccc"}` }}
			className="bg-white border border-gray-100 rounded-xl flex gap-3 p-3 cursor-pointer hover:border-gray-200 hover:shadow-sm transition-all"
		>
			<div
				className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
				style={{ background: p.bg || "#f5f3ef" }}
			>
				{item.thumb}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex flex-wrap gap-1 mb-1">
					<PBadge platform={item.platform} />
					<SBadge status={item.status} />
				</div>
				<p className="text-[13px] font-semibold truncate tracking-tight">
					{item.title}
				</p>
				{!compact && (
					<p className="text-[11px] text-gray-400 truncate mb-1">
						{item.caption}
					</p>
				)}
				<div className="flex gap-3">
					<span className="text-[10px] font-mono text-gray-400">
						📅 {item.date} · {item.time}
					</span>
					<span className="text-[10px] font-mono text-gray-400">
						{item.type === "reel" || item.type === "short" ? "🎬" : "🖼️"}{" "}
						{item.type}
					</span>
				</div>
				{!compact && item.tags.length > 0 && (
					<div className="flex gap-1 flex-wrap mt-1">
						{item.tags.map((t) => (
							<span
								key={t}
								className="text-[9px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
							>
								#{t}
							</span>
						))}
					</div>
				)}
			</div>
		</motion.div>
	);
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarView({ items, onSelect }) {
	const today = new Date();
	const [cur, setCur] = useState({
		y: today.getFullYear(),
		m: today.getMonth(),
	});
	const dim = new Date(cur.y, cur.m + 1, 0).getDate();
	const fd = new Date(cur.y, cur.m, 1).getDay();
	const byDay = useMemo(() => {
		const map = {};
		items.forEach((i) => {
			if (!map[i.date]) map[i.date] = [];
			map[i.date].push(i);
		});
		return map;
	}, [items]);
	const prev = () =>
		setCur((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { ...c, m: c.m - 1 }));
	const next = () =>
		setCur((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { ...c, m: c.m + 1 }));
	const cells = [
		...Array(fd).fill(null),
		...Array.from({ length: dim }, (_, i) => i + 1),
	];

	return (
		<div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
			<div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
				<button
					onClick={prev}
					className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-base"
				>
					‹
				</button>
				<h2 className="text-[15px] font-bold tracking-tight">
					{MONTHS[cur.m]} {cur.y}
				</h2>
				<button
					onClick={next}
					className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-base"
				>
					›
				</button>
			</div>
			<div className="grid grid-cols-7 border-b border-gray-100">
				{DAYS.map((d) => (
					<div
						key={d}
						className="text-center py-2 text-[9px] font-mono uppercase tracking-widest text-gray-400"
					>
						{d}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-px bg-gray-100">
				{cells.map((day, i) => {
					if (!day)
						return <div key={`e${i}`} className="bg-gray-50 min-h-[80px]" />;
					const ds = `${cur.y}-${String(cur.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
					const di = byDay[ds] || [];
					const isT =
						day === today.getDate() &&
						cur.m === today.getMonth() &&
						cur.y === today.getFullYear();
					return (
						<div key={day} className="bg-white p-1.5 min-h-[80px]">
							<div
								className={`inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold mb-1 ${isT ? "bg-orange-500 text-white rounded-full" : di.length ? "text-gray-800" : "text-gray-300"}`}
							>
								{day}
							</div>
							<div className="flex flex-col gap-px">
								{di.slice(0, 3).map((it) => (
									<div
										key={it.id}
										onClick={() => onSelect(it)}
										className="flex items-center gap-1 bg-gray-50 rounded px-1 py-0.5 cursor-pointer hover:bg-gray-100 overflow-hidden"
										style={{
											borderLeft: `2px solid ${PLATFORMS[it.platform]?.hex || "#ccc"}`,
										}}
									>
										<span className="text-[9px] shrink-0">{it.thumb}</span>
										<span className="text-[9px] font-semibold text-gray-500 truncate">
											{it.title}
										</span>
									</div>
								))}
								{di.length > 3 && (
									<span className="text-[8px] font-mono text-gray-400">
										+{di.length - 3}
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// ─── KANBAN ───────────────────────────────────────────────────────────────────
function KanbanView({ items, onSelect, onStatusChange }) {
	const [dragging, setDragging] = useState(null);
	const [over, setOver] = useState(null);
	const cols = useMemo(() => {
		const m = { idea: [], draft: [], scheduled: [], published: [] };
		items.forEach((i) => {
			if (m[i.status]) m[i.status].push(i);
		});
		return m;
	}, [items]);
	const drop = (col) => {
		if (dragging) onStatusChange(dragging, col);
		setDragging(null);
		setOver(null);
	};

	return (
		<div className="grid grid-cols-4 gap-3 items-start">
			{Object.entries(STATUSES).map(([col, s]) => (
				<div
					key={col}
					onDragOver={(e) => {
						e.preventDefault();
						setOver(col);
					}}
					onDrop={() => drop(col)}
					onDragLeave={() => setOver(null)}
					className={`bg-white border rounded-xl overflow-hidden transition-colors ${over === col ? "border-orange-400 shadow-md shadow-orange-100" : "border-gray-100"}`}
				>
					<div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 bg-gray-50">
						<span
							className="w-2 h-2 rounded-full shrink-0"
							style={{ background: s.dot }}
						/>
						<span className="text-[12px] font-semibold flex-1 tracking-tight">
							{s.label}
						</span>
						<span className="text-[9px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
							{cols[col].length}
						</span>
					</div>
					<div className="p-2 flex flex-col gap-2 min-h-[60px]">
						<AnimatePresence>
							{cols[col].map((it) => {
								const p = PLATFORMS[it.platform] || {};
								return (
									<motion.div
										key={it.id}
										layout
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										whileHover={{
											y: -2,
											boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
										}}
										draggable
										onDragStart={() => setDragging(it.id)}
										onClick={() => onSelect(it)}
										className="bg-white border border-gray-100 rounded-lg p-2.5 cursor-grab hover:border-gray-200 transition-all"
										style={{ borderTop: `2px solid ${p.hex || "#ccc"}` }}
									>
										<div className="flex items-center gap-2 mb-2">
											<span className="text-base">{it.thumb}</span>
											<PBadge platform={it.platform} />
										</div>
										<p className="text-[12px] font-semibold tracking-tight mb-1 leading-tight">
											{it.title}
										</p>
										<p className="text-[10.5px] text-gray-400 mb-2 line-clamp-2 leading-relaxed">
											{it.caption}
										</p>
										<div className="flex justify-between">
											<span className="text-[9.5px] font-mono text-gray-400">
												📅 {it.date}
											</span>
											<span className="text-[9.5px] font-mono text-gray-400">
												{it.type}
											</span>
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
						{cols[col].length === 0 && (
							<div className="text-center py-5 text-[11px] text-gray-300 border border-dashed border-gray-200 rounded-lg">
								Drop here
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

// ─── COMPOSER ─────────────────────────────────────────────────────────────────
function ComposerView({ onSave, activeProject }) {
	const proj = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];
	const [form, setForm] = useState({
		title: "",
		caption: "",
		platform: "instagram",
		type: "post",
		status: "draft",
		date: new Date().toISOString().split("T")[0],
		time: "10:00",
		tags: [],
		thumb: "✏️",
		tagInput: "",
	});
	const [saved, setSaved] = useState(false);
	const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
	const addTag = () => {
		if (form.tagInput.trim()) {
			set("tags", [...form.tags, form.tagInput.trim()]);
			set("tagInput", "");
		}
	};
	const removeTag = (i) =>
		set(
			"tags",
			form.tags.filter((_, j) => j !== i),
		);
	const p = PLATFORMS[form.platform] || {};
	const lim = CHAR_LIMITS[form.platform] || 500;
	const pct = Math.min(form.caption.length / lim, 1);
	const barColor = pct > 0.9 ? "#ef4444" : p.hex || "#e8590c";
	const handleSave = () => {
		if (!form.title) return;
		onSave({ ...form, id: uid(), project: activeProject });
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	return (
		<div className="grid grid-cols-[1fr_300px] gap-4 items-start">
			{/* Editor */}
			<div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
				<h3 className="text-[13px] font-bold tracking-tight">Compose post</h3>

				<label className="flex flex-col gap-1">
					<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
						Title
					</span>
					<input
						className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
						placeholder="Internal title for this post..."
						value={form.title}
						onChange={(e) => set("title", e.target.value)}
					/>
				</label>

				<div className="grid grid-cols-2 gap-3">
					{[
						["Platform", "platform", PL.map((p) => [p.id, p.label])],
						[
							"Type",
							"type",
							[
								["post", "Post"],
								["reel", "Reel"],
								["short", "Short"],
								["story", "Story"],
							],
						],
					].map(([lbl, key, opts]) => (
						<label key={key} className="flex flex-col gap-1">
							<MotionDropdown
								label={lbl}
								value={form[key]}
								onChange={(v) => set(key, v)}
								options={opts.map(([v, l]) => ({ value: v, label: l }))}
							/>
						</label>
					))}
				</div>

				<label className="flex flex-col gap-1">
					<span className="flex justify-between text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
						<span>Caption</span>
						<span style={{ color: pct > 0.9 ? "#ef4444" : undefined }}>
							{form.caption.length}/{lim}
						</span>
					</span>
					<textarea
						className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors resize-none"
						rows={5}
						placeholder={`Write your ${p.label || "platform"} caption...`}
						value={form.caption}
						onChange={(e) => set("caption", e.target.value)}
					/>
					<div className="h-[3px] bg-gray-100 rounded-full mt-1">
						<div
							className="h-full rounded-full transition-all duration-200"
							style={{
								width: `${Math.round(pct * 100)}%`,
								background: barColor,
							}}
						/>
					</div>
				</label>

				<div className="flex flex-col gap-1">
					<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
						Hashtags
					</span>
					<div className="flex gap-2">
						<input
							className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
							placeholder="Add tag..."
							value={form.tagInput}
							onChange={(e) => set("tagInput", e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && addTag()}
						/>
						<button
							onClick={addTag}
							className="border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
						>
							+ Add
						</button>
					</div>
					{form.tags.length > 0 && (
						<div className="flex flex-wrap gap-1.5 mt-1">
							{form.tags.map((t, i) => (
								<span
									key={t}
									onClick={() => removeTag(i)}
									className="text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded cursor-pointer hover:bg-red-50 hover:text-red-400 transition-colors"
								>
									#{t} ×
								</span>
							))}
						</div>
					)}
				</div>

				<div className="grid grid-cols-3 gap-3">
					<label className="flex flex-col gap-1">
						<MotionDropdown
							label="Status"
							value={form.status}
							onChange={(v) => set("status", v)}
							options={Object.keys(STATUSES).map((s) => ({
								value: s,
								label: STATUSES[s].label,
							}))}
						/>
					</label>
					<label className="flex flex-col gap-1">
						<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
							Date
						</span>
						<input
							type="date"
							className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
							value={form.date}
							onChange={(e) => set("date", e.target.value)}
						/>
					</label>
					<label className="flex flex-col gap-1">
						<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
							Time
						</span>
						<input
							type="time"
							className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
							value={form.time}
							onChange={(e) => set("time", e.target.value)}
						/>
					</label>
				</div>

				<motion.button
					onClick={handleSave}
					whileTap={{ scale: 0.98 }}
					className="w-full py-3 text-white text-[13px] font-semibold rounded-lg transition-colors"
					style={{ background: saved ? "#16a34a" : p.hex || "#e8590c" }}
				>
					{saved
						? "✓ Saved to content!"
						: `Save to ${STATUSES[form.status]?.label}`}
				</motion.button>
			</div>

			{/* Preview */}
			<div className="flex flex-col gap-3">
				<h3 className="text-[13px] font-bold tracking-tight">Preview</h3>
				<div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
					<div
						className="flex items-center gap-2 px-3 py-2.5"
						style={{ borderBottom: `2px solid ${p.hex || "#ccc"}` }}
					>
						<div
							className="w-7 h-7 rounded-lg flex items-center justify-center"
							style={{ background: p.bg, color: p.hex }}
						>
							{p.Icon && <p.Icon />}
						</div>
						<div>
							<div className="text-[11px] font-semibold">your_handle</div>
							<div className="text-[9.5px] text-gray-400">Just now</div>
						</div>
						<span className="ml-auto text-gray-300 text-sm">···</span>
					</div>
					<div
						className="flex flex-col items-center justify-center py-10 gap-2"
						style={{ background: `${p.bg || "#f5f3ef"}44` }}
					>
						<span className="text-4xl">{form.thumb || "📸"}</span>
						<span className="text-[10px] font-mono text-gray-400">
							{form.type === "reel" || form.type === "short" ? "🎬" : "🖼️"}{" "}
							{form.type}
						</span>
					</div>
					<div className="px-3 py-2.5 text-[12px] leading-relaxed">
						<span className="font-semibold">your_handle </span>
						<span className="text-gray-500">
							{form.caption || (
								<span className="text-gray-300">
									Your caption will appear here...
								</span>
							)}
						</span>
						{form.tags.length > 0 && (
							<div className="mt-1.5">
								{form.tags.map((t) => (
									<span
										key={t}
										className="text-[11px] mr-1"
										style={{ color: p.hex }}
									>
										#{t}
									</span>
								))}
							</div>
						)}
					</div>
					<div className="flex items-center gap-3 px-3 py-2 border-t border-gray-100 text-base">
						{form.platform === "instagram" && (
							<>
								<span>❤️</span>
								<span>💬</span>
								<span>✈️</span>
								<span className="ml-auto">🔖</span>
							</>
						)}
						{form.platform === "youtube" && (
							<>
								<span>👍</span>
								<span>👎</span>
								<span>💬</span>
								<span>↗️</span>
							</>
						)}
						{form.platform === "twitter" && (
							<>
								<span>💬</span>
								<span>🔁</span>
								<span>❤️</span>
								<span>📊</span>
							</>
						)}
						{!["instagram", "youtube", "twitter"].includes(form.platform) && (
							<>
								<span>❤️</span>
								<span>💬</span>
								<span>↗️</span>
							</>
						)}
					</div>
				</div>
				<div className="grid grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
					{[
						{ v: `${form.caption.length}/${lim}`, l: "chars" },
						{ v: "2k–8k", l: "est reach" },
						{ v: "9–11am", l: "best time" },
					].map((s) => (
						<div key={s.l} className="bg-white py-2.5 text-center">
							<span className="block text-[13px] font-semibold tracking-tight">
								{s.v}
							</span>
							<span className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">
								{s.l}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// ─── IDEAS GENERATOR ──────────────────────────────────────────────────────────
function IdeasView({ onUseIdea }) {
	const [kw, setKw] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [saved, setSaved] = useState([]);
	const [copied, setCopied] = useState(null);

	const generate = (word = kw) => {
		if (!word.trim()) return;
		setKw(word);
		setLoading(true);
		setTimeout(() => {
			const key =
				Object.keys(IDEAS_DB).find((k) => word.toLowerCase().includes(k)) ||
				Object.keys(IDEAS_DB)[Math.floor(Math.random() * 4)];
			const base = IDEAS_DB[key] || [];
			const extra = [
				`The ultimate ${word} guide for devs`,
				`${word} mistakes every beginner makes`,
				`I tried ${word} for 30 days`,
				`${word} vs alternatives: honest take`,
				`How to master ${word} this weekend`,
			];
			setResults(
				[...base, ...extra].slice(0, 10).sort(() => Math.random() - 0.5),
			);
			setLoading(false);
		}, 900);
	};

	const toggleSave = (idea) =>
		setSaved((s) =>
			s.includes(idea) ? s.filter((x) => x !== idea) : [...s, idea],
		);
	const copy = (idea, i) => {
		navigator.clipboard?.writeText(idea);
		setCopied(i);
		setTimeout(() => setCopied(null), 1500);
	};

	return (
		<div className="grid grid-cols-[1fr_240px] gap-4 items-start">
			<div className="bg-white border border-gray-100 rounded-xl p-5">
				<h3 className="text-[13px] font-bold tracking-tight mb-1">
					Content ideas generator
				</h3>
				<p className="text-[11.5px] text-gray-400 mb-4 leading-relaxed">
					Enter a keyword and get 10 ideas instantly. Click a platform button to
					open in Composer.
				</p>

				<div className="flex gap-2 mb-4">
					<Search className="w-4 h-4 text-gray-400" />
					<input
						className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
						placeholder="e.g. nextjs, react, saas, scraping..."
						value={kw}
						onChange={(e) => setKw(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && generate()}
					/>
					<button
						onClick={() => generate()}
						disabled={loading}
						className="bg-orange-500 text-white text-[12px] font-semibold px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 whitespace-nowrap"
					>
						Generate ↗
					</button>
				</div>

				<div className="flex flex-wrap gap-1.5 mb-5">
					{[
						"nextjs",
						"react",
						"saas",
						"scraping",
						"tailwind",
						"typescript",
					].map((t) => (
						<button
							key={t}
							onClick={() => generate(t)}
							className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
						>
							{t}
						</button>
					))}
				</div>

				{loading && (
					<div className="text-center py-10">
						<Spinner />
						<p className="text-[12px] text-gray-400 mt-3">
							Generating ideas for "{kw}"…
						</p>
					</div>
				)}

				<AnimatePresence>
					{!loading && results.length > 0 && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
							<p className="text-[9px] font-mono uppercase tracking-widest text-gray-400 mb-3">
								{results.length} ideas for "{kw}"
							</p>
							<div className="flex flex-col gap-2">
								{results.map((idea, i) => (
									<motion.div
										key={idea}
										initial={{ opacity: 0, x: -8 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.04 }}
										className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white hover:border-gray-200 transition-all"
									>
										<span className="font-mono text-[10px] text-gray-300 shrink-0 w-5 mt-0.5">
											{String(i + 1).padStart(2, "0")}
										</span>
										<div className="flex-1 min-w-0">
											<p className="text-[12px] font-semibold tracking-tight leading-snug mb-2">
												{idea}
											</p>
											<div className="flex flex-wrap gap-1">
												{[
													"instagram",
													"youtube",
													"twitter",
													"linkedin",
													"tiktok",
												].map((pid) => (
													<button
														key={pid}
														onClick={() => onUseIdea(idea, pid)}
														className="text-[10px] font-semibold px-2 py-0.5 rounded transition-opacity hover:opacity-80"
														style={{
															color: PLATFORMS[pid].hex,
															background: PLATFORMS[pid].bg,
														}}
													>
														{PLATFORMS[pid].label}
													</button>
												))}
											</div>
										</div>
										<div className="flex flex-col gap-1 shrink-0">
											<button
												onClick={() => copy(idea, i)}
												className="text-sm text-gray-300 hover:text-orange-500 transition-colors"
											>
												{copied === i ? "✓" : "⎘"}
											</button>
											<button
												onClick={() => toggleSave(idea)}
												className={`text-sm transition-colors ${saved.includes(idea) ? "text-orange-500" : "text-gray-300 hover:text-orange-400"}`}
											>
												★
											</button>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
					{!loading && results.length === 0 && (
						<div className="text-center py-12 text-gray-300">
							<div className="text-4xl mb-3">💡</div>
							<p className="text-[13px]">Enter a keyword to generate ideas</p>
						</div>
					)}
				</AnimatePresence>
			</div>

			{/* Saved ideas */}
			<div className="bg-white border border-gray-100 rounded-xl p-4 sticky top-20">
				<h3 className="text-[13px] font-bold tracking-tight mb-3">
					Saved ideas ({saved.length})
				</h3>
				{saved.length === 0 ? (
					<p className="text-center py-8 text-[11.5px] text-gray-300">
						Star ideas to save them here
					</p>
				) : (
					saved.map((idea) => (
						<motion.div
							key={idea}
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex items-center gap-2 p-2.5 border border-gray-100 rounded-lg mb-1.5 cursor-pointer hover:border-gray-200 bg-gray-50 hover:bg-white transition-all"
							onClick={() => onUseIdea(idea, "instagram")}
						>
							<span className="flex-1 text-[11.5px] font-medium leading-snug">
								{idea}
							</span>
							<button
								className="text-orange-500 text-sm shrink-0"
								onClick={(e) => {
									e.stopPropagation();
									toggleSave(idea);
								}}
							>
								★
							</button>
						</motion.div>
					))
				)}
			</div>
		</div>
	);
}

// ─── TEAMS ────────────────────────────────────────────────────────────────────
function TeamsView() {
	const [team, setTeam] = useState(SEED_TEAM);
	const [showInvite, setShowInvite] = useState(false);
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("Writer");
	const [sent, setSent] = useState(false);

	const sendInvite = () => {
		if (!email.trim()) return;
		setTeam((t) => [
			...t,
			{
				id: uid(),
				name: email.split("@")[0],
				role,
				avatar: email[0].toUpperCase(),
				email,
				active: false,
			},
		]);
		setSent(true);
		setTimeout(() => {
			setSent(false);
			setEmail("");
			setShowInvite(false);
		}, 1400);
	};

	return (
		<div className="grid grid-cols-2 gap-4 items-start">
			{/* Members */}
			<div className="bg-white border border-gray-100 rounded-xl p-5">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-[13px] font-bold tracking-tight">Team members</h3>
					<button
						onClick={() => setShowInvite((s) => !s)}
						className="bg-orange-500 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
					>
						+ Invite
					</button>
				</div>

				<div className="flex flex-col gap-2 mb-4">
					{team.map((m) => (
						<motion.div
							key={m.id}
							layout
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50"
						>
							<div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[13px] font-semibold shrink-0">
								{m.avatar}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-[12.5px] font-semibold tracking-tight truncate">
									{m.name}
								</p>
								<p className="text-[10.5px] text-gray-400 truncate">
									{m.email}
								</p>
							</div>
							<div className="w-28">
								<MotionDropdown
									value={m.role}
									onChange={(v) =>
										setTeam((t) =>
											t.map((x) => (x.id === m.id ? { ...x, role: v } : x)),
										)
									}
									options={ROLES.map((r) => ({ value: r, label: r }))}
								/>
							</div>
							<span
								className={`text-[9px] font-mono whitespace-nowrap ${m.active ? "text-green-500" : "text-gray-400"}`}
							>
								{m.active ? "● Active" : "○ Invited"}
							</span>
						</motion.div>
					))}
				</div>

				<AnimatePresence>
					{showInvite && (
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							className="border border-dashed border-gray-200 rounded-xl p-4 flex flex-col gap-3"
						>
							<p className="text-[12.5px] font-semibold tracking-tight">
								Invite teammate
							</p>
							<label className="flex flex-col gap-1">
								<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
									Email
								</span>
								<input
									className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
									placeholder="teammate@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoFocus
								/>
							</label>
							<label className="flex flex-col gap-1">
								<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
									Role
								</span>
								<MotionDropdown
									value={role}
									onChange={setRole}
									options={ROLES.filter((r) => r !== "Owner").map((r) => ({
										value: r,
										label: r,
									}))}
								/>
							</label>
							<div className="flex gap-2">
								<button
									onClick={() => setShowInvite(false)}
									className="flex-1 border border-gray-200 rounded-lg py-2 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={sendInvite}
									className="flex-1 bg-orange-500 text-white rounded-lg py-2 text-[12px] font-semibold hover:bg-orange-600 transition-colors"
								>
									{sent ? "✓ Sent!" : "Send invite"}
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* RBAC */}
			<div className="bg-white border border-gray-100 rounded-xl p-5">
				<h3 className="text-[13px] font-bold tracking-tight mb-3">
					Role permissions
				</h3>
				<div className="border border-gray-100 rounded-xl overflow-hidden mb-5">
					<div className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr] bg-gray-50 px-3 py-2 border-b border-gray-100">
						<span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">
							Permission
						</span>
						{ROLES.map((r) => (
							<span
								key={r}
								className="text-[9px] font-mono uppercase tracking-widest text-gray-400 text-center"
							>
								{r}
							</span>
						))}
					</div>
					{RBAC.map((row, i) => (
						<div
							key={row.perm}
							className={`grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr] px-3 py-2 items-center ${i !== RBAC.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50 transition-colors`}
						>
							<span className="text-[11.5px] text-gray-500">{row.perm}</span>
							{ROLES.map((r) => (
								<span key={r} className="text-center text-[13px]">
									{row.roles.includes(r) ? (
										<span className="text-green-500 font-bold">✓</span>
									) : (
										<span className="text-gray-200">—</span>
									)}
								</span>
							))}
						</div>
					))}
				</div>
				<h3 className="text-[13px] font-bold tracking-tight mb-2.5">
					Role descriptions
				</h3>
				<div className="flex flex-col gap-2">
					{ROLES.map((r) => (
						<div key={r} className="p-3 border border-gray-100 rounded-lg">
							<p className="text-[12px] font-semibold mb-1.5">{r}</p>
							<div className="flex flex-wrap gap-1">
								{ROLE_PERMS[r].map((p) => (
									<span
										key={p}
										className="text-[9px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
									>
										{p}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// ─── EDIT MODAL ───────────────────────────────────────────────────────────────
function EditModal({ item, onClose, onSave, onDelete, projects }) {
	const [form, setForm] = useState({ ...item, tags: [...(item.tags || [])] });
	const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
	const p = PLATFORMS[form.platform] || {};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.94, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.94 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto shadow-2xl"
			>
				<div
					className="flex items-center gap-3 p-5 sticky top-0 bg-white z-10"
					style={{ borderBottom: `2px solid ${p.hex || "#e8590c"}` }}
				>
					<div
						className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
						style={{ background: p.bg || "#f5f3ef" }}
					>
						{form.thumb}
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-[15px] font-bold tracking-tight truncate">
							{form.title || "New Post"}
						</p>
						<div className="flex gap-1.5 mt-1 flex-wrap">
							<PBadge platform={form.platform} />
							<SBadge status={form.status} />
						</div>
					</div>
					<button
						onClick={onClose}
						className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-sm shrink-0"
					>
						✕
					</button>
				</div>
				<div className="p-5 flex flex-col gap-3">
					{[
						["Title", "title", "text"],
						["Caption", "caption", "textarea"],
					].map(([lbl, key, type]) => (
						<label key={key} className="flex flex-col gap-1">
							<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
								{lbl}
							</span>
							{type === "textarea" ? (
								<textarea
									rows={3}
									className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 resize-none transition-colors"
									value={form[key]}
									onChange={(e) => set(key, e.target.value)}
								/>
							) : (
								<input
									className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
									value={form[key]}
									onChange={(e) => set(key, e.target.value)}
								/>
							)}
						</label>
					))}
					<div className="grid grid-cols-2 gap-3">
						{[
							["Platform", "platform", PL.map((p) => [p.id, p.label])],
							[
								"Type",
								"type",
								[
									["post", "Post"],
									["reel", "Reel"],
									["short", "Short"],
									["story", "Story"],
								],
							],
							[
								"Status",
								"status",
								Object.keys(STATUSES).map((s) => [s, STATUSES[s].label]),
							],
							[
								"Project",
								"project",
								projects.map((p) => [p.id, `${p.emoji} ${p.name}`]),
							],
							["Date", "date", "date"],
							["Time", "time", "time"],
						].map(([lbl, key, opts]) => (
							<label key={key} className="flex flex-col gap-1">
								<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
									{lbl}
								</span>
								{Array.isArray(opts) ? (
									<MotionDropdown
										value={form[key]}
										onChange={(v) => set(key, key === "project" ? Number(v) : v)}
										options={opts.map(([v, l]) => ({ value: v, label: l }))}
									/>
								) : (
									<input
										type={opts}
										className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
										value={form[key]}
										onChange={(e) => set(key, e.target.value)}
									/>
								)}
							</label>
						))}
					</div>
					<label className="flex flex-col gap-1">
						<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
							Tags (comma separated)
						</span>
						<input
							className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
							value={form.tags.join(",")}
							onChange={(e) =>
								set(
									"tags",
									e.target.value
										.split(",")
										.map((t) => t.trim())
										.filter(Boolean),
								)
							}
						/>
					</label>
				</div>
				<div className="flex items-center px-5 py-3 border-t border-gray-100 sticky bottom-0 bg-white">
					{item.id && (
						<button
							onClick={() => {
								onDelete(item.id);
								onClose();
							}}
							className="border border-red-200 text-red-400 rounded-lg px-3 py-2 text-[12px] hover:bg-red-50 transition-colors"
						>
							Delete
						</button>
					)}
					<div className="ml-auto flex gap-2">
						<button
							onClick={onClose}
							className="border border-gray-200 rounded-lg px-4 py-2 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => {
								onSave(form);
								onClose();
							}}
							className="text-white rounded-lg px-4 py-2 text-[12px] font-semibold transition-colors hover:opacity-90"
							style={{ background: p.hex || "#e8590c" }}
						>
							Save
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

// ─── CONNECT MODAL ────────────────────────────────────────────────────────────
function ConnectModal({ platform, onClose, onConnect }) {
	const p = PLATFORMS[platform];
	const [step, setStep] = useState("form");
	const [handle, setHandle] = useState("");
	const doConnect = () => {
		if (!handle.trim()) return;
		setStep("connecting");
		setTimeout(() => {
			setStep("done");
			setTimeout(() => {
				onConnect(platform);
				onClose();
			}, 900);
		}, 1400);
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.94, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.94 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
			>
				<div
					className="flex items-center gap-3 p-5"
					style={{ borderBottom: `2px solid ${p.hex}` }}
				>
					<div
						className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-lg"
						style={{ background: p.bg, color: p.hex }}
					>
						<p.Icon />
					</div>
					<div>
						<p className="text-[14px] font-bold tracking-tight">
							Connect {p.label}
						</p>
						<p className="text-[11px] text-gray-400 mt-0.5">
							Link your account to schedule posts
						</p>
					</div>
					<button
						onClick={onClose}
						className="ml-auto w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-sm"
					>
						✕
					</button>
				</div>
				<div className="p-5">
					{step === "form" && (
						<div className="flex flex-col gap-3">
							<div className="flex gap-2 bg-gray-50 rounded-xl p-3 text-[12px] text-gray-500 leading-relaxed">
								<span className="text-base shrink-0">🔐</span>
								<span>OAuth connection — your password is never stored.</span>
							</div>
							<label className="flex flex-col gap-1">
								<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
									Your handle
								</span>
								<input
									className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
									placeholder="@yourhandle"
									value={handle}
									onChange={(e) => setHandle(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && doConnect()}
									autoFocus
								/>
							</label>
							<div className="border border-gray-100 rounded-xl p-3 flex flex-col gap-2">
								{["Read profile", "Schedule & publish", "View analytics"].map(
									(perm) => (
										<div
											key={perm}
											className="flex items-center gap-2 text-[12px] text-gray-500"
										>
											<span className="text-green-500 font-bold text-sm">
												✓
											</span>
											{perm}
										</div>
									),
								)}
							</div>
						</div>
					)}
					{step === "connecting" && (
						<div className="flex flex-col items-center py-8 gap-3">
							<Spinner color={p.hex} />
							<p className="text-[13px] text-gray-400">
								Connecting to {p.label}…
							</p>
						</div>
					)}
					{step === "done" && (
						<div className="flex flex-col items-center py-8 gap-3">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
								style={{ background: p.bg, color: p.hex }}
							>
								✓
							</motion.div>
							<p className="text-[13px] text-gray-500">
								Connected successfully!
							</p>
						</div>
					)}
				</div>
				{step === "form" && (
					<div className="flex gap-2 px-5 pb-5">
						<button
							onClick={onClose}
							className="flex-1 border border-gray-200 rounded-lg py-2.5 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={doConnect}
							className="flex-1 text-white rounded-lg py-2.5 text-[12px] font-semibold hover:opacity-90 transition-opacity"
							style={{ background: p.hex }}
						>
							Connect {p.label}
						</button>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}

// ─── PROJECT SWITCHER ─────────────────────────────────────────────────────────
function ProjectSwitcher({ projects, active, onChange, onAddProject }) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const cur = projects.find((p) => p.id === active) || projects[0];
	useEffect(() => {
		const h = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, []);
	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setOpen((o) => !o)}
				className="w-full flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 hover:bg-gray-50 transition-colors"
			>
				<span className="text-base">{cur.emoji}</span>
				<span
					className="text-[12px] font-semibold flex-1 text-left tracking-tight"
					style={{ color: cur.color }}
				>
					{cur.name}
				</span>
				<span className="text-[10px] text-gray-400">{open ? "▴" : "▾"}</span>
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 4, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 4, scale: 0.97 }}
						className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
					>
						<div className="px-3 pt-2.5 pb-1 text-[9px] font-mono uppercase tracking-widest text-gray-400">
							Switch project
						</div>
						{projects.map((p) => (
							<button
								key={p.id}
								onClick={() => {
									onChange(p.id);
									setOpen(false);
								}}
								className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors ${p.id === active ? "bg-orange-50" : ""}`}
							>
								<span className="text-base">{p.emoji}</span>
								<span
									className="text-[12px] font-semibold flex-1 text-left"
									style={{ color: p.id === active ? p.color : undefined }}
								>
									{p.name}
								</span>
								{p.id === active && (
									<span className="text-sm" style={{ color: p.color }}>
										✓
									</span>
								)}
							</button>
						))}
						<button
							onClick={() => {
								setOpen(false);
								onAddProject();
							}}
							className="w-full border-t border-gray-100 px-3 py-2 flex items-center gap-2 text-[11px] text-gray-400 cursor-pointer hover:bg-gray-50 text-left"
						>
							<span>＋</span>
							<span>Add project</span>
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function AddProjectModal({ onClose, onCreate }) {
	const [form, setForm] = useState({
		name: "",
		emoji: "🆕",
		color: "#2563eb",
	});

	const submit = () => {
		const name = form.name.trim();
		if (!name) return;
		onCreate({
			id: uid(),
			name,
			emoji: form.emoji.trim() || "🆕",
			color: form.color || "#2563eb",
		});
		onClose();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.94, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.94 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
			>
				<div className="p-5 border-b border-gray-100 flex items-center justify-between">
					<h3 className="text-[14px] font-bold tracking-tight">Add New Project</h3>
					<button
						onClick={onClose}
						className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors text-sm"
					>
						✕
					</button>
				</div>
				<div className="p-5 flex flex-col gap-3">
					<label className="flex flex-col gap-1">
						<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
							Project name
						</span>
						<input
							className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
							placeholder="myproject.com"
							value={form.name}
							onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
							autoFocus
						/>
					</label>
					<div className="grid grid-cols-2 gap-3">
						<label className="flex flex-col gap-1">
							<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
								Emoji
							</span>
							<input
								className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
								placeholder="🚀"
								value={form.emoji}
								onChange={(e) =>
									setForm((f) => ({ ...f, emoji: e.target.value }))
								}
							/>
						</label>
						<label className="flex flex-col gap-1">
							<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
								Color
							</span>
							<input
								type="color"
								className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 h-[38px] outline-none focus:border-orange-400 transition-colors"
								value={form.color}
								onChange={(e) =>
									setForm((f) => ({ ...f, color: e.target.value }))
								}
							/>
						</label>
					</div>
				</div>
				<div className="flex gap-2 px-5 pb-5">
					<button
						onClick={onClose}
						className="flex-1 border border-gray-200 rounded-lg py-2.5 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={submit}
						className="flex-1 bg-orange-500 text-white rounded-lg py-2.5 text-[12px] font-semibold hover:bg-orange-600 transition-colors"
					>
						Create project
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

function UserAccountModal({ onClose }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.94, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.94 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
			>
				<div className="p-6 border-b border-gray-100">
					<h3 className="text-[14px] font-bold tracking-tight">Your Account</h3>
					<p className="text-[11px] text-gray-400 mt-1">Profile and session</p>
				</div>
				<div className="p-6">
					<div className="flex items-center gap-3 mb-4">
						<img
							src="https://i.pravatar.cc/100?img=68"
							alt="User avatar"
							className="w-12 h-12 rounded-full object-cover"
						/>
						<div>
							<p className="text-[13px] font-semibold text-gray-800">Alex Morgan</p>
							<p className="text-[11px] text-gray-500">alex@contentos.app</p>
						</div>
					</div>
					<div className="space-y-2 text-[12px] text-gray-600">
						<p>
							<span className="font-semibold text-gray-800">Plan:</span> Pro
						</p>
						<p>
							<span className="font-semibold text-gray-800">Workspace:</span>{" "}
							ContentOS Studio
						</p>
						<p>
							<span className="font-semibold text-gray-800">Timezone:</span>{" "}
							Asia/Kolkata
						</p>
					</div>
				</div>
				<div className="flex gap-2 px-6 pb-6">
					<button
						onClick={onClose}
						className="flex-1 border border-gray-200 rounded-lg py-2.5 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
					>
						Close
					</button>
					<button className="flex-1 border border-red-200 text-red-500 rounded-lg py-2.5 text-[12px] font-semibold hover:bg-red-50 transition-colors">
						Logout
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

function SearchModal({ items, projects, onClose, onPick }) {
	const [query, setQuery] = useState("");
	const result = useMemo(() => {
		const q = query.trim().toLowerCase();
		const sorted = [...items].sort(
			(a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time),
		);
		if (!q) return sorted;
		return sorted.filter((i) => {
			const pf = PLATFORMS[i.platform]?.label || i.platform;
			const pr = projects.find((p) => p.id === i.project)?.name || "";
			return (
				i.title?.toLowerCase().includes(q) ||
				i.caption?.toLowerCase().includes(q) ||
				pf.toLowerCase().includes(q) ||
				STATUSES[i.status]?.label?.toLowerCase().includes(q) ||
				pr.toLowerCase().includes(q) ||
				(i.tags || []).join(" ").toLowerCase().includes(q)
			);
		});
	}, [items, projects, query]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 md:p-8"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, y: 12, scale: 0.98 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 12, scale: 0.98 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden"
			>
				<div className="p-4 border-b border-gray-100">
					<div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
						<Search className="w-4 h-4 text-gray-400" />
						<input
							autoFocus
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search all content..."
							className="w-full bg-transparent outline-none text-[13px] text-gray-700 placeholder-gray-400"
						/>
						<button
							onClick={onClose}
							className="text-[11px] text-gray-400 hover:text-gray-600"
						>
							Esc
						</button>
					</div>
				</div>
				<div className="max-h-[70vh] overflow-y-auto p-3 flex flex-col gap-2">
					{result.length === 0 && (
						<div className="text-center py-12 text-gray-400 text-[12px]">
							No content found
						</div>
					)}
					{result.map((item) => {
						const p = PLATFORMS[item.platform] || {};
						const project = projects.find((x) => x.id === item.project);
						return (
							<button
								key={item.id}
								onClick={() => onPick(item)}
								className="w-full text-left border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-center gap-2 mb-1">
									<span className="text-[13px]">{item.thumb || "✏️"}</span>
									<p className="text-[12.5px] font-semibold text-gray-800 truncate">
										{item.title}
									</p>
									<span
										className="ml-auto text-[9px] px-1.5 py-0.5 rounded"
										style={{ background: p.bg, color: p.hex || "#6b7280" }}
									>
										{p.label || item.platform}
									</span>
								</div>
								<p className="text-[11px] text-gray-500 truncate">
									{item.caption || "No caption"}
								</p>
								<div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-400">
									<span>{item.date}</span>
									<span>•</span>
									<span>{item.time}</span>
									<span>•</span>
									<span>{STATUSES[item.status]?.label || item.status}</span>
									{project?.name && (
										<>
											<span>•</span>
											<span>{project.name}</span>
										</>
									)}
								</div>
							</button>
						);
					})}
				</div>
			</motion.div>
		</motion.div>
	);
}

function MotionDropdown({
	label,
	value,
	options,
	onChange,
	searchable = false,
	placeholder = "Select",
	className = "",
}) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const ref = useRef(null);
	const selected = options.find((o) => o.value === value);
	const filtered = searchable
		? options.filter((o) =>
				o.label.toLowerCase().includes(query.trim().toLowerCase()),
			)
		: options;

	useEffect(() => {
		const h = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, []);

	return (
		<div ref={ref} className={`relative ${className}`}>
			{label && (
				<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400 mb-1 block">
					{label}
				</span>
			)}
			<button
				onClick={() => setOpen((o) => !o)}
				className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-left flex items-center justify-between"
			>
				<span className={selected ? "text-gray-700" : "text-gray-400"}>
					{selected?.label || placeholder}
				</span>
				<span className="text-[10px] text-gray-400">{open ? "▴" : "▾"}</span>
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 6, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 6, scale: 0.98 }}
						className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-hidden"
					>
						{searchable && (
							<div className="p-2 border-b border-gray-100">
								<input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search..."
									className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none"
								/>
							</div>
						)}
						<div className="max-h-52 overflow-y-auto py-1">
							{filtered.map((o) => (
								<button
									key={String(o.value)}
									onClick={() => {
										onChange(o.value);
										setOpen(false);
										setQuery("");
									}}
									className={`w-full text-left px-3 py-2 text-[12px] hover:bg-gray-50 transition-colors ${
										o.value === value ? "bg-orange-50 text-orange-600" : "text-gray-600"
									}`}
								>
									{o.label}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function IntegrationsModal({ onClose, connected, onToggle }) {
	const [query, setQuery] = useState("");
	const list = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return PL;
		return PL.filter((p) => p.label.toLowerCase().includes(q) || p.id.includes(q));
	}, [query]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.96, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.96 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden"
			>
				<div className="p-5 border-b border-gray-100 flex items-center justify-between">
					<div>
						<h3 className="text-[15px] font-bold tracking-tight">Integrations</h3>
						<p className="text-[11px] text-gray-400 mt-1">
							Connect publishing and distribution channels
						</p>
					</div>
					<button
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors"
					>
						✕
					</button>
				</div>
				<div className="px-5 pt-3 pb-2 border-b border-gray-100">
					<div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
						<Search className="w-4 h-4 text-gray-400" />
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search integrations..."
							className="w-full bg-transparent outline-none text-[12px] text-gray-700 placeholder-gray-400"
						/>
					</div>
				</div>
				<div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto">
					{list.map((p) => {
						const isOn = !!connected[p.id];
						const info = PLATFORM_INTEGRATION_INFO[p.id] || PLATFORM_INTEGRATION_INFO.default;
						return (
							<div key={p.id} className="border border-gray-100 rounded-xl p-3 flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: p.bg, color: p.hex }}>
										<p.Icon />
									</div>
									<div className="min-w-0">
										<div className="text-[12px] font-semibold text-gray-700 truncate">{p.label}</div>
										<div className="text-[10px] text-gray-400">{info.method}</div>
									</div>
									<span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{info.time}</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{info.scopes.slice(0, 3).map((s) => (
										<span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
											{s}
										</span>
									))}
								</div>
								<div className="text-[10px] text-gray-500 leading-relaxed">
									{info.steps.slice(0, 2).map((step, idx) => (
										<div key={step}>
											{idx + 1}. {step}
										</div>
									))}
								</div>
								<button
									onClick={() => onToggle(p.id, isOn)}
									className={`mt-auto text-[11px] font-semibold px-2 py-1.5 rounded-lg border transition-colors ${
										isOn
											? "bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
											: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
									}`}
								>
									{isOn ? "Disconnect" : "Connect"}
								</button>
							</div>
						);
					})}
				</div>
			</motion.div>
		</motion.div>
	);
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
const VIEWS = [
	{ id: "calendar", icon: "📅", label: "Calendar" },
	{ id: "list", icon: "☰", label: "List" },
	{ id: "grid", icon: "⊞", label: "Grid" },
	{ id: "kanban", icon: "⬛", label: "Kanban" },
	{ id: "compose", icon: "✏️", label: "Compose" },
	{ id: "ideas", icon: "💡", label: "Ideas" },
	{ id: "teams", icon: "👥", label: "Teams" },
];
const CONTENT_VIEWS = ["calendar", "list", "grid", "kanban"];

export default function ContentOS() {
	const [items, setItems] = useState(SEED_CONTENT);
	const [projects, setProjects] = useState(PROJECTS);
	const [view, setView] = useState("calendar");
	const [filterPf, setFilterPf] = useState("all");
	const [filterSt, setFilterSt] = useState("all");
	const [search, setSearch] = useState("");
	const [activeProject, setActiveProj] = useState(1);
	const [theme, setTheme] = useState("light");
	const [isMobile, setIsMobile] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [connected, setConnected] = useState({
		instagram: true,
		youtube: true,
	});
	const [selected, setSelected] = useState(null);
	const [connecting, setConnecting] = useState(null);
	const [showAddProject, setShowAddProject] = useState(false);
	const [showAccountModal, setShowAccountModal] = useState(false);
	const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);
	const [showSearchModal, setShowSearchModal] = useState(false);

	const BLANK = {
		title: "",
		caption: "",
		platform: "instagram",
		type: "post",
		status: "idea",
		date: new Date().toISOString().split("T")[0],
		time: "10:00",
		tags: [],
		thumb: "✏️",
		project: activeProject,
	};

	const filtered = useMemo(
		() =>
			items
				.filter(
					(i) =>
						i.project === activeProject &&
						(filterPf === "all" || i.platform === filterPf) &&
						(filterSt === "all" || i.status === filterSt),
				)
				.sort(
					(a, b) =>
						new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time),
				),
		[items, activeProject, filterPf, filterSt],
	);

	const stats = useMemo(
		() => ({
			total: filtered.length,
			scheduled: filtered.filter((i) => i.status === "scheduled").length,
			published: filtered.filter((i) => i.status === "published").length,
			drafts: filtered.filter(
				(i) => i.status === "draft" || i.status === "idea",
			).length,
			conn: Object.keys(connected).length,
		}),
		[filtered, connected],
	);

	const saveItem = (u) => {
		const normalized = {
			...u,
			id: u?.id ?? uid(),
			title: u?.title?.trim() || "Untitled post",
			project: Number(u?.project ?? activeProject),
		};

		setItems((p) =>
			p.some((i) => i.id === normalized.id)
				? p.map((i) => (i.id === normalized.id ? normalized : i))
				: [...p, normalized],
		);

		// Ensure newly saved content is visible immediately.
		setFilterPf("all");
		setFilterSt("all");
		setView("list");
		if (normalized.project !== activeProject) setActiveProj(normalized.project);
	};
	const deleteItem = (id) => setItems((p) => p.filter((i) => i.id !== id));
	const statusChange = (id, status) =>
		setItems((p) => p.map((i) => (i.id === id ? { ...i, status } : i)));
	const connectPl = (pid) => setConnected((c) => ({ ...c, [pid]: true }));
	const disconnectPl = (pid) =>
		setConnected((c) => {
			const n = { ...c };
			delete n[pid];
			return n;
		});

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mq = window.matchMedia("(max-width: 900px)");
		const handle = () => {
			setIsMobile(mq.matches);
			if (!mq.matches) setSidebarOpen(false);
		};
		handle();
		mq.addEventListener("change", handle);
		return () => mq.removeEventListener("change", handle);
	}, []);

	useEffect(() => {
		if (isMobile) setSidebarOpen(false);
	}, [view, isMobile]);

	const activePrj = projects.find((p) => p.id === activeProject) || projects[0];
	const isContentView = CONTENT_VIEWS.includes(view);
	const VIEW_TITLES = {
		calendar: "Content Scheduler",
		list: "Content List",
		grid: "Grid View",
		kanban: "Kanban Board",
		compose: "Content Composer",
		ideas: "Ideas Generator",
		teams: "Team & Roles",
	};

	return (
		<div
			className={`contentos-shell ${theme === "dark" ? "contentos-dark" : ""} flex h-screen overflow-hidden font-sans ${
				theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-gray-50 text-gray-900"
			}`}
			style={{
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<style>{`
				.contentos-dark .bg-white { background-color: #18181b !important; }
				.contentos-dark .text-gray-800, .contentos-dark .text-gray-700, .contentos-dark .text-gray-600, .contentos-dark .text-gray-500, .contentos-dark .text-gray-400 { color: #d4d4d8 !important; }
				.contentos-dark .border-gray-100, .contentos-dark .border-gray-200 { border-color: #3f3f46 !important; }
				.contentos-dark .bg-gray-50, .contentos-dark .bg-gray-100 { background-color: #27272a !important; }
				.contentos-dark input, .contentos-dark textarea, .contentos-dark button { color-scheme: dark; }
			`}</style>
			{isMobile && sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/40 z-40"
					onClick={() => setSidebarOpen(false)}
				/>
			)}
			{/* ── SIDEBAR ── */}
			<aside
				className={`w-64 shrink-0 border-r flex flex-col overflow-y-auto fixed md:static top-0 left-0 bottom-0 z-50 transform transition-transform duration-200 ${
					theme === "dark"
						? "bg-zinc-900 border-zinc-800"
						: "bg-white border-gray-100"
				} ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
			>
				{/* Logo */}
				<div
					className={`flex items-center gap-2 px-3 py-4 border-b ${
						theme === "dark" ? "border-zinc-800" : "border-gray-100"
					}`}
				>
					<div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
						C
					</div>
					<div>
						<p className="text-[13px] font-bold tracking-tight leading-none">
							ContentOS
						</p>
					</div>
				</div>

				{/* Project switcher */}
				<ProjectSwitcher
					projects={projects}
					active={activeProject}
					onChange={(id) => {
						setActiveProj(id);
					}}
					onAddProject={() => setShowAddProject(true)}
				/>

				{/* Views */}
				<div className="px-2 pt-3 pb-1">
					<p className="text-[9px] font-mono uppercase tracking-widest text-gray-400 px-2 mb-1">
						Views
					</p>
					{VIEWS.map((v) => (
						<button
							key={v.id}
							onClick={() => setView(v.id)}
							className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12.5px] transition-all ${view === v.id ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
						>
							<span className="w-4 text-center text-[13px]">{v.icon}</span>
							{v.label}
						</button>
					))}
				</div>

				{/* Platforms */}
				<div className="px-2 pt-3 pb-3 flex-1">
					<div className="flex items-center justify-between px-2 mb-1">
						<p className="text-[9px] font-mono uppercase tracking-widest text-gray-400">
							Connected
						</p>
						<span className="text-[8px] font-mono bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
							{Object.keys(connected).length}/{PL.length}
						</span>
					</div>
					{PL.filter((p) => !!connected[p.id]).map((p) => {
						const isOn = !!connected[p.id];
						return (
							<div
								key={p.id}
								className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<div
									className="w-5 h-5 rounded flex items-center justify-center shrink-0"
									style={{ background: p.bg, color: p.hex }}
								>
									<p.Icon />
								</div>
								<span
									className="text-[11.5px] text-gray-500 flex-1 cursor-pointer hover:text-gray-700 transition-colors"
									onClick={() => setFilterPf(filterPf === p.id ? "all" : p.id)}
								>
									{p.label}
								</span>
								<button
									onClick={() => disconnectPl(p.id)}
									className={`text-[8px] font-mono px-1.5 py-0.5 rounded transition-all ${isOn ? "bg-green-100 text-green-600 border border-green-200 hover:bg-red-100 hover:text-red-500 hover:border-red-200" : "bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200"}`}
								>
									✓ on
								</button>
							</div>
						);
					})}
					<button
						onClick={() => setShowIntegrationsModal(true)}
						className="w-full mt-2 text-[11px] font-semibold border border-gray-200 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
					>
						Open Integrations
					</button>
				</div>
				<div
					className={`p-2 border-t space-y-2 ${
						theme === "dark" ? "border-zinc-800" : "border-gray-100"
					}`}
				>
					<button
						onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
						className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] transition-colors ${
							theme === "dark"
								? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						<span>{theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}</span>
						<span className="text-[10px] font-mono uppercase">
							{theme === "dark" ? "Dark" : "Light"}
						</span>
					</button>
					<button
						onClick={() => setShowAccountModal(true)}
						className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
							theme === "dark"
								? "hover:bg-zinc-800 text-zinc-200"
								: "hover:bg-gray-50 text-gray-700"
						}`}
					>
						<img
							src="https://i.pravatar.cc/100?img=68"
							alt="Alex Morgan"
							className="w-8 h-8 rounded-full object-cover"
						/>
						<div className="min-w-0">
							<p className="text-[12px] font-semibold truncate">Alex Morgan</p>
							<p className="text-[10px] text-gray-400 truncate">
								alex@contentos.app
							</p>
						</div>
					</button>
				</div>
			</aside>

			{/* ── MAIN ── */}
			<div className="flex-1 flex flex-col overflow-hidden min-w-0">
				{/* Topbar */}
				<div
					className={`border-b px-5 py-2.5 flex items-center gap-2.5 shrink-0 flex-wrap ${
						theme === "dark"
							? "bg-zinc-900 border-zinc-800"
							: "bg-white border-gray-100"
					}`}
				>
					{isMobile && (
						<button
							onClick={() => setSidebarOpen(true)}
							className={`w-8 h-8 rounded-lg text-sm border ${
								theme === "dark"
									? "border-zinc-700 text-zinc-200"
									: "border-gray-200 text-gray-600"
							}`}
							aria-label="Open sidebar"
						>
							☰
						</button>
					)}
					<h1 className="text-[16px] font-bold tracking-tight flex-1 min-w-[80px]">
						{VIEW_TITLES[view]}
					</h1>
					{isContentView && (
						<>
							<button
								onClick={() => setShowSearchModal(true)}
								className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
							>
								<Search className="w-4 h-4 text-gray-400" />
								<span>Search content</span>
							</button>
							<MotionDropdown
								value={filterPf}
								onChange={setFilterPf}
								options={[
									{ value: "all", label: "All platforms" },
									...PL.map((p) => ({ value: p.id, label: p.label })),
								]}
								searchable
								className="w-44"
							/>
							<MotionDropdown
								value={filterSt}
								onChange={setFilterSt}
								options={[
									{ value: "all", label: "All statuses" },
									...Object.entries(STATUSES).map(([id, s]) => ({
										value: id,
										label: s.label,
									})),
								]}
								className="w-40"
							/>
						</>
					)}
					
					{isContentView && (
						<button
							onClick={() => setSelected({ ...BLANK })}
							className="flex items-center gap-1 bg-orange-500 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
						>
							+ New
						</button>
					)}
				</div>

				{/* Stats bar */}
				{isContentView && (
					<div className="flex gap-px bg-gray-100 border-b border-gray-100 shrink-0">
						{[
							{ n: stats.total, l: "Posts", c: "#141414" },
							{ n: stats.scheduled, l: "Scheduled", c: "#2563eb" },
							{ n: stats.published, l: "Published", c: "#16a34a" },
							{ n: stats.drafts, l: "Drafts", c: "#d97706" },
							{ n: stats.conn, l: "Connected", c: "#e8590c" },
						].map((s) => (
							<div
								key={s.l}
								className="flex-1 bg-white px-4 py-2.5 min-w-[70px]"
							>
								<span
									className="block text-[20px] font-bold tracking-tight leading-none"
									style={{ color: s.c }}
								>
									{s.n}
								</span>
								<span className="block text-[9px] font-mono uppercase tracking-widest text-gray-400 mt-0.5">
									{s.l}
								</span>
							</div>
						))}
					</div>
				)}

				{/* Content area */}
				<div className="flex-1 p-4 overflow-y-auto">
					<AnimatePresence mode="wait">
						{view === "calendar" && (
							<motion.div
								key="cal"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<CalendarView items={filtered} onSelect={setSelected} />
							</motion.div>
						)}
						{view === "list" && (
							<motion.div
								key="list"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="flex flex-col gap-2"
							>
								{filtered.length === 0 && (
									<div className="text-center py-16 text-gray-300">
										<div className="text-4xl mb-3">📭</div>
										<p>No content found</p>
									</div>
								)}
								{filtered.map((item) => (
									<ContentCard
										key={item.id}
										item={item}
										onClick={setSelected}
										compact={false}
									/>
								))}
							</motion.div>
						)}
						{view === "grid" && (
							<motion.div
								key="grid"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3"
							>
								{filtered.length === 0 && (
									<div className="col-span-full text-center py-16 text-gray-300">
										<div className="text-4xl mb-3">📭</div>
										<p>No content found</p>
									</div>
								)}
								{filtered.map((item) => (
									<ContentCard
										key={item.id}
										item={item}
										onClick={setSelected}
										compact={true}
									/>
								))}
							</motion.div>
						)}
						{view === "kanban" && (
							<motion.div
								key="kanban"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<KanbanView
									items={filtered}
									onSelect={setSelected}
									onStatusChange={statusChange}
								/>
							</motion.div>
						)}
						{view === "compose" && (
							<motion.div
								key="compose"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<ComposerView onSave={saveItem} activeProject={activeProject} />
							</motion.div>
						)}
						{view === "ideas" && (
							<motion.div
								key="ideas"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<IdeasView
									onUseIdea={(title, platform) => {
										setSelected({ ...BLANK, title, platform });
										setView("compose");
									}}
								/>
							</motion.div>
						)}
						{view === "teams" && (
							<motion.div
								key="teams"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<TeamsView />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* ── MODALS ── */}
			<AnimatePresence>
				{selected && (
					<EditModal
						item={selected}
						onClose={() => setSelected(null)}
						onSave={saveItem}
						onDelete={(id) => {
							deleteItem(id);
							setSelected(null);
						}}
						projects={projects}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{connecting && (
					<ConnectModal
						platform={connecting}
						onClose={() => setConnecting(null)}
						onConnect={connectPl}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{showAddProject && (
					<AddProjectModal
						onClose={() => setShowAddProject(false)}
						onCreate={(project) => {
							setProjects((prev) => [...prev, project]);
							setActiveProj(project.id);
						}}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{showAccountModal && (
					<UserAccountModal onClose={() => setShowAccountModal(false)} />
				)}
			</AnimatePresence>
			<AnimatePresence>
				{showIntegrationsModal && (
					<IntegrationsModal
						onClose={() => setShowIntegrationsModal(false)}
						connected={connected}
						onToggle={(id, isOn) =>
							isOn ? disconnectPl(id) : connectPl(id)
						}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{showSearchModal && (
					<SearchModal
						items={items}
						projects={projects}
						onClose={() => setShowSearchModal(false)}
						onPick={(item) => {
							setSelected(item);
							setShowSearchModal(false);
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
