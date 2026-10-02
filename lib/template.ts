import {
	getThemeDefaultProps,
	type BlockType,
	type DroppedItem,
} from "./blocks";
import { DEFAULT_THEME_ID, type ThemeId } from "./theme";
import type { Page } from "./document";

// Original illustration is embedded: the starter needs no remote image service.
const illustration = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><rect width="1200" height="720" fill="#142b45"/><g fill="none" stroke="#adc0ce" stroke-width="2" opacity=".2"><path d="M0 600h1200M0 480h1200M0 360h1200M0 240h1200M120 0v720M360 0v720M600 0v720M840 0v720M1080 0v720"/><path d="M820 720V260a180 180 0 0 1 360 0v460M850 720V260a150 150 0 0 1 300 0v460M880 720V260a120 120 0 0 1 240 0v460M910 720V260a90 90 0 0 1 180 0v460"/></g><circle cx="1020" cy="120" r="42" fill="#d9b678" opacity=".6"/></svg>`;
export const STARTER_IMAGE = `data:image/svg+xml,${encodeURIComponent(illustration)}`;

export function createTemplate(activeTheme: ThemeId = DEFAULT_THEME_ID): Page {
	const defaults = getThemeDefaultProps();
	const order: BlockType[] = ["header", "hero", "product", "cta", "footer"];
	const blocks = order.map(
		(type, index) =>
			({
				id: `starter-${type}`,
				type,
				timestamp: index,
				props: structuredClone(defaults[type]),
			}) as DroppedItem,
	);
	const hero = blocks.find((block) => block.type === "hero");
	if (hero)
		hero.props = {
			...defaults.hero,
			heading: "Good spaces start with a conversation.",
			subheading:
				"Atelier is an independent design studio shaping thoughtful identities and digital spaces. Built around your story, made to last.",
			style: {
				minHeight: "65vh",
				background: "#142b45",
				backgroundImage: `url("${STARTER_IMAGE}")`,
			},
			headingColor: "#f9f6ef",
			subheadingColor: "#d4dce5",
			cta: {
				...defaults.hero.cta,
				text: "Discuss your project",
				link: "#contact",
				bgColor: "#d9b678",
				textColor: "#142b45",
			},
		};
	return {
		blocks,
		activeTheme,
		title: "Atelier Studio — Thoughtful design",
		description:
			"An example landing page for an independent design studio. Created with Landing Page Builder.",
	};
}
