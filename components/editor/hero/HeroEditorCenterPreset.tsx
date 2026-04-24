import { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { ChangeEvent, useRef } from "react";

export const HeroEditorCenterPreset = () => {
	const { item, onPropsChange } = useEditor();
	const fileUploadRef = useRef<HTMLInputElement>(null);
	if (!item) return;

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(file);
		if (!file) return;
		const tempUrl = URL.createObjectURL(file);

		onPropsChange({
			id: item.id,
			props: { style: { backgroundImage: tempUrl } },
		});
	};
	return (
		<div className="flex flex-col gap-5">
			<div className="w-full mt-5">
				<div className="p-4 rounded-lg border bg-white shadow-sm">
					<Label htmlFor="upload-div">Background Image</Label>

					<div
						id="upload-div"
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
			<Label htmlFor="overlay-slider">Overlay</Label>
			<Slider
				id="overlay-slider"
				value={[(item?.props as HeroBlockProps)?.overlayStrength || 0]}
				min={0}
				max={1}
				step={0.05}
				onValueChange={(v) =>
					onPropsChange({
						id: item.id,
						props: {
							overlayStrength: v[0],
						},
					})
				}
			/>
			<div className="w-full flex gap-4">
				<div className="w-full">
					<Label htmlFor="shadow-intensity-slider" className="mb-4">
						Shadow Intensity
					</Label>
					<Slider
						id="shadow-intensity-slider"
						value={[(item?.props as HeroBlockProps)?.shadowIntensity || 0]}
						min={0}
						max={1}
						step={0.05}
						onValueChange={(v) =>
							onPropsChange({
								id: item.id,
								props: {
									shadowIntensity: v[0],
								},
							})
						}
					/>
				</div>
				<div className="w-full">
					<Label htmlFor="shadow-blur-slider" className="mb-4">
						Shadow Blur
					</Label>
					<Slider
						id="shadow-blur-slider"
						value={[(item?.props as HeroBlockProps)?.shadowBlur || 0]}
						min={0}
						max={100}
						step={1}
						onValueChange={(v) =>
							onPropsChange({
								id: item.id,
								props: {
									shadowBlur: v[0],
								},
							})
						}
					/>
				</div>
			</div>

			<Separator />
		</div>
	);
};
