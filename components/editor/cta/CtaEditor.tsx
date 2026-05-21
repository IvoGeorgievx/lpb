import { CtaBlockProps } from "@/components/blocks/CtaBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";

interface CtaEditorProps {
	props: CtaBlockProps;
}

export function CtaEditor({ props }: CtaEditorProps) {
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

	return (
		<div className="p-4 w-full flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<Label>Heading</Label>
				<Input
					value={props.heading || ""}
					onChange={(e) =>
						onPropsChange({
							id: item.id,
							props: { ...props, heading: e.target.value },
						})
					}
					placeholder="Ready to launch something great?"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Subheading</Label>
				<Input
					value={props.subheading || ""}
					onChange={(e) =>
						onPropsChange({
							id: item.id,
							props: { ...props, subheading: e.target.value },
						})
					}
					placeholder="Create a polished page in minutes..."
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Button Text</Label>
				<Input
					value={button.text}
					onChange={(e) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								button: { ...button, text: e.target.value },
							},
						})
					}
					placeholder="Start free"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Button Link</Label>
				<Input
					value={button.link}
					onChange={(e) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								button: { ...button, link: e.target.value },
							},
						})
					}
					placeholder="#"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Button Background</Label>
				<div className="flex items-center gap-2">
					<Input
						type="color"
						value={button.backgroundColor}
						onChange={(e) =>
							onPropsChange({
								id: item.id,
								props: {
									...props,
									button: { ...button, backgroundColor: e.target.value },
								},
							})
						}
						className="h-10 w-16 p-1"
					/>
					<Input
						value={button.backgroundColor}
						onChange={(e) =>
							onPropsChange({
								id: item.id,
								props: {
									...props,
									button: { ...button, backgroundColor: e.target.value },
								},
							})
						}
						placeholder="#111827"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Button Text Color</Label>
				<div className="flex items-center gap-2">
					<Input
						type="color"
						value={button.color}
						onChange={(e) =>
							onPropsChange({
								id: item.id,
								props: {
									...props,
									button: { ...button, color: e.target.value },
								},
							})
						}
						className="h-10 w-16 p-1"
					/>
					<Input
						value={button.color}
						onChange={(e) =>
							onPropsChange({
								id: item.id,
								props: {
									...props,
									button: { ...button, color: e.target.value },
								},
							})
						}
						placeholder="#ffffff"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Button Radius: {button.radius}px</Label>
				<Slider
					value={[Number(button.radius)]}
					min={0}
					max={40}
					step={1}
					onValueChange={(value) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								button: { ...button, radius: value[0] },
							},
						})
					}
				/>
			</div>
		</div>
	);
}
