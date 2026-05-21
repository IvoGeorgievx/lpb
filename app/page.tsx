"use client";
import { AppSidebar } from "@/components/app-sidebar";
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
	| "product"
	| "footer"
	| "separator"
	| "testimonial";
export type BlockPropsMap = {
	header: HeaderBlockProps;
	hero: HeroBlockProps;
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
		style: {
			height: 60,
			padding: 10,
			background: "#1565C0",
		},
	},
	hero: {
		title: "Hero section",
		style: {
			height: "50vh",
		},
		heading: "Beautiful landing page",
		subheading: "Fast, flexible hero sections with real-time editing",
		headingAnimation: "fade-in",
		headingFontSize: 44,
		subheadingFontSize: 22,
		subHeadingAnimation: "fade-in",
		headingWeight: 700,
		subheadingWeight: 400,
		headingColor: "#111827",
		subheadingColor: "#4b5563",
		preset: {
			layout: "center",
			textAlign: "center",
			showImage: true,
			imagePosition: "background",
		},
		cta: {
			text: "Get Started",
			bgColor: "#2563eb",
			paddingX: 20,
			paddingY: 12,
			radius: 999,
			fontSize: 16,
			border: false,
			boxShadow: {
				shadowBlur: 12,
				shadowIntensity: 0.12,
			},
		},
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
		style: {
			height: "20vh",
		},
	},
	separator: {},
	testimonial: {
		carousel: {
			type: "default",
			slides: [
				{
					heading: "“This builder made our launch feel effortless.”",
					subheading:
						"Every team member can update content, and the polished testimonial section now feels like a product page.",
					author: "Maya Carter, VP of Marketing",
					bgColor: "#eef2ff",
				},
				{
					heading: "“We shipped assets faster with the new content blocks.”",
					subheading:
						"The carousel helps stories land stronger and gives our homepage a much more confident rhythm.",
					author: "Jordan Kim, Design Lead",
					bgColor: "#f8fafc",
				},
				{
					heading:
						"“The editing experience is simple, but the result feels premium.”",
					subheading:
						"Clients love the visual polish, and our team can keep the page updated without design support.",
					author: "Lila Patel, Founder",
					bgColor: "#fff7ed",
				},
			],
		},
	},
};

export const COMPONENT_MAP: Record<BlockType, ComponentType> = {
	header: Header,
	hero: HeroBlock,
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
			className="flex-1 flex flex-col items-center min-w-325 pt-4 bg-zinc-50 dark:bg-black min-h-screen relative"
			style={{
				maxWidth: "1200px",
			}}
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
					<div className="flex h-screen relative ml-72.5">
						<DroppableZone
							selectedItem={(item) => setSelectedBlock(item)}
							items={items}
							selectedBlock={selectedBlock}
						/>
					</div>
					<div className="flex h-screen flex-1 overflow-x-hidden flex-col fixed right-0 w-[530px] ">
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
