"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Header, { HeaderProps } from "@/components/blocks/HeaderBlock";
import HeroBlock, { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { Editor } from "@/components/editor/Editor";
import Renderer from "@/components/renderer/Renderer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { ReactNode, useState } from "react";

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

export const COMPONENT_MAP = {
	header: Header,
	hero: HeroBlock,
};
function DroppableZone({
	items,
	children,
	selectedItem,
}: {
	items: DroppedItem[];
	selectedItem: (item: DroppedItem) => void;
	children?: ReactNode;
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
						className="cursor-pointer w-full"
						key={item.id}
						onClick={() => {
							selectedItem(item);
						}}
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
				console.log({ ...data.props.style });
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
							className: "border p-4",
							style: {
								height: 60,
								borderRadius: 0,
							},
						},
						hero: { title: "Hero section" },
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
					/>
				</div>
				<div className="flex h-screen flex-1">
					<Editor
						onPropsChange={(data) => updatePropsData(data)}
						item={activeBlock}
					/>
				</div>
			</SidebarProvider>
		</DragDropProvider>
	);
}
