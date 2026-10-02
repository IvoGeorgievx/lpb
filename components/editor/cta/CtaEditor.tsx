import type { CtaBlockProps } from "@/components/blocks/CtaBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { ColorField } from "../ColorField";

export function CtaEditor({ props }: { props: CtaBlockProps }) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	const button = props.button ?? {
		text: "Start free",
		link: "#",
		backgroundColor: "#111827",
		color: "#ffffff",
		radius: 999,
		paddingX: 24,
		paddingY: 12,
	};
	const update = (props: CtaBlockProps) =>
		onPropsChange({ id: item.id, props });
	return (
		<div className="space-y-5">
			<Label htmlFor="cta-heading">Heading</Label>
			<Input
				id="cta-heading"
				value={props.heading ?? ""}
				onChange={(event) => update({ heading: event.target.value })}
			/>
			<Label htmlFor="cta-subheading">Subheading</Label>
			<Input
				id="cta-subheading"
				value={props.subheading ?? ""}
				onChange={(event) => update({ subheading: event.target.value })}
			/>
			<Label htmlFor="cta-text">Button text</Label>
			<Input
				id="cta-text"
				value={button.text}
				onChange={(event) =>
					update({ button: { ...button, text: event.target.value } })
				}
			/>
			<Label htmlFor="cta-link">Button link</Label>
			<Input
				id="cta-link"
				value={button.link}
				onChange={(event) =>
					update({ button: { ...button, link: event.target.value } })
				}
			/>
			<ColorField
				background
				id="cta-background"
				label="Button background"
				value={button.backgroundColor}
				onChange={(backgroundColor) =>
					update({ button: { ...button, backgroundColor } })
				}
			/>
			<ColorField
				id="cta-color"
				label="Button text color"
				value={button.color}
				onChange={(color) => update({ button: { ...button, color } })}
			/>
			<Label htmlFor="cta-radius">Button radius: {button.radius}px</Label>
			<Slider
				id="cta-radius"
				min={0}
				max={999}
				value={[button.radius]}
				onValueChange={([radius]) =>
					update({ button: { ...button, radius } })
				}
			/>
		</div>
	);
}
