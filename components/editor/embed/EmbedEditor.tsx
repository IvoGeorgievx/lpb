import { EmbedBlockProps } from "@/components/blocks/EmbedBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { Switch } from "@/components/ui/switch";
import { useState, type ChangeEvent } from "react";
import { MAX_DOCUMENT_ITEMS } from "@/lib/document";

interface EmbedEditorProps {
	props: EmbedBlockProps;
}

export function EmbedEditor({ props }: EmbedEditorProps) {
	const { item, onPropsChange } = useEditor();
	const [bulletError, setBulletError] = useState("");
	if (!item) return null;
	const bulletText = (props.contentBullets ?? []).join("\n");

	return (
		<div className="w-full flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<Label htmlFor="embed-src">Embed URL</Label>
				<Input
					id="embed-src"
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
				<Label htmlFor="embed-title">Iframe Title</Label>
				<Input
					id="embed-title"
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
					aria-label="Embed height"
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
						<Label htmlFor="embed-heading">Panel Heading</Label>
						<Input
							id="embed-heading"
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
						<Label htmlFor="embed-paragraph">Panel Paragraph</Label>
						<textarea
							id="embed-paragraph"
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
						<Label htmlFor="embed-bullets">
							Bullet points (one per line)
						</Label>
						<textarea
							id="embed-bullets"
							className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
							value={bulletText}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
								const bullets = e.target.value.split("\n");
								if (bullets.length > MAX_DOCUMENT_ITEMS) {
									setBulletError(
										`Use no more than ${MAX_DOCUMENT_ITEMS} bullet points.`,
									);
									return;
								}
								setBulletError("");
								onPropsChange({
									id: item.id,
									props: {
										...props,
										contentBullets: bullets,
									},
								});
							}}
							aria-invalid={!!bulletError}
							aria-describedby={
								bulletError ? "embed-bullets-error" : undefined
							}
							placeholder={
								"First point\nSecond point\nThird point"
							}
						/>
						{bulletError && (
							<p
								id="embed-bullets-error"
								role="alert"
								className="text-sm text-destructive"
							>
								{bulletError}
							</p>
						)}
					</div>
				</>
			) : null}
		</div>
	);
}
