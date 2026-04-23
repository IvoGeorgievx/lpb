"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Header, { HeaderProps } from "@/components/blocks/HeaderBlock";
import HeroBlock, { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { Editor } from "@/components/editor/Editor";
import Renderer from "@/components/renderer/Renderer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EditorContext } from "@/context/EditorContext";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { ReactNode, useState } from "react";
import { exportToHTML } from "@/lib/export";

export type BlockType = "header" | "hero";
export type BlockPropsMap = {
	header: HeaderProps;
	hero: HeroBlockProps;
};
export type DroppedItem<T extends BlockType = BlockType> = {
	id: string;
	type: T;
	timestamp: number;
	props: BlockPropsMap[T];
};

type UpdatePayload = { id: string } & Pick<DroppedItem, "props">;

import { ComponentType } from "react";

export const COMPONENT_MAP: Record<BlockType, ComponentType> = {
	header: Header,
	hero: HeroBlock,
};
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

	return (
		<div
			ref={ref}
			className="flex-1 flex flex-col items-center min-w-325 pt-4 bg-zinc-50 dark:bg-black min-h-screen"
		>
			{items.length > 0 ? (
				items.map((item) => (
					<div
						key={item.id}
						className={`w-full cursor-pointer transition ${
							selectedBlock?.id === item.id
								? "border-2 border-blue-500"
								: "border border-transparent"
						}`}
						onClick={() => selectedItem(item)}
					>
						<Renderer item={item} />
					</div>
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

	const handleDelete = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

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

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				if (event.canceled) return;

				const { source, target } = event.operation;

				if (target?.id === "droppable") {
					const type = String(source!.id) as BlockType;

					const defaultProps: BlockPropsMap = {
						header: {
							className: "border",
							style: {
								height: 60,
								borderRadius: 10,
								padding: 10,
							},
						},
						hero: {
							title: "Hero section",
							style: {
								height: "50vh",
							},
							heading: "Very cool heading",
							subheading: "Nice",
						},
					};

					const newItem: DroppedItem = {
						id: `${type}-${Date.now()}`,
						type,
						timestamp: Date.now(),
						props: defaultProps[type],
					};

					setItems((prev) => [...prev, newItem]);

					setSelectedBlock(newItem);
				}
			}}
		>
			<SidebarProvider>
				<AppSidebar />
				<div className="flex h-screen">
					<DroppableZone
						selectedItem={(item) => setSelectedBlock(item)}
						items={items}
						selectedBlock={selectedBlock}
					/>
				</div>
				<div className="flex h-screen flex-1 overflow-x-hidden">
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
	);
}
