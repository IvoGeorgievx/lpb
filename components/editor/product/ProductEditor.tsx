import {
	ProductBlockProps,
	ProductCard,
} from "@/components/blocks/ProductBlock";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/context/EditorContext";
import { useCallback, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
interface ProductEditorProps {
	props: ProductBlockProps;
}

export function ProductEditor({ props }: ProductEditorProps) {
	const { item, onPropsChange } = useEditor();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [cards, setCards] = useState<ProductCard[]>(
		(item?.props as ProductBlockProps).cards || [],
	);

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

	const addCard = () => {
		const newCard: ProductCard = {
			id: String(Date.now()),
			heading: { content: "New card" },
			subheading: { content: "Subheading" },
			style: { background: "#ffffff" },
		};

		setCards((prev) => [...prev, newCard]);

		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: [...(props.cards || []), newCard],
			},
		});
	};
	return (
		<Tabs defaultValue="appearance" className="w-full p-4">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="appearance">Appearance</TabsTrigger>
			</TabsList>
			<TabsContent value="appearance">
				<div className="w-full gap-4 flex flex-col mt-4">
					<div className="p-2 rounded-md border flex ">
						<div className="w-full">
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
					<div className="p-2 rounded-md border flex flex-col">
						<Button variant="outline" onClick={addCard}>
							Add Card
						</Button>
						{cards &&
							cards.map((card) => (
								<div key={card.id} onClick={() => console.log(card.id)}>
									{card.heading?.content}
								</div>
							))}
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
