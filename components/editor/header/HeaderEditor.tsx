import { HeaderBlockProps } from "@/components/blocks/HeaderBlock";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/context/EditorContext";
import { TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import ColorPicker from "react-best-gradient-color-picker";

interface HeaderEditorProps {
	props: HeaderBlockProps;
}

export function HeaderEditor({ props }: HeaderEditorProps) {
	const { item, onPropsChange } = useEditor();
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
					<div className="space-y-2 flex gap-5">
						<div className="w-full m-0">
							<Input
								placeholder="Logo"
								value={props.logo || ""}
								onChange={(e) =>
									onPropsChange({
										id: item.id,
										props: {
											logo: e.target.value,
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
							<FieldGroup className="mx-auto w-56">
								<Field orientation="horizontal">
									<Checkbox
										id="sticky-checkbox"
										name="sticky"
										onCheckedChange={(v) =>
											onPropsChange({
												id: item.id,
												props: {
													style: {
														position: v ? "sticky" : undefined,
														top: v ? 0 : undefined,
													},
												},
											})
										}
									/>
									<FieldLabel htmlFor="sticky-checkbox">Sticky?</FieldLabel>
								</Field>
							</FieldGroup>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="appearance" className="pt-4">
					<div className="text-sm text-muted-foreground">
						<div>
							<ColorPicker
								value={props.style?.backgroundColor || "#ffffff"}
								onChange={(value) =>
									onPropsChange({
										id: item.id,
										props: {
											style: { ...props.style, backgroundColor: value },
										},
									})
								}
							/>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
