import { ProductBlockProps } from "@/components/blocks/ProductBlock";
import { useEditor } from "@/context/EditorContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ColorPicker from "react-best-gradient-color-picker";
import { useCallback, useRef } from "react";
interface ProductEditorProps {
	props: ProductBlockProps;
}

export function ProductEditor({ props }: ProductEditorProps) {
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
	return (
		<Tabs defaultValue="appearance" className="w-full p-4">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="appearance">Appearance</TabsTrigger>
			</TabsList>
			<TabsContent value="appearance">
				<div className="w-full gap-4 flex flex-col mt-4">
					<div className="p-2 rounded-md border flex flex-col">
						<div>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" className="cursor-pointer">
										Background
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-full">
									<ColorPicker
										value={(item.props as ProductBlockProps).background || ""}
										onChange={handleColorChange}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
