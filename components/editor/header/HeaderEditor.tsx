import { HeaderBlockProps } from "@/components/blocks/HeaderBlock";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/context/EditorContext";
import { TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
interface HeaderEditorProps {
	props: HeaderBlockProps;
}

export function HeaderEditor({ props }: HeaderEditorProps) {
	const { item, onPropsChange } = useEditor();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [logo, setLogo] = useState<"image" | "text">("image");
	const [cta, setCta] = useState(!!(item?.props as HeaderBlockProps).cta?.text);

	const handleColorChange = useCallback(
		(newColor: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				onPropsChange({
					id: item!.id,
					props: {
						...props,
						style: {
							background: newColor,
						},
					},
				});
			}, 150);
		},
		[item, onPropsChange, props],
	);

	const handleCtaColorChange = useCallback(
		(color: string, type: "text" | "background") => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				onPropsChange({
					id: item!.id,
					props: {
						...props,
						cta:
							type === "text"
								? {
										...props.cta,
										color,
									}
								: {
										...props.cta,
										backgroundColor: color,
									},
					},
				});
			}, 150);
		},
		[item, onPropsChange, props],
	);
	if (!item) return null;
	return (
		<div key={item.id} className="p-4 w-full">
			<Tabs defaultValue="layout" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="layout">Layout</TabsTrigger>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
				</TabsList>

				<TabsContent value="layout" className="space-y-4 pt-4">
					<div className="space-y-2 flex gap-5">
						<div className="w-full">
							<Label htmlFor="header-height-slider">
								Height: {props.style?.height}px
							</Label>
							<Slider
								className="mt-2"
								id="header-height-slider"
								value={[Number(props.style?.height ?? 0)]}
								onValueChange={(value) =>
									onPropsChange({
										id: item.id,
										props: { style: { ...props.style, height: value[0] } },
									})
								}
								min={45}
								max={150}
								step={1}
							/>
						</div>
						<div className="w-full">
							<Label htmlFor="header-radius-slider">
								Border Radius: {props.style?.borderRadius}px
							</Label>
							<Slider
								className="mt-2"
								id="header-radius-slider"
								value={[Number(props.style?.borderRadius ?? 0)]}
								onValueChange={(value) =>
									onPropsChange({
										id: item.id,
										props: {
											style: { ...props.style, borderRadius: value[0] },
										},
									})
								}
								min={0}
								max={40}
								step={1}
							/>
						</div>
					</div>
					<div className="space-y-2 flex gap-5">
						<div className="w-full">
							<Label htmlFor="header-padding-slider">
								Padding: {props.style?.padding}px
							</Label>
							<Slider
								className="mt-2"
								id="header-padding-slider"
								value={[Number(props.style?.padding ?? 0)]}
								onValueChange={(value) =>
									onPropsChange({
										id: item.id,
										props: {
											style: { ...props.style, padding: value[0] },
										},
									})
								}
								min={0}
								max={40}
								step={1}
							/>
						</div>
						<div className="w-full"></div>
					</div>
					<Separator />
					<div className="flex items-center space-x-2">
						<Switch
							id="logo-switch"
							checked={logo === "image"}
							onCheckedChange={() => {
								setLogo((prev) => (prev === "image" ? "text" : "image"));
							}}
						/>
						<Label htmlFor="logo-switch">
							{logo === "image" ? "Image" : "Text"}
						</Label>
						<FieldGroup className="mx-auto w-56">
							<Field orientation="horizontal">
								<Checkbox
									id="sticky-checkbox"
									name="sticky"
									onCheckedChange={(v) =>
										onPropsChange({
											id: item.id,
											props: {
												sticky: v ? true : undefined,
											},
										})
									}
								/>
								<FieldLabel htmlFor="sticky-checkbox">Sticky?</FieldLabel>
							</Field>
						</FieldGroup>
					</div>

					{logo === "text" ? (
						<div className="space-y-2 flex gap-5">
							<div className="w-full m-0">
								<Input
									placeholder="Logo"
									value={props.logoText || ""}
									onChange={(e) =>
										onPropsChange({
											id: item.id,
											props: {
												...props,
												style: {
													backgroundImage: undefined,
												},
												logoText: e.target.value,
											},
										})
									}
								/>
							</div>
							<div className="w-full flex justify-center items-center gap-5">
								<ToggleGroup
									variant="outline"
									type="single"
									onValueChange={(value) => {
										console.log(value);
										onPropsChange({
											id: item.id,
											props: {
												style: {
													textAlign: value as React.CSSProperties["textAlign"],
												},
											},
										});
									}}
								>
									<Tooltip>
										<TooltipTrigger asChild>
											<ToggleGroupItem
												className="cursor-pointer"
												value="start"
												aria-label="Toggle align left"
											>
												<TextAlignStart />
											</ToggleGroupItem>
										</TooltipTrigger>
										<TooltipContent side="left">
											<p>Align Logo Left</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<ToggleGroupItem
												className="cursor-pointer"
												value="center"
												aria-label="Toggle align center"
											>
												<TextAlignJustify />
											</ToggleGroupItem>
										</TooltipTrigger>
										<TooltipContent>
											<p>Align Logo Middle</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<ToggleGroupItem
												className="cursor-pointer"
												value="end"
												aria-label="Toggle align right"
											>
												<TextAlignEnd />
											</ToggleGroupItem>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>Align Logo Right</p>
										</TooltipContent>
									</Tooltip>
								</ToggleGroup>
							</div>
						</div>
					) : (
						<Input
							placeholder="Logo Image Url"
							value={props.style?.backgroundImage || ""}
							onChange={(e) =>
								onPropsChange({
									id: item.id,
									props: {
										...props,
										logoText: "",
										logo: true,
										style: {
											backgroundImage: e.target.value,
										},
									},
								})
							}
						/>
					)}

					<FieldGroup className="w-56">
						<Field orientation="horizontal">
							<Checkbox
								id="cta-checkbox"
								name="cta"
								checked={cta}
								onCheckedChange={() => setCta(!cta)}
							/>
							<FieldLabel htmlFor="cta-checkbox">CTA button?</FieldLabel>
						</Field>
					</FieldGroup>
					{cta && (
						<div className="space-y-4 rounded-xl bg-muted/40 border p-4">
							<div className="space-y-2">
								<Label>CTA Text</Label>
								<Input
									placeholder="Get Started"
									value={props.cta?.text || ""}
									onChange={(ev) => {
										onPropsChange({
											id: item.id,
											props: {
												cta: {
													...props.cta,
													text: ev.target.value,
												},
											},
										});
									}}
								/>
							</div>
							<div className="space-y-2">
								<Label>CTA Link</Label>
								<Input
									placeholder="Get Started"
									value={props.cta?.link || ""}
									onChange={(ev) => {
										onPropsChange({
											id: item.id,
											props: {
												cta: {
													...props.cta,
													link: ev.target.value,
												},
											},
										});
									}}
								/>
							</div>

							<div className="w-full">
								<Label htmlFor="header-paddingY-cta-slider">
									Horizontal Padding: {props.cta?.paddingX}px
								</Label>
								<Slider
									className="mt-2"
									id="header-paddingY-cta-slider"
									value={[Number(props.cta?.paddingX ?? 0)]}
									onValueChange={(value) =>
										onPropsChange({
											id: item.id,
											props: {
												...props,
												cta: {
													...props.cta,
													paddingX: value[0],
												},
											},
										})
									}
									min={0}
									max={40}
									step={1}
								/>
							</div>
							<div className="w-full">
								<Label htmlFor="header-radius-cta-slider">
									Radius: {props.cta?.radius}px
								</Label>
								<Slider
									className="mt-2"
									id="header-radius-cta-slider"
									value={[Number(props.cta?.radius ?? 0)]}
									onValueChange={(value) =>
										onPropsChange({
											id: item.id,
											props: {
												...props,
												cta: {
													...props.cta,
													radius: value[0],
												},
											},
										})
									}
									min={0}
									max={40}
									step={1}
								/>
							</div>
							<div className="w-full">
								<Label htmlFor="header-paddingX-cta-slider">
									Vertical Padding: {props.cta?.paddingY}px
								</Label>
								<Slider
									className="mt-2"
									id="header-paddingX-cta-slider"
									value={[Number(props.cta?.paddingY ?? 0)]}
									onValueChange={(value) =>
										onPropsChange({
											id: item.id,
											props: {
												...props,
												cta: {
													...props.cta,
													paddingY: value[0],
												},
											},
										})
									}
									min={0}
									max={40}
									step={1}
								/>
							</div>

							<div className="space-y-2">
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline" className="cursor-pointer">
											Background
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-full">
										<ColorPicker
											value={
												((item.props as HeaderBlockProps).cta
													?.backgroundColor as string) || ""
											}
											onChange={(color) =>
												handleCtaColorChange(color, "background")
											}
										/>
									</PopoverContent>
								</Popover>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline" className="cursor-pointer ml-2">
											Text Color
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-full">
										<ColorPicker
											value={
												((item.props as HeaderBlockProps).cta
													?.color as string) || ""
											}
											onChange={(color) => handleCtaColorChange(color, "text")}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					)}
				</TabsContent>

				<TabsContent value="appearance" className="pt-4">
					<div className="text-sm text-muted-foreground">
						<div>
							<ColorPicker
								value={
									((item.props as HeaderBlockProps).style
										?.background as string) || ""
								}
								onChange={handleColorChange}
							/>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
