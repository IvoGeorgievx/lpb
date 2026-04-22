import { useEditor } from "@/context/EditorContext";
import { useCallback, useRef } from "react";
import ColorPicker from "react-best-gradient-color-picker";

export const HeroEditorFlexPreset = () => {
	const { item, onPropsChange } = useEditor();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// this is written by llm -> picker caused many rerenders -> crash. Apparently debouncing with setTimeout alone wouldn't do the trick.

	const color = item?.props?.style?.background ?? "rgba(255,255,255,1)";

	const handleColorChange = useCallback(
		(newColor: string) => {
			// cancel previous scheduled update
			console.log(newColor);
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
	return (
		<ColorPicker
			className="w-full"
			value={color as string}
			onChange={handleColorChange}
		/>
	);
};
