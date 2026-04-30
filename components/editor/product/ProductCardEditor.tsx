import { ProductCard } from "@/components/blocks/ProductBlock";

interface ProductCardEditorProps {
	card: ProductCard;
	onSelect: (card: ProductCard) => void;
}

export default function ProductCardEditor({
	card,
	onSelect,
}: ProductCardEditorProps) {
	if (!card) return null;
	return (
		<div className="flex flex-col gap-4 mt-4">
			<div className="flex gap-2">
				<div
					className="flex flex-col p-2 rounded-md border hover:-translate-y-1 duration-100 cursor-pointer"
					onClick={() => onSelect(card)}
				>
					{card.heading?.content && <p>{card.heading.content}</p>}
				</div>
			</div>
		</div>
	);
}
