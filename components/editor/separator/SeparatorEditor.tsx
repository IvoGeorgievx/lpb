import type {
	SectionSeparatorBlockProps,
	SeparatorType,
} from "@/components/blocks/SectionSeparatorBlock";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useEditor } from "@/context/EditorContext";
import { ColorField } from "../ColorField";

export function SeparatorEditor({
	props,
}: {
	props: SectionSeparatorBlockProps;
}) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	const update = (props: SectionSeparatorBlockProps) =>
		onPropsChange({ id: item.id, props });
	return (
		<div className="space-y-5">
			<Label htmlFor="separator-type">Separator type</Label>
			<select
				id="separator-type"
				className="editor-select"
				value={props.type ?? "waves"}
				onChange={(event) =>
					update({ type: event.target.value as SeparatorType })
				}
			>
				{["waves", "triangle", "tilt", "zigzag"].map((type) => (
					<option key={type} value={type}>
						{type}
					</option>
				))}
			</select>
			<Label htmlFor="separator-height">
				Height: {props.height ?? 80}px
			</Label>
			<Slider
				id="separator-height"
				min={40}
				max={200}
				step={10}
				value={[props.height ?? 80]}
				onValueChange={([height]) => update({ height })}
			/>
			<div className="flex items-center justify-between">
				<Label htmlFor="separator-flip-x">Flip horizontally</Label>
				<Switch
					id="separator-flip-x"
					checked={!!props.flipX}
					onCheckedChange={(flipX) => update({ flipX })}
				/>
			</div>
			<div className="flex items-center justify-between">
				<Label htmlFor="separator-flip-y">Flip vertically</Label>
				<Switch
					id="separator-flip-y"
					checked={!!props.flipY}
					onCheckedChange={(flipY) => update({ flipY })}
				/>
			</div>
			<ColorField
				id="separator-color"
				label="Separator color"
				value={props.fill ?? "#3b82f6"}
				onChange={(fill) => update({ fill })}
			/>
		</div>
	);
}
