import {
	ProductBlockProps,
	ProductCard,
	ProductCardVariants,
	TextConfig,
} from "@/components/blocks/ProductBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/context/EditorContext";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
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

	const updateSelectedCard = (updater: (card: ProductCard) => ProductCard) => {
		if (!selectedCardId) return;
		onPropsChange({
			id: item.id,
			props: {
				...props,
				cards: cards.map((card) =>
					card.id === selectedCardId ? updater(card) : card,
				),
			},
		});
	};

	const addCard = () => {
		const newCard: ProductCard = {
			id: String(Date.now()),
			heading: { content: "New card" },
			subheading: { content: "Subheading" },
			style: { background: "#ffffff" },
			variant: "default",
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
		updateSelectedCard((card) => ({
			...card,
			variant,
		}));
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
						<div className="grid grid-cols-2 gap-3 md:grid-cols-3 mt-2">
							{cards &&
								cards.map((card) => {
									const isSelected = selectedCardId === card.id;

									return (
										<div
											key={card.id}
											onClick={() => handleCardSelection(card)}
											className={`
            rounded-2xl border p-4 text-left transition-all duration-200
            hover:translate-y-0.5 cursor-pointer
            ${
							isSelected
								? "border-primary bg-primary/10 shadow-md"
								: "border-border/50 bg-muted/20 hover:border-primary/30"
						}
          `}
										>
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<h4 className="font-medium line-clamp-1">
														{card.heading?.content || "Untitled"}
													</h4>

													{card.variant && (
														<span className="text-[10px] uppercase tracking-wide text-muted-foreground">
															{card.variant}
														</span>
													)}
												</div>

												<p className="text-xs text-muted-foreground line-clamp-2">
													{card.subheading?.content || "No subheading"}
												</p>
											</div>
										</div>
									);
								})}
						</div>
					</div>
					{selectedCard && (
						<div className="rounded-2xl border border-border/40 bg-muted/30 p-5 space-y-6">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-semibold tracking-tight">
										Edit Card
									</h3>

									<p className="text-sm text-muted-foreground">
										Customize content and appearance.
									</p>
								</div>

								<div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
									{selectedCard.variant || "default"}
								</div>
							</div>

							<div className="space-y-3">
								<Label>Variant</Label>

								<div className="grid grid-cols-2 gap-3">
									{VARIANTS.map((variant) => {
										const isActive = selectedCard.variant === variant;

										return (
											<div
												key={variant}
												onClick={() =>
													handleCardVariantChange(
														variant as ProductCardVariants,
													)
												}
												className={`
								rounded-2xl border p-4 text-left transition-all duration-200
								hover:scale-[1.02]
								hover:border-primary/40
								${
									isActive
										? "border-primary bg-primary/10 shadow-sm"
										: "border-border/50 bg-background/40"
								}
							`}
											>
												<div className="flex flex-col gap-2">
													<div className="flex items-center justify-between">
														<span className="text-sm font-medium capitalize">
															{variant}
														</span>

														{isActive && (
															<div className="h-2 w-2 rounded-full bg-primary" />
														)}
													</div>

													<div
														className={`
										h-14 overflow-hidden rounded-xl border
										${
											variant === "glass"
												? "border-white/10 bg-white/5 backdrop-blur-md"
												: variant === "outlined"
													? "border-white/20 bg-transparent"
													: variant === "ghost"
														? "border-transparent bg-transparent"
														: variant === "featured"
															? "border-primary/30 bg-primary/20"
															: "bg-muted"
										}
									`}
													>
														<div className="flex flex-col gap-1 p-2">
															<div className="h-2 w-16 rounded bg-white/40" />
															<div className="h-2 w-10 rounded bg-white/20" />
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium">Card Style</h4>
									<p className="mt-1 text-xs text-muted-foreground">
										These override any values applied by global presets.
									</p>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label>Card Background</Label>
										<Input
											type="color"
											value={selectedCard.style?.background?.toString() || "#ffffff"}
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													style: { ...card.style, background: e.target.value },
												}))
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Card Border</Label>
										<Input
											value={selectedCard.style?.border?.toString() || ""}
											placeholder="1px solid #e2e8f0"
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													style: { ...card.style, border: e.target.value },
												}))
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Border Radius (px)</Label>
										<Input
											type="number"
											value={Number(selectedCard.style?.borderRadius || 0)}
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													style: {
														...card.style,
														borderRadius: Number(e.target.value || 0),
													},
												}))
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Card Shadow</Label>
										<Input
											value={selectedCard.style?.boxShadow?.toString() || ""}
											placeholder="0 10px 30px rgba(0,0,0,0.04)"
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													style: { ...card.style, boxShadow: e.target.value },
												}))
											}
										/>
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium">Content</h4>

									<p className="mt-1 text-xs text-muted-foreground">
										Edit the primary card copy.
									</p>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="card-heading">Heading</Label>

										<Input
											id="card-heading"
											placeholder="Card Heading"
											className="h-11 rounded-xl"
											value={
												(item.props as ProductBlockProps).cards?.find(
													(card) => card.id === selectedCard?.id,
												)?.heading?.content ?? ""
											}
											onChange={(e) => handleHeadingChange(e, "heading")}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="card-subheading">Subheading</Label>

										<Input
											id="card-subheading"
											placeholder="Card Subheading"
											className="h-11 rounded-xl"
											value={
												(item.props as ProductBlockProps)?.cards?.find(
													(card) => card.id === selectedCard.id,
												)?.subheading?.content ?? ""
											}
											onChange={(e) => handleHeadingChange(e, "subheading")}
										/>
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-3">
									<div className="space-y-2">
										<Label>Heading Color</Label>
										<Input
											type="color"
											value={selectedCard.heading?.color || "#0f172a"}
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													heading: { ...card.heading, content: card.heading?.content || "", color: e.target.value },
												}))
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Subheading Color</Label>
										<Input
											type="color"
											value={selectedCard.subheading?.color || "#475569"}
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													subheading: { ...card.subheading, content: card.subheading?.content || "", color: e.target.value },
												}))
											}
										/>
									</div>
									<div className="space-y-2">
										<Label>Heading Weight</Label>
										<Input
											type="number"
											min={300}
											max={900}
											step={100}
											value={Number(selectedCard.heading?.fontWeight || 700)}
											onChange={(e) =>
												updateSelectedCard((card) => ({
													...card,
													heading: {
														...card.heading,
														content: card.heading?.content || "",
														fontWeight: Number(e.target.value || 700),
													},
												}))
											}
										/>
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<div className="flex items-start justify-between gap-4">
									<div>
										<h4 className="text-sm font-medium">Additional Content</h4>

										<p className="mt-1 text-xs text-muted-foreground">
											Add supporting text, features or metadata.
										</p>
									</div>

									<div className="flex gap-2">
										<Button
											variant="secondary"
											size="sm"
											onClick={addContent}
											className="rounded-xl"
										>
											Add
										</Button>

										<Button
											variant="outline"
											size="sm"
											onClick={removeContent}
											className="rounded-xl"
										>
											Remove
										</Button>
									</div>
								</div>

								{selectedCard.additionalContent?.length ? (
									<div className="space-y-3">
										{selectedCard.additionalContent.map(
											(additionalItem, idx) => (
												<div
													key={idx}
													className="rounded-xl border border-border/40 bg-background/40 p-3"
												>
													<div className="flex items-center gap-3">
														<div className="h-2 w-2 rounded-full bg-primary" />

														<Input
															value={additionalItem.content}
															onChange={(e) => handleAdditionalContent(e, idx)}
															className="border-none shadow-none focus-visible:ring-0"
														/>
													</div>
													<div className="mt-3 grid gap-3 md:grid-cols-3">
														<Input
															type="color"
															value={additionalItem.color || "#64748b"}
															onChange={(e) =>
																updateSelectedCard((card) => {
																	const next = [...(card.additionalContent || [])];
																	next[idx] = { ...next[idx], color: e.target.value };
																	return { ...card, additionalContent: next };
																})
															}
														/>
														<Input
															type="number"
															value={Number(additionalItem.fontSize || 14)}
															onChange={(e) =>
																updateSelectedCard((card) => {
																	const next = [...(card.additionalContent || [])];
																	next[idx] = {
																		...next[idx],
																		fontSize: Number(e.target.value || 14),
																	};
																	return { ...card, additionalContent: next };
																})
															}
														/>
														<Input
															type="number"
															min={300}
															max={900}
															step={100}
															value={Number(additionalItem.fontWeight || 500)}
															onChange={(e) =>
																updateSelectedCard((card) => {
																	const next = [...(card.additionalContent || [])];
																	next[idx] = {
																		...next[idx],
																		fontWeight: Number(e.target.value || 500),
																	};
																	return { ...card, additionalContent: next };
																})
															}
														/>
													</div>
												</div>
											),
										)}
									</div>
								) : (
									<div className="rounded-xl border border-dashed border-border/60 p-6 text-center">
										<p className="text-sm text-muted-foreground">
											No additional content yet.
										</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</TabsContent>
		</Tabs>
	);
}
