import { EmbedBlockProps } from "@/components/blocks/EmbedBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { Switch } from "@/components/ui/switch";
import type { ChangeEvent } from "react";

interface EmbedEditorProps {
	props: EmbedBlockProps;
}

export function EmbedEditor({ props }: EmbedEditorProps) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	const bulletText = (props.contentBullets ?? []).join("\n");

	return (
		<div className="p-4 w-full flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<Label>Embed URL</Label>
				<Input
					value={props.src || ""}
					onChange={(e) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								src: e.target.value,
							},
						})
					}
					placeholder="https://example.com/embed"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Iframe Title</Label>
				<Input
					value={props.title || ""}
					onChange={(e) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								title: e.target.value,
							},
						})
					}
					placeholder="Embedded content"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Height: {props.height ?? 520}px</Label>
				<Slider
					value={[props.height ?? 520]}
					min={240}
					max={1000}
					step={10}
					onValueChange={(value) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								height: value[0],
							},
						})
					}
				/>
			</div>

			<div className="flex items-center justify-between rounded-md border p-3">
				<Label htmlFor="allow-fullscreen">Allow fullscreen</Label>
				<Switch
					id="allow-fullscreen"
					checked={props.allowFullScreen ?? true}
					onCheckedChange={(checked) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								allowFullScreen: checked,
							},
						})
					}
				/>
			</div>

			<div className="flex items-center justify-between rounded-md border p-3">
				<Label htmlFor="show-content-panel">Show text panel</Label>
				<Switch
					id="show-content-panel"
					checked={props.showContentPanel ?? false}
					onCheckedChange={(checked) =>
						onPropsChange({
							id: item.id,
							props: {
								...props,
								showContentPanel: checked,
							},
						})
					}
				/>
			</div>

			{props.showContentPanel ? (
				<>
					<div className="flex flex-col gap-2">
						<Label>Panel Heading</Label>
						<Input
							value={props.contentHeading || ""}
							onChange={(e) =>
								onPropsChange({
									id: item.id,
									props: {
										...props,
										contentHeading: e.target.value,
									},
								})
							}
							placeholder="Why this embed matters"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Panel Paragraph</Label>
						<textarea
							className="min-h-22 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
							value={props.contentParagraph || ""}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								onPropsChange({
									id: item.id,
									props: {
										...props,
										contentParagraph: e.target.value,
									},
								})
							}
							placeholder="Add supporting context for users."
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Bullet points (one per line)</Label>
						<textarea
							className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
							value={bulletText}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								onPropsChange({
									id: item.id,
									props: {
										...props,
										contentBullets: e.target.value.split("\n"),
									},
								})
							}
							placeholder={"First point\nSecond point\nThird point"}
						/>
					</div>
				</>
			) : null}
		</div>
	);
}
