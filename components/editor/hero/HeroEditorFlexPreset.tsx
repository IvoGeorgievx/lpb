import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useEditor } from "@/context/EditorContext";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

export const HeroEditorFlexPreset = () => {
	const { item, onPropsChange } = useEditor();
	const [switchPosition, setSwitchPositions] = useState<boolean>(false);
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

	const handleReverseLayout = (checked: boolean) => {
		setSwitchPositions(() => checked);
		onPropsChange({
			id: item.id,
			props: {
				flexReverse: checked,
			},
		});
	};

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
			<div>
				<FieldGroup className="mx-auto w-56">
					<Field orientation="horizontal">
						<Checkbox
							checked={switchPosition}
							onCheckedChange={(checked) =>
								handleReverseLayout(checked as boolean)
							}
							id="switch-flex-position"
							name="switch-flex-position"
						/>
						<FieldLabel htmlFor="switch-flex-position">
							Reverse Layout
						</FieldLabel>
					</Field>
				</FieldGroup>
			</div>
		</motion.div>
	);
};
