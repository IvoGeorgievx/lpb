import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { useEditor } from "@/context/EditorContext";
import { Italic, PaintBucket } from "lucide-react";
import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { HeroBlockProps } from "../../blocks/HeroBlock";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Separator } from "../../ui/separator";
import { Slider } from "../../ui/slider";
import { HeroEditorLayout } from "./HeroEditorLayout";

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700];

const ANIMATIONS = [
	{
		value: "fade-in",
		label: "Fade In",
	},
	{
		value: "slide-right",
		label: "Slide in Right",
	},
	{
		value: "slide-left",
		label: "Slide in Left",
	},
];
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
	const color = "#000000";
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
			<div className="w-full">
				<h1 className="text-center mb-2">Heading</h1>
				<Input
					value={(item?.props as HeroBlockProps).heading || ""}
					placeholder="Heading"
					onChange={(event) =>
						onPropsChange({
							id: item.id,
							props: {
								heading: event.target.value,
							},
						})
					}
				/>
			</div>
			<div className="w-full flex gap-2 items-center justify-center">
				<div className="w-full">
					<Label htmlFor="heading-font-size">Font Size</Label>
					<Slider
						id="heading-font-size"
						value={[(item?.props as HeroBlockProps)?.headingFontSize || 0]}
						min={16}
						max={60}
						step={1}
						className="mt-3"
						onValueChange={(v) =>
							onPropsChange({
								id: item.id,
								props: {
									headingFontSize: v[0],
								},
							})
						}
					/>
				</div>
				<div className="w-full flex justify-center items-center gap-2 pl-2">
					<Popover>
						<PopoverTrigger asChild>
							<PaintBucket className="cursor-pointer transition-all duration-100 hover:-translate-y-0.5 ease-in" />
						</PopoverTrigger>
						<PopoverContent>
							<PopoverHeader>
								<PopoverTitle>Choose Color</PopoverTitle>
								<ColorPicker
									hidePresets
									value={color}
									onChange={(value) => {
										onPropsChange({
											id: item.id,
											props: {
												headingColor: value,
											},
										});
									}}
								/>
							</PopoverHeader>
						</PopoverContent>
					</Popover>
					<Toggle
						pressed={(item?.props as HeroBlockProps)?.headingStyle === "italic"}
						aria-label="Toggle italic"
						variant="outline"
						className="cursor-pointer"
						onPressedChange={(pressed) =>
							onPropsChange({
								id: item.id,
								props: {
									headingStyle: pressed ? "italic" : "normal",
									animationEnabled: true,
								},
							})
						}
					>
						<Italic className="group-data-[state=on]/toggle:fill-foreground" />
					</Toggle>
					<Select
						value={(item?.props as HeroBlockProps)?.headingAnimation || ""}
						onValueChange={(value) =>
							onPropsChange({
								id: item.id,
								props: {
									headingWeight: Number(value),
								},
							})
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Weight" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Weight</SelectLabel>
								{WEIGHT_OPTIONS.map((weight, idx) => (
									<SelectItem key={idx} value={weight.toString()}>
										{weight}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<Select
				onValueChange={(value: "fade-in" | "slide-left" | "slide-right") =>
					onPropsChange({
						id: item.id,
						props: {
							headingAnimation: value,
						},
					})
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Animation" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Animation</SelectLabel>
						{ANIMATIONS.map(({ value, label }, idx) => (
							<SelectItem key={idx} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Separator />
			<div className="w-full">
				<h1 className="text-center mb-2">Subheading</h1>
				<Input
					placeholder="Subheading"
					value={(item.props as HeroBlockProps).subheading || ""}
					onChange={(event) =>
						onPropsChange({
							id: item.id,
							props: {
								subheading: event.target.value,
							},
						})
					}
				/>
			</div>
			<div className="w-full flex gap-2 items-center justify-center">
				<div className="w-full">
					<Label htmlFor="subheading-font-size">Font Size</Label>
					<Slider
						id="subheading-font-size"
						value={[(item?.props as HeroBlockProps)?.subheadingFontSize || 0]}
						className="mt-3"
						min={16}
						max={50}
						step={1}
						onValueChange={(v) =>
							onPropsChange({
								id: item.id,
								props: {
									subheadingFontSize: v[0],
								},
							})
						}
					/>
				</div>
				<div className="w-full flex items-center gap-2 justify-center ">
					<Popover>
						<PopoverTrigger asChild>
							<PaintBucket className="cursor-pointer transition-all duration-100 hover:-translate-y-0.5 ease-in" />
						</PopoverTrigger>
						<PopoverContent>
							<PopoverHeader>
								<PopoverTitle>Choose Color</PopoverTitle>
								<ColorPicker
									hidePresets
									value={color}
									onChange={(value) => {
										onPropsChange({
											id: item.id,
											props: {
												subheadingColor: value,
											},
										});
									}}
								/>
							</PopoverHeader>
						</PopoverContent>
					</Popover>
					<Toggle
						pressed={
							(item?.props as HeroBlockProps)?.subheadingStyle === "italic"
						}
						aria-label="Toggle italic"
						variant="outline"
						className="cursor-pointer"
						onPressedChange={(pressed) =>
							onPropsChange({
								id: item.id,
								props: {
									subheadingStyle: pressed ? "italic" : "normal",
								},
							})
						}
					>
						<Italic className="group-data-[state=on]/toggle:fill-foreground" />
					</Toggle>
					<Select
						onValueChange={(value) =>
							onPropsChange({
								id: item.id,
								props: {
									subheadingWeight: Number(value),
								},
							})
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Weight" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Weight</SelectLabel>
								{WEIGHT_OPTIONS.map((weight, idx) => (
									<SelectItem key={idx} value={weight.toString()}>
										{weight}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<Select
				value={
					(item?.props as HeroBlockProps)?.subHeadingAnimation || undefined
				}
				onValueChange={(value: "fade-in" | "slide-left" | "slide-right") =>
					onPropsChange({
						id: item.id,
						props: {
							subHeadingAnimation: value,
						},
					})
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Animation" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Animation</SelectLabel>
						{ANIMATIONS.map(({ value, label }, idx) => (
							<SelectItem key={idx} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Separator />
			<div className="w-full flex flex-col gap-5">
				<h2 className="text-center">Layout</h2>
				<HeroEditorLayout />
			</div>
		</div>
	);
}
