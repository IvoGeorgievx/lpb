import type { ComponentType } from "react";
import Header, { HeaderBlockProps } from "@/components/blocks/HeaderBlock";
import HeroBlock, { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { CtaBlock, CtaBlockProps } from "@/components/blocks/CtaBlock";
import { EmbedBlock, EmbedBlockProps } from "@/components/blocks/EmbedBlock";
import ProductBlock, {
	ProductBlockProps,
} from "@/components/blocks/ProductBlock";
import { FooterBlock, FooterBlockProps } from "@/components/blocks/FooterBlock";
import {
	SectionSeparatorBlock,
	SectionSeparatorBlockProps,
} from "@/components/blocks/SectionSeparatorBlock";
import {
	TestimonialBlock,
	TestimonialBlockProps,
} from "@/components/blocks/TestimonialBlock";

export type BlockPropsMap = {
	header: HeaderBlockProps;
	hero: HeroBlockProps;
	cta: CtaBlockProps;
	embed: EmbedBlockProps;
	product: ProductBlockProps;
	footer: FooterBlockProps;
	separator: SectionSeparatorBlockProps;
	testimonial: TestimonialBlockProps;
};
export type BlockType = keyof BlockPropsMap;
export type DroppedItem<T extends BlockType = BlockType> = {
	[K in T]: {
		id: string;
		type: K;
		timestamp: number;
		props: BlockPropsMap[K];
	};
}[T];

// Components accept optional props; the registry is shared by canvas and export.
export const COMPONENT_MAP: {
	[K in BlockType]: ComponentType<BlockPropsMap[K]>;
} = {
	header: Header,
	hero: HeroBlock,
	cta: CtaBlock,
	embed: EmbedBlock,
	product: ProductBlock,
	footer: FooterBlock,
	separator: SectionSeparatorBlock,
	testimonial: TestimonialBlock,
};

export function renderBlock(item: DroppedItem) {
	switch (item.type) {
		case "header":
			return <COMPONENT_MAP.header {...item.props} />;
		case "hero":
			return <COMPONENT_MAP.hero {...item.props} />;
		case "cta":
			return <COMPONENT_MAP.cta {...item.props} />;
		case "embed":
			return <COMPONENT_MAP.embed {...item.props} />;
		case "product":
			return <COMPONENT_MAP.product {...item.props} />;
		case "footer":
			return <COMPONENT_MAP.footer {...item.props} />;
		case "separator":
			return <COMPONENT_MAP.separator {...item.props} />;
		case "testimonial":
			return <COMPONENT_MAP.testimonial {...item.props} />;
	}
}
export const BLOCK_LABELS: Record<BlockType, string> = {
	header: "Header",
	hero: "Hero",
	cta: "Call to action",
	embed: "Embed",
	product: "Features",
	footer: "Footer",
	separator: "Separator",
	testimonial: "Testimonials",
};

// Theme variables change appearance without rewriting the document's content.
export const getThemeDefaultProps = (): BlockPropsMap => ({
	header: {
		logoText: "Atelier Studio",
		showCta: true,
		cta: {
			text: "Get in touch",
			link: "#contact",
			paddingX: 20,
			paddingY: 10,
			backgroundColor: "var(--lpb-primary)",
			color: "var(--lpb-card)",
			radius: 999,
		},
		style: {
			height: 80,
			background: "var(--lpb-background)",
			color: "var(--lpb-foreground)",
			borderBottom: "1px solid var(--lpb-border)",
		},
	},
	hero: {
		heading: "A considered home for your next idea.",
		subheading:
			"Make your story clear. Shape a page that is yours, from the first word to the final detail.",
		headingFontSize: 52,
		subheadingFontSize: 19,
		headingWeight: 700,
		headingColor: "var(--lpb-foreground)",
		subheadingColor: "var(--lpb-muted)",
		style: { minHeight: "60vh", background: "var(--lpb-background)" },
		cta: {
			text: "Let’s talk",
			link: "#contact",
			bgColor: "var(--lpb-primary)",
			textColor: "var(--lpb-card)",
			paddingX: 24,
			paddingY: 14,
			radius: 999,
			fontSize: 16,
		},
	},
	cta: {
		id: "contact",
		heading: "Have something in mind?",
		subheading: "Tell us about your project. We’ll take it from there.",
		button: {
			text: "Start a conversation",
			link: "mailto:hello@example.com",
			backgroundColor: "var(--lpb-primary)",
			color: "var(--lpb-card)",
			radius: 999,
			paddingX: 24,
			paddingY: 14,
		},
		style: { background: "var(--lpb-background)" },
	},
	embed: {
		src: "",
		title: "Embedded content",
		height: 420,
		loading: "lazy",
		allowFullScreen: true,
	},
	product: {
		background: "var(--lpb-background)",
		cards: [
			{
				id: "clarity",
				iconClass: "lucide lucide-award",
				heading: { content: "Clarity comes first" },
				subheading: {
					content:
						"A focused message, a thoughtful structure, and a clear next step.",
				},
				variant: "default",
			},
			{
				id: "craft",
				iconClass: "lucide lucide-briefcase",
				heading: { content: "Details make the difference" },
				subheading: {
					content:
						"Typography, rhythm, and color working together—not competing for attention.",
				},
				variant: "default",
			},
			{
				id: "ownership",
				iconClass: "lucide lucide-rocket",
				heading: { content: "Yours to take anywhere" },
				subheading: {
					content:
						"A page you own, ready for your existing website or any static host.",
				},
				variant: "default",
			},
		],
	},
	footer: {
		logo: { text: "Atelier Studio" },
		copyright: "© 2026 Atelier Studio. Example website.",
		background: "var(--lpb-foreground)",
		style: { color: "var(--lpb-background)" },
		links: [
			{ label: "Get in touch", href: "mailto:hello@example.com" },
			{ label: "Back to top", href: "#top" },
		],
	},
	separator: { fill: "var(--lpb-accent)", flipY: true },
	testimonial: {
		style: { background: "var(--lpb-background)" },
		carousel: {
			type: "default",
			slides: [
				{
					heading:
						"“Thoughtful from the first conversation to the final detail.”",
					subheading:
						"Example testimonial. Replace this with a real customer story before publishing.",
					author: "Sample client · Example content",
					bgColor: "var(--lpb-card)",
				},
				{
					heading: "“A clearer story and a page that feels like us.”",
					subheading:
						"Example testimonial. Your customers’ own words belong here.",
					author: "Sample client · Example content",
					bgColor: "var(--lpb-card)",
				},
			],
		},
	},
});

export function createBlock(
	type: BlockType,
	existingBlocks: DroppedItem[],
): DroppedItem {
	const id = crypto.randomUUID();
	const props = structuredClone(getThemeDefaultProps()[type]);
	// The first CTA owns #contact; additional sections need independent anchors.
	if (type === "cta")
		props.id = existingBlocks.some((block) => block.props.id === "contact")
			? `contact-${id}`
			: "contact";
	// The props were selected with the same discriminant from the typed defaults map.
	return { id, type, timestamp: Date.now(), props } as DroppedItem;
}
