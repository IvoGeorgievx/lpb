"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { useDraggable } from "@dnd-kit/react";
import { ReactElement, useEffect, useState } from "react";
import { FooterBlock } from "./blocks/FooterBlock";
import Header from "./blocks/HeaderBlock";
import HeroBlock from "./blocks/HeroBlock";
import ProductBlock from "./blocks/ProductBlock";
import { SectionSeparatorBlock } from "./blocks/SectionSeparatorBlock";
import { TestimonialBlock } from "./blocks/TestimonialBlock";
import { DroppedItem } from "@/app/page";
import { generateHTML } from "@/lib/export";
import { Button } from "./ui/button";
import { Eye, Monitor, Smartphone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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

export function AppSidebar({ items }: { items: DroppedItem[] }) {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const html = generateHTML(items);
	const components: BuildingComponents[] = [
		{ component: <Header />, id: "header", label: "Header" },
		{ component: <HeroBlock />, id: "hero", label: "Hero" },
		{ component: <ProductBlock />, id: "product", label: "Product" },
		{
			component: <SectionSeparatorBlock />,
			id: "separator",
			label: "Separator",
		},
		{
			component: <TestimonialBlock />,
			id: "testimonial",
			label: "Testimonial",
		},
		{ component: <FooterBlock />, id: "footer", label: "Footer" },
	];
	return (
		<>
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
				<SidebarFooter>
					<Button
						className="w-full"
						variant="outline"
						onClick={() => setOpen(true)}
					>
						<Eye className="mr-2 h-4 w-4" />
						Preview
					</Button>
				</SidebarFooter>
			</Sidebar>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{
							clipPath: "circle(0% at 50% 50%)",
							opacity: 0,
						}}
						animate={{
							clipPath: "circle(150% at 50% 50%)",
							opacity: 1,
						}}
						exit={{
							clipPath: "circle(0% at 50% 50%)",
							opacity: 0,
						}}
						transition={{
							duration: 0.6,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="fixed inset-0 z-9999 bg-black"
					>
						<div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 p-4">
							<div className="flex items-center gap-2">
								<Button
									size="sm"
									variant={mode === "desktop" ? "default" : "secondary"}
									onClick={() => setMode("desktop")}
								>
									<Monitor className="mr-2 h-4 w-4" />
									Desktop
								</Button>

								<Button
									size="sm"
									variant={mode === "mobile" ? "default" : "secondary"}
									onClick={() => setMode("mobile")}
								>
									<Smartphone className="mr-2 h-4 w-4" />
									Mobile
								</Button>
							</div>

							<div className="flex items-center gap-2">
								<Button
									size="sm"
									variant="outline"
									onClick={() => setOpen(false)}
								>
									Close(or pres Esc)
								</Button>
							</div>
						</div>

						<div className="flex h-[calc(100vh-73px)] items-center justify-center overflow-auto bg-zinc-900 p-10">
							<motion.div
								layout
								transition={{
									type: "spring",
									stiffness: 180,
									damping: 22,
								}}
								className={
									mode === "desktop"
										? "h-full w-full max-w-[1440px]"
										: "h-full w-[390px]"
								}
							>
								<iframe
									srcDoc={html}
									title="Preview"
									className="h-full w-full rounded-[24px] border border-zinc-700 bg-white shadow-2xl"
								/>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
