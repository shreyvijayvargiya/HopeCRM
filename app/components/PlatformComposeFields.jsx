import React from "react";

export const PLATFORM_COMPOSE_CONFIG = {
	instagram: {
		types: [
			{ id: "post", label: "Post", charLimit: 2200 },
			{ id: "reel", label: "Reel", charLimit: 2200 },
			{ id: "carousel", label: "Carousel", charLimit: 2200 },
			{ id: "story", label: "Story", charLimit: 500 },
		],
		fieldsByType: {
			post: [
				{ key: "cta", label: "CTA", type: "text", placeholder: "Shop now" },
				{ key: "location", label: "Location", type: "text", placeholder: "Mumbai, India" },
			],
			reel: [
				{ key: "audioTrack", label: "Audio Track", type: "text", placeholder: "Trending audio name" },
				{ key: "coverFrame", label: "Cover Frame (sec)", type: "number", min: 0, step: 1 },
				{ key: "collabTag", label: "Collab Tag", type: "text", placeholder: "@creator" },
			],
			carousel: [
				{ key: "slideCount", label: "Number of Slides", type: "number", min: 2, max: 10, step: 1 },
				{ key: "firstSlideHook", label: "First Slide Hook", type: "text", placeholder: "5 mistakes to avoid" },
			],
			story: [
				{ key: "storyLink", label: "Story Link", type: "url", placeholder: "https://example.com" },
				{ key: "closeFriendsOnly", label: "Close Friends Only", type: "toggle" },
			],
		},
	},
	youtube: {
		types: [
			{ id: "short", label: "Short", charLimit: 5000 },
			{ id: "video", label: "Video", charLimit: 5000 },
		],
		fieldsByType: {
			short: [
				{
					key: "privacy",
					label: "Privacy",
					type: "select",
					options: [
						{ value: "public", label: "Public" },
						{ value: "unlisted", label: "Unlisted" },
						{ value: "private", label: "Private" },
					],
				},
				{ key: "category", label: "Category", type: "text", placeholder: "Education" },
			],
			video: [
				{
					key: "privacy",
					label: "Privacy",
					type: "select",
					options: [
						{ value: "public", label: "Public" },
						{ value: "unlisted", label: "Unlisted" },
						{ value: "private", label: "Private" },
					],
				},
				{ key: "playlist", label: "Playlist", type: "text", placeholder: "Growth series" },
				{ key: "allowComments", label: "Allow Comments", type: "toggle" },
			],
		},
	},
	twitter: {
		types: [
			{ id: "post", label: "Post", charLimit: 280 },
			{ id: "thread", label: "Thread", charLimit: 5000 },
			{ id: "article", label: "Article", charLimit: 25000 },
		],
		fieldsByType: {
			post: [
				{ key: "replyControl", label: "Reply Control", type: "select", options: [{ value: "everyone", label: "Everyone" }, { value: "followers", label: "Followers" }, { value: "mentioned", label: "Only Mentioned" }] },
			],
			thread: [
				{ key: "threadCount", label: "Thread Tweet Count", type: "number", min: 2, max: 25, step: 1 },
				{ key: "numberedThread", label: "Auto Number Thread", type: "toggle" },
			],
			article: [
				{ key: "articleTitle", label: "Article Title", type: "text", placeholder: "How we scaled to 10k users" },
				{ key: "articleSummary", label: "Article Summary", type: "textarea", rows: 3, placeholder: "One-paragraph summary..." },
			],
		},
	},
	linkedin: {
		types: [
			{ id: "post", label: "Post", charLimit: 3000 },
			{ id: "article", label: "Article", charLimit: 120000 },
		],
		fieldsByType: {
			post: [
				{ key: "audience", label: "Audience", type: "select", options: [{ value: "public", label: "Public" }, { value: "connections", label: "Connections only" }] },
				{ key: "disableComments", label: "Disable Comments", type: "toggle" },
			],
			article: [
				{ key: "articleTitle", label: "Article Title", type: "text", placeholder: "What changed in AI marketing this year" },
				{ key: "readingTime", label: "Estimated Reading Time (min)", type: "number", min: 1, step: 1 },
			],
		},
	},
	substack: {
		types: [
			{ id: "newsletter", label: "Newsletter", charLimit: 120000 },
			{ id: "article", label: "Article", charLimit: 120000 },
		],
		fieldsByType: {
			newsletter: [
				{ key: "emailSubject", label: "Email Subject", type: "text", placeholder: "Weekly growth notes #12" },
				{ key: "sendEmail", label: "Send as Email", type: "toggle" },
			],
			article: [
				{ key: "slug", label: "Slug", type: "text", placeholder: "my-article-slug" },
				{ key: "paywalled", label: "Paywalled", type: "toggle" },
			],
		},
	},
	default: {
		types: [{ id: "post", label: "Post", charLimit: 500 }],
		fieldsByType: { post: [] },
	},
};

export function getTypeOptionsForPlatform(platform) {
	return (
		PLATFORM_COMPOSE_CONFIG[platform]?.types ||
		PLATFORM_COMPOSE_CONFIG.default.types
	);
}

export function normalizeTypeForPlatform(platform, type) {
	const options = getTypeOptionsForPlatform(platform);
	if (options.some((o) => o.id === type)) return type;
	return options[0]?.id || "post";
}

export function getCharLimitForPlatform(platform, type) {
	const options = getTypeOptionsForPlatform(platform);
	const match = options.find((o) => o.id === type);
	return match?.charLimit || 500;
}

export function getPlatformComposeDefaults(platform, type) {
	const cfg =
		PLATFORM_COMPOSE_CONFIG[platform] || PLATFORM_COMPOSE_CONFIG.default;
	const fields = cfg.fieldsByType[type] || [];
	const defaults = {};
	fields.forEach((f) => {
		if (f.type === "toggle") defaults[f.key] = false;
		else if (f.type === "number") defaults[f.key] = f.min ?? 0;
		else if (f.type === "select") defaults[f.key] = f.options?.[0]?.value || "";
		else defaults[f.key] = "";
	});
	return defaults;
}

export function PlatformComposeFields({
	platform,
	type,
	values,
	onChange,
	DropdownComponent,
}) {
	const cfg =
		PLATFORM_COMPOSE_CONFIG[platform] || PLATFORM_COMPOSE_CONFIG.default;
	const fields = cfg.fieldsByType[type] || [];
	if (!fields.length) return null;

	return (
		<div className="flex flex-col gap-3 border border-gray-100 rounded-xl p-3 bg-gray-50/40">
			<p className="text-[11px] font-semibold text-gray-700">Platform-specific fields</p>
			{fields.map((field) => {
				const value = values[field.key];
				if (field.type === "textarea") {
					return (
						<label key={field.key} className="flex flex-col gap-1">
							<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
								{field.label}
							</span>
							<textarea
								rows={field.rows || 4}
								value={value || ""}
								onChange={(e) => onChange(field.key, e.target.value)}
								placeholder={field.placeholder}
								className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 resize-none transition-colors"
							/>
						</label>
					);
				}
				if (field.type === "toggle") {
					return (
						<label key={field.key} className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white">
							<span className="text-[12px] text-gray-600">{field.label}</span>
							<input
								type="checkbox"
								checked={!!value}
								onChange={(e) => onChange(field.key, e.target.checked)}
								className="w-4 h-4 accent-orange-500"
							/>
						</label>
					);
				}
				if (field.type === "select") {
					if (DropdownComponent) {
						return (
							<DropdownComponent
								key={field.key}
								label={field.label}
								value={value || field.options?.[0]?.value || ""}
								onChange={(v) => onChange(field.key, v)}
								options={(field.options || []).map((o) => ({
									value: o.value,
									label: o.label,
								}))}
							/>
						);
					}
					return (
						<label key={field.key} className="flex flex-col gap-1">
							<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
								{field.label}
							</span>
							<select
								value={value || field.options?.[0]?.value || ""}
								onChange={(e) => onChange(field.key, e.target.value)}
								className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400"
							>
								{(field.options || []).map((o) => (
									<option key={o.value} value={o.value}>
										{o.label}
									</option>
								))}
							</select>
						</label>
					);
				}
				return (
					<label key={field.key} className="flex flex-col gap-1">
						<span className="text-[9.5px] font-mono uppercase tracking-widest text-gray-400">
							{field.label}
						</span>
						<input
							type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
							min={field.min}
							max={field.max}
							step={field.step}
							value={value ?? ""}
							onChange={(e) =>
								onChange(
									field.key,
									field.type === "number" ? Number(e.target.value || 0) : e.target.value,
								)
							}
							placeholder={field.placeholder}
							className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors"
						/>
					</label>
				);
			})}
		</div>
	);
}
