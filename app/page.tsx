"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/blocks/HeaderBlock";
import HeroBlock from "@/components/blocks/HeroBlock";
import { Editor } from "@/components/editor/Editor";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { ReactElement, ReactNode, useState } from "react";
interface DroppedItem {
	id: string;
	type: string;
	timestamp: number;
}

const COMPONENT_MAP: Record<string, ReactElement> = {
	header: <Header />,
	hero: <HeroBlock />,
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
			className="flex-1 flex flex-col items-center min-w-300 pt-4 bg-zinc-50 dark:bg-black min-h-screen"
		>
			{items.length > 0 ? (
				items.map((item) => (
					<div
						className="cursor-pointer"
						key={item.id}
						onClick={() => {
							selectedItem(item);
						}}
					>
						{COMPONENT_MAP[item.type]}
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

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				if (event.canceled) return;

				const { source, target } = event.operation;

				if (target?.id === "droppable") {
					setItems((prev) => [
						...prev,
						{
							id: `${source!.id}-${Date.now()}`,
							type: String(source!.id),
							timestamp: Date.now(),
						},
					]);
				}
			}}
		>
			<SidebarProvider>
				<AppSidebar />
				<div className="flex h-screen">
					<DroppableZone
						selectedItem={(id) => setSelectedBlock(id)}
						items={items}
					></DroppableZone>
				</div>
				<div className="flex h-screen">
					<Editor type={selectedBlock?.type} />
				</div>
			</SidebarProvider>
		</DragDropProvider>
	);
}
