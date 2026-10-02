import type { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { validateImage } from "@/lib/document";
import { useState } from "react";

export function HeroEditorCenterPreset() {
	const { item, onPropsChange } = useEditor();
	const [error, setError] = useState("");
	const [reading, setReading] = useState(false);
	if (!item) return null;
	const props = item.props as HeroBlockProps;
	return (
		<div className="flex flex-col gap-4 border-t pt-4">
			<Label htmlFor="hero-image">Background image</Label>
			<Input
				id="hero-image"
				type="file"
				accept="image/jpeg,image/png,image/webp,image/gif"
				disabled={reading}
				aria-describedby="hero-image-help hero-image-error"
				onChange={(event) => {
					const file = event.target.files?.[0];
					if (!file) return;
					setError("");
					try {
						validateImage(file);
						setReading(true);
						const reader = new FileReader();
						reader.onload = () => {
							onPropsChange({
								id: item.id,
								props: {
									style: {
										backgroundImage: `url("${reader.result}")`,
									},
								},
							});
							setReading(false);
						};
						reader.onerror = () => {
							setError(
								"Could not read this image. Choose another file and try again.",
							);
							setReading(false);
						};
						reader.readAsDataURL(file);
					} catch (cause) {
						setError((cause as Error).message);
					}
					event.target.value = "";
				}}
			/>
			<p id="hero-image-help" className="text-xs text-muted-foreground">
				JPG, PNG, WebP or GIF, up to 1 MB. Included in your HTML
				download.
			</p>
			<p
				id="hero-image-error"
				role="alert"
				className="text-sm text-destructive"
			>
				{error}
			</p>
			{reading && <p role="status">Reading image…</p>}
			{props.style?.backgroundImage && (
				<Button
					variant="outline"
					onClick={() =>
						onPropsChange({
							id: item.id,
							props: { style: { backgroundImage: undefined } },
						})
					}
				>
					Remove image
				</Button>
			)}
			<Label htmlFor="overlay-slider">
				Dark overlay: {Math.round((props.overlayStrength ?? 0) * 100)}%
			</Label>
			<Slider
				id="overlay-slider"
				aria-label="Dark overlay"
				value={[props.overlayStrength ?? 0]}
				min={0}
				max={1}
				step={0.05}
				onValueChange={([overlayStrength]) =>
					onPropsChange({ id: item.id, props: { overlayStrength } })
				}
			/>
			<Label htmlFor="shadow-intensity-slider">Shadow intensity</Label>
			<Slider
				id="shadow-intensity-slider"
				value={[props.shadowIntensity ?? 0]}
				min={0}
				max={1}
				step={0.05}
				onValueChange={([shadowIntensity]) =>
					onPropsChange({ id: item.id, props: { shadowIntensity } })
				}
			/>
			<Label htmlFor="shadow-blur-slider">Shadow blur</Label>
			<Slider
				id="shadow-blur-slider"
				value={[props.shadowBlur ?? 0]}
				min={0}
				max={100}
				step={1}
				onValueChange={([shadowBlur]) =>
					onPropsChange({ id: item.id, props: { shadowBlur } })
				}
			/>
		</div>
	);
}
