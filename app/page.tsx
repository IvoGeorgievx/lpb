"use client";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";
import {
	ArrowUp,
	ArrowDown,
	GripVertical,
	Trash2,
	Undo2,
	Redo2,
	Download,
	ArrowLeft,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Editor } from "@/components/editor/Editor";
import Renderer from "@/components/renderer/Renderer";
import { Button } from "@/components/ui/button";
import { Preview } from "@/components/preview";
import { PageContext } from "@/context/PageContext";
import { EditorContext } from "@/context/EditorContext";
import { useDocument } from "@/hooks/use-document";
import {
	BLOCK_LABELS,
	createBlock,
	type DroppedItem,
	type BlockType,
} from "@/lib/blocks";
import { EMPTY_PAGE, MAX_DOCUMENT_ITEMS, type Page } from "@/lib/document";
import { createTemplate } from "@/lib/template";
import { exportCss } from "@/lib/exportCss";
import {
	generatePreviewHTML,
	exportToHTML,
	fontStylesheet,
} from "@/lib/export";
import { getThemeCssVariables } from "@/lib/theme";

function CanvasItem({
	item,
	selected,
	select,
	move,
	remove,
	first,
	last,
}: {
	item: DroppedItem;
	selected: boolean;
	select: () => void;
	move: (offset: number) => void;
	remove: () => void;
	first: boolean;
	last: boolean;
}) {
	const {
		ref: dragRef,
		handleRef,
		isDragging,
	} = useDraggable({ id: item.id });
	const { ref: dropRef, isDropTarget } = useDroppable({ id: item.id });
	return (
		<section
			ref={(node) => {
				dragRef(node);
				dropRef(node);
			}}
			aria-label={`${BLOCK_LABELS[item.type]} section`}
			className={`canvas-section ${selected ? "is-selected" : ""} ${isDropTarget ? "is-drop-target" : ""}`}
			style={{ opacity: isDragging ? 0.6 : 1 }}
		>
			<div className="block-controls">
				<button
					ref={handleRef}
					aria-label={`Move ${BLOCK_LABELS[item.type]} by dragging`}
					className="cursor-grab p-1"
				>
					<GripVertical size={15} />
				</button>
				<button
					onClick={select}
					className="mr-auto text-xs font-medium"
					aria-pressed={selected}
				>
					Edit {BLOCK_LABELS[item.type]}
				</button>
				<button
					disabled={first}
					onClick={() => move(-1)}
					aria-label={`Move ${BLOCK_LABELS[item.type]} up`}
				>
					<ArrowUp size={15} />
				</button>
				<button
					disabled={last}
					onClick={() => move(1)}
					aria-label={`Move ${BLOCK_LABELS[item.type]} down`}
				>
					<ArrowDown size={15} />
				</button>
				<button
					onClick={remove}
					aria-label={`Remove ${BLOCK_LABELS[item.type]}`}
				>
					<Trash2 size={15} />
				</button>
			</div>
			<div onClick={select}>
				<div inert>
					<Renderer item={item} />
				</div>
			</div>
		</section>
	);
}

function Canvas({
	page,
	selected,
	select,
	move,
	remove,
	start,
	started,
}: {
	page: Page;
	selected?: string;
	select: (id: string) => void;
	move: (id: string, offset: number) => void;
	remove: (id: string) => void;
	start: (blank: boolean) => void;
	started: boolean;
}) {
	const { ref, isDropTarget } = useDroppable({ id: "droppable" });
	const exampleHTML = useMemo(
		() =>
			!page.blocks.length && !started
				? generatePreviewHTML(createTemplate())
				: "",
		[page.blocks.length, started],
	);
	return (
		<div
			ref={ref}
			className={`app-canvas ${isDropTarget ? "is-drop-target" : ""}`}
		>
			{page.blocks.length ? (
				<div
					id="top"
					className="lpb-page"
					style={
						getThemeCssVariables(page.activeTheme) as CSSProperties
					}
				>
					{page.blocks.map((item, index) => (
						<CanvasItem
							key={item.id}
							item={item}
							selected={selected === item.id}
							select={() => select(item.id)}
							move={(offset) => move(item.id, offset)}
							remove={() => remove(item.id)}
							first={index === 0}
							last={index === page.blocks.length - 1}
						/>
					))}
				</div>
			) : (
				<div className="builder-welcome">
					<h1>
						{started
							? "A fresh page. Your next idea."
							: "Build a page. Take it with you."}
					</h1>
					<p>
						Compose your landing page visually, then download one
						HTML file. Host it wherever you like—no builder runtime
						required.
					</p>
					<div className="flex flex-wrap gap-3">
						<Button onClick={() => start(false)}>
							Use the studio template
						</Button>
						{!started && (
							<Button
								variant="outline"
								onClick={() => start(true)}
							>
								Start blank
							</Button>
						)}
					</div>
					{started ? (
						<p className="text-sm">
							Add a section with + in the library, or drag it
							here.
						</p>
					) : (
						<>
							<p className="text-xs text-muted-foreground">
								A starting point, not a blank promise. Example
								page below.
							</p>
							<iframe
								title="Studio template example"
								tabIndex={-1}
								sandbox=""
								srcDoc={exampleHTML}
								className="h-100 w-full rounded-lg border bg-white"
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default function Home() {
	const { page, setPage, undo, redo, canUndo, canRedo, ready, saveStatus } =
		useDocument();
	const [selected, setSelected] = useState<string>();
	const [desktop, setDesktop] = useState<boolean | null>(null);
	const [started, setStarted] = useState(false);
	const [notice, setNotice] = useState("");
	useEffect(() => {
		const media = matchMedia("(min-width: 1024px)");
		const update = () => setDesktop(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);
	const activeBlock = page.blocks.find((block) => block.id === selected);
	const add = (type: BlockType) => {
		if (page.blocks.length >= MAX_DOCUMENT_ITEMS) {
			setNotice(
				`A page can contain up to ${MAX_DOCUMENT_ITEMS} sections.`,
			);
			return;
		}
		const block = createBlock(type, page.blocks);
		setPage((page) => ({ ...page, blocks: [...page.blocks, block] }));
		setSelected(block.id);
		setStarted(true);
	};
	const remove = (id: string) => {
		setPage((page) => ({
			...page,
			blocks: page.blocks.filter((block) => block.id !== id),
		}));
		setNotice("Section removed. Use Undo to restore it.");
	};
	const move = (id: string, offset: number) =>
		setPage((page) => {
			const index = page.blocks.findIndex((block) => block.id === id);
			const target = index + offset;
			if (index < 0 || target < 0 || target >= page.blocks.length)
				return page;
			const blocks = [...page.blocks];
			const [block] = blocks.splice(index, 1);
			blocks.splice(target, 0, block);
			return { ...page, blocks };
		});
	const start = (blank: boolean) => {
		if (
			page.blocks.length &&
			!confirm(
				blank
					? "Clear this page? You can undo this action."
					: "Replace this page with the studio template? You can undo this action.",
			)
		)
			return;
		setPage(
			blank
				? { ...EMPTY_PAGE, activeTheme: page.activeTheme }
				: createTemplate(page.activeTheme),
		);
		setStarted(true);
		setSelected(undefined);
		setNotice(
			blank
				? "Blank page ready. Add your first section."
				: "Studio template ready. Select a section to make it yours.",
		);
	};
	const download = () => {
		try {
			exportToHTML(page.blocks, page.activeTheme, page);
			setNotice(
				"Download started: index.html. Upload it to a static host. Fonts and embeds require internet access.",
			);
		} catch {
			setNotice(
				"Export failed. Your page is still here. Try again before closing the tab.",
			);
		}
	};
	if (desktop === null || !ready)
		return (
			<div className="flex min-h-screen items-center justify-center">
				Loading your workspace…
			</div>
		);
	if (!desktop) {
		const example = createTemplate();
		return (
			<>
				<style>{exportCss}</style>
				<link
					rel="stylesheet"
					href={fontStylesheet(example.activeTheme)}
				/>
				<div className="showcase-intro">
					<h1>
						Build a page.
						<br />
						Take it with you.
					</h1>
					<p>
						A visual landing-page builder that exports one HTML
						file. Your page, your hosting, no builder runtime.
					</p>
					<p className="text-sm">
						Open on a desktop to edit. Explore the example below on
						any screen.
					</p>
					<Button
						onClick={() =>
							exportToHTML(
								example.blocks,
								example.activeTheme,
								example,
							)
						}
					>
						<Download size={16} />
						Download example HTML
					</Button>
					<a
						className="text-sm underline"
						href="https://github.com/ivogeorgievx/lpb"
						target="_blank"
						rel="noreferrer"
					>
						How it’s built →
					</a>
				</div>
				<div
					className="lpb-page"
					id="top"
					style={
						getThemeCssVariables(
							example.activeTheme,
						) as CSSProperties
					}
				>
					{example.blocks.map((item) => (
						<Renderer key={item.id} item={item} />
					))}
				</div>
				<div className="showcase-intro">
					<h2 className="text-xl font-semibold">
						One file. A real starting point.
					</h2>
					<p>
						Markup, styles, icons, and uploaded images travel
						together. External fonts, images, and embeds need
						internet access. The example is fictional; replace its
						copy and contact details before publishing.
					</p>
				</div>
			</>
		);
	}
	return (
		<PageContext.Provider value={{ page, setPage }}>
			<style>{exportCss}</style>
			<link rel="stylesheet" href={fontStylesheet(page.activeTheme)} />
			<header className="builder-toolbar">
				<div className="mr-auto">
					<h1 className="text-sm font-semibold">
						Landing Page Builder
					</h1>
					<p className="text-xs text-muted-foreground" role="status">
						{saveStatus}
					</p>
					<div className="flex gap-3 text-xs">
						<a
							href="https://github.com/ivogeorgievx/lpb"
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							Source / How it’s built
						</a>
						<a
							href="example.html"
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							Exported example
						</a>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon"
					disabled={!canUndo}
					onClick={undo}
					aria-label="Undo"
					title="Undo (Ctrl/Cmd+Z)"
				>
					<Undo2 size={18} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					disabled={!canRedo}
					onClick={redo}
					aria-label="Redo"
					title="Redo (Ctrl/Cmd+Shift+Z)"
				>
					<Redo2 size={18} />
				</Button>
				<Button variant="outline" onClick={() => start(false)}>
					Use template
				</Button>
				<Button variant="ghost" onClick={() => start(true)}>
					Start blank
				</Button>
				<Preview page={page} disabled={!page.blocks.length} />
				<Button onClick={download} disabled={!page.blocks.length}>
					<Download size={16} />
					Export HTML
				</Button>
			</header>
			<DragDropProvider
				onDragEnd={(event) => {
					if (event.canceled) return;
					const sourceId = String(event.operation.source?.id ?? "");
					const targetId = String(event.operation.target?.id ?? "");
					const sourceIndex = page.blocks.findIndex(
						(block) => block.id === sourceId,
					);
					if (sourceIndex >= 0) {
						if (targetId === "sidebar-remove") remove(sourceId);
						else if (
							targetId === "droppable" ||
							page.blocks.some((block) => block.id === targetId)
						) {
							const targetIndex =
								targetId === "droppable"
									? page.blocks.length - 1
									: page.blocks.findIndex(
											(block) => block.id === targetId,
										);
							move(sourceId, targetIndex - sourceIndex);
						}
					} else if (
						Object.hasOwn(BLOCK_LABELS, sourceId) &&
						(targetId === "droppable" ||
							page.blocks.some((block) => block.id === targetId))
					) {
						if (page.blocks.length >= MAX_DOCUMENT_ITEMS) {
							setNotice(
								`A page can contain up to ${MAX_DOCUMENT_ITEMS} sections.`,
							);
							return;
						}
						const block = createBlock(
							sourceId as BlockType,
							page.blocks,
						);
						setPage((page) => {
							const blocks = [...page.blocks];
							const index = blocks.findIndex(
								(item) => item.id === targetId,
							);
							blocks.splice(
								index < 0 ? blocks.length : index,
								0,
								block,
							);
							return { ...page, blocks };
						});
						setSelected(block.id);
						setStarted(true);
					}
				}}
			>
				<AppSidebar
					onAdd={add}
					full={page.blocks.length >= MAX_DOCUMENT_ITEMS}
				/>
				<div className="app-canvas-shell">
					<Canvas
						page={page}
						selected={selected}
						select={setSelected}
						move={move}
						remove={remove}
						start={start}
						started={started}
					/>
				</div>
				<aside
					className="app-editor-panel p-5"
					aria-label="Page and section settings"
				>
					{activeBlock && (
						<div className="mb-5 space-y-3">
							<Button
								variant="outline"
								className="w-full"
								onClick={() => setSelected(undefined)}
							>
								<ArrowLeft size={16} />
								Page settings
							</Button>
							<h2 className="font-semibold">
								{BLOCK_LABELS[activeBlock.type]}
							</h2>
						</div>
					)}
					<EditorContext.Provider
						value={{
							item: activeBlock,
							onPropsChange: (data) => {
								const focused = document.activeElement;
								const field =
									focused instanceof HTMLElement
										? focused.closest(
												"[data-slot='slider']",
											)?.id || focused.id
										: "";
								const continuous =
									focused instanceof HTMLTextAreaElement ||
									(focused instanceof HTMLInputElement &&
										!["checkbox", "radio", "file"].includes(
											focused.type,
										)) ||
									focused?.getAttribute("role") === "slider";
								const group =
									continuous && field
										? `${data.id}:${field}:${Object.keys(data.props).join(",")}`
										: undefined;
								setPage(
									(page) => ({
										...page,
										blocks: page.blocks.map((block) =>
											block.id === data.id
												? ({
														...block,
														props: {
															...block.props,
															...data.props,
															...(data.props.style
																? {
																		style: {
																			...block
																				.props
																				.style,
																			...data
																				.props
																				.style,
																		},
																	}
																: {}),
														},
													} as DroppedItem)
												: block,
										),
									}),
									group,
								);
							},
						}}
					>
						<Editor />
					</EditorContext.Provider>
				</aside>
			</DragDropProvider>
			{notice && (
				<div className="builder-notice" role="status">
					<span>{notice}</span>
					<button
						onClick={() => setNotice("")}
						aria-label="Dismiss notification"
					>
						Dismiss
					</button>
				</div>
			)}
		</PageContext.Provider>
	);
}
