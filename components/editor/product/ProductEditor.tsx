import {
	ProductBlockProps,
	ProductCard,
	ProductCardVariants,
	TextConfig,
} from "@/components/blocks/ProductBlock";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/context/EditorContext";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import ProductCardEditor from "./ProductCardEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
interface ProductEditorProps {
	props: ProductBlockProps;
}

const VARIANTS = ["default", "featured", "ghost", "outlined", "glass"];

export function ProductEditor({ props }: ProductEditorProps) {
	const { item, onPropsChange } = useEditor();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

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

	const cards = (item.props as ProductBlockProps).cards || [];

	const selectedCard = cards.find((card) => card.id === selectedCardId);

	console.log(selectedCard);
	const addCard = () => {
		const newCard: ProductCard = {
			id: String(Date.now()),
			heading: { content: "New card" },
			subheading: { content: "Subheading" },
			style: { background: "#ffffff" },
		};

		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: [...(props.cards || []), newCard],
			},
		});
	};

	const removeCard = () => {
		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: [...(props.cards || [])].slice(0, -1),
			},
		});
	};

	const handleHeadingChange = (
		event: ChangeEvent<HTMLInputElement>,
		headingType: "heading" | "subheading",
	) => {
		if (!selectedCard) return;
		const newHeading = event.target.value;

		const updatedCards = cards.map((card) => {
			if (card.id !== selectedCard.id) return card;
			return {
				...card,
				[headingType]: {
					...card[headingType],
					content: newHeading,
				},
			};
		});

		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: updatedCards,
			},
		});
	};

	const handleCardSelection = (card: ProductCard) => {
		setSelectedCardId(card.id);
	};

	const addContent = () => {
		if (!selectedCardId) return;

		const newContent: TextConfig = {
			content: "New content",
			fontSize: 15,
		};

		const updatedCards = ((item.props as ProductBlockProps).cards || []).map(
			(card) => {
				if (card.id !== selectedCardId) return card;

				return {
					...card,
					additionalContent: [...(card.additionalContent || []), newContent],
				};
			},
		);

		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: updatedCards,
			},
		});
	};

	const removeContent = () => {
		if (!selectedCardId) return;

		const updatedCards = ((item.props as ProductBlockProps).cards || []).map(
			(card) => {
				if (card.id !== selectedCardId) return card;

				return {
					...card,
					additionalContent: (card.additionalContent || []).slice(0, -1),
				};
			},
		);
		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: updatedCards,
			},
		});
	};

	const handleAdditionalContent = (
		event: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		if (!selectedCardId) return;

		const newValue = event.target.value;

		const updatedCards = ((item.props as ProductBlockProps).cards || []).map(
			(card) => {
				if (card.id !== selectedCardId) return card;

				const updatedAdditionalContent = [...(card.additionalContent || [])];

				updatedAdditionalContent[index] = {
					...updatedAdditionalContent[index],
					content: newValue,
				};

				return {
					...card,
					additionalContent: updatedAdditionalContent,
				};
			},
		);

		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: updatedCards,
			},
		});
	};

	const handleCardVariantChange = (variant: ProductCardVariants) => {
		onPropsChange({
			id: item.id,
			props: {
				cards: cards.map((card) => {
					if (card.id !== selectedCardId) return card;
					return {
						...card,
						variant,
					};
				}),
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
						<div className="w-full flex gap-4 justify-around">
							<Button variant="outline" onClick={addCard}>
								Add Card
							</Button>
							{(item.props as ProductBlockProps)?.cards?.length ? (
								<Button variant="outline" onClick={removeCard}>
									Remove Card
								</Button>
							) : null}
						</div>
						<div className="flex gap-2 w-full flex-wrap">
							{cards &&
								cards.map((card) => (
									<ProductCardEditor
										key={card.id}
										card={card}
										onSelect={handleCardSelection}
									/>
								))}
						</div>
					</div>
					{selectedCard && (
						<div className="p-2 rounded-md border flex flex-col gap-2">
							<div className="flex flex-col gap-2 items-center">
								<Label htmlFor="card-variant">Variant</Label>
								<Select
									onValueChange={(value: ProductCardVariants) =>
										handleCardVariantChange(value)
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Variant" />
									</SelectTrigger>
									<SelectContent id="card-variant">
										<SelectGroup>
											<SelectLabel>Variant</SelectLabel>
											{VARIANTS.map((variant, idx) => (
												<SelectItem key={idx} value={variant.toString()}>
													{variant}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex gap-2 justify-center items-center">
								<div className="w-full flex flex-col gap-2 items-center">
									<Label htmlFor="card-heading">Heading</Label>
									<Input
										id="card-heading"
										placeholder="Card Heading"
										value={
											(item.props as ProductBlockProps).cards?.find(
												(card) => card.id === selectedCard?.id,
											)?.heading?.content ?? ""
										}
										onChange={(e) => handleHeadingChange(e, "heading")}
									/>
								</div>
								<div className="w-full flex flex-col gap-2 items-center mb-2">
									<Label htmlFor="card-subheading">Subheading</Label>
									<Input
										id="card-subheading"
										placeholder="Card Subheading"
										value={
											(item.props as ProductBlockProps)?.cards?.find(
												(card) => card.id === selectedCard.id,
											)?.subheading?.content ?? ""
										}
										onChange={(e) => handleHeadingChange(e, "subheading")}
									/>
								</div>
							</div>
							<Separator />
							<div className="flex flex-col mt-2 gap-2 justify-center items-center">
								<div className="flex gap-2 justify-between w-full">
									<Button variant="outline" onClick={addContent}>
										Add More Content
									</Button>
									<Button variant="outline" onClick={removeContent}>
										Remove Content
									</Button>
								</div>
								{selectedCard?.additionalContent?.map((additionalItem, idx) => {
									return (
										<div key={idx} className="flex w-full gap-2">
											<Input
												className="w-full"
												value={additionalItem.content}
												onChange={(e) => handleAdditionalContent(e, idx)}
											/>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</TabsContent>
		</Tabs>
	);
}
