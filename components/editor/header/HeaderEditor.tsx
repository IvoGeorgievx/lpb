import type { HeaderBlockProps } from "@/components/blocks/HeaderBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { ColorField } from "../ColorField";

export function HeaderEditor({ props }: { props: HeaderBlockProps }) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	const update = (props: HeaderBlockProps) =>
		onPropsChange({ id: item.id, props });
	return (
		<div className="space-y-5">
			<Label htmlFor="header-logo">Logo text</Label>
			<Input
				id="header-logo"
				value={props.logoText ?? ""}
				onChange={(e) => update({ logoText: e.target.value })}
			/>
			<Label htmlFor="header-height">
				Height: {Number(props.style?.height ?? 80)}px
			</Label>
			<Slider
				id="header-height"
				value={[Number(props.style?.height ?? 80)]}
				min={45}
				max={150}
				step={1}
				onValueChange={([height]) => update({ style: { height } })}
			/>
			<Label htmlFor="header-padding">Padding</Label>
			<Slider
				id="header-padding"
				value={[Number(props.style?.padding ?? 12)]}
				min={0}
				max={40}
				step={1}
				onValueChange={([padding]) => update({ style: { padding } })}
			/>
			<Label htmlFor="header-radius">Corner radius</Label>
			<Slider
				id="header-radius"
				value={[Number(props.style?.borderRadius ?? 0)]}
				min={0}
				max={40}
				onValueChange={([borderRadius]) =>
					update({ style: { borderRadius } })
				}
			/>
			<div className="flex items-center gap-2">
				<Checkbox
					id="header-sticky"
					checked={!!props.sticky}
					onCheckedChange={(v) => update({ sticky: v === true })}
				/>
				<Label htmlFor="header-sticky">Sticky header</Label>
			</div>
			<ColorField
				background
				id="header-background"
				label="Header background"
				value={String(props.style?.background ?? "#ffffff")}
				onChange={(background) => update({ style: { background } })}
			/>
			<div className="flex items-center gap-2">
				<Checkbox
					id="header-show-cta"
					checked={props.showCta !== false}
					onCheckedChange={(v) => update({ showCta: v === true })}
				/>
				<Label htmlFor="header-show-cta">Show call to action</Label>
			</div>
			{props.showCta !== false && props.cta && (
				<div className="space-y-4">
					<Label htmlFor="header-cta-text">CTA text</Label>
					<Input
						id="header-cta-text"
						value={props.cta.text}
						onChange={(e) =>
							update({
								cta: { ...props.cta!, text: e.target.value },
							})
						}
					/>
					<Label htmlFor="header-cta-link">CTA destination</Label>
					<Input
						id="header-cta-link"
						placeholder="https://…, mailto:… or #contact"
						value={props.cta.link}
						onChange={(e) =>
							update({
								cta: { ...props.cta!, link: e.target.value },
							})
						}
					/>
					<Label htmlFor="header-cta-radius">Button radius</Label>
					<Slider
						id="header-cta-radius"
						value={[props.cta.radius]}
						min={0}
						max={999}
						onValueChange={([radius]) =>
							update({ cta: { ...props.cta!, radius } })
						}
					/>
					<ColorField
						id="header-cta-text-color"
						label="Button text color"
						value={props.cta.color}
						onChange={(color) =>
							update({ cta: { ...props.cta!, color } })
						}
					/>
					{(
						[
							["paddingX", "Horizontal padding"],
							["paddingY", "Vertical padding"],
						] as const
					).map(([key, label]) => (
						<div key={key} className="space-y-2">
							<Label htmlFor={`header-cta-${key}`}>{label}</Label>
							<Slider
								id={`header-cta-${key}`}
								min={0}
								max={40}
								value={[props.cta![key]]}
								onValueChange={([value]) =>
									update({
										cta: { ...props.cta!, [key]: value },
									})
								}
							/>
						</div>
					))}
					<ColorField
						background
						id="header-cta-background"
						label="Button background"
						value={props.cta.backgroundColor}
						onChange={(backgroundColor) =>
							update({ cta: { ...props.cta!, backgroundColor } })
						}
					/>
				</div>
			)}
		</div>
	);
}
