import { renderBlock, type DroppedItem } from "@/lib/blocks";

export default function Renderer({ item }: { item: DroppedItem }) {
	return renderBlock(item);
}
