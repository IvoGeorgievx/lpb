import { BlockPropsMap, BlockType, DroppedItem } from "@/app/page";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

type UpdatePayload<T extends BlockType = BlockType> = {
	id: string;
	props: BlockPropsMap[T];
};

interface EditorProps {
	item?: DroppedItem;
	onPropsChange: (payload: UpdatePayload) => void;
}

export function Editor({ item, onPropsChange }: EditorProps) {
	if (!item) return null;

	if (item.type === "header") {
		const props = item.props as BlockPropsMap["header"];

		return (
			<div className="p-4 w-full">
				<Label htmlFor="header-height-slider" className="block text-center">
					Height
				</Label>
				<Slider
					id="header-height-slider"
					onValueChange={(value) =>
						onPropsChange({
							id: item.id,
							props: { style: { height: Number(value) } },
						})
					}
					value={[Number(props.style?.height)]}
					min={45}
					max={150}
					step={1}
					className="mx-auto max-w-xs mt-2"
				/>
			</div>
		);
	}

	if (item.type === "hero") {
		return <div>Hero editor</div>;
	}
	return null;
}
