"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDraggable } from "@dnd-kit/react";

function DraggableItem({ id, label }: { id: string; label: string }) {
	const { ref } = useDraggable({ id });

	return (
		<button
			ref={ref}
			className="w-full p-4 border rounded-2xl cursor-grab active:cursor-grabbing bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
		>
			{label}
		</button>
	);
}

export function AppSidebar() {
	const components = [
		{ id: "Hero", label: "Hero" },
		{ id: "Header", label: "Header" },
	];
	return (
		<Sidebar className="border-r">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Drag to add</SidebarGroupLabel>
					<div className="flex flex-col gap-2 p-2">
						{components.map((component) => (
							<SidebarMenuItem key={component.id}>
								<DraggableItem id={component.id} label={component.label} />
							</SidebarMenuItem>
						))}
					</div>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
