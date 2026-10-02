"use client";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { GripVertical, Plus } from "lucide-react";
import { BLOCK_LABELS, type BlockType } from "@/lib/blocks";
import { Button } from "./ui/button";

function LibraryBlock({
	type,
	onAdd,
	disabled,
}: {
	type: BlockType;
	onAdd: (type: BlockType) => void;
	disabled: boolean;
}) {
	const { ref, handleRef, isDragging } = useDraggable({ id: type, disabled });
	return (
		<div
			ref={ref}
			className="grid min-h-14 grid-cols-[24px_minmax(0,1fr)_28px] items-center gap-1 rounded-lg border bg-card px-2 py-2"
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<button
				ref={handleRef}
				disabled={disabled}
				className="cursor-grab rounded p-1 text-muted-foreground"
				aria-label={`Drag ${BLOCK_LABELS[type]}`}
			>
				<GripVertical size={16} />
			</button>
			<span
				className="min-w-0 truncate text-sm"
				title={BLOCK_LABELS[type]}
			>
				{BLOCK_LABELS[type]}
			</span>
			<Button
				disabled={disabled}
				className="justify-self-center"
				variant="ghost"
				size="icon-sm"
				aria-label={`Add ${BLOCK_LABELS[type]}`}
				onClick={() => onAdd(type)}
			>
				<Plus size={16} />
			</Button>
		</div>
	);
}

export function AppSidebar({
	onAdd,
	full,
}: {
	onAdd: (type: BlockType) => void;
	full: boolean;
}) {
	const { ref, isDropTarget } = useDroppable({ id: "sidebar-remove" });
	return (
		<aside
			className="app-sidebar flex flex-col border-r bg-card p-4"
			aria-label="Block library"
		>
			<h2 className="mb-2 font-semibold">Sections</h2>
			<p className="mb-5 text-xs leading-relaxed text-muted-foreground">
				Drag a section onto the page, or use + to add it.
			</p>
			<div className="flex flex-col gap-2">
				{(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
					<LibraryBlock
						key={type}
						type={type}
						onAdd={onAdd}
						disabled={full}
					/>
				))}
			</div>
			{full && (
				<p role="status" className="mt-3 text-xs text-muted-foreground">
					Section limit reached. Remove a section to add another.
				</p>
			)}
			<div
				ref={ref}
				className={`mt-5 rounded-lg border border-dashed p-4 text-center text-xs ${isDropTarget ? "border-destructive bg-destructive/10 text-destructive" : "text-muted-foreground"}`}
			>
				Drop a section here to remove it.
				<br />
				Undo is always available.
			</div>
			<p className="mt-auto pt-6 text-xs leading-relaxed text-muted-foreground">
				Your page, your hosting.
				<br />
				One HTML download. No builder runtime.
			</p>
		</aside>
	);
}
