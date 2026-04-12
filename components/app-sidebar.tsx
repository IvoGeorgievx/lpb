import { DragDropProvider } from "@dnd-kit/react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	const target = "droppable";
	return (
		<DragDropProvider
			onDragEnd={(event) => {
				if (event.canceled) return;
			}}
		>
			<Sidebar className="border-r">
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenuItem>
							<p>test</p>
						</SidebarMenuItem>
					</SidebarGroup>
					<SidebarGroup />
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>
		</DragDropProvider>
	);
}
