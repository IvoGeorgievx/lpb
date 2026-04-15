import { DroppedItem } from "@/app/page";
import { Slider } from "../ui/slider";

interface EditorProps {
	item?: DroppedItem;
	onPropsChange: (props: Record<string, string | number>) => void;
}

export function Editor({ item, onPropsChange }: EditorProps) {
	switch (item?.type) {
		case "header":
			return (
				<div className="p-4 w-full">
					<Slider
						onValueChange={(value) =>
							onPropsChange({ heightInPx: Number(value), blockId: item.id })
						}
						defaultValue={[75]}
						min={45}
						max={150}
						step={1}
						className="mx-auto w-full max-w-xs"
					/>
				</div>
			);

		case "hero":
			return (
				<section>
					<p>test from hero block</p>
				</section>
			);
	}
}
