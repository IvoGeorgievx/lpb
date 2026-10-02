import type {
	ProductBlockProps,
	ProductCard,
	ProductCardVariants,
	TextConfig,
} from "@/components/blocks/ProductBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor } from "@/context/EditorContext";
import { usePage } from "@/context/PageContext";
import { getThemePreset } from "@/lib/theme";
import { Fragment, useState } from "react";
import { ColorField } from "../ColorField";
import { MAX_DOCUMENT_ITEMS } from "@/lib/document";

const VARIANTS: ProductCardVariants[] = [
	"default",
	"featured",
	"ghost",
	"outlined",
	"glass",
];

export function ProductEditor({ props }: { props: ProductBlockProps }) {
	const { item, onPropsChange } = useEditor();
	const { page } = usePage();
	const [chosenId, setChosenId] = useState<string>();
	if (!item) return null;
	const theme = getThemePreset(page.activeTheme);
	const cards = props.cards ?? [];
	const card = cards.find((card) => card.id === chosenId) ?? cards[0];
	const updateCards = (cards: ProductCard[]) =>
		onPropsChange({ id: item.id, props: { cards } });
	const updateCard = (change: Partial<ProductCard>) => {
		if (card)
			updateCards(
				cards.map((entry) =>
					entry.id === card.id ? { ...entry, ...change } : entry,
				),
			);
	};
	const updateStyle = (style: React.CSSProperties) =>
		updateCard({ style: { ...card?.style, ...style } });
	const updateText = (
		key: "heading" | "subheading",
		change: Partial<TextConfig>,
	) =>
		updateCard({
			[key]: {
				content: card?.[key]?.content ?? "",
				...card?.[key],
				...change,
			},
		});
	const content = card?.additionalContent ?? [];
	const updateContent = (index: number, change: Partial<TextConfig>) =>
		updateCard({
			additionalContent: content.map((entry, i) =>
				i === index ? { ...entry, ...change } : entry,
			),
		});
	const addCard = () => {
		if (cards.length >= MAX_DOCUMENT_ITEMS) return;
		const next: ProductCard = {
			id: crypto.randomUUID(),
			heading: { content: "New card" },
			subheading: { content: "Describe this feature." },
			variant: "default",
		};
		updateCards([...cards, next]);
		setChosenId(next.id);
	};
	return (
		<div className="product-editor space-y-6">
			<ColorField
				background
				id="features-background"
				label="Section background"
				value={props.background ?? theme.tokens.background}
				onChange={(background) =>
					onPropsChange({ id: item.id, props: { background } })
				}
			/>
			<div className="space-y-3">
				<Label htmlFor="selected-feature-card">Card to edit</Label>
				<select
					id="selected-feature-card"
					className="editor-select"
					disabled={!card}
					value={card?.id ?? ""}
					onChange={(event) => setChosenId(event.target.value)}
				>
					{!cards.length && <option value="">No cards yet</option>}
					{cards.map((card, index) => (
						<option key={card.id} value={card.id}>
							Card {index + 1} ·{" "}
							{card.heading?.content || "Untitled"}
						</option>
					))}
				</select>
				<div className="flex flex-wrap gap-2">
					<Button
						variant="outline"
						disabled={cards.length >= MAX_DOCUMENT_ITEMS}
						onClick={addCard}
					>
						Add card
					</Button>
					<Button
						variant="outline"
						disabled={!card}
						onClick={() =>
							updateCards(
								cards.filter((entry) => entry.id !== card?.id),
							)
						}
					>
						Remove selected card
					</Button>
				</div>
				{cards.length >= MAX_DOCUMENT_ITEMS && (
					<p role="status" className="text-sm text-muted-foreground">
						Limit reached: {MAX_DOCUMENT_ITEMS} cards per section.
					</p>
				)}
			</div>
			{card ? (
				<Fragment key={card.id}>
					<section
						className="editor-section"
						aria-label="Card content"
					>
						<h3 className="font-semibold">Content</h3>
						<div className="space-y-2">
							<Label htmlFor="card-heading">Heading</Label>
							<Input
								id="card-heading"
								className="h-10"
								value={card.heading?.content ?? ""}
								onChange={(event) =>
									updateText("heading", {
										content: event.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="card-subheading">Subheading</Label>
							<textarea
								id="card-subheading"
								className="editor-textarea"
								rows={3}
								value={card.subheading?.content ?? ""}
								onChange={(event) =>
									updateText("subheading", {
										content: event.target.value,
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="card-icon-class">Icon name</Label>
							<Input
								id="card-icon-class"
								className="h-10"
								value={card.iconClass ?? ""}
								placeholder="award, rocket, briefcase, check…"
								onChange={(event) =>
									updateCard({
										iconClass: event.target.value,
									})
								}
							/>
						</div>
						<ColorField
							id="card-icon-color"
							label="Icon color"
							value={card.iconColor ?? theme.tokens.card}
							onChange={(iconColor) => updateCard({ iconColor })}
						/>
					</section>
					<section
						className="editor-section"
						aria-label="Card appearance"
					>
						<h3 className="font-semibold">Appearance</h3>
						<div className="space-y-2">
							<Label htmlFor="card-variant">Card style</Label>
							<select
								id="card-variant"
								className="editor-select capitalize"
								value={card.variant ?? "default"}
								onChange={(event) =>
									updateCard({
										variant: event.target
											.value as ProductCardVariants,
									})
								}
							>
								{VARIANTS.map((variant) => (
									<option key={variant} value={variant}>
										{variant[0].toUpperCase() +
											variant.slice(1)}
									</option>
								))}
							</select>
						</div>
						<ColorField
							background
							id="card-background"
							label="Card background"
							value={String(
								card.style?.background ?? theme.tokens.card,
							)}
							onChange={(background) =>
								updateStyle({ background })
							}
						/>
						<div className="space-y-2">
							<Label htmlFor="card-border">Border</Label>
							<Input
								id="card-border"
								className="h-10"
								value={String(
									card.style?.border ??
										`1px solid ${theme.tokens.border}`,
								)}
								onChange={(event) =>
									updateStyle({ border: event.target.value })
								}
								placeholder="1px solid #dbe2ec"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="card-radius">
								Corner radius (px)
							</Label>
							<Input
								id="card-radius"
								className="h-10"
								type="number"
								min={0}
								value={Number(
									card.style?.borderRadius ??
										theme.scales.radius,
								)}
								onChange={(event) =>
									updateStyle({
										borderRadius: Math.max(
											0,
											Number(event.target.value),
										),
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="card-shadow">Shadow</Label>
							<Input
								id="card-shadow"
								className="h-10"
								value={String(
									card.style?.boxShadow ??
										theme.scales.shadowSoft,
								)}
								onChange={(event) =>
									updateStyle({
										boxShadow: event.target.value,
									})
								}
								placeholder="0 10px 30px rgba(0,0,0,0.1)"
							/>
						</div>
					</section>
					<section
						className="editor-section"
						aria-label="Card typography"
					>
						<h3 className="font-semibold">Typography</h3>
						<ColorField
							id="card-heading-color"
							label="Heading color"
							value={
								card.heading?.color ?? theme.tokens.foreground
							}
							onChange={(color) =>
								updateText("heading", { color })
							}
						/>
						<ColorField
							id="card-subheading-color"
							label="Subheading color"
							value={card.subheading?.color ?? theme.tokens.muted}
							onChange={(color) =>
								updateText("subheading", { color })
							}
						/>
						<div className="space-y-2">
							<Label htmlFor="card-weight">Heading weight</Label>
							<select
								id="card-weight"
								className="editor-select"
								value={
									card.heading?.fontWeight ??
									theme.typography.headingWeight
								}
								onChange={(event) =>
									updateText("heading", {
										fontWeight: Number(event.target.value),
									})
								}
							>
								{[300, 400, 500, 600, 700, 800, 900].map(
									(weight) => (
										<option key={weight} value={weight}>
											{weight}
										</option>
									),
								)}
							</select>
						</div>
					</section>
					<section
						className="editor-section"
						aria-label="Additional card content"
					>
						<h3 className="font-semibold">Additional content</h3>
						<p className="text-sm text-muted-foreground">
							Supporting details for this card.
						</p>
						{content.map((entry, index) => (
							<fieldset
								key={index}
								className="min-w-0 space-y-4 border-t pt-4"
							>
								<legend className="text-sm font-medium">
									Detail {index + 1}
								</legend>
								<div className="space-y-2">
									<Label htmlFor={`detail-${index}-text`}>
										Text
									</Label>
									<textarea
										id={`detail-${index}-text`}
										className="editor-textarea"
										rows={2}
										value={entry.content}
										onChange={(event) =>
											updateContent(index, {
												content: event.target.value,
											})
										}
									/>
								</div>
								<ColorField
									id={`detail-${index}-color`}
									label={`Detail ${index + 1} text color`}
									value={
										entry.color ?? theme.tokens.foreground
									}
									onChange={(color) =>
										updateContent(index, { color })
									}
								/>
								<div className="editor-field-grid">
									<div className="space-y-2">
										<Label htmlFor={`detail-${index}-size`}>
											Text size (px)
										</Label>
										<Input
											id={`detail-${index}-size`}
											className="h-10"
											type="number"
											min={1}
											value={Number(entry.fontSize ?? 14)}
											onChange={(event) =>
												updateContent(index, {
													fontSize: Math.max(
														1,
														Number(
															event.target.value,
														),
													),
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor={`detail-${index}-weight`}
										>
											Text weight
										</Label>
										<select
											id={`detail-${index}-weight`}
											className="editor-select"
											value={entry.fontWeight ?? 500}
											onChange={(event) =>
												updateContent(index, {
													fontWeight: Number(
														event.target.value,
													),
												})
											}
										>
											{[
												300, 400, 500, 600, 700, 800,
												900,
											].map((weight) => (
												<option
													key={weight}
													value={weight}
												>
													{weight}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor={`detail-${index}-icon`}>
										Icon name
									</Label>
									<Input
										id={`detail-${index}-icon`}
										className="h-10"
										value={entry.iconClass ?? ""}
										placeholder="check"
										onChange={(event) =>
											updateContent(index, {
												iconClass: event.target.value,
											})
										}
									/>
								</div>
								<ColorField
									id={`detail-${index}-icon-color`}
									label={`Detail ${index + 1} icon color`}
									value={
										entry.iconColor ??
										theme.tokens.foreground
									}
									onChange={(iconColor) =>
										updateContent(index, { iconColor })
									}
								/>
								<Button
									variant="outline"
									onClick={() =>
										updateCard({
											additionalContent: content.filter(
												(_, i) => i !== index,
											),
										})
									}
								>
									Remove detail {index + 1}
								</Button>
							</fieldset>
						))}
						{!content.length && (
							<p className="text-sm text-muted-foreground">
								No supporting details yet.
							</p>
						)}
						<Button
							variant="outline"
							disabled={content.length >= MAX_DOCUMENT_ITEMS}
							onClick={() => {
								if (content.length < MAX_DOCUMENT_ITEMS)
									updateCard({
										additionalContent: [
											...content,
											{
												content: "New detail",
												fontSize: 14,
											},
										],
									});
							}}
						>
							Add detail
						</Button>
						{content.length >= MAX_DOCUMENT_ITEMS && (
							<p
								role="status"
								className="text-sm text-muted-foreground"
							>
								Limit reached: {MAX_DOCUMENT_ITEMS} details per
								card.
							</p>
						)}
					</section>
				</Fragment>
			) : (
				<p className="text-sm text-muted-foreground">
					Add a card to start editing.
				</p>
			)}
		</div>
	);
}
