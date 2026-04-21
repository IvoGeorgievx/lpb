import { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { Italic, PaintBucket } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import Image1 from "../../../public/images/CTA1.webp";
import Image2 from "../../../public/images/CTA2.webp";
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
import { motion, AnimatePresence } from "framer-motion";

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700];

type LayoutType = "center" | "left" | "right";

export function HeroEditorLayout() {
	const [selectPreset, setSelectPreset] = useState<LayoutType | null>(null);
	const [color, setColor] = useState("#000000");
	const fileUploadRef = useRef<HTMLInputElement>(null);
	const { item, onPropsChange } = useEditor();
	if (!item) return;

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const tempUrl = URL.createObjectURL(file);

		onPropsChange({
			id: item.id,
			props: { style: { backgroundImage: tempUrl } },
		});
	};

	const toggleLayout = (layout: LayoutType) => {
		setSelectPreset((prev) => (prev === layout ? null : layout));
	};
	return (
		<div className="flex flex-col">
			<div className="w-full grid grid-cols-2 gap-4">
				<div
					onClick={() => {
						// setShowPresetSettings((prev) => !prev);
						toggleLayout("center");
						onPropsChange({
							id: item.id,
							props: {
								preset: {
									layout: "center",
									showImage: true,
									imagePosition: "background",
									textAlign: "center",
								},
							},
						});
					}}
					className="relative w-full aspect-video overflow-hidden rounded-md border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg"
				>
					<Image src={Image1} alt="layout" fill className="object-cover" />
				</div>

				<div
					onClick={() => {
						// setShowPresetSettings((prev) => !prev);
						toggleLayout("right");
						onPropsChange({
							id: item.id,
							props: {
								preset: {
									layout: "flex",
									showImage: true,
									imagePosition: "left",
									textAlign: "right",
								},
							},
						});
					}}
					className="relative w-full aspect-video overflow-hidden rounded-md border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg"
				>
					<Image
						src={Image2}
						alt="layout"
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover"
						priority
					/>
				</div>
			</div>
			<div className="h-full mt-5">
				<AnimatePresence>
					{selectPreset === "center" && (
						<motion.div
							key="settings-panel"
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.95 }}
							transition={{
								duration: 0.2,
								ease: [0.16, 1, 0.3, 1],
							}}
							className="flex flex-col gap-5"
						>
							<div className="w-full">
								<h1 className="text-center mb-2">Heading</h1>
								<Input
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
										value={[
											(item?.props as HeroBlockProps)?.headingFontSize || 0,
										]}
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
												<HexColorPicker
													color={color}
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
										pressed={
											(item?.props as HeroBlockProps)?.headingStyle === "italic"
										}
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
							<Separator />
							<div className="w-full">
								<h1 className="text-center mb-2">Subheading</h1>
								<Input
									placeholder="Subheading"
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
										value={[
											(item?.props as HeroBlockProps)?.subheadingFontSize || 0,
										]}
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
												<HexColorPicker
													color={color}
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
											(item?.props as HeroBlockProps)?.subheadingStyle ===
											"italic"
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
							<div className="w-full mt-5">
								<div className="p-4 rounded-lg border bg-white shadow-sm">
									<Label>Background Image</Label>

									<div
										className="mt-2 border-2 border-dashed rounded-lg p-6 text-center text-gray-400 cursor-pointer hover:bg-gray-100"
										onClick={() => fileUploadRef.current?.click()}
									>
										Click or drag image to upload
									</div>

									<Input
										id="pic-upload"
										ref={fileUploadRef}
										type="file"
										className="hidden"
										onChange={handleFileUpload}
									/>
								</div>
							</div>
							<Separator />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
