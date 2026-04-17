import { useEditor } from "@/context/EditorContext";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import CTA1 from "../../../public/images/CTA1.webp";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { HeroBlockProps } from "@/components/blocks/HeroBlock";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PaintBucket } from "lucide-react";
import { HexColorPicker } from "react-colorful";

export function HeroEditorLayout() {
	const [showPresetSettings, setShowPresetSettings] = useState<boolean>(false);
	const [color, setColor] = useState("#000000");
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
	return (
		<div className="flex flex-col">
			<div className="w-full grid grid-cols-2 gap-4">
				<div className="relative w-full overflow-hidden rounded-md border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg">
					<Image
						src={CTA1}
						alt="layout"
						fill
						className="object-cover"
						onClick={() => {
							setShowPresetSettings((prev) => !prev);
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
					/>
				</div>

				<div className="relative w-full aspect-video bg-gray-100 rounded-md border border-dashed flex items-center justify-center text-gray-400">
					Layout 2
				</div>
			</div>
			<div className="h-full mt-5">
				{showPresetSettings && (
					<div className="flex flex-col gap-5">
						<div className="w-full flex gap-2 items-center justify-center">
							<div className="w-full">
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
							<div className="w-full">
								<Label>Font Size</Label>
								<Slider
									value={[
										(item?.props as HeroBlockProps)?.fontSizeHeading || 0,
									]}
									min={16}
									max={60}
									step={1}
									className="mt-3"
									onValueChange={(v) =>
										onPropsChange({
											id: item.id,
											props: {
												fontSizeHeading: v[0],
											},
										})
									}
								/>
							</div>
							<div className="w-1/2 pl-2">
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
															colorHeading: value,
														},
													});
												}}
											/>
										</PopoverHeader>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						<div className="w-full flex gap-2 items-center justify-center">
							<div className="w-full">
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
							<div className="w-full">
								<Label>Font Size</Label>
								<Slider
									value={[
										(item?.props as HeroBlockProps)?.fontSizeSubheading || 0,
									]}
									className="mt-3"
									min={16}
									max={50}
									step={1}
									onValueChange={(v) =>
										onPropsChange({
											id: item.id,
											props: {
												fontSizeSubheading: v[0],
											},
										})
									}
								/>
							</div>
							<div className="w-1/2 pl-2">
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
															colorSubHeading: value,
														},
													});
												}}
											/>
										</PopoverHeader>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						<div className="w-full mt-5">
							<Label htmlFor="pic-uploader">Upload background picture</Label>
							<Input
								className="mt-2"
								id="pic-uploader"
								type="file"
								onChange={(e) => handleFileUpload(e)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
