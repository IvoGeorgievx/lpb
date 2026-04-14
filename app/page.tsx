"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { ReactNode, useState } from "react";
interface DroppedItem {
	id: string;
	type: string;
	timestamp: number;
}

function DroppableZone({
	items,
	children,
}: {
	items: DroppedItem[];
	children: ReactNode;
}) {
	const { ref } = useDroppable({ id: "droppable" });

	return (
		<div
			ref={ref}
			className="flex-1 flex flex-col items-center w-[1000px] justify-center bg-zinc-50 dark:bg-black min-h-screen"
		>
			{items.length > 0 ? (
				items.map((item) => <div key={item.id}>{item.type}</div>)
			) : (
				<div className="text-center text-zinc-500">Drop here</div>
			)}
			{children}
		</div>
	);
}

export default function Home() {
	const [items, setItems] = useState<DroppedItem[]>([]);

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
					<DroppableZone items={items}>
						<></>
					</DroppableZone>
				</div>
			</SidebarProvider>
		</DragDropProvider>
	);
}
