import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/context/EditorContext";
import { HeroBlockProps } from "../../blocks/HeroBlock";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Slider } from "../../ui/slider";
import { Separator } from "../../ui/separator";
import { HeroEditorLayout } from "./HeroEditorLayout";

interface HeroEditorProps {
	props: HeroBlockProps;
}

const selectItems: { value: string; label: string }[] = [
	{
		value: "image",
		label: "Image",
	},
	{
		value: "color",
		label: "Color",
	},
	{
		value: "gradient",
		label: "Gradient",
	},
	{
		value: "transparent",
		label: "Transparent",
	},
];

export function HeroEditor({ props }: HeroEditorProps) {
	const [heightUnit, setHeightUnit] = useState<"px" | "vh">("px");
	const { item, onPropsChange } = useEditor();
	let currentHeight;
	if (typeof item?.props.style?.height === "string") {
		currentHeight = Number(item?.props.style?.height.split("v")[0]);
	} else {
		currentHeight = item?.props.style?.height;
	}
	if (!item) return;

	return (
		<div className="w-full p-4 flex flex-col gap-5">
			<div className="w-full">
				<Select
					value={props.bgType}
					onValueChange={(value) =>
						onPropsChange({
							id: item.id,
							props: {
								bgType: value as HeroEditorProps["props"]["bgType"],
							},
						})
					}
				>
					<SelectTrigger className="w-full max-w-48">
						<SelectValue placeholder="Select background" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Background</SelectLabel>
							{selectItems.map((item, idx) => (
								<SelectItem key={idx} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="w-full flex gap-5 items-center justify-center">
				<div className="w-full">
					{heightUnit === "px" ? (
						<Input
							value={currentHeight}
							type="number"
							onChange={(event) =>
								onPropsChange({
									id: item.id,
									props: {
										style: {
											height: Number(event.target.value),
										},
									},
								})
							}
						/>
					) : (
						<Slider
							value={[currentHeight as number]}
							min={60}
							max={100}
							step={1}
							onValueChange={(v) =>
								onPropsChange({
									id: item.id,
									props: {
										style: {
											height: `${v[0]}vh`,
										},
									},
								})
							}
						/>
					)}
				</div>
				<div className="w-full">
					<RadioGroup
						onValueChange={(v) => setHeightUnit(v as "px" | "vh")}
						defaultValue="px"
						className="w-fit"
					>
						<div className="flex items-center gap-3">
							<RadioGroupItem value="px" id="px" />
							<Label htmlFor="px">px</Label>
						</div>
						<div className="flex items-center gap-3">
							<RadioGroupItem value="vh" id="vh" />
							<Label htmlFor="vh">vh</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<Separator />
			<div className="w-full flex flex-col gap-5">
				<h2 className="text-center">Layout</h2>
				<HeroEditorLayout />
			</div>
		</div>
	);
}
