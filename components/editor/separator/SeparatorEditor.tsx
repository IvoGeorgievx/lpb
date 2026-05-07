import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

import { Label } from "@/components/ui/label";

import {
	SectionSeparatorProps,
	SeparatorType,
} from "@/components/blocks/SectionSeparatorBlock";
import { Switch } from "@/components/ui/switch";
import { useEditor } from "@/context/EditorContext";
import ColorPicker from "react-best-gradient-color-picker";
import { Button } from "@/components/ui/button";

interface SeparatorEditorProps {
	props: SectionSeparatorProps;
}

const separatorTypes = [
	// "wave",
	"waves",
	// "curve",
	"triangle",
	"tilt",
	"zigzag",
	// "line",
] as const;

export const SeparatorEditor = ({ props }: SeparatorEditorProps) => {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	return (
		<Tabs defaultValue="settings" className="w-full p-4">
			<TabsList className="grid w-full grid-cols-1">
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>

			<TabsContent value="settings" className="mt-4 flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<Label>Separator Type</Label>

					<Select
						onValueChange={(value: SeparatorType) => {
							onPropsChange({
								id: item.id,
								props: {
									...props,
									type: value,
								},
							});
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select type" />
						</SelectTrigger>

						<SelectContent>
							{separatorTypes.map((type) => (
								<SelectItem key={type} value={type} className="capitalize">
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<Label>Height</Label>

						<span className="text-xs text-muted-foreground"></span>
					</div>

					<Slider
						min={40}
						max={200}
						step={10}
						defaultValue={[(item.props as SectionSeparatorProps).height || 80]}
						onValueChange={(value) => {
							onPropsChange({
								id: item.id,
								props: {
									...props,
									height: value[0],
								},
							});
						}}
					/>
				</div>

				<div className="flex items-center justify-between rounded-xl border p-4">
					<div className="space-y-1">
						<p className="text-sm font-medium">Flip Horizontally</p>

						<p className="text-xs text-muted-foreground">
							Mirror separator on the X axis
						</p>
					</div>

					<Switch
						checked={(item.props as SectionSeparatorProps).flipX || false}
						onCheckedChange={(checked) => {
							onPropsChange({
								id: item.id,
								props: {
									...props,
									flipX: checked,
								},
							});
						}}
					/>
				</div>

				<div className="flex items-center justify-between rounded-xl border p-4">
					<div className="space-y-1">
						<p className="text-sm font-medium">Flip Vertically</p>

						<p className="text-xs text-muted-foreground">
							Invert separator on the Y axis
						</p>
					</div>

					<Switch
						checked={(item.props as SectionSeparatorProps).flipY || false}
						onCheckedChange={(checked) => {
							onPropsChange({
								id: item.id,
								props: {
									...props,
									flipY: checked,
								},
							});
						}}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label>Color</Label>

					<div className="h-12 p-2 w-full rounded-xl border bg-muted">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="cursor-pointer transition-all duration-100 hover:-translate-y-0.5 ease-in"
								>
									{" "}
									Change Color
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverHeader>
									<PopoverTitle>Choose Color</PopoverTitle>
									<ColorPicker
										hidePresets
										hideControls
										value={(item.props as SectionSeparatorProps).fill || ""}
										onChange={(color) => {
											onPropsChange({
												id: item.id,
												props: {
													...props,
													fill: color,
												},
											});
										}}
									/>
								</PopoverHeader>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
};
