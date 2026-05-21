import { useEditor } from "@/context/EditorContext";
import { AnimatePresence } from "framer-motion";
import { HeroEditorCenterPreset } from "./HeroEditorCenterPreset";

export function HeroEditorLayout() {
	const { item } = useEditor();
	if (!item) return;
	return (
		<div className="flex flex-col">
			<div className="h-full mt-5">
				<AnimatePresence>
					<HeroEditorCenterPreset />
				</AnimatePresence>
			</div>
		</div>
	);
}
