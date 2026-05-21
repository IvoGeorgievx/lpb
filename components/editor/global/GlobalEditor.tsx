import {
	BlockPropsMap,
	BlockType,
	defaultProps,
	DroppedItem,
} from "@/app/page";
import { ProductCard } from "@/components/blocks/ProductBlock";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Page, usePage } from "@/context/PageContext";

const THEME_BLOCK_ORDER: BlockType[] = [
	"header",
	"hero",
	"product",
	"testimonial",
	"footer",
];

const THEME_FONTS = {
	elegant: '"Playfair Display", "Times New Roman", serif',
	dark: '"Space Grotesk", "Segoe UI", sans-serif',
	brutalist: '"Archivo Black", Impact, "Arial Black", sans-serif',
	playful: '"Baloo 2", "Trebuchet MS", "Comic Sans MS", sans-serif',
} as const;

export type AnyDroppedItem = {
	[K in BlockType]: {
		id: string;
		type: K;
		timestamp: number;
		props: BlockPropsMap[K];
	};
}[BlockType];
const cloneDefaultProps = <T extends BlockType>(type: T) => {
	return structuredClone(defaultProps[type]);
};

const buildOrderedBlocks = (currentBlocks: DroppedItem[]): DroppedItem[] => {
	const now = Date.now();

	return THEME_BLOCK_ORDER.map((type, index) => {
		const existing = currentBlocks.find((block) => block.type === type);

		if (existing) {
			return existing;
		}

		return {
			id: `${type}-${now + index}`,
			type,
			timestamp: now + index,
			props: cloneDefaultProps(type),
		};
	});
};

const withOrderedBlocks = (
	prev: Page,
	mapper: (blocks: DroppedItem[]) => DroppedItem[],
): Page => {
	const orderedBlocks = buildOrderedBlocks(prev.blocks);
	return {
		...prev,
		blocks: mapper(orderedBlocks),
	};
};

export const GlobalEditor = () => {
	const { setPage } = usePage();

	const applyElegantTheme = () => {
		setPage((prev: Page) =>
			withOrderedBlocks(prev, (blocks) =>
				blocks.map((rawBlock) => {
					const block = rawBlock as AnyDroppedItem;
					switch (block.type) {
						case "header":
							return {
								...block,
								props: {
									...block.props,
									logoText: "Atelier Studio",
									cta: {
										text: "Book a Demo",
										paddingX: 20,
										paddingY: 11,
										radius: 999,
										backgroundColor: "#0f172a",
										link: "#",
										color: "#ffffff",
									},
									style: {
										...block.props.style,
										height: 84,
										padding: 14,
										fontFamily: THEME_FONTS.elegant,
										background:
											"linear-gradient(120deg, #f8fafc 0%, #eef2ff 55%, #e2e8f0 100%)",
										color: "#0f172a",
										border: "1px solid rgba(15,23,42,0.08)",
										boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
									},
								},
							};
						case "hero":
							return {
								...block,
								props: {
									...block.props,

									style: {
										...block.props.style,
										background:
											"linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
										fontFamily: THEME_FONTS.elegant,
									},
									headingColor: "#0f172a",
									subheadingColor: "#475569",
									headingFontSize: 58,
									subheadingFontSize: 22,
									headingWeight: 800,
									cta: {
										...block.props.cta,
										bgColor: "#111827",
										radius: 999,
									},
								},
							};

						case "product":
							return {
								...block,
								props: {
									...block.props,
									background: "#f8fafc",
									cards: (block.props.cards ?? []).map((card: ProductCard) => ({
										...card,
										variant: "outlined",
										style: {
											...card.style,
											background: "#ffffff",
											fontFamily: THEME_FONTS.elegant,
											border: "1px solid #e2e8f0",
											borderRadius: 28,
											boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
										},
										heading: {
											...card.heading,
											color: "#0f172a",
											fontWeight: 700,
										},
										subheading: {
											...card.subheading,
											color: "#475569",
										},
									})),
								},
							};

						case "testimonial":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										fontFamily: THEME_FONTS.elegant,
									},
									carousel: {
										...(block.props.carousel ?? { type: "default" as const }),
										slides: (block.props.carousel?.slides ?? []).map(
											(slide) => ({
												...slide,
												bgColor: "#ffffff",
											}),
										),
									},
								},
							};

						default:
							return block;
					}
				}),
			),
		);
	};

	const applyDarkTheme = () => {
		setPage((prev: Page) =>
			withOrderedBlocks(prev, (blocks) =>
				blocks.map((rawBlock) => {
					const block = rawBlock as AnyDroppedItem;
					switch (block.type) {
						case "header":
							return {
								...block,
								props: {
									...block.props,
									logoText: "NEON/CTRL",
									cta: {
										text: "Launch",
										paddingX: 18,
										paddingY: 10,
										radius: 10,
										backgroundColor: "#7c3aed",
										link: "#",
										color: "#ffffff",
									},
									style: {
										...block.props.style,
										height: 78,
										padding: 12,
										fontFamily: THEME_FONTS.dark,
										background:
											"linear-gradient(120deg, #020617 0%, #111827 65%, #1f2937 100%)",
										color: "#f8fafc",
										border: "1px solid rgba(124,58,237,0.45)",
										boxShadow: "0 0 28px rgba(124,58,237,0.25)",
									},
								},
							};
						case "hero":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										background:
											"linear-gradient(to bottom right, #020617, #111827)",
										fontFamily: THEME_FONTS.dark,
									},
									headingColor: "#ffffff",
									subheadingColor: "#cbd5e1",
									cta: {
										...block.props.cta,
										bgColor: "#7c3aed",
									},
								},
							};

						case "product":
							return {
								...block,
								props: {
									...block.props,
									background: "#020617",
									cards: (block.props.cards ?? []).map((card: ProductCard) => ({
										...card,
										variant: "glass",
										style: {
											...card.style,
											fontFamily: THEME_FONTS.dark,
											background: "rgba(17,24,39,0.7)",
											backdropFilter: "blur(12px)",
											border: "1px solid rgba(255,255,255,0.08)",
											borderRadius: 24,
											boxShadow: "0 0 30px rgba(124,58,237,0.2)",
										},
										heading: {
											...card.heading,
											color: "#ffffff",
										},
										subheading: {
											...card.subheading,
											color: "#cbd5e1",
										},
									})),
								},
							};

						case "footer":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										fontFamily: THEME_FONTS.dark,
									},
								},
							};

						case "testimonial":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										fontFamily: THEME_FONTS.dark,
									},
								},
							};

						default:
							return block;
					}
				}),
			),
		);
	};

	const applyBrutalistTheme = () => {
		setPage((prev: Page) =>
			withOrderedBlocks(prev, (blocks) =>
				blocks.map((rawBlock) => {
					const block = rawBlock as AnyDroppedItem;
					switch (block.type) {
						case "hero":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										background: "#f4f4f5",
										fontFamily: THEME_FONTS.brutalist,
									},
									headingColor: "#000",
									subheadingColor: "#18181b",
									headingFontSize: 64,
									headingWeight: 900,
									cta: {
										...block.props.cta,
										bgColor: "#000",
										radius: 0,
									},
								},
							};

						case "product":
							return {
								...block,
								props: {
									...block.props,
									background: "#f4f4f5",
									cards: (block.props.cards ?? []).map((card: ProductCard) => ({
										...card,
										variant: "outlined",
										style: {
											...card.style,
											fontFamily: THEME_FONTS.brutalist,
											background: "#fff",
											border: "3px solid black",
											borderRadius: 0,
											boxShadow: "8px 8px 0px black",
										},
										heading: {
											...card.heading,
											color: "#000",
											fontWeight: 900,
										},
										subheading: {
											...card.subheading,
											color: "#111",
										},
									})),
								},
							};

						case "header":
							return {
								...block,
								props: {
									...block.props,
									logoText: "BOLD/BUILD",
									cta: {
										text: "START NOW",
										paddingX: 16,
										paddingY: 10,
										radius: 0,
										backgroundColor: "#000000",
										link: "#",
										color: "#ffffff",
									},
									style: {
										...block.props.style,
										height: 86,
										padding: 10,
										fontFamily: THEME_FONTS.brutalist,
										background: "#facc15",
										borderRadius: 0,
										color: "#000000",
										border: "3px solid #000000",
										boxShadow: "10px 10px 0px #000000",
									},
								},
							};

						case "testimonial":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										fontFamily: THEME_FONTS.brutalist,
									},
								},
							};

						default:
							return block;
					}
				}),
			),
		);
	};

	const applyPlayfulTheme = () => {
		setPage((prev: Page) =>
			withOrderedBlocks(prev, (blocks) =>
				blocks.map((rawBlock) => {
					const block = rawBlock as AnyDroppedItem;
					switch (block.type) {
						case "hero":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										background: "linear-gradient(to right, #ec4899, #8b5cf6)",
										fontFamily: THEME_FONTS.playful,
									},
									headingColor: "#fff",
									subheadingColor: "#f3f4f6",
									cta: {
										...block.props.cta,
										bgColor: "#fff",
									},
								},
							};

						case "product":
							return {
								...block,
								props: {
									...block.props,
									background: "#faf5ff",
									cards: (block.props.cards ?? []).map((card: ProductCard) => ({
										...card,
										variant: "featured",
										style: {
											...card.style,
											fontFamily: THEME_FONTS.playful,
											background: "#ffffff",
											borderRadius: 32,
											boxShadow: "0 20px 40px rgba(139,92,246,0.15)",
										},
										heading: {
											...card.heading,
											color: "#581c87",
										},
										subheading: {
											...card.subheading,
											color: "#6b7280",
										},
									})),
								},
							};

						case "header":
							return {
								...block,
								props: {
									...block.props,
									logoText: "JoyPixel",
									cta: {
										text: "Join Free",
										paddingX: 20,
										paddingY: 10,
										radius: 999,
										backgroundColor: "#ffffff",
										link: "#",
										color: "#6d28d9",
									},
									style: {
										...block.props.style,
										height: 82,
										padding: 12,
										fontFamily: THEME_FONTS.playful,
										background:
											"linear-gradient(90deg, #f472b6 0%, #a855f7 55%, #6366f1 100%)",
										color: "#ffffff",
										border: "1px solid rgba(255,255,255,0.4)",
										boxShadow: "0 16px 34px rgba(168,85,247,0.3)",
									},
								},
							};

						case "testimonial":
							return {
								...block,
								props: {
									...block.props,
									style: {
										...block.props.style,
										fontFamily: THEME_FONTS.playful,
									},
								},
							};

						default:
							return block;
					}
				}),
			),
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<Label>Choose Predefined Styles.</Label>

			<Button onClick={applyElegantTheme}>Elegant</Button>

			<Button onClick={applyDarkTheme}>Dark Neon</Button>

			<Button onClick={applyBrutalistTheme}>Brutalist</Button>

			<Button onClick={applyPlayfulTheme}>Playful</Button>
		</div>
	);
};
