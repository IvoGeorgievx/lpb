"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { CtaBlock, CtaBlockProps } from "@/components/blocks/CtaBlock";
import { EmbedBlock, EmbedBlockProps } from "@/components/blocks/EmbedBlock";
import { FooterBlock, FooterBlockProps } from "@/components/blocks/FooterBlock";
import Header, { HeaderBlockProps } from "@/components/blocks/HeaderBlock";
import HeroBlock, { HeroBlockProps } from "@/components/blocks/HeroBlock";
import ProductBlock, {
	ProductBlockProps,
} from "@/components/blocks/ProductBlock";
import {
	SectionSeparatorBlock,
	SectionSeparatorBlockProps,
} from "@/components/blocks/SectionSeparatorBlock";
import {
	TestimonialBlock,
	TestimonialBlockProps,
} from "@/components/blocks/TestimonialBlock";
import { Editor } from "@/components/editor/Editor";
import Renderer from "@/components/renderer/Renderer";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EditorContext } from "@/context/EditorContext";
import { PageContext, usePage } from "@/context/PageContext";
import { exportToHTML } from "@/lib/export";
import {
	DEFAULT_THEME_ID,
	getBuilderCssVariables,
	getThemePreset,
	ThemeId,
} from "@/lib/theme";
import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";
import {
	ComponentType,
	ReactNode,
	type SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";

export type BlockType =
	| "header"
	| "hero"
	| "cta"
	| "embed"
	| "product"
	| "footer"
	| "separator"
	| "testimonial";
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
export type DroppedItem<T extends BlockType = BlockType> = {
	id: string;
	type: T;
	timestamp: number;
	props: BlockPropsMap[T];
};

type UpdatePayload = { id: string } & Pick<DroppedItem, "props">;

export const getThemeDefaultProps = (themeId: ThemeId): BlockPropsMap => {
	const theme = getThemePreset(themeId);
	const blockTheme = theme.blockOverrides;
	const baseCardStyle = {
		borderRadius: theme.scales.radius,
		padding: theme.scales.cardPadding,
		boxShadow: theme.scales.shadowSoft,
	} as const;
	const now = Date.now();

	return {
		header: {
			logoText: blockTheme?.header?.logoText ?? "Atelier Studio",
			cta: {
				text: blockTheme?.header?.ctaText ?? "Book a Demo",
				paddingX: 20,
				paddingY: 10,
				backgroundColor: blockTheme?.header?.ctaBackground ?? theme.tokens.card,
				radius: 999,
				link: "#",
				color: blockTheme?.header?.ctaColor ?? theme.tokens.primary,
			},
			style: {
				height: 80,
				padding: 12,
				color: blockTheme?.header?.color ?? theme.tokens.foreground,
				fontFamily: theme.typography.body,
				background:
					blockTheme?.header?.background ??
					`linear-gradient(120deg, ${theme.tokens.primary}, ${theme.tokens.foreground})`,
				border: `1px solid ${theme.tokens.border}`,
				boxShadow: theme.scales.shadowSoft,
			},
		},
		hero: {
			title: "Hero section",
			style: {
				height: "50vh",
				background:
					blockTheme?.hero?.background ??
					`linear-gradient(120deg, ${theme.tokens.primary}, ${theme.tokens.foreground})`,
				fontFamily: theme.typography.body,
			},
			heading:
				blockTheme?.hero?.heading ??
				"Design pages that feel undeniably premium",
			subheading:
				blockTheme?.hero?.subheading ??
				"Build high-converting, editorial-grade landing pages with complete control.",
			headingAnimation: "fade-in",
			headingFontSize: 46,
			subheadingFontSize: 22,
			subHeadingAnimation: "fade-in",
			headingWeight: theme.typography.headingWeight,
			subheadingWeight: theme.typography.bodyWeight,
			headingColor: blockTheme?.hero?.headingColor ?? theme.tokens.card,
			subheadingColor: blockTheme?.hero?.subheadingColor ?? "#e2e8f0",
			preset: {
				layout: "center",
				textAlign: "center",
				showImage: true,
				imagePosition: "background",
			},
			cta: {
				text: blockTheme?.hero?.ctaText ?? "Start Free",
				bgColor: blockTheme?.hero?.ctaBackground ?? theme.tokens.card,
				paddingX: 20,
				paddingY: 12,
				radius: 999,
				fontSize: 16,
				border: false,
				textColor: blockTheme?.hero?.ctaColor ?? theme.tokens.primary,
				boxShadow: {
					shadowBlur: 16,
					shadowIntensity: 0.24,
				},
			},
		},
		cta: {
			heading:
				blockTheme?.cta?.heading ??
				"Ship a stronger first impression in hours",
			subheading:
				blockTheme?.cta?.subheading ??
				"Start from polished sections, refine your story quickly, and launch with confidence.",
			button: {
				text: blockTheme?.cta?.buttonText ?? "Request Access",
				link: "#",
				backgroundColor: blockTheme?.cta?.buttonBackground ?? theme.tokens.card,
				color: blockTheme?.cta?.buttonColor ?? theme.tokens.primary,
				radius: 999,
				paddingX: 24,
				paddingY: 12,
			},
			style: {
				fontFamily: theme.typography.body,
				background:
					blockTheme?.cta?.background ??
					`linear-gradient(120deg, ${theme.tokens.primary}, ${theme.tokens.foreground})`,
				borderTop: `1px solid ${theme.tokens.border}`,
				borderBottom: `1px solid ${theme.tokens.border}`,
			},
		},
		embed: {
			src: "",
			title: "Embedded content",
			height: 520,
			loading: "lazy",
			allowFullScreen: true,
			showContentPanel: false,
			contentHeading: "Why this embed matters",
			contentParagraph:
				"Use this area to add context before users interact with the embedded content.",
			contentBullets: [
				"Highlight key outcomes",
				"Add short setup notes",
				"Include one clear call to action",
			],
		},
		product: {
			background: blockTheme?.product?.background ?? theme.tokens.background,
			cards: [
				{
					id: String(now),
					iconClass: "lucide lucide-award",
					heading: {
						content: "Pro Flow Subscription",
						fontSize: 22,
						fontWeight: theme.typography.headingWeight,
						color: blockTheme?.product?.headingColor ?? theme.tokens.foreground,
					},
					subheading: {
						content:
							"Everything your team needs to build beautiful landing pages.",
						fontSize: 15,
						color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
					},
					style: {
						background: blockTheme?.product?.cardPrimary ?? theme.tokens.card,
						minHeight: 320,
						...baseCardStyle,
					},
					additionalContent: [
						{
							content: "Unlimited sections, templates, and export options.",
							fontSize: 14,
							color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
						},
						{
							content: "Priority support and full design control.",
							fontSize: 14,
							color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
						},
					],
					variant: "featured",
				},
				{
					id: String(now + 1),
					iconClass: "lucide lucide-rocket",
					heading: {
						content: "Starter Plan",
						fontSize: 20,
						fontWeight: theme.typography.headingWeight,
						color: blockTheme?.product?.headingColor ?? theme.tokens.foreground,
					},
					subheading: {
						content: "A lightweight plan for individuals and small teams.",
						fontSize: 14,
						color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
					},
					style: {
						background:
							blockTheme?.product?.cardSecondary ?? theme.tokens.background,
						minHeight: 300,
						...baseCardStyle,
					},
					additionalContent: [
						{
							content: "Affordable monthly pricing.",
							fontSize: 14,
							color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
						},
						{
							content: "Easy setup and quick deployment.",
							fontSize: 14,
							color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
						},
					],
					variant: "default",
				},
				{
					id: String(now + 2),
					iconClass: "lucide lucide-briefcase",
					heading: {
						content: "Enterprise",
						fontSize: 20,
						fontWeight: theme.typography.headingWeight,
						color: blockTheme?.product?.headingColor ?? theme.tokens.foreground,
					},
					subheading: {
						content: "Custom solutions for high-growth businesses.",
						fontSize: 14,
						color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
					},
					style: {
						background: blockTheme?.product?.cardPrimary ?? theme.tokens.card,
						minHeight: 300,
						...baseCardStyle,
					},
					additionalContent: [
						{
							content: "Dedicated onboarding and integrations.",
							fontSize: 14,
							color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
						},
						{
							content: "Team-based security and analytics.",
							fontSize: 14,
							color: blockTheme?.product?.subheadingColor ?? theme.tokens.muted,
						},
					],
					variant: "outlined",
				},
			],
		},
		footer: {
			layout: {
				columns: 2,
			},
			copyright:
				blockTheme?.footer?.copyright ??
				"(c) 2026 Atelier Studio. Crafted with intention.",
			style: {
				height: "22vh",
				color: blockTheme?.footer?.color ?? theme.tokens.card,
				fontFamily: theme.typography.body,
			},
			links: [
				{ label: "Facebook", href: "" },
				{ label: "Instagram", href: "" },
				{ label: "LinkedIn", href: "" },
				{ label: "Youtube", href: "" },
			],
			background:
				blockTheme?.footer?.background ??
				`linear-gradient(120deg, ${theme.tokens.primary}, ${theme.tokens.foreground})`,
		},
		separator: {
			flipY: true,
			fill: theme.tokens.accent,
		},
		testimonial: {
			style: {
				background:
					blockTheme?.testimonial?.background ??
					`linear-gradient(120deg, ${theme.tokens.primary}, ${theme.tokens.foreground})`,
			},
			carousel: {
				type: "default",
				slides: [
					{
						heading: '"This builder made our launch feel effortless."',
						subheading:
							"Every team member can update content, and the polished testimonial section now feels like a product page.",
						author: "Maya Carter, VP of Marketing",
						bgColor:
							blockTheme?.testimonial?.slidePrimary ??
							"linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
					},
					{
						heading:
							'"We shipped assets faster with the new content blocks."',
						subheading:
							"The carousel helps stories land stronger and gives our homepage a much more confident rhythm.",
						author: "Jordan Kim, Design Lead",
						bgColor:
							blockTheme?.testimonial?.slideSecondary ??
							"linear-gradient(160deg, #f8fafc 0%, #eef2ff 100%)",
					},
					{
						heading:
							'"The editing experience is simple, but the result feels premium."',
						subheading:
							"Clients love the visual polish, and our team can keep the page updated without design support.",
						author: "Lila Patel, Founder",
						bgColor:
							blockTheme?.testimonial?.slidePrimary ??
							"linear-gradient(160deg, #ffffff 0%, #f1f5f9 100%)",
					},
				],
			},
		},
	};
};

export const defaultProps: BlockPropsMap = getThemeDefaultProps(DEFAULT_THEME_ID);

export const COMPONENT_MAP: Record<BlockType, ComponentType> = {
	header: Header,
	hero: HeroBlock,
	cta: CtaBlock,
	embed: EmbedBlock,
	product: ProductBlock,
	footer: FooterBlock,
	separator: SectionSeparatorBlock,
	testimonial: TestimonialBlock,
};

function CanvasItem({
	item,
	selectedBlock,
	selectedItem,
}: {
	item: DroppedItem;
	selectedBlock?: DroppedItem;
	selectedItem: (item: DroppedItem) => void;
}) {
	const draggable = useDraggable({ id: item.id });
	const droppable = useDroppable({ id: item.id });

	const setRefs = (node: HTMLElement | null) => {
		draggable.ref(node);
		droppable.ref(node);
	};

	return (
		<div
			ref={setRefs}
			style={{ opacity: draggable.isDragging ? 0.75 : 1 }}
			className={`w-full cursor-grab transition ${
				selectedBlock?.id === item.id
					? "border-2 border-primary"
					: "border-transparent"
			} ${droppable.isDropTarget ? "bg-accent/40" : "bg-transparent"}`}
			onClick={() => selectedItem(item)}
		>
			<Renderer item={item} />
		</div>
	);
}

function DroppableZone({
	items,
	children,
	selectedItem,
	selectedBlock,
}: {
	items: DroppedItem[];
	selectedItem: (item: DroppedItem) => void;
	children?: ReactNode;
	selectedBlock?: DroppedItem;
}) {
	const { ref } = useDroppable({ id: "droppable" });
	const { setPage } = usePage();

	useEffect(() => {
		setPage((prev) => ({ ...prev, blocks: items }));
	}, [items, setPage]);

	return (
		<div
			ref={ref}
			className="w-full min-h-[90vh] relative flex flex-col items-center pt-4 bg-background"
		>
			{items.length > 0 ? (
				items.map((item) => (
					<CanvasItem
						key={item.id}
						item={item}
						selectedBlock={selectedBlock}
						selectedItem={selectedItem}
					/>
				))
			) : (
				<div className="text-center text-muted-foreground">Drop here</div>
			)}
			{children}
		</div>
	);
}

export default function Home() {
	const [items, setItems] = useState<DroppedItem[]>([]);
	const [activeTheme, setActiveTheme] = useState<ThemeId>(DEFAULT_THEME_ID);
	const [selectedBlock, setSelectedBlock] = useState<DroppedItem | undefined>(
		undefined,
	);
	const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

	useEffect(() => {
		const media = window.matchMedia("(min-width: 1024px)");
		const update = () => setIsDesktop(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		const themeVars = getBuilderCssVariables(activeTheme);
		Object.entries(themeVars).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}, [activeTheme]);

	const updatePropsData = (data: UpdatePayload) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== data.id) return item;
				const newProps = {
					...item.props,
					...data.props,
				};

				if (data.props.style) {
					newProps.style = {
						...item.props.style,
						...data.props.style,
					};
				}

				return { ...item, props: newProps };
			}),
		);
	};

	const activeBlock = items.find((it) => it.id === selectedBlock?.id);

	const syncItemsFromPage = useCallback(
		(
			nextPage: SetStateAction<{
				blocks: DroppedItem[];
				activeTheme: ThemeId;
			}>,
		) => {
			if (typeof nextPage === "function") {
				setItems((prevItems) => {
					const resolved = (
						nextPage as (prevState: {
							blocks: DroppedItem[];
							activeTheme: ThemeId;
						}) => {
							blocks: DroppedItem[];
							activeTheme: ThemeId;
						}
					)({ blocks: prevItems, activeTheme });
					setActiveTheme(resolved.activeTheme);
					return resolved.blocks;
				});
				return;
			}

			setItems(nextPage.blocks);
			setActiveTheme(nextPage.activeTheme);
		},
		[activeTheme],
	);

	if (isDesktop === null) {
		return (
			<div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
				<div className="text-sm text-muted-foreground">Loading editor...</div>
			</div>
		);
	}

	if (!isDesktop) {
		return (
			<div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-6">
				<div className="max-w-xl w-full rounded-2xl border border-border bg-card/90 p-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						Desktop Required
					</h1>
					<p className="mt-3 text-muted-foreground leading-relaxed">
						This landing page builder is currently optimized for desktop only.
						Please open it on a larger screen to continue editing.
					</p>
				</div>
			</div>
		);
	}

	return (
		<PageContext.Provider
			value={{
				page: { blocks: items, activeTheme },
				setPage: syncItemsFromPage,
			}}
		>
			<DragDropProvider
				onDragEnd={(event) => {
					if (event.canceled) return;

					const { source, target } = event.operation;
					const sourceId = String(source?.id || "");
					const targetId = String(target?.id || "");
					const sourceIsCanvasItem = items.some((item) => item.id === sourceId);
					const targetIsCanvasItem = items.some((item) => item.id === targetId);

					if (sourceIsCanvasItem) {
						if (targetId === "sidebar-remove") {
							setItems((prev) => prev.filter((item) => item.id !== sourceId));
							setSelectedBlock((prev) =>
								prev?.id === sourceId ? undefined : prev,
							);
							return;
						}

						setItems((prev) => {
							const sourceIndex = prev.findIndex(
								(item) => item.id === sourceId,
							);
							const targetIndex = targetIsCanvasItem
								? prev.findIndex((item) => item.id === targetId)
								: prev.length - 1;

							if (
								sourceIndex === -1 ||
								targetIndex === -1 ||
								sourceIndex === targetIndex
							) {
								return prev;
							}

							const next = [...prev];
							const [moved] = next.splice(sourceIndex, 1);
							next.splice(targetIndex, 0, moved);
							return next;
						});
						return;
					}

					if (target?.id === "droppable" || targetIsCanvasItem) {
						const type = String(source!.id) as BlockType;
						const themeDefaults = getThemeDefaultProps(activeTheme);
						const newItem: DroppedItem = {
							id: `${type}-${Date.now()}`,
							type,
							timestamp: Date.now(),
							props: structuredClone(themeDefaults[type]),
						};

						setItems((prev) => {
							if (targetIsCanvasItem) {
								const targetIndex = prev.findIndex(
									(item) => item.id === targetId,
								);
								if (targetIndex >= 0) {
									const next = [...prev];
									next.splice(targetIndex, 0, newItem);
									return next;
								}
							}

							return [...prev, newItem];
						});

						setSelectedBlock(newItem);
					}
				}}
			>
				<SidebarProvider>
					<AppSidebar items={items} activeTheme={activeTheme} />
					<div className="app-canvas-shell">
						<div className="app-canvas w-full">
							<DroppableZone
								selectedItem={(item) => setSelectedBlock(item)}
								items={items}
								selectedBlock={selectedBlock}
							/>
						</div>
					</div>
					<div className="app-editor-panel p-4 flex flex-col">
						<Button
							variant="outline"
							onClick={() => exportToHTML(items, activeTheme)}
							className="mb-4"
						>
							Export
						</Button>
						<EditorContext.Provider
							value={{
								item: activeBlock,
								onPropsChange(payload) {
									updatePropsData(payload);
								},
							}}
						>
							<Editor />
						</EditorContext.Provider>
					</div>
				</SidebarProvider>
			</DragDropProvider>
		</PageContext.Provider>
	);
}

