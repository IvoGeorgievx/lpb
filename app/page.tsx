"use client";
import { useDroppable } from "@dnd-kit/react";

export default function Home() {
	const { ref } = useDroppable({ id: "droppable" });
	return (
		<div
			ref={ref}
			className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
		></div>
	);
}
