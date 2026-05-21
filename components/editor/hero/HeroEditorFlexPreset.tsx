import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useEditor } from "@/context/EditorContext";
import { motion } from "framer-motion";
import { useCallback, useRef } from "react";
import ColorPicker from "react-best-gradient-color-picker";

export const HeroEditorFlexPreset = () => {
	const { item, onPropsChange } = useEditor();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// this is written by llm -> picker caused many rerenders -> crash. Apparently debouncing with setTimeout alone wouldn't do the trick.

	const handleColorChange = useCallback(
		(newColor: string) => {
			// cancel previous scheduled update
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// schedule a new one
			timeoutRef.current = setTimeout(() => {
				onPropsChange({
					id: item!.id,
					props: {
						style: {
							background: newColor,
						},
					},
				});
			}, 150);
		},
		[item, onPropsChange],
	);
	if (!item) return null;

	const color = item.props.style?.background ?? "rgba(255,255,255,1)";

	return (
		<motion.div
			key="flex-settings-panel"
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 10, scale: 0.95 }}
			transition={{
				duration: 0.2,
				ease: [0.16, 1, 0.3, 1],
			}}
			className="flex items-center gap-4"
		>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" className="cursor-pointer">
						Background
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full">
					<ColorPicker value={color as string} onChange={handleColorChange} />
				</PopoverContent>
			</Popover>
		</motion.div>
	);
};
