"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { useDragOperation, useDraggable, useDroppable } from "@dnd-kit/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import { FooterBlock } from "./blocks/FooterBlock";
import Header from "./blocks/HeaderBlock";
import HeroBlock from "./blocks/HeroBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { EmbedBlock } from "./blocks/EmbedBlock";
import ProductBlock from "./blocks/ProductBlock";
import { SectionSeparatorBlock } from "./blocks/SectionSeparatorBlock";
import { TestimonialBlock } from "./blocks/TestimonialBlock";
import { DroppedItem } from "@/app/page";
import { ThemeId } from "@/lib/theme";
import { generateHTML } from "@/lib/export";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Eye, Monitor, Smartphone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
interface BuildingComponents {
	id: string;
	component: ReactElement;
	label: string;
}

function BlockPreview({ id }: { id: string }) {
	switch (id) {
		case "header":
			return (
				<div className="space-y-2 p-1">
					<div className="h-6 w-full rounded bg-slate-300 dark:bg-slate-700" />
					<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
					<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
					<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
				</div>
			);
		case "hero":
			return (
				<div className="space-y-2 p-1">
					<div className="h-8 w-full rounded bg-slate-300 dark:bg-slate-700" />
					<div className="h-5 mx-auto w-16 rounded-md bg-slate-300 dark:bg-slate-700" />
				</div>
			);
		case "cta":
			return (
				<div className="rounded-lg border border-slate-300/80 dark:border-slate-700 p-1">
					<div className="space-y-2">
						<div className="h-2 w-full rounded bg-slate-300 dark:bg-slate-700" />
						<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
						<div className="h-4  mx-auto w-14 rounded-md bg-slate-300 dark:bg-slate-700" />
					</div>
				</div>
			);
		case "embed":
			return (
				<div className="space-y-2 p-1">
					<div className="h-10 w-full rounded-lg border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />
				</div>
			);
		case "product":
			return (
				<div className="grid grid-cols-3 gap-2 p-1">
					<div className="h-8 w-full rounded bg-slate-300 dark:bg-slate-700" />
					<div className="h-8 w-full rounded bg-slate-300 dark:bg-slate-700" />
					<div className="h-8 w-full rounded bg-slate-300 dark:bg-slate-700" />
				</div>
			);
		case "separator":
			return (
				<div className="flex h-8 items-center p-1">
					<div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
				</div>
			);
		case "testimonial":
			return (
				<div className="rounded-lg border border-slate-300/80 dark:border-slate-700 p-1">
					<div className="space-y-2">
						<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
						<div className="h-2 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
						<div className="mt-1 h-2 w-1/3 rounded bg-slate-300 dark:bg-slate-700" />
					</div>
				</div>
			);
		case "footer":
			return (
				<div className="space-y-2 p-1">
					<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
					<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
					<div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
					<div className="h-6 w-full rounded bg-slate-300 dark:bg-slate-700" />
				</div>
			);
		default:
			return (
				<div className="h-8 w-full rounded bg-slate-200 dark:bg-slate-800" />
			);
	}
}

function DraggableItem({ id, label }: { id: string; label: string }) {
	const { ref, isDragging } = useDraggable({ id });

	return (
		<div
			ref={ref}
			className={cn(
				"w-full cursor-grab rounded-2xl border border-border bg-card p-3 text-card-foreground transition active:cursor-grabbing",
				"hover:bg-muted/50",
				isDragging && "scale-[0.99] opacity-75",
			)}
		>
			<div className="mb-2 flex items-center justify-between">
				<p className="text-sm font-medium">{label}</p>
				<span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
					drag
				</span>
			</div>
			<BlockPreview id={id} />
		</div>
	);
}

export function AppSidebar({
	items,
	activeTheme,
}: {
	items: DroppedItem[];
	activeTheme: ThemeId;
}) {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
	const sidebarRemoveRef = useRef<HTMLDivElement | null>(null);
	useDroppable({ id: "sidebar-remove", element: sidebarRemoveRef });
	const { target } = useDragOperation();
	const isSidebarDropTarget = target?.id === "sidebar-remove";

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

	const html = generateHTML(items, activeTheme);
	const components: BuildingComponents[] = [
		{ component: <Header />, id: "header", label: "Header" },
		{ component: <HeroBlock />, id: "hero", label: "Hero" },
		{ component: <CtaBlock />, id: "cta", label: "CTA Section" },
		{ component: <EmbedBlock />, id: "embed", label: "Embed" },
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
			<div ref={sidebarRemoveRef}>
				<Sidebar className="app-sidebar fixed left-0 top-0 z-50 h-screen border-r border-border bg-background/95 backdrop-blur-xl">
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
						<SidebarGroup>
							<div
								className={`mx-2 mt-2 rounded-lg border border-dashed px-3 py-2 text-xs transition ${
									isSidebarDropTarget
										? "border-red-500 bg-red-50 text-red-700"
										: "border-border text-muted-foreground"
								}`}
							>
								Drop block here to remove
							</div>
						</SidebarGroup>
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
			</div>
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
