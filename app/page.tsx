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
import { SidebarProvider } from "@/components/ui/sidebar";
import { EditorContext } from "@/context/EditorContext";
import { PageContext, usePage } from "@/context/PageContext";
import { exportToHTML } from "@/lib/export";
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

export const defaultProps: BlockPropsMap = {
	header: {
		logoText: "Aether Studio",
		cta: {
			text: "Start Free",
			paddingX: 18,
			paddingY: 10,
			backgroundColor: "#ffffff",
			radius: 999,
			link: "#",
			color: "#0f172a",
		},
		style: {
			height: 80,
			padding: 12,
			color: "#ffffff",
			background:
				"radial-gradient(800px 220px at 10% -40%, rgba(148,163,184,0.35), transparent), linear-gradient(120deg, #0f172a, #1e293b 60%, #334155)",
			border: "1px solid rgba(255,255,255,0.14)",
			boxShadow: "0 16px 34px rgba(15,23,42,0.22)",
		},
	},
	hero: {
		title: "Hero section",
		style: {
			height: "50vh",
			background:
				"radial-gradient(1200px 320px at 15% -40%, rgba(148,163,184,0.32), transparent), linear-gradient(120deg, #0f172a, #1e293b 58%, #334155)",
		},
		heading: "Design pages that feel undeniably premium",
		subheading:
			"Build high-converting, editorial-grade landing pages with complete control.",
		headingAnimation: "fade-in",
		headingFontSize: 44,
		subheadingFontSize: 22,
		subHeadingAnimation: "fade-in",
		headingWeight: 700,
		subheadingWeight: 400,
		headingColor: "#ffffff",
		subheadingColor: "#e2e8f0",
		preset: {
			layout: "center",
			textAlign: "center",
			showImage: true,
			imagePosition: "background",
		},
		cta: {
			text: "Start Free",
			bgColor: "#ffffff",
			paddingX: 20,
			paddingY: 12,
			radius: 999,
			fontSize: 16,
			border: true,
			textColor: "#00000",
			boxShadow: {
				shadowBlur: 16,
				shadowIntensity: 0.24,
			},
		},
	},
	cta: {
		heading: "Ship a stronger first impression in hours",
		subheading:
			"Start from polished sections, refine your story quickly, and launch with confidence.",
		button: {
			text: "Start Free",
			link: "#",
			backgroundColor: "#ffffff",
			color: "#0f172a",
			radius: 999,
			paddingX: 24,
			paddingY: 12,
		},
		style: {
			background:
				"radial-gradient(900px 280px at 15% -35%, rgba(148,163,184,0.25), transparent), linear-gradient(120deg, #0b1220 0%, #1e293b 62%, #334155 100%)",
			borderTop: "1px solid rgba(255,255,255,0.15)",
			borderBottom: "1px solid rgba(255,255,255,0.15)",
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
		background: "#f8fafc",
		cards: [
			{
				id: String(Date.now()),
				iconClass: "lucide lucide-award",
				heading: {
					content: "Pro Flow Subscription",
					fontSize: 22,
					fontWeight: 700,
					color: "#0f172a",
				},
				subheading: {
					content:
						"Everything your team needs to build beautiful landing pages.",
					fontSize: 15,
					color: "#475569",
				},
				style: {
					background: "#ffffff",
					borderRadius: 24,
					padding: 24,
					minHeight: 320,
					boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
				},
				additionalContent: [
					{
						content: "Unlimited sections, templates, and export options.",
						fontSize: 14,
						color: "#475569",
					},
					{
						content: "Priority support and full design control.",
						fontSize: 14,
						color: "#475569",
					},
				],
				variant: "featured",
			},
			{
				id: String(Date.now() + 1),
				iconClass: "lucide lucide-rocket",
				heading: {
					content: "Starter Plan",
					fontSize: 20,
					fontWeight: 600,
					color: "#0f172a",
				},
				subheading: {
					content: "A lightweight plan for individuals and small teams.",
					fontSize: 14,
					color: "#475569",
				},
				style: {
					background: "#eff6ff",
					borderRadius: 24,
					padding: 24,
					minHeight: 300,
					boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
				},
				additionalContent: [
					{
						content: "Affordable monthly pricing.",
						fontSize: 14,
						color: "#475569",
					},
					{
						content: "Easy setup and quick deployment.",
						fontSize: 14,
						color: "#475569",
					},
				],
				variant: "default",
			},
			{
				id: String(Date.now() + 2),
				iconClass: "lucide lucide-briefcase",
				heading: {
					content: "Enterprise",
					fontSize: 20,
					fontWeight: 600,
					color: "#0f172a",
				},
				subheading: {
					content: "Custom solutions for high-growth businesses.",
					fontSize: 14,
					color: "#475569",
				},
				style: {
					background: "#ffffff",
					borderRadius: 24,
					padding: 24,
					minHeight: 300,
					boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
				},
				additionalContent: [
					{
						content: "Dedicated onboarding and integrations.",
						fontSize: 14,
						color: "#475569",
					},
					{
						content: "Team-based security and analytics.",
						fontSize: 14,
						color: "#475569",
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
		copyright: "(c) 2026 Aether Studio. All rights reserved.",
		style: {
			height: "22vh",
			color: "#e2e8f0",
		},
		background:
			"radial-gradient(820px 220px at 12% -35%, rgba(148,163,184,0.2), transparent), linear-gradient(120deg, #020617, #0f172a 62%, #1e293b)",
	},
	separator: {
		flipY: true,
		fill: "",
	},
	testimonial: {
		style: {
			background:
				"radial-gradient(820px 220px at 12% -35%, rgba(148,163,184,0.2), transparent), linear-gradient(120deg, #020617, #0f172a 62%, #1e293b)",
		},
		carousel: {
			type: "default",
			slides: [
				{
					heading: "“This builder made our launch feel effortless.”",
					subheading:
						"Every team member can update content, and the polished testimonial section now feels like a product page.",
					author: "Maya Carter, VP of Marketing",
					bgColor: "linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
				},
				{
					heading: "“We shipped assets faster with the new content blocks.”",
					subheading:
						"The carousel helps stories land stronger and gives our homepage a much more confident rhythm.",
					author: "Jordan Kim, Design Lead",
					bgColor: "linear-gradient(160deg, #f8fafc 0%, #eef2ff 100%)",
				},
				{
					heading:
						"“The editing experience is simple, but the result feels premium.”",
					subheading:
						"Clients love the visual polish, and our team can keep the page updated without design support.",
					author: "Lila Patel, Founder",
					bgColor: "linear-gradient(160deg, #ffffff 0%, #f1f5f9 100%)",
				},
			],
		},
	},
};

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
					? "border-2 border-blue-500"
					: "border-transparent"
			} ${droppable.isDropTarget ? "bg-slate-100" : "bg-transparent"}`}
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
			className="w-full flex flex-col items-center pt-4 bg-zinc-50 dark:bg-black min-h-[90vh] relative"
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
				<div className="text-center text-zinc-500">Drop here</div>
			)}
			{children}
		</div>
	);
}

export default function Home() {
	const [items, setItems] = useState<DroppedItem[]>([]);
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
		(nextPage: SetStateAction<{ blocks: DroppedItem[] }>) => {
			if (typeof nextPage === "function") {
				setItems((prevItems) => {
					const resolved = (
						nextPage as (prevState: { blocks: DroppedItem[] }) => {
							blocks: DroppedItem[];
						}
					)({ blocks: prevItems });
					return resolved.blocks;
				});
				return;
			}

			setItems(nextPage.blocks);
		},
		[],
	);

	if (isDesktop === null) {
		return (
			<div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center">
				<div className="text-sm text-slate-300">Loading editor...</div>
			</div>
		);
	}

	if (!isDesktop) {
		return (
			<div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-6">
				<div className="max-w-xl w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						Desktop Required
					</h1>
					<p className="mt-3 text-slate-300 leading-relaxed">
						This landing page builder is currently optimized for desktop only.
						Please open it on a larger screen to continue editing.
					</p>
				</div>
			</div>
		);
	}

	return (
		<PageContext.Provider
			value={{ page: { blocks: items }, setPage: syncItemsFromPage }}
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
						const newItem: DroppedItem = {
							id: `${type}-${Date.now()}`,
							type,
							timestamp: Date.now(),
							props: defaultProps[type],
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
					<AppSidebar items={items} />
					<div className="app-canvas-shell">
						<div className="app-canvas w-full">
							<DroppableZone
								selectedItem={(item) => setSelectedBlock(item)}
								items={items}
								selectedBlock={selectedBlock}
							/>
						</div>
					</div>
					<div className="app-editor-panel flex flex-col">
						<button onClick={() => exportToHTML(items)}>Export</button>
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
