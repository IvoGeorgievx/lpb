import { FooterBlockProps } from "@/components/blocks/FooterBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/context/EditorContext";
import { useCallback, useRef } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
export interface FooterEditorProps {
	props: FooterBlockProps;
}

export function FooterEditor({ props }: FooterEditorProps) {
	const { item, onPropsChange } = useEditor();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleColorChange = useCallback(
		(newColor: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				onPropsChange({
					id: item!.id,
					props: {
						background: newColor,
					},
				});
			}, 150);
		},
		[item, onPropsChange],
	);
	if (!item) return null;

	const links = props.links || [];

	const updateLink = (
		index: number,
		field: "label" | "href",
		value: string,
	) => {
		const updatedLinks = links.map((link, i) =>
			i === index
				? {
						...link,
						[field]: value,
					}
				: link,
		);

		onPropsChange({
			id: item.id,
			props: {
				...props,
				links: updatedLinks,
			},
		});
	};

	const addLink = () => {
		onPropsChange({
			id: item.id,
			props: {
				...props,
				links: [
					...links,
					{
						label: "New Link",
						href: "/",
					},
				],
			},
		});
	};

	const removeLink = (index: number) => {
		onPropsChange({
			id: item.id,
			props: {
				...props,
				links: links.filter((_, i) => i !== index),
			},
		});
	};

	return (
		<Tabs defaultValue="layout" className="w-full">
			<div className="border-b p-4">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="layout">Layout</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="layout" className="mt-0 p-4">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<Label>Background Color</Label>

						<div>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" className="cursor-pointer">
										Background
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-full">
									<ColorPicker
										value={(item.props as FooterBlockProps).background || ""}
										onChange={handleColorChange}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Height</Label>
							<Slider
								value={[
									Number(
										(item.props as FooterBlockProps).style?.height
											?.toString()
											.replace("vh", ""),
									) ?? 0,
								]}
								min={20}
								max={60}
								step={1}
								onValueChange={(val) => {
									onPropsChange({
										id: item.id,
										props: {
											...props,
											style: {
												...props.style,
												height: `${val[0]}vh`,
											},
										},
									});
								}}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="font-medium">Logo</h3>

						<div className="flex flex-col gap-2">
							<Label>Logo Image URL</Label>

							<Input
								value={props.logo?.image || ""}
								onChange={(e) =>
									onPropsChange({
										id: item.id,
										props: {
											...props,
											logo: {
												...props.logo,
												image: e.target.value,
											},
										},
									})
								}
								placeholder="https://example.com/logo.png"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<h3 className="font-medium">Links</h3>

							<Button size="sm" onClick={addLink}>
								Add Link
							</Button>
						</div>

						<div className="flex flex-col gap-4">
							{links.map((link, index) => (
								<div
									key={index}
									className="flex flex-col gap-3 rounded-lg border p-4"
								>
									<div className="flex flex-col gap-2">
										<Label>Label</Label>

										<Input
											value={link.label}
											onChange={(e) =>
												updateLink(index, "label", e.target.value)
											}
											placeholder="Home"
										/>
									</div>

									<div className="flex flex-col gap-2">
										<Label>Href</Label>

										<Input
											value={link.href}
											onChange={(e) =>
												updateLink(index, "href", e.target.value)
											}
											placeholder="/home"
										/>
									</div>

									<Button
										variant="destructive"
										size="sm"
										onClick={() => removeLink(index)}
									>
										Remove Link
									</Button>
								</div>
							))}
						</div>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
