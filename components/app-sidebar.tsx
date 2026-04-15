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
import { ReactElement, ReactNode } from "react";
import Header from "./blocks/HeaderBlock";
import HeroBlock from "./blocks/HeroBlock";

interface BuildingComponents {
	id: string;
	component: ReactElement;
	label: string;
}

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
	const components: BuildingComponents[] = [
		{ component: <Header />, id: "header", label: "Header" },
		{ component: <HeroBlock />, id: "hero", label: "Hero" },
	];
	return (
		<Sidebar className="border-r">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Drag to add</SidebarGroupLabel>
					<div className="flex flex-col gap-2 p-2">
						{components.map((component) => (
							<DraggableItem
								key={component.id}
								id={component.id}
								label={component.label}
							/>
						))}
					</div>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
