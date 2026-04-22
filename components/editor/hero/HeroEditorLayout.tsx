import { useEditor } from "@/context/EditorContext";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Image1 from "../../../public/images/CTA1.webp";
import Image2 from "../../../public/images/CTA2.webp";
import { HeroEditorCenterPreset } from "./HeroEditorCenterPreset";
import { HeroEditorFlexPreset } from "./HeroEditorFlexPreset";

type LayoutType = "center" | "flex";

export function HeroEditorLayout() {
	const [selectPreset, setSelectPreset] = useState<LayoutType>("center");
	const { item, onPropsChange } = useEditor();
	if (!item) return;

	const toggleLayout = (layout: LayoutType) => {
		setSelectPreset(layout);
	};
	return (
		<div className="flex flex-col">
			<div className="w-full grid grid-cols-2 gap-4">
				<div
					onClick={() => {
						toggleLayout("center");
						onPropsChange({
							id: item.id,
							props: {
								preset: {
									layout: "center",
									showImage: true,
									imagePosition: "background",
									textAlign: "center",
								},
							},
						});
					}}
					className={`relative w-full aspect-video overflow-hidden rounded-md border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg ${selectPreset === "center" ? "border-blue-500 border-3" : ""}`}
				>
					<Image src={Image1} alt="layout" fill className="object-cover" />
				</div>

				<div
					onClick={() => {
						toggleLayout("flex");
						onPropsChange({
							id: item.id,
							props: {
								preset: {
									layout: "flex",
									showImage: true,
									imagePosition: "left",
									textAlign: "right",
								},
							},
						});
					}}
					className={`relative w-full aspect-video overflow-hidden rounded-md border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg ${selectPreset === "flex" ? "border-blue-500 border-3" : ""}`}
				>
					<Image
						src={Image2}
						alt="layout"
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover"
						priority
					/>
				</div>
			</div>
			<div className="h-full mt-5">
				<AnimatePresence>
					{selectPreset === "center" && <HeroEditorCenterPreset />}
					{selectPreset === "flex" && <HeroEditorFlexPreset />}
				</AnimatePresence>
			</div>
		</div>
	);
}
