export interface ThemeTokens {
	background: string;
	foreground: string;
	card: string;
	muted: string;
	primary: string;
	accent: string;
	border: string;
	ring: string;
}

export interface ThemeScales {
	radius: number;
	sectionGap: number;
	cardPadding: number;
	shadowSoft: string;
	shadowStrong: string;
}

export interface ThemeTypography {
	body: string;
	heading: string;
	bodyWeight: number;
	headingWeight: number;
	letterSpacing: string;
}

export interface ThemeBlockOverrides {
	header?: {
		logoText?: string;
		background?: string;
		color?: string;
		ctaText?: string;
		ctaBackground?: string;
		ctaColor?: string;
	};
	hero?: {
		heading?: string;
		subheading?: string;
		background?: string;
		headingColor?: string;
		subheadingColor?: string;
		ctaText?: string;
		ctaBackground?: string;
		ctaColor?: string;
	};
	cta?: {
		heading?: string;
		subheading?: string;
		background?: string;
		buttonText?: string;
		buttonBackground?: string;
		buttonColor?: string;
	};
	product?: {
		background?: string;
		cardPrimary?: string;
		cardSecondary?: string;
		headingColor?: string;
		subheadingColor?: string;
	};
	testimonial?: {
		background?: string;
		slidePrimary?: string;
		slideSecondary?: string;
		headingColor?: string;
		subheadingColor?: string;
		authorColor?: string;
	};
	footer?: {
		background?: string;
		color?: string;
		copyright?: string;
	};
}

export interface ThemePreset {
	id: string;
	label: string;
	description: string;
	tokens: ThemeTokens;
	scales: ThemeScales;
	typography: ThemeTypography;
	blockOverrides?: ThemeBlockOverrides;
	preview: {
		gradient: string;
		foreground: string;
		borderClass: string;
		swatches: [string, string, string];
	};
}

export const THEME_PRESETS = {
	premiumEditorial: {
		id: "premiumEditorial",
		label: "Premium Editorial",
		description: "Refined neutrals and deep ink contrast.",
		tokens: {
			background: "#f7f8fb",
			foreground: "#111827",
			card: "#ffffff",
			muted: "#6b7280",
			primary: "#1f3a6e",
			accent: "#d8b26e",
			border: "#dbe2ec",
			ring: "#2b4f95",
		},
		scales: {
			radius: 20,
			sectionGap: 28,
			cardPadding: 26,
			shadowSoft: "0 14px 42px rgba(15, 23, 42, 0.08)",
			shadowStrong: "0 22px 64px rgba(15, 23, 42, 0.12)",
		},
		typography: {
			body: '"Space Grotesk", "Segoe UI", sans-serif',
			heading: '"Playfair Display", "Times New Roman", serif',
			bodyWeight: 500,
			headingWeight: 700,
			letterSpacing: "-0.02em",
		},
		blockOverrides: {
			header: {
				logoText: "Atelier Studio",
				background:
					"radial-gradient(900px 260px at 12% -45%, rgba(216,178,110,0.25), transparent), linear-gradient(120deg, #101b33 0%, #1e293b 58%, #334155 100%)",
				color: "#f8fafc",
				ctaText: "Book a Demo",
				ctaBackground: "#f8fafc",
				ctaColor: "#102241",
			},
			hero: {
				heading: "Design pages that feel undeniably premium",
				subheading:
					"Build high-converting, editorial-grade landing pages with complete control.",
				background:
					"radial-gradient(1120px 340px at 16% -40%, rgba(216,178,110,0.2), transparent), linear-gradient(120deg, #101b33 0%, #1e293b 60%, #334155 100%)",
				headingColor: "#f8fafc",
				subheadingColor: "#e2e8f0",
				ctaText: "Start Free",
				ctaBackground: "#f8fafc",
				ctaColor: "#102241",
			},
			cta: {
				heading: "Ship a stronger first impression in hours",
				subheading:
					"Start from polished sections, refine your story quickly, and launch with confidence.",
				background:
					"radial-gradient(960px 300px at 15% -35%, rgba(216,178,110,0.2), transparent), linear-gradient(120deg, #101b33 0%, #1f2d46 60%, #36455e 100%)",
				buttonText: "Request Access",
				buttonBackground: "#f8fafc",
				buttonColor: "#102241",
			},
			product: {
				background: "#f7f8fb",
				cardPrimary: "#ffffff",
				cardSecondary: "#eef2f7",
				headingColor: "#0f172a",
				subheadingColor: "#475569",
			},
			testimonial: {
				background:
					"radial-gradient(900px 260px at 12% -40%, rgba(216,178,110,0.18), transparent), linear-gradient(120deg, #101b33 0%, #1e293b 62%, #334155 100%)",
				slidePrimary: "linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
				slideSecondary: "linear-gradient(160deg, #f8fafc 0%, #eef2f7 100%)",
				headingColor: "#0f172a",
				subheadingColor: "#334155",
				authorColor: "#64748b",
			},
			footer: {
				background:
					"radial-gradient(900px 260px at 12% -40%, rgba(216,178,110,0.18), transparent), linear-gradient(120deg, #0b1220 0%, #1a2438 58%, #2f3f5a 100%)",
				color: "#e5e7eb",
				copyright: "(c) 2026 Atelier Studio. Crafted with intention.",
			},
		},
		preview: {
			gradient:
				"linear-gradient(120deg, #f7f8fb 0%, #eef2f7 48%, #dbe2ec 100%)",
			foreground: "#0f172a",
			borderClass: "border-border",
			swatches: ["#f7f8fb", "#1f3a6e", "#d8b26e"],
		},
	},
	darkNeon: {
		id: "darkNeon",
		label: "Dark Neon",
		description: "Deep contrast with electric accents.",
		tokens: {
			background: "#050914",
			foreground: "#e5edf8",
			card: "#111827",
			muted: "#94a3b8",
			primary: "#7c3aed",
			accent: "#22d3ee",
			border: "#334155",
			ring: "#8b5cf6",
		},
		scales: {
			radius: 14,
			sectionGap: 28,
			cardPadding: 24,
			shadowSoft: "0 16px 42px rgba(2, 8, 23, 0.52)",
			shadowStrong: "0 0 34px rgba(124,58,237,0.3)",
		},
		typography: {
			body: '"Space Grotesk", "Segoe UI", sans-serif',
			heading: '"Space Grotesk", "Segoe UI", sans-serif',
			bodyWeight: 500,
			headingWeight: 700,
			letterSpacing: "-0.015em",
		},
		preview: {
			gradient:
				"linear-gradient(120deg, #020617 0%, #111827 65%, #1f2937 100%)",
			foreground: "#f8fafc",
			borderClass: "border-violet-500/60",
			swatches: ["#020617", "#7c3aed", "#22d3ee"],
		},
	},
	brutalist: {
		id: "brutalist",
		label: "Brutalist",
		description: "Hard edges and direct contrast.",
		tokens: {
			background: "#f4f4f5",
			foreground: "#09090b",
			card: "#ffffff",
			muted: "#3f3f46",
			primary: "#111111",
			accent: "#facc15",
			border: "#111111",
			ring: "#111111",
		},
		scales: {
			radius: 2,
			sectionGap: 24,
			cardPadding: 22,
			shadowSoft: "8px 8px 0px rgba(0, 0, 0, 1)",
			shadowStrong: "10px 10px 0px rgba(0, 0, 0, 1)",
		},
		typography: {
			body: '"Archivo Black", Impact, "Arial Black", sans-serif',
			heading: '"Archivo Black", Impact, "Arial Black", sans-serif',
			bodyWeight: 700,
			headingWeight: 900,
			letterSpacing: "0.005em",
		},
		preview: {
			gradient: "linear-gradient(120deg, #facc15 0%, #f59e0b 100%)",
			foreground: "#111111",
			borderClass: "border-2 border-black",
			swatches: ["#facc15", "#000000", "#ffffff"],
		},
	},
	playful: {
		id: "playful",
		label: "Playful",
		description: "Expressive gradients and energetic tones.",
		tokens: {
			background: "#faf5ff",
			foreground: "#3b0764",
			card: "#ffffff",
			muted: "#6b7280",
			primary: "#8b5cf6",
			accent: "#f472b6",
			border: "#e9d5ff",
			ring: "#a855f7",
		},
		scales: {
			radius: 24,
			sectionGap: 28,
			cardPadding: 24,
			shadowSoft: "0 18px 42px rgba(168,85,247,0.22)",
			shadowStrong: "0 24px 56px rgba(236,72,153,0.24)",
		},
		typography: {
			body: '"Baloo 2", "Trebuchet MS", "Comic Sans MS", sans-serif',
			heading: '"Baloo 2", "Trebuchet MS", "Comic Sans MS", sans-serif',
			bodyWeight: 500,
			headingWeight: 700,
			letterSpacing: "-0.01em",
		},
		preview: {
			gradient:
				"linear-gradient(90deg, #f472b6 0%, #a855f7 55%, #6366f1 100%)",
			foreground: "#ffffff",
			borderClass: "border-pink-300/70",
			swatches: ["#f472b6", "#a855f7", "#6366f1"],
		},
	},
	minimal: {
		id: "minimal",
		label: "Minimal",
		description: "Quiet surfaces and clean hierarchy.",
		tokens: {
			background: "#f8fafc",
			foreground: "#0f172a",
			card: "#ffffff",
			muted: "#64748b",
			primary: "#111827",
			accent: "#cbd5e1",
			border: "#dbe2ea",
			ring: "#1f2937",
		},
		scales: {
			radius: 12,
			sectionGap: 26,
			cardPadding: 22,
			shadowSoft: "0 10px 26px rgba(15,23,42,0.06)",
			shadowStrong: "0 16px 34px rgba(15,23,42,0.1)",
		},
		typography: {
			body: '"IBM Plex Sans", "Segoe UI", sans-serif',
			heading: '"IBM Plex Sans", "Segoe UI", sans-serif',
			bodyWeight: 500,
			headingWeight: 700,
			letterSpacing: "-0.01em",
		},
		preview: {
			gradient: "linear-gradient(120deg, #ffffff 0%, #f8fafc 60%, #eef2f7 100%)",
			foreground: "#0f172a",
			borderClass: "border-slate-300",
			swatches: ["#ffffff", "#f8fafc", "#111827"],
		},
	},
	sunset: {
		id: "sunset",
		label: "Sunset",
		description: "Warm cinematic contrast.",
		tokens: {
			background: "#fff7ed",
			foreground: "#7c2d12",
			card: "#ffffff",
			muted: "#9a3412",
			primary: "#ea580c",
			accent: "#fb7185",
			border: "#fdba74",
			ring: "#ea580c",
		},
		scales: {
			radius: 20,
			sectionGap: 28,
			cardPadding: 24,
			shadowSoft: "0 16px 36px rgba(194,65,12,0.16)",
			shadowStrong: "0 24px 58px rgba(249,115,22,0.26)",
		},
		typography: {
			body: '"Cormorant Garamond", Georgia, serif',
			heading: '"Cormorant Garamond", Georgia, serif',
			bodyWeight: 600,
			headingWeight: 700,
			letterSpacing: "-0.015em",
		},
		preview: {
			gradient:
				"linear-gradient(105deg, #f97316 0%, #fb7185 48%, #f59e0b 100%)",
			foreground: "#fff7ed",
			borderClass: "border-orange-300/80",
			swatches: ["#f97316", "#fb7185", "#f59e0b"],
		},
	},
	oceanic: {
		id: "oceanic",
		label: "Oceanic",
		description: "Cool blue spectrum with calm contrast.",
		tokens: {
			background: "#ecfeff",
			foreground: "#0f4c5c",
			card: "#ffffff",
			muted: "#155e75",
			primary: "#0284c7",
			accent: "#0ea5e9",
			border: "#bae6fd",
			ring: "#0284c7",
		},
		scales: {
			radius: 22,
			sectionGap: 28,
			cardPadding: 24,
			shadowSoft: "0 16px 34px rgba(2,132,199,0.12)",
			shadowStrong: "0 24px 56px rgba(2,132,199,0.2)",
		},
		typography: {
			body: '"Nunito Sans", "Trebuchet MS", sans-serif',
			heading: '"Nunito Sans", "Trebuchet MS", sans-serif',
			bodyWeight: 600,
			headingWeight: 800,
			letterSpacing: "-0.012em",
		},
		preview: {
			gradient:
				"linear-gradient(120deg, #0f4c5c 0%, #0284c7 52%, #0ea5e9 100%)",
			foreground: "#ecfeff",
			borderClass: "border-sky-300/80",
			swatches: ["#0f4c5c", "#0284c7", "#0ea5e9"],
		},
	},
} as const satisfies Record<string, ThemePreset>;

export type ThemeId = keyof typeof THEME_PRESETS;

export const DEFAULT_THEME_ID: ThemeId = "premiumEditorial";

export const getThemePreset = (themeId: ThemeId): ThemePreset => {
	return THEME_PRESETS[themeId] ?? THEME_PRESETS[DEFAULT_THEME_ID];
};

export const getThemeCssVariables = (themeId: ThemeId) => {
	const theme = getThemePreset(themeId);
	return {
		"--lpb-background": theme.tokens.background,
		"--lpb-foreground": theme.tokens.foreground,
		"--lpb-card": theme.tokens.card,
		"--lpb-muted": theme.tokens.muted,
		"--lpb-primary": theme.tokens.primary,
		"--lpb-accent": theme.tokens.accent,
		"--lpb-border": theme.tokens.border,
		"--lpb-ring": theme.tokens.ring,
		"--lpb-radius": `${theme.scales.radius}px`,
		"--lpb-gap": `${theme.scales.sectionGap}px`,
		"--lpb-card-padding": `${theme.scales.cardPadding}px`,
		"--lpb-shadow-soft": theme.scales.shadowSoft,
		"--lpb-shadow-strong": theme.scales.shadowStrong,
		"--lpb-font-body": theme.typography.body,
		"--lpb-font-heading": theme.typography.heading,
		"--lpb-letter-spacing": theme.typography.letterSpacing,
	};
};

export const serializeThemeCssVariables = (themeId: ThemeId) => {
	const vars = getThemeCssVariables(themeId);
	return Object.entries(vars)
		.map(([key, value]) => `${key}: ${value};`)
		.join("\n");
};

export const getBuilderCssVariables = (themeId: ThemeId) => {
	const theme = getThemePreset(themeId);
	return {
		"--background": theme.tokens.background,
		"--foreground": theme.tokens.foreground,
		"--card": theme.tokens.card,
		"--card-foreground": theme.tokens.foreground,
		"--popover": theme.tokens.card,
		"--popover-foreground": theme.tokens.foreground,
		"--primary": theme.tokens.primary,
		"--primary-foreground": theme.tokens.card,
		"--secondary": theme.tokens.card,
		"--secondary-foreground": theme.tokens.foreground,
		"--muted": theme.tokens.card,
		"--muted-foreground": theme.tokens.muted,
		"--accent": theme.tokens.accent,
		"--accent-foreground": theme.tokens.foreground,
		"--border": theme.tokens.border,
		"--input": theme.tokens.border,
		"--ring": theme.tokens.ring,
		"--radius": `${theme.scales.radius / 16}rem`,
		"--sidebar": theme.tokens.background,
		"--sidebar-foreground": theme.tokens.foreground,
		"--sidebar-primary": theme.tokens.primary,
		"--sidebar-primary-foreground": theme.tokens.card,
	};
};
