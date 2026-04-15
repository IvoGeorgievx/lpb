import { BlockPropsMap, BlockType, DroppedItem } from "@/app/page";
import { HexColorPicker } from "react-colorful";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
			<div key={item.id} className="p-4 w-full">
				<Tabs defaultValue="layout" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="layout">Layout</TabsTrigger>
						<TabsTrigger value="appearance">Appearance</TabsTrigger>
					</TabsList>

					<TabsContent value="layout" className="space-y-4 pt-4">
						<div className="space-y-2 flex gap-5">
							<div className="w-full">
								<Label htmlFor="header-height-slider">
									Height: {props.style?.height}px
								</Label>
								<Slider
									className="mt-2"
									id="header-height-slider"
									value={[Number(props.style?.height ?? 0)]}
									onValueChange={(value) =>
										onPropsChange({
											id: item.id,
											props: { style: { ...props.style, height: value[0] } },
										})
									}
									min={45}
									max={150}
									step={1}
								/>
							</div>
							<div className="w-full">
								<Label htmlFor="header-radius-slider">
									Border Radius: {props.style?.borderRadius}px
								</Label>
								<Slider
									className="mt-2"
									id="header-radius-slider"
									value={[Number(props.style?.borderRadius ?? 0)]}
									onValueChange={(value) =>
										onPropsChange({
											id: item.id,
											props: {
												style: { ...props.style, borderRadius: value[0] },
											},
										})
									}
									min={0}
									max={40}
									step={1}
								/>
							</div>
						</div>
						<div className="space-y-2 flex gap-5">
							<div className="w-full">
								<Label htmlFor="header-padding-slider">
									Padding: {props.style?.padding}px
								</Label>
								<Slider
									className="mt-2"
									id="header-padding-slider"
									value={[Number(props.style?.padding ?? 0)]}
									onValueChange={(value) =>
										onPropsChange({
											id: item.id,
											props: {
												style: { ...props.style, padding: value[0] },
											},
										})
									}
									min={0}
									max={40}
									step={1}
								/>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="appearance" className="pt-4">
						<div className="text-sm text-muted-foreground">
							<div>
								<HexColorPicker
									color={props.style?.backgroundColor || "#ffffff"}
									onChange={(value) =>
										onPropsChange({
											id: item.id,
											props: {
												style: { ...props.style, backgroundColor: value },
											},
										})
									}
								/>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		);
	}
}
